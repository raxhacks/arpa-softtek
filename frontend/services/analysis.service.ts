'use server'

import axios from 'axios';
import { cookies } from 'next/headers';
import { Analysis, Section, Keyword, QuantitativeDatum } from '../model/analysis';

export const getAnalysis = async (document_id: string, analysis_id: string): Promise<Analysis> => {
    try {
        const token = cookies().get('session')?.value
        const config = { 
            headers: { 
                'Authorization': `Bearer ${token}`
            } 
        };
        console.log('Fetching analysis sections...');
        const response = await axios.get(`https://arpa-2mgft7cefq-uc.a.run.app/analysis?document_id=${document_id}&analysis_id=${analysis_id}`, config);
        console.log('Analysis fetch');

        const sections: Section[] = response.data ? response.data.sections.map((item: any) => ({
            title: item.title,
            content: item.content
        })) : [];

        const keywords: Keyword[] = response.data ? response.data.keywords.map((item: any) => ({
            keyword: item.keyword,
            count: item.count
        })) : [];

        const quantitativeData: QuantitativeDatum[] = response.data ? response.data.quantitative_data.map((item: any) => ({
            datum: item.datum,
            sentence: item.sentence
        })) : [];

        const analysis: Analysis = {
            Sections: sections,
            Keywords: keywords,
            QuantitativeData: quantitativeData
        };
        
        // console.log(analysis);
        
        return analysis;
    } catch (error) {
        console.error('Could not fetch analysis sections:', error);
        throw error;
    }
};

export const createAnalysis = async (body: any, tokenSSR?: string) => {
    try {
        const token = tokenSSR || cookies().get('session')?.value
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };
        console.log('Uploading document...');
        const response = await axios.post('https://arpa-2mgft7cefq-uc.a.run.app/analysis', body, config);
        console.log(`Doument uploaded`)
        return response.data;
    } catch (error) {
        console.error('Could not upload the document:', error);
        return null
    }
};