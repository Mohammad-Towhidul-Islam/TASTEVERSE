import Link from 'next/link'
import { ShoppingBag, Menu } from 'lucide-react'
export default function Nav({count=0,onCart}){
 return <header className="nav"><Link href="/" className="logo">TASTE<span>VERSE</span><small>GOOD FOOD. GREAT MOOD.</small></Link><nav className="navlinks"><a href="/#categories">Categories</a><a href="/#menu">Our menu</a><a href="/#story">Our story</a><a href="/#contact">Contact</a></nav><div className="navright"><button className="pill cartpill" onClick={onCart}><ShoppingBag size={15}/> Cart ({count})</button><Link className="pill" href="/#menu">Order now</Link><button className="hamb" aria-label="Menu"><Menu/></button></div></header>
}