import axios from 'axios';
import { cookies } from 'next/headers';
import { Document } from '../model/document';

const baseUrl = process.env.NEXT_PUBLIC_API_URL + '/favorites';

export const getFavorites = async (): Promise<Document[]> => {
    try {
        const token = cookies().get('session')?.value
        const config = { 
            headers: { 
                'Authorization': `Bearer ${token}`
            } 
        };
        console.log('Fetching favorite documents...');
        const response = await axios.get('https://arpa-2mgft7cefq-uc.a.run.app/favorites', config);

        const history: Document[] = response.data.map((item: any) => ({
            id: item.document_id,
            title: item.title,
            createdAt: item.created_at
        }));

        return history;
    } catch (error) {
        console.error('Could not fetch favorite documents:', error);
        throw error;
    }
};