# TASTEVERSE — Launch checklist (বাংলা)

এই ZIP-এ storefront, cart, checkout, customer auth API, admin order dashboard, PostgreSQL/Prisma এবং COD + SSLCommerz hosted checkout-এর foundation আছে। **এটি এখনই production-certified নয়।** বাস্তব customer/payment নেওয়ার আগে নিচের কাজগুলো সম্পন্ন ও পরীক্ষা করতে হবে।

## ১. Brand ও content
- [ ] নিজের logo, restaurant address, phone, email, opening hours বসান
- [ ] সব menu item-এর সঠিক নাম, description, price, allergen ও HD image দিন
- [ ] Delivery area, minimum order, delivery fee ও estimated time নির্ধারণ করুন
- [ ] Refund, cancellation, privacy ও terms policy লিখুন

## ২. Backend ও database
- [ ] Production PostgreSQL database ও automated backup
- [ ] Prisma migration workflow (production-এ `db push` নয়; reviewed migrations)
- [ ] Product stock/availability এবং sold-out handling
- [ ] Order status history ও customer order tracking
- [ ] Server-side price calculation; client price কখনো বিশ্বাস নয়
- [ ] Delivery zone/fee validation
- [ ] Admin role provisioning ও password rotation

## ৩. Security
- [ ] Login/register/checkout/admin API rate limiting
- [ ] CSRF/origin validation এবং secure cookie configuration
- [ ] Email/phone verification ও password reset
- [ ] Input validation, output escaping, abuse/bot protection
- [ ] Admin audit log, least-privilege access
- [ ] Secrets শুধুমাত্র hosting environment variables-এ
- [ ] Dependency audit, security review ও penetration test

## ৪. Payment
- [ ] SSLCommerz merchant account approval
- [ ] Sandbox credentials দিয়ে success/fail/cancel/IPN test
- [ ] Callback signature/validation এবং replay/idempotency protection
- [ ] Payment amount/order currency server-side যাচাই
- [ ] Refund ও reconciliation process
- [ ] HTTPS ও production callback URL
- [ ] Live credentials দিয়ে ছোট অঙ্কের controlled test

SSLCommerz account-এ যে payment channel অনুমোদিত থাকবে, hosted checkout-এ সেটিই দেখা যাবে। bKash/Nagad/Rocket/card সক্রিয় হবে merchant account configuration অনুযায়ী। COD আলাদা payment method হিসেবে থাকবে।

## ৫. Operations
- [ ] Order notification (email/SMS/WhatsApp provider integration)
- [ ] Kitchen/restaurant order preparation workflow
- [ ] Delivery assignment ও delivery status workflow
- [ ] Customer support contact এবং complaint handling
- [ ] Analytics, error monitoring, uptime monitoring
- [ ] Database backup restore drill

## ৬. Deployment
- [ ] Domain ও DNS
- [ ] HTTPS certificate
- [ ] Managed PostgreSQL
- [ ] Hosting environment variables
- [ ] Production build এবং smoke tests
- [ ] Database migrations deploy
- [ ] Image optimization/CDN
- [ ] Legal policy pages ও business details

## ৭. Local run (PowerShell)
```powershell
npm install
Copy-Item .env.example .env
# .env ফাইলে DATABASE_URL, JWT_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD সেট করুন
npx prisma generate
npx prisma db push
npm run db:seed
npm run dev
```

## গুরুত্বপূর্ণ
এই starter-এ সব দেশের সব payment provider স্বয়ংক্রিয়ভাবে চালু হয় না। বাংলাদেশে payment চালু করতে merchant onboarding/approval এবং provider credentials লাগবে। Live launch-এর আগে developer/security review এবং বাস্তব device/browser/payment test বাধ্যতামূলক।
