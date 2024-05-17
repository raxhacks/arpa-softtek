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
        console.log('Uploading document...');
        const response = await axios.post('https://arpa-2mgft7cefq-uc.a.run.app/document', data, config);
        console.log(`Doument uploaded`)
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Could not upload the document:', error);
        return null
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
            publicURL: item.public_url,
            analysis_id: item.analysis_id,
            favorite: item.favorite
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
            publicURL: response.data.public_url,
            analysis_id: response.data.analysis_id,
            favorite: response.data.favorite
        };

        return document;
    } catch (error) {
        console.error('Could not fetch document:', error);
        throw error;
    }
};