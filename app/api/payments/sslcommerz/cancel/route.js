import {NextResponse} from 'next/server'
export async function POST(){return NextResponse.redirect(new URL('/checkout?payment=cancelled',process.env.NEXT_PUBLIC_APP_URL))}