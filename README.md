# Vetra - Where Ideas Become Real Together

A modern community collaboration platform built with Next.js 14, Prisma, tRPC, and Stripe.

## Features

- **Vetted Community**: Skills assessment, credential verification, and endorsements
- **Project Collaboration**: Create projects, find collaborators, manage teams
- **Real-time Messaging**: 1:1 and project-based messaging
- **Community Feed**: Posts, comments, and discussions
- **Billing**: Credit packs and project invoices via Stripe
- **Trust Score**: Reputation system based on endorsements and activity
- **Admin Panel**: Vetting application review and metrics

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS, Radix UI
- **Backend**: tRPC, Next.js API Routes, Zod validation
- **Database**: MySQL (Prisma ORM) on PlanetScale
- **Auth**: NextAuth.js with Google, GitHub, and Email providers
- **Payments**: Stripe (credit packs + invoices)
- **Real-time**: Pusher or Ably (abstracted via adapter)
- **Hosting**: Vercel (web), PlanetScale (database)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- MySQL database (local or PlanetScale)

### Installation

1. Clone the repository:
```bash
git clone <repo-url>
cd vetra
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Configure your `.env.local` with:
   - `DATABASE_URL`: MySQL connection string
   - `NEXTAUTH_URL` and `NEXTAUTH_SECRET`
   - OAuth provider credentials (Google, GitHub)
   - Stripe keys
   - hCaptcha keys

5. Set up the database:
```bash
npm run db:push
npm run db:seed
```

6. Start the development server:
```bash
npm run dev
```

Visit `http://localhost:3000` to see the app.

## Project Structure

```
src/
├── app/              # Next.js app directory
├── components/       # React components
├── lib/             # Utilities and configuration
├── server/          # tRPC routers and procedures
└── styles/          # Global CSS
prisma/
├── schema.prisma    # Database schema
└── seed.ts          # Seed data script
```

## Key Features Implementation

### Authentication
- NextAuth.js with multiple providers
- Session management
- Protected routes

### Vetting System
- Application submission
- Admin review and approval
- Trust score calculation

### Projects
- Create and manage projects
- Add team members
- Project visibility (PUBLIC, MEMBERS, PRIVATE)
- Skills and role management

### Messaging
- Real-time 1:1 messaging
- Project-based threads
- Message history

### Billing
- Credit pack purchases via Stripe
- Project invoices
- Transaction tracking
- Platform fee calculation

## API Endpoints

All API calls use tRPC. Key routers:

- `auth.*` - Authentication and session
- `profile.*` - User profiles and skills
- `vetting.*` - Vetting applications
- `projects.*` - Project management
- `posts.*` - Community feed
- `billing.*` - Credits and transactions

## Environment Variables

See `.env.example` for all required variables.

Key variables:
- `DATABASE_URL` - MySQL connection string
- `NEXTAUTH_SECRET` - Session signing secret
- `STRIPE_SECRET_KEY` - Stripe API key
- `NEXT_PUBLIC_HCAPTCHA_SITE_KEY` - hCaptcha public key

## Deployment

### Vercel

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

### Database

Use PlanetScale for MySQL hosting:
1. Create a PlanetScale account
2. Create a database
3. Get connection string
4. Set `DATABASE_URL` in environment

## Development

### Database Commands

```bash
# Push schema changes
npm run db:push

# Create migration
npm run db:migrate

# Open Prisma Studio
npm run db:studio

# Seed demo data
npm run db:seed
```

### Type Checking

```bash
npm run type-check
```

## Testing

Acceptance test flow:
1. Create account → verify email
2. Complete vetting application
3. Create a project
4. Add team members
5. Send messages
6. Create invoice
7. Pay with Stripe
8. Check trust score increased

## Security

- hCaptcha on signup and first post
- RBAC middleware in tRPC
- Row-level access checks
- Rate limiting (via Upstash Redis)
- Audit logging

## Contributing

1. Create a feature branch
2. Make changes
3. Test thoroughly
4. Submit pull request

## License

MIT

## Support

For issues or questions, please open an issue on GitHub.

---

**Vetra**: Where ideas become real—together.
