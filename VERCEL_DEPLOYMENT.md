# Vercel Deployment Guide

## One-Click Deployment (Entire Project at Once!)

### Single Vercel Project Setup

1. Go to https://vercel.com/new
2. Connect your GitHub repository `AI-Health-Prediction`
3. **Click Import** (that's it!)
4. Vercel will auto-detect the monorepo structure from `vercel.json`
5. Add Environment Variables:
   ```
   JWT_SECRET=your_jwt_secret_key
   DATABASE_URL=your_database_url (if using external DB)
   NODE_ENV=production
   ```
6. Click **Deploy** ✓

**Result:**
- Frontend served at: `https://your-project.vercel.app`
- Backend API at: `https://your-project.vercel.app/api/*`
- Both deployed together!

---

## How It Works

The `vercel.json` in the root directory tells Vercel to:
- Build the **client** folder → static frontend
- Build the **server** folder → Node.js backend
- Route `/api/*` requests to the backend
- Route all other requests to the frontend

This is a true **monorepo deployment** - everything happens in one deployment!

---

## Environment Variables Needed

```
# Backend Variables
JWT_SECRET=your_secret_key_here
DATABASE_URL=postgresql://user:pass@host/db (optional, for external DB)
NODE_ENV=production

# Frontend will automatically use:
# VITE_API_URL=/api (internal API routing)
```

---

## Production Database Setup

⚠️ **Important:** SQLite database will NOT persist on Vercel

### Option 1: Use External PostgreSQL (Recommended)

1. Create PostgreSQL database at:
   - [Railway.app](https://railway.app)
   - [Render](https://render.com)
   - [Supabase](https://supabase.com)
   - [AWS RDS](https://aws.amazon.com/rds/)

2. Update `server/prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

3. Set `DATABASE_URL` in Vercel environment variables

4. Run migrations:
```bash
npx prisma migrate deploy
npx prisma db seed
```

### Option 2: Keep SQLite (Development Only)
- SQLite works for local development
- Data will be lost on Vercel redeploys
- Use external DB for production!

---

## Testing After Deployment

1. **Frontend:** `https://your-project.vercel.app`
2. **API Health Check:** `https://your-project.vercel.app/api/health`
3. **Login:** Try signing in to verify backend connectivity

---

## Redeployment

Any push to `main` branch automatically triggers deployment:
```bash
git add .
git commit -m "Your changes"
git push
```

Vercel will automatically:
- Build frontend
- Build backend  
- Deploy both simultaneously

---

## Troubleshooting

**Issue:** Frontend shows error connecting to API
- Frontend automatically uses `/api` (relative path)
- No environment variable needed
- Check backend logs

**Issue:** Build fails
- Check Node.js 18+ compatibility
- Run `npm run build:all` locally
- Check both `client/` and `server/` can build

**Issue:** Database connection error
- Verify `DATABASE_URL` is set in Vercel
- Test connection locally first
- Ensure database allows Vercel IP

---

## What's Deployed Where?

```
Vercel Project: your-project.vercel.app
├─ / (Frontend - React/Vite)
├─ /api/auth (Backend routes)
├─ /api/predict
├─ /api/patients
├─ /api/doctors
└─ /api/admin
```

All from ONE deployment! 🚀
