import {NextResponse} from 'next/server'
import {z} from 'zod'
import {prisma} from '../../../lib/prisma'
import {createOrderFromInput} from '../../../lib/order'
import {createSslSession} from '../../../lib/sslcommerz'
const schema=z.object({
 customerName:z.string().min(2),email:z.string().email(),phone:z.string().min(8),
 address:z.string().min(5),city:z.string().min(2),notes:z.string().optional(),
 paymentMethod:z.enum(['COD','SSLCOMMERZ']),
 items:z.array(z.object({productId:z.string(),quantity:z.number().int().min(1).max(20)})).min(1)
})
export async function POST(req){
 try{
  const input=schema.parse(await req.json())
  const order=await createOrderFromInput(input)
  if(input.paymentMethod==='SSLCOMMERZ'){
   try{const session=await createSslSession(order);await prisma.order.update({where:{id:order.id},data:{gatewaySession:session.sessionkey}});return NextResponse.json({paymentUrl:session.GatewayPageURL})}
   catch(e){await prisma.order.update({where:{id:order.id},data:{paymentStatus:'FAILED'}});return NextResponse.json({error:e.message,orderNumber:order.orderNumber},{status:502})}
  }
  return NextResponse.json({order:{orderNumber:order.orderNumber,status:order.status}})
 }catch(e){return NextResponse.json({error:e.message||'Invalid order data'},{status:400})}
}