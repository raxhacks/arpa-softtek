import { NextResponse } from "next/server"
import { getCookies } from "cookies-next"

export function middleware(request){

    const token = getCookies('token');
    console.log(token);

    if (!token){
        return NextResponse.redirect("https://localhost:3000/")
    }
    return NextResponse.next()
}

export const config = {
    matcher: ['/feedback/((?!general).*)']
}