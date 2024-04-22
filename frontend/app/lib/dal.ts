'use server'

import { redirect } from 'next/navigation';
import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import { decrypt } from '@/app/actions/session'
import { cache } from 'react';

export const verifySession = cache(async () => {
    console.log('estoy verificando la sesion')
    const cookie = cookies().get('session')?.value
    // console.log('obtuve la cookie',cookie);
    // const session = await decrypt(cookie)
    // console.log('obtuve la sesion',session);
    
    if (!cookie) {
        
        redirect('/')
    }
    console.log('Obtuve la sesion puedes pasar');
    return { isAuth: true }
})