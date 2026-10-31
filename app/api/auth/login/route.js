import {NextResponse} from 'next/server'
import bcrypt from 'bcryptjs'
import {prisma} from '../../../../lib/prisma'
import {createSession} from '../../../../lib/auth'
export async function POST(req){try{const {email,password}=await req.json();const user=await prisma.user.findUnique({where:{email:String(email).toLowerCase()}});if(!user||!await bcrypt.compare(password,user.passwordHash))return NextResponse.json({error:'Invalid email or password'},{status:401});await createSession(user);return NextResponse.json({user:{id:user.id,name:user.name,email:user.email,role:user.role}})}catch(e){return NextResponse.json({error:'Login failed'},{status:400})}}