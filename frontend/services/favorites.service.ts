'use server'

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
        const response = await axios.get('https://arpa-2mgft7cefq-uc.a.run.app/document/favorites', config);

        const history: Document[] = response.data.map((item: any) => ({
            id: item.document_id,
            title: item.title,
            createdAt: item.created_at,
            publicURL: item.public_url
        }));
        
        return history;
    } catch (error) {
        console.error('Could not fetch favorite documents:', error);
        throw error;
    }
};

export const toggleFavorite = async (documentId: string, favorite: boolean) => {
    try {
        const token = cookies().get('session')?.value
        const config = { 
            headers: { 
                'Authorization': `Bearer ${token}`,
            } 
        };
        const data = {
            document_id: documentId,
            favorite: favorite
        };
        console.log('Toggling favorite status...');
        console.log('document id:', documentId)
        console.log('favorite status:', favorite)
        const response = await axios.put(`https://arpa-2mgft7cefq-uc.a.run.app/document/toggleFavorite?document_id=${documentId}&favorite=${favorite}`, data, config);
        console.log(response.data.message);
        return response.data;
    } catch (error) {
        console.error('Could not toggle favorite status:', error);
        throw error;
    }
};