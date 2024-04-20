import { SignJWT, jwtVerify } from 'jose'
import { SessionPayload } from '@/app/lib/denititions'
// import { cookies } from 'next/headers'
import { setCookie } from 'cookies-next'
import { getCookie } from 'cookies-next'
import { deleteCookie } from 'cookies-next'
import { redirect } from 'next/navigation'
 
const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)
 
export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey)
}
 
export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    })
    return payload
  } catch (error) {
    console.log('Failed to verify session')
  }
}

export async function createSession(userId: string) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
    const session = await encrypt({ userId, expiresAt })
   
    // cookies().set('session', session, {
    //   httpOnly: true,
    //   secure: true,
    //   expires: expiresAt,
    //   sameSite: 'lax',
    //   path: '/',
    // })
    setCookie('session', session, {
      httpOnly: true,
      secure: true,
      expires: expiresAt,
      sameSite: 'lax',
      path: '/',
    });
}

export async function updateSession() {
  const session = getCookie('session')
  const payload = await decrypt(session)
  
  if (!session || !payload) {
    return null
  }
  
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  setCookie('session', session, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: 'lax',
    path: '/',
  })
}

export function deleteSession() {
  deleteCookie('session')
}

export async function logout() {
  deleteSession()
  redirect('/login')
}