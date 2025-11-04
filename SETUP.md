# Vetra MVP Setup Guide

## Quick Start

### 1. Clone & Install

```bash
git clone <repository>
cd vetra
npm install
```

### 2. Database Setup

#### Option A: Local MySQL (Development)

```bash
# Install MySQL locally or use Docker
docker run --name vetra-mysql -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=vetra -p 3306:3306 -d mysql:8

# Update .env.local
DATABASE_URL="mysql://root:root@localhost:3306/vetra"

# Push schema
npm run db:push

# Seed demo data
npm run db:seed
```

#### Option B: PlanetScale (Production)

1. Create account at https://planetscale.com
2. Create a new database
3. Get connection string from "Connect" button
4. Update `DATABASE_URL` in `.env.local`
5. Run `npm run db:push`

### 3. Environment Variables

Copy `.env.example` to `.env.local` and fill in:

```bash
cp .env.example .env.local
```

#### Required Variables

**NextAuth**
- `NEXTAUTH_URL`: http://localhost:3000 (dev) or your domain (prod)
- `NEXTAUTH_SECRET`: Generate with `openssl rand -base64 32`

**OAuth Providers**
- `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET`: From Google Cloud Console
- `GITHUB_CLIENT_ID` & `GITHUB_CLIENT_SECRET`: From GitHub Settings

**Email**
- `EMAIL_FROM`: noreply@yourdomain.com
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`: Email service credentials

**hCaptcha**
- `NEXT_PUBLIC_HCAPTCHA_SITE_KEY`: From hCaptcha dashboard
- `HCAPTCHA_SECRET_KEY`: From hCaptcha dashboard

**Stripe**
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: From Stripe dashboard
- `STRIPE_SECRET_KEY`: From Stripe dashboard
- `STRIPE_WEBHOOK_SECRET`: From Stripe webhooks

**Optional**
- `UPSTASH_REDIS_REST_URL` & `UPSTASH_REDIS_REST_TOKEN`: For rate limiting

### 4. Run Development Server

```bash
npm run dev
```

Visit http://localhost:3000

## Project Structure

```
vetra/
├── src/
│   ├── app/                 # Next.js app directory
│   │   ├── api/            # API routes (tRPC, auth, webhooks)
│   │   ├── dashboard/      # Dashboard page
│   │   ├── explore/        # Community feed
│   │   ├── projects/       # Project management
│   │   ├── billing/        # Billing & credits
│   │   ├── settings/       # User settings
│   │   ├── admin/          # Admin panel (vetting, metrics)
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Landing page
│   ├── components/
│   │   └── ui/            # Reusable UI components
│   ├── lib/
│   │   ├── auth.ts        # NextAuth configuration
│   │   ├── prisma.ts      # Prisma client
│   │   ├── trpc.tsx       # tRPC React provider
│   │   └── utils.ts       # Utility functions
│   ├── server/
│   │   ├── trpc.ts        # tRPC initialization
│   │   └── routers.ts     # tRPC procedures
│   └── styles/
│       └── globals.css    # Global styles
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.ts            # Seed data script
├── .env.example           # Environment variables template
├── next.config.js         # Next.js configuration
├── tailwind.config.ts     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies
```

## Key Features

### Authentication
- NextAuth.js with Google, GitHub, and Email providers
- Protected routes and procedures
- Session management

### Vetting System
- User applications with evidence links
- Admin review and approval
- Trust score calculation
- Automatic user verification

### Projects
- Create and manage projects
- Add team members
- Public/Members/Private visibility
- Skills and role management
- Project threads for team communication

### Community Feed
- Create posts and comments
- Tag-based filtering
- User interactions (likes, shares)

### Messaging
- Real-time 1:1 messaging (with Pusher/Ably)
- Project-based threads
- Message history

### Billing
- Credit pack purchases via Stripe
- Project invoices
- Transaction tracking
- Platform fee calculation (5% by default)

### Admin Panel
- Vetting application review
- User metrics and analytics
- Audit logging

## Database Schema

### Core Tables
- `User`: User accounts with vetting status and trust score
- `Account`: OAuth provider accounts
- `Session`: Session tokens
- `VerificationToken`: Email verification tokens

### Vetting & Reputation
- `VettingApplication`: User vetting applications
- `Credential`: User credentials and certifications
- `UserSkill`: User skills with expertise levels
- `Skill`: Skill definitions
- `Endorsement`: Skill endorsements between users

### Projects & Collaboration
- `Project`: Project definitions
- `ProjectMember`: Project team members
- `ProjectSkill`: Required skills for projects
- `Thread`: Project discussion threads
- `Message`: Thread messages

### Community
- `Post`: Community posts
- `Comment`: Post comments

### Billing
- `Invoice`: Project invoices
- `Transaction`: Payment transactions
- `User.credits`: User credit balance

### Audit
- `AuditLog`: Audit trail for admin actions

## API Routes

### tRPC Routers

**auth**
- `me`: Get current user
- `logout`: Sign out

**profile**
- `getProfile`: Get user profile by handle
- `updateProfile`: Update profile
- `addSkill`: Add skill to profile

**vetting**
- `submitApplication`: Submit vetting application
- `getApplications`: Get pending applications (admin)
- `reviewApplication`: Review and approve/reject application

**projects**
- `list`: List projects with filters
- `create`: Create new project
- `getDetails`: Get project details
- `joinProject`: Join a project

**posts**
- `list`: List community posts
- `create`: Create post
- `addComment`: Add comment to post

**billing**
- `getCredits`: Get user credit balance
- `getTransactions`: Get transaction history

## Webhook Routes

**Stripe**
- `POST /api/webhooks/stripe`: Handle Stripe events
  - `checkout.session.completed`: Credit purchase
  - `invoice.payment_succeeded`: Invoice payment

## Deployment

### Vercel

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

```bash
# One-click deploy
vercel
```

### Database Migration

```bash
# Push schema to production
npm run db:push

# Create migration (if needed)
npm run db:migrate
```

## Development Commands

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type checking
npm run type-check

# Database commands
npm run db:push          # Push schema changes
npm run db:migrate       # Create migration
npm run db:seed          # Seed demo data
npm run db:studio        # Open Prisma Studio
```

## Testing

### Acceptance Test Flow

1. **Sign Up**: Create account via Google/GitHub/Email
2. **Verify Email**: Confirm email (if using email provider)
3. **Complete Vetting**: Submit vetting application
4. **Create Project**: Create a new project
5. **Add Members**: Invite collaborators
6. **Messaging**: Send messages in project thread
7. **Create Invoice**: Send project invoice
8. **Payment**: Pay invoice with Stripe test card
9. **Verify**: Check trust score increased

### Test Credentials

**Stripe Test Cards**
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- Expiry: Any future date
- CVC: Any 3 digits

## Security

- hCaptcha on signup and first post
- RBAC middleware in tRPC procedures
- Row-level access checks for projects
- Rate limiting via Upstash Redis
- Audit logging for admin actions
- SQL injection prevention via Prisma
- XSS protection via React

## Performance

- Server-side rendering with Next.js
- Incremental Static Regeneration (ISR)
- API route caching
- Database query optimization
- Image optimization
- Code splitting

## Monitoring

- Error tracking (Sentry recommended)
- Analytics (Vercel Analytics)
- Database monitoring (PlanetScale)
- Stripe dashboard for payments

## Support

- GitHub Issues for bug reports
- Discussions for feature requests
- Email support (configure in settings)

## License

MIT

---

**Vetra**: Where ideas become real—together.
