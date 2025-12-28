# Quick Fix for Render Deployment

## The Problem
Render is using an old cached build command from the dashboard instead of reading from `render.yaml`.

## Solution 1: Update Build Command in Render Dashboard (Recommended)

1. Go to your Render dashboard: https://dashboard.render.com
2. Select your `mixmaster-app` service
3. Go to **Settings**
4. Find **Build Command** section
5. Change it to:
   ```bash
   bash build.sh
   ```
6. Click **Save Changes**
7. Go to **Manual Deploy** and click **Deploy latest commit**

## Solution 2: Use the build script directly

The build command should be:
```bash
NODE_ENV=development npm install && npm run build && cd server && npm install --omit=dev && npx prisma generate
```

## Why This Works

- `NODE_ENV=development` ensures devDependencies (like Vite) are installed
- `npm run build` runs Vite to build the React frontend
- Server dependencies are installed without devDependencies
- Prisma client is generated for database access

## Verify After Deploy

Once deployed successfully:
1. Visit your app URL
2. Check `/api/health` endpoint works
3. Verify frontend loads and can fetch cocktails

## Alternative: Delete and Recreate Service

If the above doesn't work:
1. Delete the current Render service
2. Create new service from GitHub
3. It will read `render.yaml` automatically
4. Add `DATABASE_URL` environment variable
5. Deploy

## Environment Variables Needed

Make sure these are set in Render:
- `NODE_ENV` = `production`
- `DATABASE_URL` = Your Neon PostgreSQL connection string
