import random
import string
from langchain_community.document_loaders import PyPDFLoader
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.chains import create_history_aware_retriever
from langchain.chains import create_retrieval_chain
from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.vectorstores import Pinecone
from langchain_openai import OpenAIEmbeddings
from langchain_pinecone import PineconeVectorStore
from langchain_openai import OpenAIEmbeddings
from langchain_openai import ChatOpenAI
from pinecone import ServerlessSpec
from pinecone import Pinecone
from openai import OpenAI
from dotenv import load_dotenv
import pinecone 
import time
import os
from google.cloud import firestore
from firebase_admin import firestore, credentials, initialize_app
from langchain_google_firestore import FirestoreChatMessageHistory
import json

load_dotenv()
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
PINECONE_API_KEY = os.getenv('PINECONE_API_KEY')
MODEL = "text-embedding-3-small"
client = OpenAI(api_key=OPENAI_API_KEY)
llm = ChatOpenAI(model="gpt-3.5-turbo", temperature=0)

def addAnalysisToDocument(user_id, document_id, text, keywords, keywords_str_array):
    try:
        db = firestore.client()
        user_doc_ref = db.collection('users').document(user_id)
        document_doc_ref = user_doc_ref.collection('documents').document(document_id)

        # Split in chunks
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=0)
        data = text_splitter.create_documents([text])
        docs = text_splitter.split_documents(data)


        index_name = document_id.lower()
        spec = ServerlessSpec(cloud="aws", region="us-east-1")
        pc = Pinecone(api_key=PINECONE_API_KEY)

        if index_name not in pc.list_indexes().names():
            # if does not exist, create index
            print("Creating index")
            pc.create_index(
                name=index_name,
                dimension=1536,  # dimensionality of text-embeabc124d-3-small
                metric='cosine',
                spec=spec
            )
            # wait for index to be initialized
            while not pc.describe_index(index_name).status['ready']:
                time.sleep(1)
            vectorstore = PineconeVectorStore.from_documents(
                docs,
                index_name=index_name,
                embedding=OpenAIEmbeddings(model=MODEL),
            )
        else:
            print("Index already exists")  
            vectorstore = PineconeVectorStore(index_name=index_name, embedding=OpenAIEmbeddings(model=MODEL))
        # connect to index
        index = pc.Index(index_name)
        time.sleep(1)

        retreiver = vectorstore.as_retriever()
        num_vectors = len(vectorstore.index.vector_count)
        print(f"Number of vectors in the vector store: {num_vectors}")
        
        # print(f"Number of documents in the vector store: {num_docs}")
        total_tokens = sum(len(doc.pageContent.split()) for doc in vectorstore.query_collection.fetch())
        print(f"Total number of tokens in the vector store: {total_tokens}")
        
        ### Contextualize question ###
        contextualize_q_system_prompt = """Given a document text which can be in english or spanish \
        process it to formulate the following summary analisis it its respective language whether english or spanish. \
        """

        contextualize_q_prompt = ChatPromptTemplate.from_messages(
            [
                ("system", contextualize_q_system_prompt),
                MessagesPlaceholder("chat_history"),
                ("human", "{input}"),
            ]
        )
        history_aware_retriever = create_history_aware_retriever(
            llm, retreiver, contextualize_q_prompt
        )

        ### Answer question ###
        keywords_str = ', '.join([f'"{keyword}"' for keyword in keywords_str_array])
        qa_system_prompt = f"""
        You are an assistant for question-answering tasks related to scientific papers, articles and investigations. 
        Use the following pieces of retrieved context (the document text) to answer the question. 
        If we ask this specific prompt "Analyze this paper", you must return a stringified JSON's array. 
        Each index represents a summarized section of the paper and the object has 2 attributes, 
        the title of the section and the content. MAKE SURE TO INCLUDE the following list of keywords: [{keywords_str}] within the summary by naturally incorporating them into the text.
        Just the stringified json, no other format (don't use backticks to tell you are using json).
        Give the answer in the respective language of the document.
        {{context}}
        """
        qa_prompt = ChatPromptTemplate.from_messages(
            [
                ("system", qa_system_prompt),
                MessagesPlaceholder("chat_history"),
                ("human", "{input}"),
            ]
        )

        question_answer_chain = create_stuff_documents_chain(llm, qa_prompt)
        rag_chain = create_retrieval_chain(history_aware_retriever, question_answer_chain)

        def get_session_history(session_id: str):
            return FirestoreChatMessageHistory(session_id=session_id, collection=f"analysis_prompt", client=db)

        chat_history = get_session_history(document_id)

        conversational_rag_chain = RunnableWithMessageHistory(
            rag_chain,
            get_session_history,
            input_messages_key="input",
            history_messages_key="chat_history",
            output_messages_key="answer",
        )
        prompt = "Analyze this paper"
        answer = conversational_rag_chain.invoke(
            {"input": prompt},
            config={
                "configurable": {"session_id": document_id}
            },  # constructs a key "abc123" in `store`.
        )["answer"]

        promptCitation = "Given the information found in this paper, provide the source in APA 7 format. Just give me the source, no other format or text."
        answerCitation = conversational_rag_chain.invoke(
            {"input": promptCitation},
            config={
                "configurable": {"session_id": document_id}
            },  # constructs a key "abc123" in `store`.
        )["answer"]

        promptQuantData = "Given the information found in this paper, I want you to give me the quantitative data found in the paper. Give me the data in an stringified array of objects, each object should have the following attributes: datum: the single quantitive datum, sentence: trimmed sentence in which the quantitive datum was found. Just give me the data, no other format or text."
        answerQuantData = conversational_rag_chain.invoke(
            {"input": promptQuantData},
            config={
                "configurable": {"session_id": document_id}
            },  # constructs a key "abc123" in `store`.
        )["answer"]

        print(prompt)
        print(answer)

        print(promptCitation)
        print(answerCitation)

        print(promptQuantData)
        print(answerQuantData)

        print(keywords)

        # Save the analysis to the document
        analysis_doc_ref = document_doc_ref.collection('analysis').document()
        
        new_analysis = {}
        new_analysis['keywords'] = keywords
        new_analysis['sections'] = json.loads(answer)
        new_analysis['apa'] = answerCitation
        new_analysis['quantitative_data'] = json.loads(answerQuantData)

        
        analysis_doc_ref.set(new_analysis)
        
        analysis_doc_ref.update({"analysis_id":analysis_doc_ref.id})
        
        # document_doc_ref.update({"analysis":analysis_doc_ref.id})

        return analysis_doc_ref.id

    except Exception as e:
        print("Error",e)
        return "Error"
