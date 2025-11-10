# Vetra - Vercel Deployment Guide

## Your Deployment Credentials

**Save these values - you'll need them in the next step:**

```
NEXTAUTH_SECRET: 8gS/e1Iy/BP3DoxVPC6PLi2TDNu1o1PrsnQtee6yXM8=
DATABASE_URL: file:./prisma/dev.db
```

## Quick Deploy (5 minutes)

### Step 1: Click the Deploy Link
Open this link in your browser:
https://vercel.com/new?repository-url=https://github.com/sata9890/vetra

This will:
- Automatically detect your GitHub repository
- Ask you to authorize Vercel with GitHub
- Show you the deployment configuration screen

### Step 2: Configure Environment Variables

When you see the "Configure Project" screen, look for "Environment Variables" section.

Add these 3 variables:

| Variable | Value |
|----------|-------|
| `NEXTAUTH_URL` | `https://vetra.vercel.app` |
| `NEXTAUTH_SECRET` | `8gS/e1Iy/BP3DoxVPC6PLi2TDNu1o1PrsnQtee6yXM8=` |
| `DATABASE_URL` | `file:./prisma/dev.db` |

**Important**: Make sure you copy the values exactly as shown above.

### Step 3: Deploy

Click the blue "Deploy" button and wait 2-3 minutes for the build to complete.

### Step 4: Get Your Live URL

Once deployment completes, Vercel will show you your live URL:
- It will look like: `https://vetra-xxxxx.vercel.app`
- Or if you connected a custom domain: `https://vetra.yourdomain.com`

**That's it! Your app is live!** 🎉

## What Happens After Deploy

1. **Database**: SQLite database will be created on first run
2. **Authentication**: NextAuth will be ready to use
3. **Features**: All pages and APIs are live

## First Time Using Your App

1. Go to your Vercel URL
2. Click "Sign In" on the landing page
3. Create an account (email/Google/GitHub)
4. Explore the dashboard

## Troubleshooting

### "Build Failed" Error
- Check that all environment variables are set correctly
- Make sure `NEXTAUTH_SECRET` is exactly as provided above
- Verify `DATABASE_URL` is exactly: `file:./prisma/dev.db`

### "Environment Variables Not Found"
- Go to Vercel dashboard → Your Project → Settings → Environment Variables
- Add the 3 variables manually
- Redeploy by clicking "Deployments" → "Redeploy"

### App Shows Blank Page
- Open browser DevTools (F12)
- Check Console tab for errors
- Try refreshing the page

## Next Steps (Optional)

After deployment, you can:

1. **Add Custom Domain**
   - Vercel Dashboard → Settings → Domains
   - Add your custom domain

2. **Enable OAuth** (Google/GitHub login)
   - Get credentials from Google Cloud Console or GitHub
   - Add to Vercel Environment Variables
   - Update `.env.example` in your repo

3. **Add Email Sending**
   - Configure SMTP credentials
   - Update environment variables

4. **Upgrade Database** (Optional)
   - Switch from SQLite to PlanetScale MySQL
   - Update `DATABASE_URL` to PlanetScale connection string
   - Run migrations: `npm run db:push`

## Support

If you encounter issues:
1. Check Vercel deployment logs (Deployments tab)
2. Review this guide
3. Check GitHub repository for updates

## Your GitHub Repository

**Repository**: https://github.com/sata9890/vetra

You can make changes, push to GitHub, and Vercel will automatically redeploy.

---

**Vetra**: Where ideas become real—together.
