const {PrismaClient}=require('@prisma/client')
const bcrypt=require('bcryptjs')
const prisma=new PrismaClient()
const cats=[['Burgers','burgers'],['Pizza','pizza'],['Biryani','biryani'],['Pasta','pasta'],['Desserts','desserts'],['Chicken','chicken']]
const foods=[
['Crispy Chicken Burger','crispy-chicken-burger','Golden crispy chicken, lettuce and creamy house sauce.',49900,'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=85','burgers',true],
['Classic Margherita','classic-margherita','Tomato, mozzarella, basil and stone-baked crust.',65000,'https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=900&q=85','pizza',true],
['Royal Chicken Biryani','royal-chicken-biryani','Fragrant basmati rice, tender chicken and aromatic spices.',38000,'https://images.unsplash.com/photo-1563379091339-03246963d96c?auto=format&fit=crop&w=900&q=85','biryani',true],
['Creamy Alfredo Pasta','creamy-alfredo-pasta','Silky parmesan sauce, herbs and fresh fettuccine.',42000,'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=900&q=85','pasta',false],
['Chocolate Lava Cake','chocolate-lava-cake','Warm chocolate centre with rich cocoa finish.',25000,'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=85','desserts',false],
['Golden Fried Chicken','golden-fried-chicken','Crispy seasoned chicken, cooked fresh to order.',45000,'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=900&q=85','chicken',false]
]
async function main(){
 for(const [name,slug] of cats)await prisma.category.upsert({where:{slug},update:{name},create:{name,slug}})
 for(const [name,slug,description,price,image,cat,featured] of foods){const c=await prisma.category.findUnique({where:{slug:cat}});await prisma.product.upsert({where:{slug},update:{name,description,price,image,featured,categoryId:c.id},create:{name,slug,description,price,image,featured,categoryId:c.id}})}
 const email=(process.env.ADMIN_EMAIL||'admin@tasteverse.local').toLowerCase()
 const password=process.env.ADMIN_PASSWORD||'ChangeThisAdminPassword123!'
 await prisma.user.upsert({where:{email},update:{},create:{name:'TASTEVERSE Admin',email,passwordHash:await bcrypt.hash(password,12),role:'ADMIN'}})
 console.log('Seed complete. Admin:',email)
}
main().catch(e=>{console.error(e);process.exit(1)}).finally(()=>prisma.$disconnect())