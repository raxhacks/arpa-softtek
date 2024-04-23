'use server'

import { SignJWT, jwtVerify } from 'jose'
import { SessionPayload } from '@/app/lib/defititions'
// import { cookies } from 'next/headers'
import { setCookie } from 'cookies-next'
import { getCookie } from 'cookies-next'
import { deleteCookie } from 'cookies-next'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers';
 
const secretKey = 'mi_llave_secreta'
const encodedKey = new TextEncoder().encode(secretKey)
 
// export function encrypt(payload: SessionPayload) {
//   console.log('estoy encriptando la sesion;', payload)
//   return new SignJWT(payload)
//     .setProtectedHeader({ alg: 'HS256' })
//     .setIssuedAt()
//     .setExpirationTime('7d')
//     .sign(encodedKey)
// }
 
export async function decrypt(session: string | undefined = '') {
  try {
    console.log('estoy desencriptando la sesion esta es la cookie:', session)
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    })

    console.log('desencripte la sesion este es el payload', payload);
    return payload
  } catch (error) {
    console.log('Failed to verify session')
    return false
  }
}

export async function createSession(token: string) {
  console.log('Estoy creando la sesion')
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
  // const session = encrypt({ token, expiresAt })
  // console.log('encripte la sesion con exito')

  cookies().set('session', token, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  })
  console.log('Esta es la cookie: ',cookies().get('session')?.value)
}



// export async function updateSession() {
//   const session = getCookie('session')
//   const payload = await decrypt(session)
  
//   if (!session || !payload) {
//     return null
//   }
  
//   const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
//   setCookie('session', session, {
//     httpOnly: true,
//     secure: true,
//     expires: expires,
//     sameSite: 'lax',
//     path: '/',
//   })
// }

export async function deleteSession() {
  deleteCookie('session')
}

export async function logout() {
  deleteSession()
  redirect('/')
}