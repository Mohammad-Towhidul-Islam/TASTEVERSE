import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
const secret = () => new TextEncoder().encode(process.env.JWT_SECRET || 'dev-only-change-this-secret-please-123456')
export async function createSession(user) {
  const token = await new SignJWT({ sub:user.id, email:user.email, role:user.role, name:user.name })
    .setProtectedHeader({ alg:'HS256' }).setIssuedAt().setExpirationTime('7d').sign(secret())
  cookies().set('tv_session', token, { httpOnly:true, secure:process.env.NODE_ENV==='production', sameSite:'lax', path:'/', maxAge:60*60*24*7 })
}
export async function getSession() {
  const token = cookies().get('tv_session')?.value
  if (!token) return null
  try { const { payload } = await jwtVerify(token, secret()); return payload } catch { return null }
}
export function clearSession() { cookies().delete('tv_session') }
