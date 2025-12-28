# EnglishMaster - Deployment Guide

Complete guide for deploying EnglishMaster to production.

## 🎯 Recommended Stack

- **Frontend/Backend:** Vercel
- **Database:** Supabase or Railway
- **Domain:** Your custom domain
- **SSL:** Automatic (via Vercel)

## 🚀 Option 1: Deploy to Vercel (Recommended)

Vercel provides the easiest deployment for Next.js applications.

### Step 1: Prepare Your Code

```bash
# Ensure all changes are committed
git add .
git commit -m "Prepare for production deployment"
git push origin claude/englishmaster-ai-platform-PNy8h
```

### Step 2: Set Up Database

#### Using Supabase (Recommended)

1. Go to https://supabase.com
2. Create a new project
3. Wait for database to initialize (~2 minutes)
4. Go to Settings → Database
5. Copy the connection string (URI format)
6. Replace `[YOUR-PASSWORD]` with your project password

Example:
```
postgresql://postgres.xxxxx:password@aws-0-region.pooler.supabase.com:5432/postgres
```

#### Using Railway

1. Go to https://railway.app
2. Create new project → Provision PostgreSQL
3. Copy the `DATABASE_URL` from variables tab

### Step 3: Deploy to Vercel

1. **Go to https://vercel.com**

2. **Import Repository**
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Select branch: `claude/englishmaster-ai-platform-PNy8h`

3. **Configure Build Settings**
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: `.next`

4. **Add Environment Variables**

   Click "Environment Variables" and add:

   ```env
   # Database (REQUIRED)
   DATABASE_URL=postgresql://your-connection-string-here

   # Authentication (REQUIRED)
   JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters
   NEXTAUTH_SECRET=another-super-secret-key-minimum-32-characters
   NEXTAUTH_URL=https://your-domain.vercel.app

   # Claude API (REQUIRED)
   ANTHROPIC_API_KEY=sk-ant-api03-your-actual-key-here

   # Payment (Optional)
   IYZICO_API_KEY=your-production-iyzico-key
   IYZICO_SECRET_KEY=your-production-iyzico-secret
   IYZICO_BASE_URL=https://api.iyzipay.com

   # Email (Optional)
   RESEND_API_KEY=re_your_production_key
   EMAIL_FROM=noreply@yourdomain.com

   # App Settings
   NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
   NODE_ENV=production
   ```

   **Important:** Generate secure secrets using:
   - https://generate-secret.vercel.app/32
   - OR: `openssl rand -base64 32`

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for build to complete

### Step 4: Initialize Production Database

After deployment, run migrations:

```bash
# Install Vercel CLI if you haven't
npm i -g vercel

# Link your project
vercel link

# Run Prisma commands in production
vercel env pull .env.production
npx prisma generate
npx prisma db push

# Or use Vercel's built-in terminal
# Go to Project → Settings → Functions → Open Console
# Run: npx prisma db push
```

### Step 5: Verify Deployment

1. Visit your Vercel URL (e.g., `https://your-app.vercel.app`)
2. Test user registration
3. Test exercise generation
4. Check Vercel logs for any errors

### Step 6: Add Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your domain (e.g., `englishmaster.com`)
3. Follow DNS configuration instructions
4. Wait for SSL certificate (automatic, ~1 hour)
5. Update `NEXTAUTH_URL` and `NEXT_PUBLIC_APP_URL` in environment variables

## 🔧 Option 2: Deploy to Railway

Alternative if you prefer Railway.

### Step 1: Set Up Railway

1. Go to https://railway.app
2. Create new project
3. Click "Deploy from GitHub repo"
4. Select your repository

### Step 2: Add PostgreSQL

1. Click "New" → "Database" → "PostgreSQL"
2. Copy `DATABASE_URL` from variables

### Step 3: Configure Environment

Add all environment variables similar to Vercel setup.

### Step 4: Deploy

Railway automatically deploys on push to main branch.

## 🔒 Security Checklist

Before going live:

### Environment Variables
- ✅ All secrets are strong and unique
- ✅ No hardcoded credentials in code
- ✅ `.env` is in `.gitignore`
- ✅ Production URLs are correct

### Database
- ✅ Connection pooling enabled
- ✅ SSL required for connections
- ✅ Regular backups configured
- ✅ No public access to database

### API Keys
- ✅ Anthropic API key has spending limits
- ✅ Payment gateway in production mode
- ✅ Email service configured correctly
- ✅ Rate limiting enabled (TODO)

### Application
- ✅ CORS configured properly
- ✅ HTTPS enforced
- ✅ Error logging set up
- ✅ Monitoring enabled

## 📊 Monitoring & Logging

### Vercel Analytics

1. Go to Project → Analytics
2. Enable Web Analytics (free)
3. Monitor:
   - Page views
   - Performance metrics
   - Error rates

### Error Tracking (Optional)

Add Sentry for production error tracking:

```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

### Database Monitoring

**Supabase:**
- Go to Database → Query Performance
- Set up alerts for slow queries
- Monitor connection pool usage

**Railway:**
- Built-in metrics in dashboard
- Set up usage alerts

## 🔄 Continuous Deployment

Vercel automatically deploys when you push to GitHub:

```bash
# Make changes
git add .
git commit -m "Your changes"
git push

