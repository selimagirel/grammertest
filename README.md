# EnglishMaster - AI-Powered English Learning Platform

An AI-powered English learning platform that generates customized exercises for students at A1-B2 CEFR levels using Claude AI API.

## 🚀 Project Status

**Current Phase:** MVP Development (In Progress)

### ✅ Completed Features

1. **Project Setup**
   - ✅ Next.js 14+ with TypeScript and Tailwind CSS
   - ✅ Prisma ORM with PostgreSQL database schema
   - ✅ Complete database schema (users, subscriptions, trial_usage, exercise_history, payments, verification_tokens)
   - ✅ Environment configuration (.env.example)
   - ✅ Git repository initialized

2. **Authentication System**
   - ✅ User registration API (`/api/auth/register`)
   - ✅ User login API (`/api/auth/login`)
   - ✅ JWT-based authentication
   - ✅ Password hashing with bcrypt
   - ✅ Password validation (8+ chars, uppercase, lowercase, number)
   - ✅ Session management with HTTP-only cookies

3. **Trial Counter System**
   - ✅ Trial tracking (3 grammar + 3 vocabulary per user)
   - ✅ Session-based tracking for anonymous users
   - ✅ Database-backed trial management
   - ✅ Trial status API (`/api/trial/status`)
   - ✅ Visual trial counter component

4. **Claude AI Integration**
   - ✅ Complete system prompts for grammar, vocabulary, and paragraphs
   - ✅ Grammar exercise generation (20 questions)
   - ✅ Vocabulary exercise generation (9 questions or 11 flashcards)
   - ✅ Paragraph generation (7-9 sentences)
   - ✅ Exercise generation API (`/api/exercises/generate`)
   - ✅ JSON response validation
   - ✅ CEFR level-appropriate content generation

5. **Frontend Pages**
   - ✅ Home page with hero section and features
   - ✅ Levels selection page (A1, A2, B1, B2)
   - ✅ Categories page (Grammar, Vocabulary, Paragraph)
   - ✅ Navbar with authentication state
   - ✅ Trial counter component
   - ✅ Custom gradient designs matching specifications

6. **UI Components**
   - ✅ Button component (Radix UI)
   - ✅ Toast notifications
   - ✅ Layout components (Navbar, TrialCounter)
   - ✅ Custom utility functions

### 🚧 In Progress

- [ ] Exercise display page
- [ ] Grading system with color-coded results
- [ ] PDF download functionality
- [ ] Login/Register forms

### 📋 Pending Features

- [ ] Payment integration (iyzico + Stripe)
- [ ] Email notification system (Resend)
- [ ] Subscription management
- [ ] User profile page
- [ ] Exercise history
- [ ] Legal pages (Privacy Policy, Terms)
- [ ] Full responsive design
- [ ] Testing and bug fixes
- [ ] Production deployment

## 🛠️ Tech Stack

- **Frontend:** Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** JWT with bcrypt
- **AI:** Claude API (Anthropic)
- **Payments:** iyzico (Turkey), Stripe (International)
- **Email:** Resend
- **Deployment:** Vercel (recommended)

## 📦 Installation & Setup

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- Anthropic API key

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Set Up Database

1. Create a PostgreSQL database:

```bash
createdb englishmaster
```

2. Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

3. Update `.env` with your database URL:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/englishmaster?schema=public"
```

### Step 3: Configure Environment Variables

Update the following in `.env`:

```env
# Required for basic functionality
ANTHROPIC_API_KEY="sk-ant-your-api-key-here"
JWT_SECRET="generate-a-secure-random-string"
NEXTAUTH_SECRET="generate-another-secure-random-string"

