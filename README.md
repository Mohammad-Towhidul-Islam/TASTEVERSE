# TASTEVERSE Premium — Full-stack restaurant ordering platform

This project has been upgraded to a photo-led, premium restaurant storefront. The hero uses a high-resolution burger photograph (not a 3D model) with restrained floating motion, stronger typography, clearer spacing, and responsive layouts.

## Stack
- Next.js 14 App Router, React 18, JavaScript
- Tailwind CSS, custom responsive CSS, Framer Motion
- PostgreSQL + Prisma ORM
- Customer authentication APIs, cart, checkout, admin order dashboard
- Cash on Delivery and SSLCommerz hosted payment checkout

## Quick start (Windows PowerShell)
1. Install Node.js 20 LTS and PostgreSQL 14+.
2. Extract this ZIP and open the project folder in VS Code.
3. Run:
   ```powershell
   npm install
   Copy-Item .env.example .env
   ```
4. Create a PostgreSQL database named `tasteverse`.
5. Edit `.env` and set a valid database URL and strong secrets.
6. Run:
   ```powershell
   npx prisma generate
   npx prisma db push
   npm run db:seed
   npm run dev
   ```
7. Open `http://localhost:3000`.

## Required environment configuration
- `DATABASE_URL`: PostgreSQL connection string.
- `NEXT_PUBLIC_APP_URL`: local URL during development; public HTTPS URL in production.
- `JWT_SECRET`: long random secret (32+ characters).
- `ADMIN_EMAIL` and `ADMIN_PASSWORD`: set a unique admin login before seeding.
- SSLCommerz credentials: only when online payment is enabled.

Never commit `.env` or publish secrets.

## Admin
Visit `/admin/login`. Use the admin email/password configured in `.env` before running the seed script. Change the password before deployment.

## Payment methods
- Cash on Delivery is available in the application.
- Online payment is integrated through SSLCommerz hosted checkout. Depending on merchant approval and enabled channels, its hosted page can offer cards, bKash, Nagad, Rocket and other supported methods.
- The application must never collect or store card numbers, wallet PINs or OTPs.
- Sandbox/live credentials, merchant approval, public HTTPS callback URLs and end-to-end tests are required. No payment gateway can be activated without your merchant account credentials.

## Important launch note
This is a substantial full-stack foundation, not a claim of certified production readiness. Before accepting public orders and real payments, complete the launch checklist in `LAUNCH-CHECKLIST-BN.md`. In particular, add/verify rate limiting, CSRF/origin protection, customer verification and password recovery, order tracking authorization, stock reservation, delivery zones/fees, payment callback idempotency, privacy/terms pages, monitoring, backups and security testing. Run a full payment sandbox test before switching to live mode.

## Common commands
```powershell
npm run dev
npm run build
npm start
npm run db:studio
npm run db:seed
```
