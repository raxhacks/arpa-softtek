def chatQA(document_id, user_id, prompt, session_id: str, max_context_tokens=300000): 
    try:
        db = firestore.client()

        # Fetch conversation history (consider trimming or summarizing if needed)
        chat_history = get_session_history(session_id, user_id, db)

        # Limit the conversation history to reduce context tokens
        trimmed_history = chat_history.trim(max_context_tokens)

        # Retrieve relevant context from the trimmed history
        context = trimmed_history.get_context_for_prompt()

        # Prepare prompt with limited context
        qa_prompt = prepare_prompt(prompt, context)

        # Continue with the question-answer process using the modified prompt
        response = generate_response(qa_prompt)

        # Update chat history with user's question and AI's response
        chat_history.add_user_message(prompt)
        chat_history.add_ai_message(response)

        return response
    
    except Exception as e:
        print("Error at chat script:", e)
        return "Error"

def prepare_prompt(prompt, context):
    # Construct the prompt using limited context
    qa_system_prompt = """You are an assistant for question-answering tasks related to scientific papers, articles and investigations. \
    Use the following pieces of retrieved context to answer the question. \
    If you don't know the answer, just say that you don't know. \
    Use three sentences maximum, keep the answer concise and response in the same language as the question.
    
    {context}"""

    # Merge context with system prompt
    qa_prompt = ChatPromptTemplate.from_messages(
        [
            ("system", qa_system_prompt.format(context=context)),
            ("human", "{input}")
        ]
    )
    return qa_prompt

def generate_response(qa_prompt):
    # Generate response using the modified prompt
    # (Assuming this part is handled elsewhere in your code)
    response = generate_response_using_prompt(qa_prompt)
    return response
