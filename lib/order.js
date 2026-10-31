import { prisma } from './prisma'
export async function createOrderFromInput(input, userId=null) {
  const ids = input.items.map(i => i.productId)
  const products = await prisma.product.findMany({ where:{ id:{in:ids}, status:'ACTIVE' } })
  if (products.length !== ids.length) throw new Error('One or more products are unavailable.')
  const lines = input.items.map(line => {
    const p = products.find(x => x.id === line.productId)
    const quantity = Math.max(1, Math.min(20, Number(line.quantity)||1))
    return { productId:p.id, name:p.name, price:p.price, quantity }
  })
  const subtotal = lines.reduce((s,x)=>s+x.price*x.quantity,0)
  const deliveryFee = subtotal >= 300000 ? 0 : 6000
  const orderNumber = `TV${Date.now()}${Math.floor(Math.random()*900+100)}`
  return prisma.order.create({
    data:{
      orderNumber,userId,
      customerName:input.customerName,email:input.email,phone:input.phone,
      address:input.address,city:input.city,notes:input.notes||null,
      subtotal,deliveryFee,total:subtotal+deliveryFee,
      paymentMethod:input.paymentMethod,
      paymentStatus:input.paymentMethod==='COD'?'UNPAID':'PENDING',
      items:{create:lines}
    },
    include:{items:true}
  })
}
