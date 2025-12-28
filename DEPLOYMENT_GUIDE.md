# Deployment Guide - Single Server Configuration

This app is configured so the **Node.js backend serves the static React frontend** files. This makes deployment simpler as a single application.

## How It Works

1. **Build Phase:** `npm run build` creates production-ready React files in `/dist`
2. **Runtime:** Express server serves:
   - API routes at `/api/*`
   - Static frontend files from `/dist` for all other routes
3. **Single URL:** Everything runs on one domain/port

---

## ✅ Recommended: Render.com (Already Configured)

**Best option** - Works perfectly with your current setup.

### Deploy to Render:

1. Push code to GitHub
2. Go to [render.com](https://render.com) → New Web Service
3. Connect your repository
4. Configure:
   - **Build Command:** `npm run build:full`
   - **Start Command:** `npm start`
   - **Environment Variables:**
     - `NODE_ENV=production`
     - `DATABASE_URL=<your-neon-postgres-url>`

**Done!** Render will build and deploy everything.

---

## Alternative: Railway.app

Very similar to Render, zero configuration needed.

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login and deploy
railway login
railway init
railway up

# Add environment variables
railway variables set DATABASE_URL=<your-db-url>
railway variables set NODE_ENV=production
```

---

## Alternative: Fly.io

Great for Docker-based deployments.

```bash
# Install Fly CLI
# Windows: Run in PowerShell
iwr https://fly.io/install.ps1 -useb | iex

# Deploy
fly launch
fly secrets set DATABASE_URL=<your-db-url>
fly deploy
```

---

## ⚠️ Vercel (Serverless - Requires Modifications)

Vercel is designed for serverless functions, not traditional Node.js servers. You'd need to:

1. Convert Express routes to Vercel serverless functions
2. Each route becomes a separate file in `/api` folder
3. Prisma requires special configuration for serverless

**Not recommended** for this app structure without significant refactoring.

---

## ⚠️ Netlify (Serverless - Requires Modifications)

Similar to Vercel - requires converting to Netlify Functions.

**Alternative approach for Netlify:**
- Deploy frontend to Netlify
- Keep backend on Render/Railway
- Update `config.js` to point to backend URL

---

## Local Production Build Test

Test the production build locally before deploying:

```bash
# Build the frontend
npm run build

# Start production server
npm start

# Visit http://localhost:5000
# Both frontend and API should work from same URL
```

---

## Environment Variables Required

All platforms need these variables:

```env
NODE_ENV=production
PORT=5000  # Or platform default (Render uses 10000)
DATABASE_URL=postgresql://user:pass@host/database?sslmode=require
```

Optional (if using AWS Lambda for newsletter):
```env
AWS_LAMBDA_ENDPOINT=https://your-lambda-url.on.aws/
```

---

## Database Setup

Your Neon PostgreSQL is already configured and working. Make sure to:

1. Copy your production `DATABASE_URL` from Neon dashboard
2. Add it to your deployment platform's environment variables
3. Run migrations (most platforms do this automatically on deploy)

---

## Deployment Checklist

- [ ] Push latest code to GitHub
- [ ] Environment variables configured on platform
- [ ] Build command set: `npm run build:full`
- [ ] Start command set: `npm start` or `node server/server.js`
- [ ] DATABASE_URL points to Neon production database
- [ ] Test deployment by visiting deployed URL
- [ ] Check `/api/health` endpoint works
- [ ] Verify frontend loads and connects to API

---

## Troubleshooting

### "Module not found" errors
- Ensure `npm run build:full` installs both root and server dependencies

### API calls fail (404 or CORS)
- Check `src/config.js` returns empty string for production
- Verify API routes start with `/api/`

### Database connection fails
- Confirm DATABASE_URL is set correctly
- Ensure connection string includes `?sslmode=require` for Neon

### Build succeeds but app doesn't load
- Check server logs for errors
- Verify `/dist` folder was created during build
- Ensure server is serving static files in production mode

---

## Performance Tips

- Enable gzip compression in Express (add `compression` middleware)
- Use CDN for static assets (most platforms include this)
- Add caching headers for API responses
- Monitor with platform's built-in metrics

---

## Cost Comparison

| Platform | Free Tier | Notes |
|----------|-----------|-------|
| **Render** | 750 hours/month | Auto-sleep after inactivity, best option |
| **Railway** | $5 credit/month | No auto-sleep, pay for usage |
| **Fly.io** | 3 small VMs free | Good for Docker fans |
| **Heroku** | Paid only | No free tier anymore |

**Database (Neon):** 500MB free forever

---

## Next Steps

1. Choose platform: **Render.com recommended**
2. Push code to GitHub
3. Connect repository to platform
4. Add environment variables
5. Deploy!

Your app is ready to deploy! 🚀
