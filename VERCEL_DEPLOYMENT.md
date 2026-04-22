# Vercel Deployment Guide

## Quick Start: Consecutive Deployment (Recommended)

### Step 1: Deploy Backend First
1. Go to https://vercel.com/new
2. Select your GitHub repository
3. **Configure:**
   - **Project Name:** `ai-healthcare-backend`
   - **Root Directory:** `server`
   - **Build Command:** `npm run build`
   - **Start Command:** `node dist/index.js`
4. **Environment Variables:**
   ```
   DATABASE_URL=your_database_url
   JWT_SECRET=your_jwt_secret
   NODE_ENV=production
   ```
5. Click **Deploy** ✓
6. **Copy the backend URL** (e.g., `https://ai-healthcare-backend.vercel.app`)

### Step 2: Deploy Frontend
1. Go to https://vercel.com/new
2. Select the **same repository**
3. **Configure:**
   - **Project Name:** `ai-healthcare-frontend`
   - **Root Directory:** `client`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. **Environment Variables:**
   ```
   VITE_API_URL=https://ai-healthcare-backend.vercel.app
   ```
   (Use the backend URL from Step 1)
5. Click **Deploy** ✓

### Step 3: Verify Deployment
- Frontend: `https://ai-healthcare-frontend.vercel.app`
- Backend: `https://ai-healthcare-backend.vercel.app/api/health`

---

## Alternative: Monorepo Single Project (Advanced)

If you want both in ONE Vercel project:

1. Go to https://vercel.com/new
2. Select repository
3. **Configure:**
   - **Framework Preset:** "Other"
   - **Root Directory:** `.` (root)
   - **Build Command:** `npm run build:all`
   - **Install Command:** `npm run install:all`

This approach builds both but requires custom Vercel configuration.

---

## Production Database Setup

⚠️ **Important:** SQLite database will NOT persist on Vercel

### Switch to PostgreSQL:

1. Update `server/prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

2. Use PostgreSQL provider:
   - Railway.app
   - Render
   - Supabase
   - AWS RDS

3. Set `DATABASE_URL` in Vercel environment variables

### Run migrations on Vercel:
```bash
npx prisma migrate deploy
npx prisma db seed
```

---

## Environment Variables Summary

### Backend (`server`)
```
DATABASE_URL=postgresql://user:pass@host/db
JWT_SECRET=your_secret_key_here
NODE_ENV=production
CORS_ORIGIN=https://your-frontend.vercel.app
PORT=5000
```

### Frontend (`client`)
```
VITE_API_URL=https://your-backend.vercel.app
```

---

## Troubleshooting

**Issue:** Frontend can't reach backend
- Check `VITE_API_URL` environment variable
- Ensure backend `CORS_ORIGIN` includes frontend URL
- Verify backend is deployed and responding

**Issue:** Database not seeding
- SSH into Vercel and run `npx prisma db seed`
- Or use Railway/Supabase dashboard

**Issue:** Build fails
- Check Node.js version matches (18+)
- Run `npm run build:all` locally to test
- Check git push for all changes
