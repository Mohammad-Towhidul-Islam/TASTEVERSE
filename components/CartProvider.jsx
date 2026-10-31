'use client'
import { createContext,useContext,useEffect,useMemo,useState } from 'react'
const CartContext=createContext(null)
export function CartProvider({children}){
 const [items,setItems]=useState([])
 const [ready,setReady]=useState(false)
 useEffect(()=>{try{setItems(JSON.parse(localStorage.getItem('tv_cart')||'[]'))}catch{}setReady(true)},[])
 useEffect(()=>{if(ready)localStorage.setItem('tv_cart',JSON.stringify(items))},[items,ready])
 const add=(p)=>setItems(old=>{const f=old.find(x=>x.id===p.id);return f?old.map(x=>x.id===p.id?{...x,quantity:x.quantity+1}:x):[...old,{...p,quantity:1}]})
 const update=(id,n)=>setItems(old=>old.map(x=>x.id===id?{...x,quantity:n}:x).filter(x=>x.quantity>0))
 const value=useMemo(()=>({items,add,update,remove:id=>setItems(x=>x.filter(p=>p.id!==id)),clear:()=>setItems([]),count:items.reduce((s,x)=>s+x.quantity,0),subtotal:items.reduce((s,x)=>s+x.price*x.quantity,0)}),[items])
 return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
export const useCart=()=>useContext(CartContext)