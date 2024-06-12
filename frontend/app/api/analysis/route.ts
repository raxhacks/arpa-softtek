import axios from 'axios';
import { createAnalysis } from '@/services/analysis.service';
import { getCookie, getCookies } from 'cookies-next';
import { cookies } from 'next/headers';

export async function POST(req: Request, res: Response) {
    try {
        const body = await req.json();
        const userCookies = getCookies({cookies});
        const token = userCookies.token;
        const res = await createAnalysis(body, token);
        return new Response(JSON.stringify(res), {
            status: 200,
        });
    } catch (error:any) {
        console.error(error.status);
        new Response(JSON.stringify({ message: "error" }), {
            status: 500,
        });
    }
}
  