# TASTEVERSE PRO — বাংলা সেটআপ

## ১) যা লাগবে
- Node.js 20 LTS
- PostgreSQL
- VS Code
- অনলাইন পেমেন্টের জন্য SSLCommerz merchant account ও sandbox/live credentials

## ২) Install
ZIP extract করে VS Code terminal-এ:
```powershell
npm install
Copy-Item .env.example .env
```
`.env` ফাইলে PostgreSQL password, JWT_SECRET এবং admin password পরিবর্তন করো।

## ৩) PostgreSQL database
pgAdmin-এ `tasteverse` নামে database তৈরি করো। `.env`-এর DATABASE_URL-এ নিজের PostgreSQL username/password বসাও।

## ৪) Prisma ও sample data
```powershell
npx prisma generate
npx prisma db push
npm run db:seed
```

## ৫) চালাও
```powershell
npm run dev
```
Browser: http://localhost:3000

Admin: http://localhost:3000/admin/login

Admin email/password `.env`-এর ADMIN_EMAIL ও ADMIN_PASSWORD। Seed চালানোর আগে default password অবশ্যই পরিবর্তন করো।

## ৬) Payment
Cash on Delivery সরাসরি কাজ করবে।
SSLCommerz online checkout চালাতে merchant dashboard থেকে sandbox store id/password নিয়ে `.env`-এ বসাও:
- SSLCOMMERZ_STORE_ID
- SSLCOMMERZ_STORE_PASSWORD
- SSLCOMMERZ_IS_LIVE=false
- NEXT_PUBLIC_APP_URL

SSLCommerz merchant account-এ যেসব payment channel enable আছে (কার্ড, bKash, Nagad, Rocket ইত্যাদি), hosted checkout-এ সেগুলো দেখা যাবে। সব channel প্রতিটি merchant account-এ স্বয়ংক্রিয়ভাবে থাকে না। Live payment চালুর আগে merchant approval ও HTTPS domain প্রয়োজন।

Localhost callback পরীক্ষা করতে public HTTPS tunnel (যেমন ngrok) লাগতে পারে। Live credentials ছাড়া live payment চালু হবে না। কখনো নিজের website-এ card number, PIN, OTP বা wallet password সংগ্রহ করবে না।

## ৭) Build
```powershell
npm run build
npm start
```

**নোট:** এই ZIP-এ পূর্ণাঙ্গ project starter আছে; real merchant account, domain, SSLCommerz credentials, delivery operations এবং production security setup তোমাকেই configure করতে হবে।
