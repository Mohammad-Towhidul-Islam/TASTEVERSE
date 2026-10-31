import {NextResponse} from 'next/server'
import {prisma} from '../../../lib/prisma'
export async function GET(req){
 const {searchParams}=new URL(req.url),category=searchParams.get('category')
 try{
  const products=await prisma.product.findMany({where:{status:'ACTIVE',...(category?{category:{slug:category}}:{})},include:{category:true},orderBy:{featured:'desc'}})
  return NextResponse.json({products})
 }catch{return NextResponse.json({products:[],message:'Database not configured yet.'})}
}