'use server'

import axios from 'axios';
import { cookies } from 'next/headers';
import { Document } from '../model/document';

const baseUrl = process.env.NEXT_PUBLIC_API_URL + '/document';

// Integrar estructura?
export const createDocument = async (data: FormData, tokenSSR?: string) => {
    try {
        const token = tokenSSR || cookies().get('session')?.value
        const config = { 
            headers: { 
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            } 
        };
        console.log('Uploading document...', data);
        const response = await axios.post('http://127.0.0.1:5001/arpa-softtek/us-central1/arpa/document', data, config);
        return response.data;
    } catch (error) {
        console.error('Could not upload the document:', error);
        throw error;
    }
};

export const getHistory = async (): Promise<Document[]> => {
    try {
        const token = cookies().get('session')?.value
        const config = { 
            headers: { 
                'Authorization': `Bearer ${token}`
            } 
        };
        console.log('Fetching documents history...');
        const response = await axios.get('https://arpa-2mgft7cefq-uc.a.run.app/document/history', config);

        const history: Document[] = response.data.map((item: any) => ({
            id: item.document_id,
            title: item.title,
            createdAt: item.created_at,
            publicURL: item.public_url
        }));

        return history;
    } catch (error) {
        console.error('Could not fetch history:', error);
        throw error;
    }
};

export const getDocument = async (document_id: string): Promise<Document> => {
    try {
        const token = cookies().get('session')?.value
        const config = { 
            headers: { 
                'Authorization': `Bearer ${token}`
            } 
        };
        console.log('Fetching document...');
        const response = await axios.get(`https://arpa-2mgft7cefq-uc.a.run.app/document?document_id=${document_id}`, config);

        const document: Document = {
            id: response.data.document_id,
            title: response.data.title,
            createdAt: response.data.created_at,
            publicURL: response.data.public_url
        };

        return document;
    } catch (error) {
        console.error('Could not fetch document:', error);
        throw error;
    }
};