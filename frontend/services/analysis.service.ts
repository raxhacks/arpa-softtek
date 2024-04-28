'use server'

import axios from 'axios';
import { cookies } from 'next/headers';
import { Section } from '../model/section';

export const getSections = async (): Promise<Section[]> => {
    try {
        const token = cookies().get('session')?.value
        const config = { 
            headers: { 
                'Authorization': `Bearer ${token}`
            } 
        };
        console.log('Fetching analysis sections...');
        const response = await axios.get('https://arpa-2mgft7cefq-uc.a.run.app/analysis/sections', config);

        const sections: Section[] = response.data.map((item: any) => ({
            title: item.title,
            content: item.content
        }));

        return sections;
    } catch (error) {
        console.error('Could not fetch analysis sections:', error);
        throw error;
    }
};