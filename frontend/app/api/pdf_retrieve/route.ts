import axios from 'axios';

export async function POST(req: Request, res: Response) {
    try {
        const body = await req.json();
        const response = await axios.get(body.url, {responseType: 'blob'});
        return new Response(JSON.stringify({ "a":"se acaba el juego" }), {
            status: 200,
        });
    } catch (error:any) {
        console.error(error.status);
        new Response(JSON.stringify({ message: "error" }), {
            status: 500,
        });
    }
}
  