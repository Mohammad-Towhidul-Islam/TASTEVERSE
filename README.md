# 🍔 TASTEVERSE — TasteVerse Premium

### Good Food. Great Mood.

TasteVerse is a modern full-stack restaurant and food ordering web application designed to provide customers with a premium online dining experience. Explore delicious food, browse categories, add favorite items to your cart, and place orders through a smooth and responsive interface.

🌐 **Live Demo:** [TasteVerse Premium](https://tasteverse29.vercel.app/)  
📦 **Repository:** [Mohammad-Towhidul-Islam/TASTEVERSE](https://github.com/Mohammad-Towhidul-Islam/TASTEVERSE)

---

## 🌐 Project Overview

TasteVerse is a Next.js-based restaurant ordering platform that brings a modern digital dining experience to customers.

The application showcases a photo-led restaurant storefront with high-resolution food photography, interactive product cards, smooth animations, and responsive layouts.

Customers can explore food categories such as burgers, pizza, biryani, pasta, chicken, and desserts. They can add products to their shopping cart, manage quantities, and proceed to checkout.

The platform also provides customer authentication APIs, database-backed order management, an admin order dashboard, Cash on Delivery, and SSLCommerz hosted payment integration.

---

## 🛠️ Technologies Used

### Frontend

- ⚛️ **Next.js 14** — App Router and full-stack web framework
- ⚛️ **React 18** — Component-based user interface
- 🟨 **JavaScript** — Application logic
- 🎨 **Tailwind CSS** — Utility-first styling
- 💎 **Custom CSS** — Responsive layouts and premium visual design
- 🎬 **Framer Motion** — Smooth animations and transitions
- 🔤 **Lucide React** — Modern icon library

### Backend & Database

- 🔷 **Next.js API Routes** — Backend API functionality
- 🐘 **PostgreSQL** — Relational database
- 🔺 **Prisma ORM** — Database access and management
- ☁️ **Neon** — Hosted PostgreSQL database

### Payment & Deployment

- 💳 **SSLCommerz** — Hosted online payment checkout
- 💵 **Cash on Delivery** — Offline payment option
- ▲ **Vercel** — Application deployment
- 🐙 **Git & GitHub** — Version control and source code hosting

---

## ✨ Features

### 1. 🏠 Premium Restaurant Homepage

The homepage provides an attractive introduction to the restaurant with a modern, food-focused design.

- High-resolution burger photography in the hero section.
- Premium typography and visual hierarchy.
- Floating food cards and animated elements.
- Featured food and best-seller sections.
- Smooth navigation between website sections.
- Responsive layouts for mobile, tablet, and desktop.

### 2. 🍕 Food Categories and Menu Browsing

Customers can explore different food items through organized categories.

- Browse products by category.
- Explore burgers, pizza, biryani, pasta, chicken, and desserts.
- Display product images and descriptions.
- Show product prices.
- Filter products by category.
- Interactive product cards with add-to-cart buttons.

### 3. 🛒 Shopping Cart Management

The shopping cart provides customers with an easy way to manage their selected food items.

- Add products to the cart.
- Increase or decrease product quantities.
- Remove individual products.
- View selected products and their prices.
- Calculate the cart subtotal automatically.
- Display cart contents in an animated side drawer.
- Navigate directly to checkout.

### 4. 👤 Customer Authentication

TasteVerse includes customer authentication APIs and an account-based ordering foundation.

- Customer authentication functionality.
- Account-related API support.
- Authentication-based application workflows.

### 5. 📦 Checkout and Order Management

The platform provides a checkout workflow for submitting customer orders.

- Dedicated checkout page.
- Customer order information.
- Database-backed order records.
- Order item management.
- Admin order dashboard.
- Order-related database models.

### 6. 💳 Payment Integration

TasteVerse supports Cash on Delivery and SSLCommerz hosted checkout.

**Cash on Delivery (COD)**

- Customers can choose to pay upon delivery.
- Supports the application's COD checkout workflow.

**SSLCommerz Hosted Checkout**

- Online payment gateway integration.
- Hosted payment checkout.
- Sandbox configuration for testing.
- Available payment channels depend on merchant approval and gateway configuration.

### 7. ⚙️ Admin Dashboard

The application includes an admin area for restaurant order management.

- Dedicated admin login page.
- Admin authentication configuration.
- Order management interface.
- Database-backed order information.

### 8. 🎨 Responsive Design and User Experience

The interface is designed to deliver a smooth experience across different screen sizes.

- Mobile-friendly layouts.
- Responsive navigation.
- Animated product cards.
- Smooth page interactions.
- Modern food photography.
- Interactive buttons and icons.
- Clean and premium visual presentation.

---

## 🗄️ Database Architecture

TasteVerse uses PostgreSQL with Prisma ORM.

The database includes five core models:

| Model | Description |
|---|---|
| `User` | Customer and admin user information |
| `Category` | Food category information |
| `Product` | Food product details and pricing |
| `Order` | Customer order information |
| `OrderItem` | Individual products included in orders |

The database also uses enums to manage roles, order status, payment status, payment methods, and product status.

---

## ⚙️ Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) 20 LTS
- npm
- [PostgreSQL](https://www.postgresql.org/) 14 or later, or a Neon account
- [Git](https://git-scm.com/)
- Visual Studio Code (recommended)

### 1. Clone the Repository

```powershell
git clone https://github.com/Mohammad-Towhidul-Islam/TASTEVERSE.git
cd TASTEVERSE
```

### 2. Install Dependencies

```powershell
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root and configure the following variables:

```env
# Database
DATABASE_URL="your_postgresql_connection_string"

# Application
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Authentication
JWT_SECRET="your_long_random_secret"

# Admin Configuration
ADMIN_EMAIL="your_admin_email"
ADMIN_PASSWORD="your_strong_admin_password"

# SSLCommerz Payment Gateway
SSLCOMMERZ_STORE_ID="your_store_id"
SSLCOMMERZ_STORE_PASSWORD="your_store_password"
SSLCOMMERZ_IS_LIVE="false"
```

**Important:**

- Use a valid PostgreSQL or Neon database connection string.
- Generate a long, random JWT secret.
- Set a unique admin email and strong password.
- Add valid SSLCommerz merchant credentials when enabling online payment.
- Keep SSLCommerz in sandbox mode during development.
- Never commit `.env` or publish database and payment credentials.

### 4. Generate Prisma Client

```powershell
npx prisma generate
```

### 5. Database Setup

For a new local development database, create a PostgreSQL database named `tasteverse`.

```sql
CREATE DATABASE tasteverse;
```

For a fresh database schema setup, the project supports:

```powershell
npx prisma db push
```

If you are using an existing database with restored data, make sure its schema is already in place before running database setup commands.

### 6. Seed the Database

```powershell
npm run db:seed
```

Run this command when the project's seed script is configured and the database is ready.

### 7. Start the Development Server

```powershell
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 Admin Dashboard

Access the admin login page:

```text
/admin/login
```

Use the admin email and password configured in your `.env` file.

**Security recommendations:**

- Use a unique admin password.
- Avoid default or demo credentials in production.
- Keep authentication secrets private.
- Verify admin access controls before public launch.

---

## 💳 Payment Methods

TasteVerse provides two payment options.

### Cash on Delivery

Customers can place orders and pay when their food is delivered.

### SSLCommerz Hosted Checkout

Online payments are integrated through SSLCommerz hosted checkout.

Depending on merchant approval and enabled payment channels, the hosted page may offer:

- Bank cards
- bKash
- Nagad
- Rocket
- Other supported payment methods

**Payment Security**

- Use sandbox credentials during development.
- Configure public HTTPS callback URLs.
- Complete end-to-end sandbox payment testing.
- Obtain merchant approval before activating live payments.
- Never collect or store card numbers, wallet PINs, or OTPs.

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm install` | Install project dependencies |
| `npm run dev` | Start development server |
| `npm run build` | Build the application for production |
| `npm start` | Start production server |
| `npm run db:studio` | Open Prisma Studio |
| `npm run db:seed` | Seed the database |
| `npx prisma generate` | Generate Prisma Client |
| `npx prisma db push` | Push database schema |

---

## 🚀 Deployment

TasteVerse is deployed using **Vercel** with **Neon PostgreSQL**.

### Live Application

🌐 **[https://tasteverse29.vercel.app/](https://tasteverse29.vercel.app/)**

### Deployment Steps

1. Push the project code to GitHub.
2. Import the repository into Vercel.
3. Configure the required environment variables.
4. Connect the Neon PostgreSQL database.
5. Configure the public application URL.
6. Deploy the application.
7. Test the homepage, food menu, cart, checkout, database operations, and admin functionality.

After pushing new changes to the connected GitHub branch, Vercel can automatically create a new deployment.

---

## 🔒 Important Launch Notes

TasteVerse is a substantial full-stack foundation, not a claim of certified production readiness.

Before accepting public orders and real payments, complete the following security and operational checks:

- [ ] Add and verify rate limiting.
- [ ] Implement CSRF and origin protection.
- [ ] Verify customer authentication and password recovery.
- [ ] Verify order tracking authorization.
- [ ] Implement stock reservation.
- [ ] Configure delivery zones and delivery fees.
- [ ] Verify payment callback idempotency.
- [ ] Add privacy policy and terms pages.
- [ ] Configure application monitoring.
- [ ] Set up database backups.
- [ ] Perform security testing.
- [ ] Complete SSLCommerz sandbox payment testing.

For additional guidance, see `LAUNCH-CHECKLIST-BN.md`.

---

## 📌 Future Improvements

Potential enhancements for future versions include:

- 🔎 Advanced food search and filtering.
- ⭐ Customer reviews and ratings.
- ❤️ Wishlist functionality.
- 🎟️ Discount coupons and promotional offers.
- 📍 Real-time order tracking.
- 📊 Enhanced admin analytics.
- 📱 Improved mobile ordering experience.
- 💳 Additional payment integrations.
- 📦 Advanced inventory management.

---

## 👨‍💻 Author

**MD. Towhidul Islam**

- GitHub: [@Mohammad-Towhidul-Islam](https://github.com/Mohammad-Towhidul-Islam)
- Repository: [TASTEVERSE](https://github.com/Mohammad-Towhidul-Islam/TASTEVERSE)
- Live Website: [TasteVerse Premium](https://tasteverse29.vercel.app/)

---

<p align="center">
  Made with ❤️ and passion for great food.
</p>

<h3 align="center">🍔 TASTEVERSE PREMIUM</h3>

<p align="center">
  <strong>GOOD FOOD. GREAT MOOD.</strong>
</p>

<p align="center">
  <a href="https://tasteverse29.vercel.app/">🌐 Live Website</a> •
  <a href="https://github.com/Mohammad-Towhidul-Islam/TASTEVERSE">📦 GitHub Repository</a>
</p>