# Optional (for production)
IYZICO_API_KEY="your-iyzico-api-key"
IYZICO_SECRET_KEY="your-iyzico-secret-key"
RESEND_API_KEY="re_your-resend-api-key"
```

### Step 4: Initialize Database

```bash
npx prisma db push
npx prisma generate
```

### Step 5: Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

## 📁 Project Structure

```
/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── register/route.ts
│   │   │   └── login/route.ts
│   │   ├── exercises/
│   │   │   └── generate/route.ts
│   │   └── trial/
│   │       └── status/route.ts
│   ├── levels/page.tsx
│   ├── categories/page.tsx
│   ├── page.tsx (home)
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ui/ (Radix UI components)
│   ├── layout/ (Navbar, TrialCounter)
│   ├── auth/ (Login, Register forms - TODO)
│   └── exercises/ (Exercise components - TODO)
├── lib/
│   ├── auth/ (password, jwt, session)
│   ├── claude/ (prompts, client)
│   ├── db.ts
│   └── utils.ts
├── types/
│   └── index.ts
├── prisma/
│   └── schema.prisma
├── hooks/
│   └── use-toast.ts
└── package.json
```

## 🎨 Design Specifications

### Colors (EXACT - DO NOT CHANGE)

```css
Background Gradient: #1a1a2e → #16213e
Primary Purple: #667eea → #764ba2
Pink Gradient: #f093fb → #f5576c
Success Green: #d4edda (light), #28a745 (dark)
Error Red: #f8d7da (light), #dc3545 (dark)
Warning Yellow: #fff3cd (light), #ffc107 (dark)
```

### Typography

```css
Font Family: Georgia, serif
H1: 2.5rem (40px)
H2: 1.8rem (29px)
H3: 1.5rem (24px)
Body: 1.1rem (18px)
Line Height: 1.6
```

## 📊 Database Schema

See `prisma/schema.prisma` for complete schema.

Key tables:
- `users` - User accounts
- `subscriptions` - Subscription plans
- `trial_usage` - Trial tracking
- `exercise_history` - Generated exercises
- `payments` - Payment records
- `verification_tokens` - Email verification

## 🔐 API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout (TODO)
- `GET /api/auth/me` - Get current user (TODO)

### Exercises

- `POST /api/exercises/generate` - Generate exercise
- `POST /api/exercises/submit` - Submit answers (TODO)
- `GET /api/exercises/history` - Get history (TODO)

### Trial

- `GET /api/trial/status` - Get trial status

### Subscriptions (TODO)

- `GET /api/subscription/status`
- `POST /api/subscription/create`
- `POST /api/subscription/cancel`

## 🧪 Testing

```bash
# Run tests (once implemented)
npm test

# Build for production
npm run build

# Start production server
npm start
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub:

```bash
git add .
git commit -m "Initial commit"
git push -u origin claude/englishmaster-ai-platform-PNy8h
```

2. Connect to Vercel:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables
   - Deploy

3. Set up PostgreSQL:
   - Use Vercel Postgres, Supabase, or Railway
   - Update `DATABASE_URL` in Vercel environment variables

4. Run migrations:

```bash
npx prisma migrate deploy
```

## 📝 Next Steps for Developer

### Immediate Priorities (Week 1-2)

1. **Complete Exercise Pages**
   - Build exercise display component
   - Implement grading system
   - Add PDF download functionality

2. **Authentication UI**
   - Create login form
   - Create register form
   - Add email verification

3. **Payment Integration**
   - Set up iyzico account
   - Implement subscription API
   - Test payment flow

### Week 3-4

4. **Email System**
   - Set up Resend account
   - Create email templates
   - Implement transactional emails

5. **User Profile**
   - Exercise history
   - Subscription management
   - Settings page

### Week 5-6

6. **Testing & Polish**
   - End-to-end testing
   - Bug fixes
   - Performance optimization
   - Mobile responsiveness

## 📞 Support

For questions or issues:
- Check existing code documentation
- Review Prisma schema
- Check API route implementations

## 📄 License

Proprietary - All rights reserved

---

**Last Updated:** December 28, 2024
**Version:** 0.1.0 (MVP in progress)
