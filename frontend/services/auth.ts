import axios from 'axios';
import { headers } from 'next/headers';
import React from 'react';
import { getToken } from '../helpers/getToken'
import { setCookie } from 'cookies-next';


const baseUrl = process.env.NEXT_PUBLIC_API_URL + '/user' || 'http://localhost:3001/user';

const createUser = async (email: string, password: string, ) => {
    try{
        const response = await axios.post(baseUrl);
        const {message, token} = response?.data;
        if(token){
            setCookie('token', token);
            return true
        } else {

        }

    } catch (error){
        
    }
};

// const getChatID = async (file_id: string, user_id: string) => {
//   try {
//     const config = {
//       headers: { Authorization: getToken() },
//     };

//     // We fetch the chat id from the database

//     const response = await axios.get(`${baseUrl}/chat/find/?file_id=${file_id}&user_id=${user_id}`, config);

//     const { message, data } = response?.data;
//     const { id } = data[0]; // chat id - data[0] is the first chat with the file_id
//     // current implementation only allows one chat per file_id

//     // If we fetched the chat id successfully, we return it.
//     if (id != null) {
//       return id;
//     } else {
//       throw new Error('Could not fetch chat ID: ', message);
//     }
//   } catch (error) {
//     console.log(error);
//     return false;
//   }
// };

// const getChatMessages = async (chat_id: string, start: number) => {
//   try {
//     const config = {
//       headers: { Authorization: getToken() },
//     };

//     // We fetch the chat id from the database
//     const response = await axios.get(`${baseUrl}/chat/last_ten_messages/?id=${chat_id}&N=${start}`, config);
//     const { message, data } = response?.data;
//     // If we fetched the chat id successfully, we return it.
//     if (data || response.status == 204) {
//       return data;
//     } else {
//       throw new Error('Could not fetch chat ID: ', message);
//     }
//   } catch (error) {
//     console.log(error);
//     return false;
//   }
// };

// const getContextMessages = async (chat_id: string, prompt: string) => {
//   try {
//     const config = {
//       headers: { Authorization: getToken() },
//     };

//     const chatInfo = {
//       chat_id,
//       prompt,
//     };

//     const contextResponse = await axios.post(`${baseUrl}/gpt/context/`, chatInfo, config);
//     const { success, messages } = contextResponse?.data;

//     if (success) {
//       return messages;
//     } else {
//       throw new Error('Error: Could not fetch context.');
//     }
//   } catch (error) {
//     console.error('Error getting context messages:', error);
//     return { user: prompt };
//   }
// };

// type chatInteraction = {
//   role: 'user' | 'assistant' | 'system';
//   content: string;
// };

// const getChatResponse = async (contextMessages: chatInteraction[]) => {
//   try {
//     const response = await fetch(`${baseUrl}/gpt/`, {
//       method: 'POST',
//       body: JSON.stringify({
//         contextMessages,
//       }),
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: getToken() || '',
//       },
//     });

//     return response;
//   } catch (error) {
//     console.error('Error getting chat response:', error);
//     return null;
//   }
// };

// const saveMessage = async (chat_id: string, prompt: string, response: string) => {
//   try {
//     const config = {
//       headers: { Authorization: getToken() },
//     };

//     const chatInfo = {
//       chat_id,
//       prompt,
//       response,
//     };

//     const contextResponse = await axios.post(`${baseUrl}/gpt/save/`, chatInfo, config);
//     const { message, data } = contextResponse?.data;
//     const { returning_message_id } = data;

//     if (returning_message_id) {
//       return true;
//     } else {
//       throw new Error('Error: Could not fetch context: ', message);
//     }
//   } catch (error) {
//     console.error('Error saving message:', error);
//     return false;
//   }
// };

export default {
  createUser,
//   getChatID,
//   getChatMessages,
//   getContextMessages,
//   getChatResponse,
//   saveMessage,
};
