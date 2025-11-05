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
- **Icons**: Lucide React

### Backend
- **API**: Next.js API Routes (Server Actions)
- **Database**: PostgreSQL (Supabase/Neon)
- **ORM**: Prisma
- **Authentication**: NextAuth.js v5
- **Password Hashing**: bcryptjs

### Payment & Services
- **Payment Processing**: Stripe
- **Image Storage**: Cloudinary
- **Email**: Resend (configured)
- **Deployment**: Vercel

## Project Structure

```
jewels/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   │   ├── auth/          # Authentication endpoints
│   │   │   ├── products/      # Product CRUD
│   │   │   ├── orders/        # Order management
│   │   │   ├── checkout/      # Stripe checkout
│   │   │   └── webhooks/      # Stripe webhooks
│   │   ├── admin/             # Admin dashboard
│   │   ├── products/          # Product pages
│   │   ├── cart/              # Shopping cart
│   │   ├── checkout/          # Checkout flow
│   │   └── auth/              # Auth pages
│   ├── components/            # React components
│   │   ├── ui/               # Shadcn components
│   │   ├── layout/           # Layout components
│   │   ├── products/         # Product components
│   │   ├── cart/             # Cart components
│   │   └── admin/            # Admin components
│   ├── contexts/             # React contexts
│   ├── lib/                  # Utilities & config
│   ├── hooks/                # Custom React hooks
│   └── types/                # TypeScript types
├── prisma/
│   └── schema.prisma         # Database schema
└── public/                   # Static assets
```

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database (Supabase/Neon recommended)
- Stripe account
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/luxjewels.git
cd luxjewels
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@host:5432/dbname"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."

# Optional: Google OAuth
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"

# Optional: Email (Resend)
RESEND_API_KEY="re_..."
EMAIL_FROM="noreply@yourstore.com"

# Optional: Cloudinary
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
```

4. **Generate Prisma Client**
```bash
npx prisma generate
```

5. **Run database migrations**
```bash
npx prisma db push
```

6. **Seed the database (optional)**
```bash
npm run db:seed
```

7. **Start the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your app.

## Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run typecheck    # TypeScript type checking
npm run format       # Format code with Prettier

# Database
npm run db:push      # Push schema to database
npm run db:migrate   # Create migration
npm run db:seed      # Seed database
npm run db:studio    # Open Prisma Studio
```

## Database Schema

Key models:
- **User** - Customer accounts and admin users
- **Product** - Product catalog with variants
- **Category** - Product categories
- **Cart & CartItem** - Shopping cart
- **Order & OrderItem** - Order management
- **Review** - Product reviews
- **ShippingAddress** - Delivery addresses

## Authentication

- Credentials-based authentication (email/password)
- Google OAuth (optional)
- Role-based access control (USER/ADMIN)
- Secure password hashing with bcrypt
- JWT session management with NextAuth.js

## Payment Integration

- Stripe Checkout for secure payments
- Webhook handling for payment events
- Order creation on successful payment
- Automatic inventory updates

## Design Features

- Mobile-first responsive design
- Dark/light mode ready
- Accessible UI components
- Smooth animations and transitions
- Optimized images with Next.js Image

## Deployment

### Deploy to Vercel

1. **Push to GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Connect to Vercel**
- Import your repository on [Vercel](https://vercel.com)
- Configure environment variables in Project Settings
- Deploy!

3. **Required Environment Variables on Vercel**
- `DATABASE_URL`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL` (your Vercel URL)
- `NEXT_PUBLIC_APP_URL` (your Vercel URL)
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

4. **Set up Stripe Webhook**
- Create webhook endpoint in Stripe Dashboard
- Point to: `https://your-app.vercel.app/api/webhooks/stripe`
- Add webhook secret to environment variables

## Configuration

### Stripe Setup
1. Get API keys from [Stripe Dashboard](https://dashboard.stripe.com)
2. Set up products in Stripe (optional)
3. Configure webhook endpoint for production

### Database Setup
1. Create PostgreSQL database (Supabase/Neon recommended)
2. Copy connection string to `.env`
3. Run migrations with Prisma

## License

This project is licensed under the MIT License.

## Contact

### Suhail Tailor

Email: [suheil.tailor@gmail.com](mailto:suheil.tailor@gmail.com)

GitHub: [@sptailor](https://github.com/sptailor)

Live Demo: [https://jewel-iy17.vercel.app](https://jewel-iy17.vercel.app)

---

Built with Next.js and TypeScript
