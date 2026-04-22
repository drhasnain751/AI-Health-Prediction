# Vercel Deployment Guide

## Deployment Steps

### 1. Deploy Frontend (React)
1. Go to https://vercel.com/new
2. Click "Select" under Vite/React template
3. Connect your GitHub repository `AI-Health-Prediction`
4. Configure:
   - **Project Name:** `ai-healthcare-frontend`
   - **Framework Preset:** Vite
   - **Root Directory:** `client`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
5. Add Environment Variables:
   ```
   VITE_API_URL=https://your-backend-domain.vercel.app
   ```
6. Click **Deploy**

### 2. Deploy Backend (Node.js)
1. Go to https://vercel.com/new
2. Select your repository again
3. Configure:
   - **Project Name:** `ai-healthcare-backend`
   - **Root Directory:** `server`
   - **Framework:** Node.js
   - **Build Command:** `npm run build`
   - **Install Command:** `npm install`
   - **Start Command:** `node dist/index.js`
4. Add Environment Variables:
   ```
   DATABASE_URL=your_database_connection_string
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=production
   CORS_ORIGIN=https://your-frontend-domain.vercel.app
   ```
5. Click **Deploy**

## Important Notes

- Update `VITE_API_URL` in frontend with actual backend URL after backend deploys
- Update `CORS_ORIGIN` in backend with actual frontend URL after frontend deploys
- Database: The SQLite in `/server` will not persist on Vercel. For production:
  - Use PostgreSQL or MongoDB instead
  - Update Prisma schema datasource
  - Set `DATABASE_URL` environment variable

## Alternative: Monorepo Deployment

If you want both to deploy from one Vercel project (monorepo approach):
1. Use the root `vercel.json` with `projects` configuration
2. Deploy entire repo as one project
3. Vercel will automatically handle both subdirectories

## Post-Deployment

1. Test frontend at: `https://your-frontend-domain.vercel.app`
2. Test backend API at: `https://your-backend-domain.vercel.app/api/health`
3. Update frontend API URL if different from expected
4. Set up database migration on Vercel (Prisma seed/migrate)
