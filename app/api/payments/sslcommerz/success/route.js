import {NextResponse} from 'next/server'
import {prisma} from '../../../../../lib/prisma'
import {validateSslPayment} from '../../../../../lib/sslcommerz'
export async function POST(req){
 const form=await req.formData(),valId=form.get('val_id'),tranId=form.get('tran_id')
 try{
  if(!valId||!tranId)throw new Error('Missing payment reference')
  const result=await validateSslPayment(valId)
  if(!['VALID','VALIDATED'].includes(result.status))throw new Error('Payment could not be validated')
  const order=await prisma.order.findUnique({where:{orderNumber:tranId}})
  if(!order)throw new Error('Order not found')
  const paid=Math.round(Number(result.amount)*100)
  if(paid!==order.total)throw new Error('Payment amount mismatch')
  await prisma.order.update({where:{id:order.id},data:{paymentStatus:'PAID',status:'CONFIRMED',transactionId:String(valId)}})
  return NextResponse.redirect(new URL(`/order-success?order=${encodeURIComponent(order.orderNumber)}`,process.env.NEXT_PUBLIC_APP_URL))
 }catch(e){return NextResponse.redirect(new URL(`/checkout?payment=failed&reason=${encodeURIComponent(e.message)}`,process.env.NEXT_PUBLIC_APP_URL))}
}