# Vercel automatically builds and deploys
# Watch progress at https://vercel.com/your-project
```

### Preview Deployments

Vercel creates preview deployments for each branch/PR:
- Test features before merging
- Share with stakeholders
- Automatic cleanup after merge

## 📧 Post-Deployment Tasks

### 1. Set Up Payment Gateway (iyzico)

1. **Register Merchant Account**
   - Go to https://www.iyzico.com
   - Complete KYC process (2-3 days)
   - Get production API keys

2. **Update Environment Variables**
   ```env
   IYZICO_API_KEY=production-key
   IYZICO_SECRET_KEY=production-secret
   IYZICO_BASE_URL=https://api.iyzipay.com
   ```

3. **Test Payment Flow**
   - Create test subscription
   - Verify webhook delivery
   - Check payment records in database

### 2. Set Up Email Service (Resend)

1. **Create Resend Account**
   - Go to https://resend.com
   - Verify your domain
   - Get API key

2. **Update Environment Variables**
   ```env
   RESEND_API_KEY=re_production_key
   EMAIL_FROM=noreply@yourdomain.com
   ```

3. **Test Emails**
   - Trigger welcome email
   - Test password reset
   - Verify delivery

### 3. Configure DNS

Point your domain to Vercel:

```
A Record: @ → 76.76.21.21
CNAME: www → cname.vercel-dns.com
```

Or follow Vercel's specific instructions for your domain.

### 4. Set Up Analytics

Google Analytics (optional):

1. Create GA4 property
2. Add tracking ID to environment
3. Implement tracking code

## 🎯 Performance Optimization

### Enable Caching

Vercel automatically caches:
- Static pages
- API responses (with proper headers)
- Images (Next.js Image component)

### Database Optimization

1. **Connection Pooling**
   - Supabase: Use `pooler.supabase.com` URL
   - Railway: Enabled by default

2. **Indexes**
   - Add indexes for frequently queried fields
   - See `prisma/schema.prisma` for index definitions

3. **Query Optimization**
   - Use Prisma's `select` to fetch only needed fields
   - Implement pagination for large datasets

### CDN (Included with Vercel)

- Automatic global CDN
- Edge caching
- Optimal asset delivery

## 🔍 Health Checks

### Manual Checks

After deployment, verify:

- ✅ Home page loads
- ✅ User can register
- ✅ User can login
- ✅ Exercise generation works
- ✅ Grading system works
- ✅ Trial counter decrements
- ✅ Mobile responsive
- ✅ No console errors

### Automated Monitoring

Set up uptime monitoring:
- https://uptimerobot.com (free)
- https://betteruptime.com
- Vercel Monitoring (premium)

## 🚨 Troubleshooting

### Build Fails on Vercel

```bash
# Check build logs in Vercel dashboard
# Common issues:

# 1. TypeScript errors
npm run build  # Test locally first

# 2. Missing environment variables
# Verify all required vars are set in Vercel

# 3. Prisma errors
# Run: npx prisma generate
# Commit prisma/generated folder
```

### Database Connection Errors

```bash
# Verify DATABASE_URL format
# Should look like:
postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public

# Test connection locally:
npx prisma db pull
```

### API Route Timeouts

Vercel has 10-second timeout for serverless functions:
- Claude API calls might be slow
- Implement retry logic
- Consider background jobs for long operations

## 📈 Scaling Considerations

### Current Limits

**Vercel (Hobby Plan):**
- 100GB bandwidth/month
- 100 serverless function invocations/day
- 10-second function timeout

**Upgrade when:**
- Traffic > 100GB/month
- Need longer function timeouts
- Require team collaboration

### Database Scaling

**Supabase:**
- Free tier: 500MB storage, 2GB bandwidth
- Upgrade to Pro: $25/month

**Railway:**
- Free tier: $5 credit/month
- Pay as you grow

### Claude API Costs

Monitor usage at https://console.anthropic.com/

- Set budget alerts
- Implement caching for repeated queries
- Consider rate limiting per user

## ✅ Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Database set up and accessible
- [ ] All environment variables configured
- [ ] Domain configured (if using custom domain)
- [ ] Database initialized with Prisma
- [ ] Test user registration
- [ ] Test exercise generation
- [ ] Test grading system
- [ ] Payment gateway tested (if enabled)
- [ ] Email service tested (if enabled)
- [ ] Error monitoring set up
- [ ] Uptime monitoring configured
- [ ] SSL certificate active
- [ ] DNS propagated (if custom domain)
- [ ] Analytics installed
- [ ] Legal pages published
- [ ] Final walkthrough completed

## 🎉 You're Live!

Your EnglishMaster platform is now running in production!

### Next Steps

1. Monitor error logs daily (first week)
2. Collect user feedback
3. Plan feature iterations
4. Scale as needed

### Support Resources

- Vercel Docs: https://vercel.com/docs
- Prisma Docs: https://www.prisma.io/docs
- Next.js Docs: https://nextjs.org/docs
- Anthropic Docs: https://docs.anthropic.com

---

**Last Updated:** December 28, 2024
