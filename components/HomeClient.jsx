'use client'

import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight, Plus, Minus, X, Trash2, ShoppingBag,
  ChevronLeft, ChevronRight
} from 'lucide-react'

import { useCart } from './CartProvider'
import { money } from '../lib/money'

const demo = [
  {
    id: 'demo1',
    name: 'Crispy Chicken Burger',
    slug: 'crispy-chicken-burger',
    description: 'Golden crispy chicken, fresh lettuce, creamy house sauce.',
    price: 49900,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=85',
    category: { name: 'Burgers' },
    featured: true
  },
  {
    id: 'demo2',
    name: 'Double Smash Burger',
    slug: 'double-smash-burger',
    description: 'Two juicy patties, cheddar cheese and caramelised onion.',
    price: 59900,
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=85',
    category: { name: 'Burgers' }
  },
  {
    id: 'demo3',
    name: 'Classic Margherita',
    slug: 'classic-margherita',
    description: 'Tomato, mozzarella, basil and a crisp stone-baked base.',
    price: 65000,
    image: 'https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=900&q=85',
    category: { name: 'Pizza' }
  },
  {
    id: 'demo4',
    name: 'Royal Chicken Biryani',
    slug: 'royal-chicken-biryani',
    description: 'Fragrant basmati rice, tender chicken and aromatic spices.',
    price: 38000,
    image: 'https://images.unsplash.com/photo-1563379091339-03246963d96c?auto=format&fit=crop&w=900&q=85',
    category: { name: 'Biryani' }
  },
  {
    id: 'demo5',
    name: 'Creamy Alfredo Pasta',
    slug: 'creamy-alfredo-pasta',
    description: 'Silky parmesan sauce, herbs and fresh fettuccine.',
    price: 42000,
    image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=900&q=85',
    category: { name: 'Pasta' }
  },
  {
    id: 'demo6',
    name: 'Chocolate Lava Cake',
    slug: 'chocolate-lava-cake',
    description: 'Warm chocolate centre with a rich cocoa finish.',
    price: 25000,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=85',
    category: { name: 'Desserts' }
  }
]

const cats = [
  ['🍔', 'Burgers'],
  ['🍕', 'Pizza'],
  ['🍛', 'Biryani'],
  ['🍝', 'Pasta'],
  ['🍗', 'Chicken'],
  ['🍰', 'Desserts']
]

