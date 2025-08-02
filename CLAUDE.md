# LuxJewels - Jewellery Store Ecommerce Project

## Project Overview
This is a modern ecommerce website for a jewellery store built with Next.js, TypeScript, and Tailwind CSS. The project uses Prisma ORM with PostgreSQL for data management and includes features for product browsing, shopping cart, user authentication, and payment processing.

## Tech Stack

### Frontend
- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui
- **Forms**: React Hook Form with Zod validation
- **State Management**: React Query (TanStack Query)
- **Icons**: Lucide React

### Backend
- **API**: Next.js API Routes
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: NextAuth.js
- **Password Hashing**: bcryptjs

### Payment & Infrastructure
- **Payment Processing**: Stripe
- **Image Storage**: Cloudinary (configured in schema)
- **Email**: Resend (configured in env)
- **Deployment**: Vercel-ready

## Project Structure

```
jewellery_store/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── api/               # API routes
│   │   │   ├── auth/          # Authentication endpoints
│   │   │   ├── products/      # Product CRUD operations
│   │   │   ├── cart/          # Cart management
│   │   │   ├── orders/        # Order processing
│   │   │   └── users/         # User management
│   │   ├── auth/              # Auth pages
│   │   ├── products/          # Product pages
│   │   ├── cart/              # Shopping cart
│   │   ├── checkout/          # Checkout flow
│   │   ├── admin/             # Admin dashboard
│   │   ├── layout.tsx         # Root layout with header/footer
│   │   ├── page.tsx           # Homepage
│   │   └── globals.css        # Global styles
│   ├── components/            # React components
│   │   ├── ui/               # Shadcn/ui components
│   │   ├── layout/           # Header, Footer components
│   │   ├── products/         # Product-related components
│   │   ├── cart/             # Cart components
│   │   ├── checkout/         # Checkout components
│   │   ├── auth/             # Auth components
│   │   └── admin/            # Admin components
│   ├── lib/                  # Utilities and configurations
│   │   ├── prisma.ts         # Prisma client instance
│   │   └── utils.ts          # Utility functions
│   ├── types/                # TypeScript type definitions
│   ├── hooks/                # Custom React hooks
│   ├── services/             # API service functions
│   ├── utils/                # Helper functions
│   │   └── format.ts         # Formatting utilities
│   └── contexts/             # React contexts
├── prisma/
│   └── schema.prisma         # Database schema
├── public/                   # Static assets
└── Configuration files...
```

## Database Schema

The database includes the following models:
- **User**: Customer and admin accounts with authentication
- **Product**: Product catalog with variants and images
- **Category**: Hierarchical category structure
- **Cart & CartItem**: Shopping cart functionality
- **Order & OrderItem**: Order management
- **Payment**: Payment transactions
- **Address**: Shipping addresses
- **Review**: Product reviews and ratings
- **Wishlist**: User wishlists

## Key Features Implemented

1. **Homepage**: Hero section, category navigation, and feature highlights
2. **Responsive Layout**: Mobile-friendly header with navigation menu
3. **Database Schema**: Complete ecommerce schema with all relationships
4. **Development Setup**: ESLint, Prettier, TypeScript configured
5. **Folder Structure**: Organized for scalability

## Development Commands

```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run database migrations (requires PostgreSQL)
npx prisma migrate dev

# Start development server
npm run dev

# Run linting
npm run lint

# Run type checking
npm run typecheck

# Format code
npm run format

# Check formatting
npm run format:check

# Build for production
npm run build

# Start production server
npm run start
```

## Environment Variables

Create a `.env` file based on `.env.example`:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/jewellery_store"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-a-secret-key"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."

# Email
RESEND_API_KEY="re_..."
EMAIL_FROM="noreply@luxjewels.com"

# Cloudinary
CLOUDINARY_CLOUD_NAME="..."
CLOUDINARY_API_KEY="..."
CLOUDINARY_API_SECRET="..."

# OAuth (optional)
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
```

## Next Steps for Development

### Phase 1: Core Setup
- [ ] Set up PostgreSQL database
- [ ] Run Prisma migrations
- [ ] Configure NextAuth.js
- [ ] Create seed data for development

### Phase 2: Product Management
- [ ] Build product listing page with filters
- [ ] Create product detail pages
- [ ] Implement product search
- [ ] Add image galleries

### Phase 3: Shopping Experience
- [ ] Implement cart functionality
- [ ] Build checkout flow
- [ ] Integrate Stripe payments
- [ ] Add order confirmation

### Phase 4: User Features
- [ ] User registration and login
- [ ] User profile management
- [ ] Order history
- [ ] Wishlist functionality

### Phase 5: Admin Dashboard
- [ ] Product management interface
- [ ] Order management
- [ ] Customer management
- [ ] Analytics dashboard

## API Endpoints Structure

```
/api/auth/[...nextauth]    - NextAuth.js endpoints
/api/products              - GET (list), POST (create)
/api/products/[id]         - GET, PUT, DELETE
/api/cart                  - GET, POST, PUT, DELETE
/api/orders                - GET (list), POST (create)
/api/orders/[id]           - GET order details
/api/users/profile         - GET, PUT user profile
/api/admin/*               - Admin-only endpoints
```

## Component Guidelines

- Use Shadcn/ui components for consistency
- Follow mobile-first responsive design
- Implement proper loading states
- Add error boundaries for robustness
- Use React Query for server state
- Implement optimistic updates for cart

## Security Considerations

- Always hash passwords with bcrypt
- Validate all inputs with Zod
- Use CSRF protection
- Implement rate limiting
- Sanitize user-generated content
- Use environment variables for secrets
- Implement proper authentication checks

## Performance Optimizations

- Use Next.js Image component
- Implement pagination for products
- Add caching strategies
- Optimize database queries
- Use static generation where possible
- Implement lazy loading

## Testing Strategy

- Unit tests for utilities
- Integration tests for API routes
- E2E tests for critical flows
- Component testing with React Testing Library

## Deployment Checklist

- [ ] Set up production database
- [ ] Configure environment variables
- [ ] Set up image storage (Cloudinary)
- [ ] Configure email service (Resend)
- [ ] Set up Stripe webhooks
- [ ] Enable HTTPS
- [ ] Set up monitoring
- [ ] Configure backups