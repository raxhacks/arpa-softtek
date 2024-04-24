'use server'

import axios from 'axios';
import { cookies } from 'next/headers';

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
        const response = await axios.post('https://arpa-2mgft7cefq-uc.a.run.app/document', data, config);
        return response.data;
    } catch (error) {
        console.error('Could not upload the document:', error);
        throw error;
    }
};