function Inner({ initialProducts = [] }) {
  const cart = useCart()
  const [drawer, setDrawer] = useState(false)
  const [filter, setFilter] = useState('All')
  const [slide, setSlide] = useState(0)
  const [mobileMenu, setMobileMenu] = useState(false)
  const [activeNav, setActiveNav] = useState('home')

  const products = useMemo(
    () => initialProducts.length ? initialProducts : demo,
    [initialProducts]
  )

  const featured = products.filter(p => p.featured)
  const slides = featured.length ? featured : demo
  const activeSlide = slides[slide] || slides[0] || demo[0]

  useEffect(() => {
    if (slides.length < 2) return
    const timer = setInterval(() => {
      setSlide(current => (current + 1) % slides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [slides.length])

  useEffect(() => {
    if (slide >= slides.length) setSlide(0)
  }, [slide, slides.length])

  const visible = useMemo(() => {
    return filter === 'All'
      ? products
      : products.filter(
          p => p.category?.name?.toLowerCase() === filter.toLowerCase()
        )
  }, [products, filter])

  function checkout() {
    if (!cart?.items?.length) return
    setDrawer(false)
    window.location.href = '/checkout'
  }

  function navigateTo(id) {
    setActiveNav(id)
    setMobileMenu(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function chooseCategory(name) {
    setFilter(name)
    navigateTo('menu')
  }

  const navItems = [
    ['categories', 'Categories'],
    ['menu', 'Our menu'],
    ['story', 'Our story'],
    ['contact', 'Contact']
  ]

  return (
    <>
      <motion.header
        className="nav"
        initial={{ y: -28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: .65, ease: [0.22, 1, 0.36, 1] }}
      >
        <button className="brand-button" onClick={() => navigateTo('home')} aria-label="TASTEVERSE home">
          <span className="logo">TASTE<span>VERSE</span><small>GOOD FOOD. GREAT MOOD.</small></span>
        </button>

        <nav className={`navlinks ${mobileMenu ? 'navlinks-open' : ''}`} aria-label="Main navigation">
          {navItems.map(([id, label]) => (
            <motion.button
              key={id}
              className={`nav-link ${activeNav === id ? 'nav-link-active' : ''}`}
              onClick={() => navigateTo(id)}
              whileTap={{ scale: .92 }}
              transition={{ type: 'spring', stiffness: 420, damping: 18 }}
            >
              {label}<span className="nav-link-line" />
            </motion.button>
          ))}
        </nav>

        <div className="navright">
          <motion.button className="pill cartpill" onClick={() => setDrawer(true)}
            whileTap={{ scale: .94 }} aria-label={`Open cart with ${cart.count} items`}>
            <ShoppingBag size={16} /> Cart ({cart.count || 0})
          </motion.button>
          <motion.button className="pill nav-order" onClick={() => navigateTo('menu')} whileTap={{ scale: .94 }}>
            Order now <ArrowRight size={15} />
          </motion.button>
          <button className={`hamb ${mobileMenu ? 'hamb-open' : ''}`}
            onClick={() => setMobileMenu(v => !v)} aria-label="Toggle navigation"
            aria-expanded={mobileMenu}>
            <span /><span /><span />
          </button>
        </div>
      </motion.header>

      <main>
        <section className="hero" id="home">
          <div className="hero-copy">
            <div className="kicker">✦ FRESHLY MADE · DELIVERED WITH LOVE</div>

            <h1>
              Your perfect
              <span>burger is</span>
              <em>ready!</em>
            </h1>

            <p>
              Big flavours, fresh ingredients and little moments of happiness.
              Discover your new favourite bite at TASTEVERSE.
            </p>

            <div className="actions">
              <motion.button className="pill" onClick={() => navigateTo('menu')} whileTap={{ scale: .95 }}>
                Order now <ArrowRight size={16} />
              </motion.button>
              <motion.button className="process-link" onClick={() => navigateTo('story')} whileTap={{ scale: .96 }}>
                <span className="play-icon">▶</span> Our story
              </motion.button>
            </div>

            <div className="hero-proof">
              <div className="proof-avatars">
                <span>🍔</span><span>🍟</span><span>🍕</span>
              </div>
              <div>
                <b>Loved by food lovers</b>
                <small>Freshly prepared, every day.</small>
              </div>
            </div>
          </div>

          <div className="hero-art">
            <div className="hero-photo-wrap">
              <img
                className="hero-food-photo"
                src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1500&q=92"
                alt="Fresh gourmet cheeseburger"
              />
            </div>

            <div className="discount-badge">
              <b>25%</b>
              <span>OFF</span>
            </div>

            <div className="float-tag one">✦ Fresh ingredients, always</div>
            <div className="float-tag two">♥ Made with love</div>

            <div className="mini-food-card">
              <img
                src={activeSlide?.image || demo[0].image}
                alt={activeSlide?.name || 'Featured food'}
              />
              <div>
                <small>CHEF'S PICK</small>
                <b>{activeSlide?.name || 'Signature Burger'}</b>
                <span>{money(activeSlide?.price || 49900)}</span>
              </div>
            </div>
          </div>

          <div className="hero-card">
            <div className="card-meta">
              <span>BEST SELLER</span>
              <span>
                {String(slide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide?.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <h2>{activeSlide?.name || 'Signature Burger'}</h2>
                <p>{activeSlide?.description}</p>
                <div className="price">
                  {money(activeSlide?.price || 49900)}
                  <small> / serving</small>
                </div>
              </motion.div>
            </AnimatePresence>

            <button
              className="pill wide"
              onClick={() => cart.add(activeSlide || demo[0])}
            >
              Add to cart <Plus size={16} />
            </button>

            <div className="controls">
              <button
                aria-label="Previous featured product"
                onClick={() => setSlide(s => (s - 1 + slides.length) % slides.length)}
              >
                <ChevronLeft size={17} />
              </button>
              <button
                aria-label="Next featured product"
                onClick={() => setSlide(s => (s + 1) % slides.length)}
              >
                <ChevronRight size={17} />
              </button>
              <span className="control-label">Discover our favourites</span>
            </div>

            <div className="dots">
              {slides.map((p, i) => (
                <button
                  key={p.id}
                  aria-label={`Show featured item ${i + 1}`}
                  onClick={() => setSlide(i)}
                  className={slide === i ? 'active' : ''}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="section categories-section" id="categories">
          <div className="section-head">
            <div>
              <div className="kicker">WHAT ARE YOU CRAVING?</div>
              <h2>Explore categories</h2>
            </div>
            <p>From everyday favourites to little indulgences, there’s something delicious waiting for you.</p>
          </div>

          <div className="categories">
            {cats.map(([emoji, name]) => (
              <button className="cat" key={name} onClick={() => chooseCategory(name)}>
                <span className="emoji">{emoji}</span>
                <b>{name}</b>
                <span className="cat-arrow">↗</span>
              </button>
            ))}
          </div>
        </section>

        <section className="section menu" id="menu">
          <div className="section-head">
            <div>
              <div className="kicker">MADE FRESH, JUST FOR YOU</div>
              <h2>Popular right now</h2>
            </div>
            <p>Good ingredients. Proper cooking. A whole lot of flavour.</p>
          </div>

          <div className="filters">
            {['All', ...cats.map(x => x[1])].map(c => (
              <button
                key={c}
                className={`filter ${filter === c ? 'active' : ''}`}
                onClick={() => setFilter(c)}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="products">
            {visible.map(p => (
              <motion.article className="product" key={p.id}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: .12 }}
                whileHover={{ y: -7 }}
                transition={{ duration: .42, ease: 'easeOut' }}>

                <div className="product-image-wrap">
                  <img src={p.image} alt={p.name} />
                  <span className="product-category">{p.category?.name || 'Signature'}</span>
                </div>
                <div className="product-body">
                  <h3>{p.name}</h3>
                  <p>{p.description}</p>
                  <div className="product-foot">
                    <b>{money(p.price)}</b>
                    <motion.button className="add" onClick={() => cart.add(p)}
                      aria-label={`Add ${p.name}`} whileTap={{ scale: .82, rotate: -12 }}>
                      <Plus size={19} />
                    </motion.button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
          {!visible.length && (
            <div className="no-products">No products found in this category yet.</div>
          )}
        </section>

        <section className="promo">
          <div>
            <div className="kicker promo-kicker">A LITTLE SOMETHING EXTRA</div>
            <h2>Your cravings called.<br />We answered.</h2>
            <p>Make today delicious with your TASTEVERSE favourites.</p>
          </div>
          <motion.button className="pill promo-button" onClick={() => navigateTo('menu')} whileTap={{ scale: .95 }}>
            Find your favourite <ArrowRight size={16} />
          </motion.button>
        </section>

        <section className="section story" id="story">
          <div className="story-image-wrap">
            <img
              className="story-img"
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=85"
              alt="Warm restaurant dining experience"
            />
            <span className="story-image-note">GOOD FOOD, GOOD MOOD</span>
          </div>
          <div className="story-copy">
            <div className="kicker">OUR LITTLE FOOD STORY</div>
            <h2>Good food brings us together.</h2>
            <p>
              At TASTEVERSE, we believe great meals start with fresh ingredients,
              thoughtful preparation and the joy of sharing. Every dish is made
              to turn an ordinary day into a delicious one.
            </p>
            <motion.button className="pill" onClick={() => navigateTo('menu')} whileTap={{ scale: .95 }}>
              Explore our menu <ArrowRight size={16} />
            </motion.button>
          </div>
        </section>

        <section className="section testimonials">
          <div className="section-head">
            <div>
              <div className="kicker">KIND WORDS, FULL HEARTS</div>
              <h2>People love a good bite.</h2>
            </div>
          </div>
          <div className="reviews">
            {[
              ['“The burger was so juicy and fresh. Definitely ordering again!”', 'Nusrat A.'],
              ['“Beautiful flavours, quick service and generous portions.”', 'Rafi M.'],
              ['“The biryani tastes like a proper weekend treat.”', 'Samira K.']
            ].map(([q, n]) => (
              <div className="review" key={n}>
                <div className="stars">★★★★★</div>
                <p>{q}</p>
                <b>{n}</b>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer" id="contact">
        <div className="footer-top">
          <div>
            <div className="logo footer-logo">
              TASTE<span>VERSE</span>
              <small>GOOD FOOD. GREAT MOOD.</small>
            </div>
            <p>Big flavours. Fresh ingredients.<br />Little moments of happiness.</p>
          </div>
          <div className="footer-links">
            <div>
              <b>EXPLORE</b>
              <a href="#menu">Our menu</a>
              <a href="#story">Our story</a>
              <a href="#categories">Categories</a>
            </div>
            <div>
              <b>CONTACT</b>
              <a href="mailto:hello@tasteverse.example">hello@tasteverse.example</a>
              <a href="tel:+8801700000000">+880 1700-000000</a>
              <a href="#contact">Dhaka, Bangladesh</a>
            </div>
          </div>
        </div>
        <div className="copyright">
          <span>© 2026 TASTEVERSE. ALL RIGHTS RESERVED.</span>
          <span>MADE FOR THE LOVE OF FOOD.</span>
        </div>
      </footer>

      <AnimatePresence>
        {drawer && (
          <>
            <motion.div
              className="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawer(false)}
            />
            <motion.aside
              className="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.28 }}
            >
              <div className="drawer-head">
                <div>
                  <div className="kicker">YOUR SELECTION</div>
                  <h2>Your cart ({cart.count})</h2>
                </div>
                <button className="close" onClick={() => setDrawer(false)} aria-label="Close cart">
                  <X />
                </button>
              </div>

              <div className="cart-lines">
                {cart.items.length ? (
                  cart.items.map(x => (
                    <div className="cart-line" key={x.id}>
                      <img src={x.image} alt={x.name} />
                      <div className="cart-line-info">
                        <b>{x.name}</b>
                        <small>{money(x.price)}</small>
                        <div className="qty">
                          <button onClick={() => cart.update(x.id, x.quantity - 1)} aria-label="Decrease quantity">
                            <Minus size={12} />
                          </button>
                          {x.quantity}
                          <button onClick={() => cart.update(x.id, x.quantity + 1)} aria-label="Increase quantity">
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                      <button className="remove-item" onClick={() => cart.remove(x.id)} aria-label={`Remove ${x.name}`}>
                        <Trash2 size={15} />
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="empty">
                    <ShoppingBag size={38} />
                    <h3>Your cart is empty</h3>
                    <p>Add a little happiness to your order.</p>
                  </div>
                )}
              </div>

              {cart.items.length > 0 && (
                <div className="cart-bottom">
                  <div><span>Subtotal</span><span>{money(cart.subtotal)}</span></div>
                  <p>Delivery fee is calculated at checkout.</p>
                  <button className="pill checkout" onClick={checkout}>
                    Checkout <ArrowRight size={16} />
                  </button>
                </div>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default function HomeClient({ initialProducts = [] }) {
  return <Inner initialProducts={initialProducts} />
}
