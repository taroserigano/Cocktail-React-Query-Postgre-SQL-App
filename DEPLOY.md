# 🚀 Deploy Cocktail App to Render

## Prerequisites
- GitHub account
- Render account (free tier available at [render.com](https://render.com))
- Your code pushed to GitHub

## Step 1: Push to GitHub

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

## Step 2: Set Up Database on Neon (Already Done!)

✅ You already have a Neon PostgreSQL database configured in your `.env` file

## Step 3: Deploy to Render

### Option A: Using render.yaml (Recommended)

1. Go to [render.com](https://render.com) and sign in
2. Click **"New +"** → **"Blueprint"**
3. Connect your GitHub repository
4. Render will automatically detect `render.yaml`
5. Add your environment variable:
   - `DATABASE_URL`: Your Neon database URL from `.env` file
6. Click **"Apply"**

### Option B: Manual Setup

1. Go to [render.com](https://render.com) and sign in
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure:
   - **Name**: `cocktail-app`
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: (leave empty)
   - **Runtime**: `Node`
   - **Build Command**: 
     ```
     npm install && npm run build && cd server && npm install && npx prisma generate
     ```
   - **Start Command**: 
     ```
     npm start
     ```
   - **Plan**: Free

5. **Add Environment Variables**:
   - Click "Environment" tab
   - Add:
     - `NODE_ENV` = `production`
     - `DATABASE_URL` = `postgres://neondb_owner:wG6cVDxTdf2H@ep-square-unit-a5m59kxt-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require`

6. Click **"Create Web Service"**

## Step 4: Wait for Deployment

- Render will:
  1. Install dependencies
  2. Build your React frontend
  3. Generate Prisma client
  4. Start your Express server
  5. Your app will be live at: `https://cocktail-app-xxxx.onrender.com`

## Step 5: Run Database Migrations (First Time Only)

After first deployment, you need to run migrations:

1. Go to your service dashboard on Render
2. Click **"Shell"** tab
3. Run:
   ```bash
   cd server && npx prisma migrate deploy
   ```

## 🎉 Done!

Your app is now live! The URL will be shown in your Render dashboard.

## Common Issues

### Issue: "Cannot find module"
**Solution**: Make sure all dependencies are in `package.json`, not just `devDependencies`

### Issue: Database connection error
**Solution**: Verify your `DATABASE_URL` environment variable is correct and includes `?sslmode=require`

### Issue: Build fails
**Solution**: Check the build logs in Render dashboard

## Updating Your App

Just push to GitHub:
```bash
git add .
git commit -m "Update app"
git push origin main
```

Render will automatically redeploy! 🚀

## Alternative Platforms

### Railway.app
- Similar to Render
- Easier setup, just connect GitHub
- Free tier available

### Netlify (Frontend) + Render (Backend)
- Split deployment
- Netlify for React, Render for API
- More complex but more scalable

### Vercel
- Great for Next.js
- Can deploy with serverless functions
- Would require code modifications
