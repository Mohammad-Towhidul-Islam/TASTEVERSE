import {NextResponse} from 'next/server'
import bcrypt from 'bcryptjs'
import {z} from 'zod'
import {prisma} from '../../../../lib/prisma'
import {createSession} from '../../../../lib/auth'
const schema=z.object({name:z.string().min(2),email:z.string().email(),password:z.string().min(8)})
export async function POST(req){try{const d=schema.parse(await req.json());const exists=await prisma.user.findUnique({where:{email:d.email}});if(exists)return NextResponse.json({error:'Email already registered'},{status:409});const user=await prisma.user.create({data:{...d,email:d.email.toLowerCase(),passwordHash:await bcrypt.hash(d.password,12)}});await createSession(user);return NextResponse.json({user:{id:user.id,name:user.name,email:user.email}})}catch(e){return NextResponse.json({error:e.message},{status:400})}}