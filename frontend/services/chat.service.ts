'use server'

import axios from 'axios';
import { cookies } from 'next/headers';
import { MessageStruct } from '../model/message';

const baseUrl = process.env.NEXT_PUBLIC_API_URL + '/chat';

export const getChat = async (document_id: string, chat_id: string): Promise<MessageStruct[]> => {
    try {
        const token = cookies().get('session')?.value
        const config = { 
            headers: { 
                'Authorization': `Bearer ${token}`
            } 
        };
        console.log('Fetching chat...');
        const response = await axios.get(`https://arpa-2mgft7cefq-uc.a.run.app/chat?document_id=${document_id}&chat_id=${chat_id}`, config);

        const chat: MessageStruct[] = response.data.messages.map((item: any) => ({
            prompt: item.prompt,
            response: item.response
        }));

        return chat;
    } catch (error) {
        console.error('Could not fetch chat:', error);
        throw error;
    }
};