'use server'

import axios from 'axios';
import { cookies } from 'next/headers';
import { MessageStruct } from '../model/message';

const baseUrl = process.env.NEXT_PUBLIC_API_URL + '/chat';

export const getChat = async (document_id: string | undefined) => {
    try {
        const token = cookies().get('session')?.value
        const config = { 
            headers: { 
                'Authorization': `Bearer ${token}`
            } 
        };
        console.log('Fetching chat...', document_id);
        const response = await axios.get(`https://arpa-2mgft7cefq-uc.a.run.app/chat/getMessages?document_id=${document_id}`, config);

        return response.data.response;
    } catch (error) {
        console.error('Could not fetch chat:', error);
        return null;
    }
};

export const sendMessage = async (document_id: string, message: string) => {
    try {
        const token = cookies().get('session')?.value
        const config = { 
            headers: { 
                'Authorization': `Bearer ${token}`
            } 
        };
        const response = await axios.post(`https://arpa-2mgft7cefq-uc.a.run.app/chat/sendMessage?document_id=${document_id}`, { message }, config);
        return response.data.response;

    } catch (error) {
        console.log('Could not send the message:', error);
        return null;
    }
};