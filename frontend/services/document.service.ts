import axios from 'axios';
import { Document } from '../model/document';
import { getCookie } from 'cookies-next';

const baseUrl = process.env.NEXT_PUBLIC_API_URL + '/document';

// Integrar estructura?
export const createDocument = async (data: FormData) => {
    try {
        const config = { 
            headers: { 
                'Authorization': `Bearer ${getCookie('token')}`,
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