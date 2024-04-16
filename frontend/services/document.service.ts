import axios from 'axios';
import { Document } from '../model/document';
import { getCookie } from 'cookies-next';

const baseUrl = process.env.NEXT_PUBLIC_API_URL + '/document';

// Integrar estructura?
export const createDocument = async (data: Document) => {
    try {
        const response = await axios.post(baseUrl, data);
        return response.data;
    } catch (error) {
        console.error('Could not upload the document:', error);
        throw error;
    }
};