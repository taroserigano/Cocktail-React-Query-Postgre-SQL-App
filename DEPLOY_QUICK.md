# 🚀 Quick Deploy Commands

## Local Testing (Production Mode)

```bash
# 1. Build frontend
npm run build

# 2. Start production server
npm start
```

Visit: http://localhost:5000

---

## Full Deployment Prep

```bash
./deploy.sh
```

This script will:
- ✅ Install all dependencies
- ✅ Build the frontend
- ✅ Setup the database
- ✅ Run migrations

---

## Deploy to Render.com

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Deploy production build"
   git push origin main
   ```

2. **Create Render Service**
   - Go to https://render.com
   - New → Web Service
   - Connect your repo
   - Configure:
     - **Build Command:** `npm run build:full`
     - **Start Command:** `npm start`
     - **Environment:** Add `DATABASE_URL`

3. **Deploy!** 
   - Render auto-deploys from main branch

---

## Deploy to Railway.app

```bash
# Install Railway CLI (first time only)
npm install -g @railway/cli

# Login
railway login

# Initialize
railway init

# Add database
railway add

# Deploy
railway up
```

Set environment variable:
```bash
railway variables set NODE_ENV=production
```

---

## Environment Variables Needed

```env
NODE_ENV=production
DATABASE_URL=your-database-connection-string
PORT=5000
```

---

## Database Setup (Neon)

1. Create account: https://neon.tech
2. Create project → Create database
3. Copy connection string
4. Add to your hosting platform's environment variables

---

## Useful Commands

```bash
# Build only
npm run build

# Build + install server deps
npm run build:full

# Start production server
npm start

# Development mode
npm run dev

# Check if build works locally
npm run build && npm start
```

---

## Troubleshooting

**Can't connect to database?**
```bash
cd server
npx prisma migrate deploy
npx prisma generate
```

**Build fails?**
```bash
rm -rf node_modules dist
npm install
npm run build
```

**Server won't start?**
- Check `server/.env` exists
- Verify `DATABASE_URL` is set
- Ensure port 5000 is available

---

## File Structure

```
your-app/
├── dist/              # Built frontend (auto-generated)
├── server/
│   ├── .env          # Your production env vars
│   ├── server.js     # Serves API + static files
│   └── ...
├── package.json      # Root scripts
└── deploy.sh         # Auto deployment script
```

---

**Need more help?** See `DEPLOYMENT.md` for full guide!
