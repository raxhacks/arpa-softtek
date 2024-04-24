import axios from 'axios';
import { cookies } from 'next/headers';
import { Document } from '../model/document';

const baseUrl = process.env.NEXT_PUBLIC_API_URL + '/history';

export const getHistory = async (): Promise<Document[]> => {
    try {
        const token = cookies().get('session')?.value
        const config = { 
            headers: { 
                'Authorization': `Bearer ${token}`
            } 
        };
        console.log('Fetching documents history...');
        const response = await axios.get('https://arpa-2mgft7cefq-uc.a.run.app/history', config);

        const history: Document[] = response.data.map((item: any) => ({
            id: item.document_id,
            title: item.title,
            createdAt: item.created_at
        }));

        return history;
    } catch (error) {
        console.error('Could not fetch history:', error);
        throw error;
    }
};