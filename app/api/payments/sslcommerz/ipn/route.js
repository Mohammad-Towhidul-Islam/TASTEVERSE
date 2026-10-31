import {NextResponse} from 'next/server'
import {prisma} from '../../../../../lib/prisma'
import {validateSslPayment} from '../../../../../lib/sslcommerz'
export async function POST(req){
 const f=await req.formData(),val=String(f.get('val_id')||''),tran=String(f.get('tran_id')||'')
 try{const v=await validateSslPayment(val);if(!['VALID','VALIDATED'].includes(v.status))return NextResponse.json({ok:false},{status:400});const o=await prisma.order.findUnique({where:{orderNumber:tran}});if(!o||Math.round(Number(v.amount)*100)!==o.total)return NextResponse.json({ok:false},{status:400});await prisma.order.update({where:{id:o.id},data:{paymentStatus:'PAID',status:'CONFIRMED',transactionId:val}});return NextResponse.json({ok:true})}catch{return NextResponse.json({ok:false},{status:400})}
}