import axios from 'axios';
import { createDocument } from '@/services/document.service';
import { getCookie, getCookies } from 'cookies-next';
import { cookies } from 'next/headers';

export async function POST(req: Request, res: Response) {
    try {
        const body = await req.json();
        const formData = new FormData();
        formData.append('url', body.url);
        formData.append('extension', "PDF");
        const userCookies = getCookies({cookies});
        const token = userCookies.token;
        const res = await createDocument(formData, token);
        return new Response(JSON.stringify({ text: res.text }), {
            status: 200,
        });
    } catch (error:any) {
        console.error(error.status);
        new Response(JSON.stringify({ message: "error" }), {
            status: 500,
        });
    }
}
  