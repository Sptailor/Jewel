# LuxJewels - Luxury Jewellery Ecommerce Platform

A modern, full-stack ecommerce platform for a luxury jewellery store built with Next.js 15, TypeScript, and PostgreSQL. Features include user authentication, product management, shopping cart, Stripe payment integration, and a comprehensive admin dashboard.

![Next.js](https://img.shields.io/badge/Next.js-15.4-black?style=flat&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-6.13-2D3748?style=flat&logo=prisma)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=flat&logo=tailwind-css)

## Features

### Customer Features
- **Product Browsing** - Browse products by category with filtering and sorting
- **Product Details** - Detailed product pages with image galleries and reviews
- **Shopping Cart** - Real-time cart management with persistent storage
- **User Authentication** - Secure login/register with NextAuth.js (credentials + Google OAuth)
- **Checkout** - Stripe integration for secure payment processing
- **Order Management** - View order history and track order status
- **Responsive Design** - Mobile-first design with Tailwind CSS

### Admin Features
- **Dashboard** - Analytics overview with sales metrics
- **Product Management** - Create, edit, and delete products with variants
- **Order Management** - Process orders and update order status
- **Customer Management** - View and manage customer accounts
- **Inventory Tracking** - Real-time stock management

## Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Shadcn/ui with Radix UI
- **State Management**: React Query (TanStack Query)
- **Forms**: React Hook Form with Zod validation

### Backend
- **API**: Next.js API Routes (Server Actions)
- **Database**: PostgreSQL (Neon)
- **ORM**: Prisma
- **Authentication**: NextAuth.js v5
- **Password Hashing**: bcryptjs

### Payment & Services
- **Payment Processing**: Stripe
- **Deployment**: Vercel

## Project Architecture

```
jewels/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   ├── admin/             # Admin dashboard
│   │   ├── products/          # Product pages
│   │   ├── cart/              # Shopping cart
│   │   ├── checkout/          # Checkout flow
│   │   └── auth/              # Auth pages
│   ├── components/            # React components
│   ├── contexts/             # React contexts
│   ├── lib/                  # Utilities & config
│   └── hooks/                # Custom React hooks
├── prisma/
│   └── schema.prisma         # Database schema
└── public/                   # Static assets
```

## Key Highlights

### Database Schema
Comprehensive data model with User, Product, Category, Cart, Order, Review, and ShippingAddress entities with proper relationships and constraints.

### Authentication & Security
- NextAuth.js v5 with multiple authentication providers
- Role-based access control (USER/ADMIN)
- Secure password hashing with bcrypt
- JWT session management

### Payment Processing
- Stripe Checkout integration
- Webhook handling for payment events
- Automatic order creation and inventory updates

### Design & UX
- Mobile-first responsive design
- Accessible UI components
- Smooth animations and transitions
- Optimized images with Next.js Image

## License

This project is licensed under the MIT License.

## Contact

### Suhail Tailor

Email: [suheil.tailor@gmail.com](mailto:suheil.tailor@gmail.com)

GitHub: [@sptailor](https://github.com/sptailor)

Live Demo: [https://jewel-iy17.vercel.app](https://jewel-iy17.vercel.app)

---

Built with Next.js and TypeScript
