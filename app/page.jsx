import { prisma } from '../lib/prisma'
import HomeClient from '../components/HomeClient'

export const dynamic = 'force-dynamic'
export default async function HomePage() {
  let products = []
  try {
    products = await prisma.product.findMany({
      where:{status:'ACTIVE'}, include:{category:true},
      orderBy:[{featured:'desc'},{createdAt:'desc'}]
    })
  } catch {}
  const safeProducts = products.map(p=>({...p,price:Number(p.price)}))
  return <HomeClient initialProducts={safeProducts}/>
}