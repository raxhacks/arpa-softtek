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

def AnalysisAndChatCreation(user_id, document_id, text):
    db = firestore.client()
    user_doc_ref = db.collection('users').document(user_id)
    document_doc_ref = user_doc_ref.collection('documents').document(document_id)

    # Split in chunks
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=0)
    texts = text_splitter.split_documents(text)

    index_name = document_id
    spec = ServerlessSpec(cloud="aws", region="us-east-1")
    pc = Pinecone(api_key=PINECONE_API_KEY)

    if index_name not in pc.list_indexes().names():
        # if does not exist, create index
        pc.create_index(
            name=index_name,
            dimension=1536,  # dimensionality of text-embeabc124d-3-small
            metric='cosine',
            spec=spec
        )
        # wait for index to be initialized
        while not pc.describe_index(index_name).status['ready']:
            time.sleep(1)
        
    # connect to index
    index = pc.Index(index_name)
    time.sleep(1)

    vectorstore = PineconeVectorStore(index_name=index_name, embedding=OpenAIEmbeddings(model=MODEL))

    retreiver = vectorstore.as_retriever()

    ### Contextualize question ###
    contextualize_q_system_prompt = """Given a chat history and the latest user question \
    which might reference context in the chat history, formulate a standalone question \
    which can be understood without the chat history. Do NOT answer the question, \
    just reformulate it if needed and otherwise return it as is."""

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
    qa_system_prompt = """You are an assistant for question-answering tasks related to scientific papers, articles and investigations. \
    Use the following pieces of retrieved context to answer the question. \
    If you don't know the answer, just say that you don't know. \
    Use three sentences maximum and keep the answer concise.\

    {context}"""
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
        # Reference the chat collection
        chat_ref = db.collection("chat").document(session_id)
        
        # Retrieve the chat document
        chat_doc = chat_ref.get()
        
        if chat_doc.exists: #Funcion para ver si existe un historial de chat    
            # Create a new FirestoreChatMessageHistory instance
            chat_history = FirestoreChatMessageHistory(session_id=session_id, collection=f"users/{user_id}/documents/{document_id}/chat", client=db)
        else:
            chat_history = FirestoreChatMessageHistory(session_id=session_id, collection=f"users/{user_id}/documents/{document_id}/chat", client=db)
        return chat_history
    
    def generateRandomString(stringLength=10):
        letters = string.ascii_lowercase
        return ''.join(random.choice(letters) for i in range(stringLength))

    chat_history = get_session_history(generateRandomString(10))

    conversational_rag_chain = RunnableWithMessageHistory(
        rag_chain,
        get_session_history,
        input_messages_key="input",
        history_messages_key="chat_history",
        output_messages_key="answer",
    )
