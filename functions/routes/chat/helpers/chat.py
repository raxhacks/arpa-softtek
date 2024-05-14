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

def get_session_history(session_id: str, user_id: str, db: firestore.client) -> FirestoreChatMessageHistory: 
    # print(FirestoreChatMessageHistory(session_id=session_id, collection=f"users/{user_id}/documents/{session_id}/chat", client=db))
    return FirestoreChatMessageHistory(session_id=session_id, collection=f"users/{user_id}/documents/{session_id}/chat", client=db)

def chatQA(document_id, user_id, prompt, session_id: str): 
    try:  

        db = firestore.client()

        index_name = document_id.lower()
        vectorstore = PineconeVectorStore(index_name=index_name, embedding=OpenAIEmbeddings(model=MODEL))
        retreiver = vectorstore.as_retriever()

        # Contextualize question: contextualize_q_prompt helps clarify the question itself.
        """
        contextualize_q_prompt: 
        This part focuses on understanding the user's question in context. It defines a prompt (text instructions) for a large language model (LLM) like Bard. The prompt tells the LLM to consider two things:
            -The chat history (previous conversation) - This might be represented as a list of messages.
            -The user's latest question ({input}) - This is the new question the user is asking.
        The goal of this prompt is to rewrite the user's question into a standalone format. 
        An ideal standalone question is clear and understandable even without knowing the conversation history. 
        For instance, if the conversation was about "climate change" and the user asks "what causes it?", 
        the reformulated question might become "What are the causes of climate change?".
        """

        contextualize_q_system_prompt = """Given a chat history and the latest user question \
        which might reference context in the chat history, formulate a standalone question \
        which can be understood without the chat history. Do NOT answer the question, \
        just reformulate it if needed and otherwise return it as is."""

        contextualize_q_prompt = ChatPromptTemplate.from_messages(
            [
                ("system", contextualize_q_system_prompt),
                MessagesPlaceholder("chat_history"),
                ("human", "{input}")
            ]
        ) 

        history_aware_retreiver = create_history_aware_retriever(llm , retreiver, contextualize_q_prompt)


        ### Answer question : question_answer_chain helps answer the clarified question using retrieved information.
        """
        The qa_prompt provides instructions for the LLM on how to answer the question. 
        It tells the LLM to consider the retrieved context (likely found using the history_aware_retreiver) 
        and answer in a concise way. This question_answer_chain likely represents a series of steps or modules
          that the LLM uses to process the information and generate the answer
        """

        qa_system_prompt = """You are an assistant for question-answering tasks related to scientific papers, articles and investigations. \
        Use the following pieces of retrieved context to answer the question. \
        If you don't know the answer, just say that you don't know. \
        Use three sentences maximum, keep the answer concise and response in the same language as the question.\
        
        {context}"""

        qa_prompt = ChatPromptTemplate.from_messages(
            [
                ("system", qa_system_prompt),
                MessagesPlaceholder("chat_history"),
                ("human", "{input}")
            ]
        )

        """
        This line creates a component named question_answer_chain. 
        The exact details might depend on the specific library used, 
        but it likely involves the LLM (llm) and the qa_prompt defined earlier.
        """
        question_answer_chain = create_stuff_documents_chain(llm, qa_prompt)
        rag_chain = create_retrieval_chain(history_aware_retreiver, question_answer_chain)
        get_session_history_lambda = lambda session_id: get_session_history(session_id, user_id, db)
        chat_history = FirestoreChatMessageHistory(session_id=session_id, collection=f"users/{user_id}/documents/{session_id}/chat", client=db)
        converational_rag_chain = RunnableWithMessageHistory(
            rag_chain, 
            get_session_history_lambda,
            input_messages_key="input",
            history_messages_key="chat_history", 
            output_messages_key="answer"
        )   
        response = converational_rag_chain.invoke(
            {"input": prompt},
            config={
                "configurable": {"session_id": session_id}
            }
        )["answer"]

        chat_history.add_user_message(prompt)
        chat_history.add_ai_message(response)

        return response
    
    except Exception as e:
        print("Error at chat script:", e)
        return "Error"