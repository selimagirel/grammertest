# EnglishMaster - Complete Setup Guide

This guide will walk you through setting up the EnglishMaster platform from scratch.

## 📋 Prerequisites

Before you begin, ensure you have:

- **Node.js 18+** installed ([Download](https://nodejs.org/))
- **PostgreSQL 14+** installed ([Download](https://www.postgresql.org/download/))
- **Git** installed
- A code editor (VS Code recommended)
- **Anthropic API key** (required for AI features)

## 🚀 Step-by-Step Setup

### 1. Clone the Repository

```bash
# If you haven't already cloned the repo
git clone <your-repo-url>
cd grammertest
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- Next.js, React, TypeScript
- Prisma ORM
- Claude SDK
- Authentication libraries
- UI components

### 3. Set Up PostgreSQL Database

#### Option A: Local PostgreSQL

```bash
# Create a new database
createdb englishmaster

# Or using psql
psql -U postgres
CREATE DATABASE englishmaster;
\q
```

#### Option B: Cloud Database (Recommended for Production)

Use one of these services:
- **Supabase** (Free tier available): https://supabase.com
- **Railway** (Easy setup): https://railway.app
- **Neon** (Serverless Postgres): https://neon.tech

### 4. Configure Environment Variables

```bash
# Copy the example environment file
cp .env.example .env
```

Open `.env` and configure the following:

```env
# Database Connection
# Local example:
DATABASE_URL="postgresql://postgres:password@localhost:5432/englishmaster?schema=public"

# Supabase example:
# DATABASE_URL="postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres"

# Authentication (REQUIRED)
# Generate secure random strings: https://generate-secret.vercel.app/32
JWT_SECRET="your-super-secret-jwt-key-here"
NEXTAUTH_SECRET="your-super-secret-nextauth-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Claude API (REQUIRED)
# Get your API key from: https://console.anthropic.com/
ANTHROPIC_API_KEY="sk-ant-api03-your-key-here"

# Payment Gateway (Optional for MVP)
IYZICO_API_KEY="sandbox-api-key"
IYZICO_SECRET_KEY="sandbox-secret-key"
IYZICO_BASE_URL="https://sandbox-api.iyzipay.com"

# Email Service (Optional for MVP)
RESEND_API_KEY="re_your_api_key_here"
EMAIL_FROM="noreply@yourdomain.com"

# App Settings
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NODE_ENV="development"
```

### 5. Initialize Database

```bash
# Push the Prisma schema to your database
npx prisma db push

# Generate Prisma Client
npx prisma generate
```

This creates all necessary tables:
- `users` - User accounts
- `subscriptions` - Subscription management
- `trial_usage` - Free trial tracking
- `exercise_history` - Generated exercises
- `payments` - Payment records
- `verification_tokens` - Email verification

### 6. Verify Database Setup

```bash
# Open Prisma Studio to view your database
npx prisma studio
```

This opens a web interface at `http://localhost:5555` where you can see all tables.

### 7. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` - you should see the home page!

## 🧪 Testing the Application

### Test User Registration

1. Go to `http://localhost:3000/register`
2. Create a test account
3. Check your database in Prisma Studio to verify the user was created

### Test Exercise Generation

1. Login with your test account
2. Go to Levels → Choose A1
3. Select Grammar
4. Enter a topic (e.g., "Present Simple")
5. Click Generate

**Note:** This will make an API call to Claude, so ensure you have:
- Valid API key in `.env`
- Sufficient credits in your Anthropic account

### Test Trial System

1. Open browser DevTools → Application → Local Storage
2. You should see `englishmaster_session_id`
3. Generate exercises and watch the trial counter decrease

## 🔧 Common Issues & Solutions

### Issue: "Error: P1001: Can't reach database server"

**Solution:**
- Verify PostgreSQL is running: `pg_isready`
- Check your `DATABASE_URL` in `.env`
- Ensure database exists: `psql -l | grep englishmaster`

### Issue: "Invalid API key" when generating exercises

**Solution:**
- Verify `ANTHROPIC_API_KEY` in `.env`
- Check API key at https://console.anthropic.com/
- Ensure no extra spaces or quotes

### Issue: "Module not found" errors

**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
```

### Issue: Prisma Client errors

**Solution:**
```bash
# Regenerate Prisma Client
npx prisma generate

# If still failing, reset database (WARNING: deletes all data)
npx prisma db push --force-reset
```

## 📦 Project Structure Overview

```
/grammertest
├── app/                    # Next.js 14 App Router
│   ├── api/               # API routes
│   │   ├── auth/         # Authentication endpoints
│   │   ├── exercises/    # Exercise generation & submission
│   │   └── trial/        # Trial status
│   ├── levels/           # Level selection page
│   ├── categories/       # Category selection page
│   ├── exercise/         # Exercise display page
│   ├── results/          # Results page
│   ├── login/            # Login page
│   ├── register/         # Registration page
│   ├── subscribe/        # Subscription/pricing page
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page
│   └── globals.css       # Global styles
├── components/            # React components
│   ├── ui/               # UI primitives (buttons, etc.)
│   ├── layout/           # Layout components (Navbar, etc.)
│   └── exercises/        # Exercise-specific components
├── lib/                   # Utility libraries
│   ├── auth/             # Authentication utilities
│   ├── claude/           # Claude API integration
│   ├── db.ts             # Prisma client
│   └── utils.ts          # Shared utilities
├── prisma/
│   └── schema.prisma     # Database schema
├── types/
│   └── index.ts          # TypeScript types
└── .env                   # Environment variables (create this)
```

## 🎨 Design System

The app uses a custom design system with:

**Colors:**
- Background: Dark gradient (#1a1a2e → #16213e)
- Primary: Purple gradient (#667eea → #764ba2)
- Accent: Pink gradient (#f093fb → #f5576c)

**Typography:**
- Font: Georgia, serif
- Responsive sizing with Tailwind CSS

**Components:**
- Built with Radix UI primitives
- Styled with Tailwind CSS
- Custom gradients and animations

## 🔐 Security Checklist

Before deploying:

- ✅ Change all default secrets in `.env`
- ✅ Use strong JWT secrets (32+ characters)
- ✅ Enable HTTPS in production
- ✅ Set `NODE_ENV=production`
- ✅ Restrict CORS if needed
- ✅ Enable rate limiting (TODO)
- ✅ Review Prisma schema permissions

## 📊 Database Management

### View Data

```bash
npx prisma studio
```

### Create Migration

```bash
npx prisma migrate dev --name description_of_change
```

### Reset Database (Development Only)

```bash
npx prisma migrate reset
```

## 🚀 Next Steps

1. **Get Anthropic API Key**
   - Go to https://console.anthropic.com/
   - Create account and generate API key
   - Add to `.env` as `ANTHROPIC_API_KEY`

2. **Test All Features**
   - User registration/login
   - Exercise generation
   - Grading system
   - Trial counter

3. **Optional: Set Up Payment Gateway**
   - Register for iyzico account (Turkey)
   - Get sandbox API keys
   - Test payment flow

4. **Optional: Set Up Email Service**
   - Create Resend account (https://resend.com)
   - Verify sender domain
   - Test email sending

5. **Deploy to Production**
   - See `DEPLOYMENT_GUIDE.md`

## 💡 Development Tips

### Hot Reload

Changes to files automatically reload the browser. If it stops working:

```bash
# Restart dev server
npm run dev
```

### Type Checking

```bash
# Check TypeScript errors
npx tsc --noEmit
```

### Linting

```bash
# Run linter
npm run lint
```

### Build for Production

```bash
# Test production build locally
npm run build
npm start
```

## 📞 Need Help?

- Check the main `README.md` for architecture overview
- Review API routes in `app/api/`
- Examine Prisma schema for database structure
- Check browser console for errors
- Review server logs in terminal

## ✅ Setup Complete!

You should now have:
- ✅ PostgreSQL database running
- ✅ Environment variables configured
- ✅ Dependencies installed
- ✅ Development server running at http://localhost:3000
- ✅ Prisma Studio available at http://localhost:5555

Ready to start developing! 🎉
