'use client'
import {useState} from 'react'
import Link from 'next/link'
import {useCart} from './CartProvider'
import {money} from '../lib/money'
export default function CheckoutClient(){
 const cart=useCart(),[form,setForm]=useState({customerName:'',email:'',phone:'',address:'',city:'Dhaka',notes:'',paymentMethod:'COD'}),[error,setError]=useState(''),[loading,setLoading]=useState(false)
 const change=e=>setForm({...form,[e.target.name]:e.target.value})
 async function submit(e){e.preventDefault();setError('');setLoading(true);try{
  const res=await fetch('/api/orders',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...form,items:cart.items.map(x=>({productId:x.id,quantity:x.quantity}))})})
  const data=await res.json();if(!res.ok)throw new Error(data.error||'Could not place order')
  if(data.paymentUrl){window.location.href=data.paymentUrl;return}
  cart.clear();window.location.href=`/order-success?order=${encodeURIComponent(data.order.orderNumber)}`
 }catch(err){setError(err.message)}finally{setLoading(false)}}
 return <main className="form-page"><div className="form-card"><Link href="/" className="kicker">← BACK TO TASTEVERSE</Link><h1 className="text-3xl font-black mt-3">Complete your order</h1><p className="text-sm text-stone-500 mt-2 mb-6">Tell us where to deliver your favourites.</p>
 {cart.items.length===0?<p>Your cart is empty. <Link className="text-orange underline" href="/#menu">Explore menu</Link></p>:<><form onSubmit={submit}><div className="form-grid">{[['customerName','Full name','text'],['email','Email address','email'],['phone','Phone number','tel'],['city','City','text']].map(([name,label,type])=><div className="field" key={name}><label>{label}</label><input required name={name} type={type} value={form[name]} onChange={change}/></div>)}<div className="field full"><label>Delivery address</label><textarea required name="address" rows="3" value={form.address} onChange={change}/></div><div className="field full"><label>Order notes (optional)</label><textarea name="notes" rows="2" value={form.notes} onChange={change}/></div><div className="field full"><label>Payment method</label><select name="paymentMethod" value={form.paymentMethod} onChange={change}><option value="COD">Cash on Delivery</option><option value="SSLCOMMERZ">Online payment (Cards, bKash, Nagad, Rocket where enabled)</option></select></div></div><div className="border-t mt-6 pt-5 flex justify-between font-bold"><span>Subtotal</span><span>{money(cart.subtotal)}</span></div><p className="text-xs text-stone-500 mt-2">Delivery charge: ৳60 (free on orders ৳3,000 or more).</p>{error&&<p className="text-red-600 text-sm mt-4">{error}</p>}<button disabled={loading} className="pill wide mt-5">{loading?'Processing…':form.paymentMethod==='COD'?'Place order':'Continue to secure payment'}</button></form></>}</div></main>
}