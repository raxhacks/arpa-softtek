'use server'

import axios from 'axios';
import { cookies } from 'next/headers';
import { Doc } from '../model/document';
import { documentId } from 'firebase/firestore';
import { threadId } from 'worker_threads';

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
        return response.data;
    } catch (error) {
        console.error('Could not upload the document:', error);
        return null
    }
};

export const precreateDocument = async (data: FormData, tokenSSR?: string) => {
    try {
        const token = tokenSSR || cookies().get('session')?.value
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        };
        console.log('Uploading document...');
        const response = await axios.post('https://arpa-2mgft7cefq-uc.a.run.app/document/precreation', data, config);
        console.log(`Doument uploaded`)
        return response.data;
    } catch (error) {
        console.error('Could not upload the document:', error);
        return null
    }
};

export const getHistory = async (): Promise<Doc[]> => {
    try {
        const token = cookies().get('session')?.value
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };
        console.log('Fetching documents history...');
        const response = await axios.get('https://arpa-2mgft7cefq-uc.a.run.app/document/history', config);

        const history: Doc[] = response.data.map((item: any) => ({
            id: item.document_id,
            title: item.title,
            createdAt: item.created_at,
            publicURL: item.public_url,
            analysis_id: item.analysis_id,
            favorite: item.favorite,
            extension: item.extension
        }));
        // console.log(history);
        return history;
    } catch (error) {
        console.error('Could not fetch history:', error);
        throw error;
    }
};

export const getDocument = async (document_id: string): Promise<Doc> => {
    try {
        const token = cookies().get('session')?.value
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };
        console.log('Fetching document...');
        const response = await axios.get(`https://arpa-2mgft7cefq-uc.a.run.app/document?document_id=${document_id}`, config);
        console.log('Document fetch');
        const document: Doc = {
            id: response.data.document_id,
            title: response.data.title,
            createdAt: response.data.created_at,
            publicURL: response.data.public_url,
            analysis_id: response.data.analysis,
            favorite: response.data.favorite,
            extension: response.data.extension
        };
        // console.log(document);

        return document;
    } catch (error) {
        console.error('Could not fetch document:', error);
        const document: Doc = {
            id: '',
            title: '',
            createdAt: '',
            publicURL: '',
            analysis_id: '',
            favorite: false,
            extension: ''
        };
        throw document;
    }
};

export const deleteDocument = async (document_Id: string): Promise<boolean> => {
    try {
      const token = cookies().get('session')?.value;
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      console.log("Deleting document");
      await axios.delete(`https://arpa-2mgft7cefq-uc.a.run.app/document?document_id=${document_Id}`, config);
      console.log("Document deleted");
      return true; // Indica éxito
    } catch (error) {
      console.error('Could not delete document:', error);
      return false; // Indica fracaso
    }
  } 