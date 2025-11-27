# Mixmaster Cocktail App - Deployment Guide

## 🚀 Production Deployment (Server + Build)

This guide explains how to deploy your full-stack Mixmaster app where the Express server serves both the API and the built React frontend.

---

## 📋 Prerequisites

- Node.js v16 or higher
- PostgreSQL database (recommend Neon, Railway, or Supabase)
- A hosting platform (Render, Railway, Heroku, DigitalOcean, etc.)

---

## 🔧 Setup Steps

### 1. Configure Environment Variables

Copy `.env.example` to create your production `.env`:

```bash
cp .env.example server/.env
```

Edit `server/.env` with your production database URL:

```env
NODE_ENV=production
PORT=5000
DATABASE_URL="your-production-database-url"
```

### 2. Build the Frontend

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### 3. Setup Database

Run Prisma migrations on your production database:

```bash
cd server
npx prisma migrate deploy
npx prisma generate
```

### 4. Install Production Dependencies

```bash
# Install root dependencies
npm install

# Install server dependencies
cd server
npm install --production
```

### 5. Test Locally (Production Mode)

```bash
npm start
```

Visit `http://localhost:5000` - you should see your React app with full API functionality.

---

## 🌐 Deployment Platforms

### Option 1: Render.com (Recommended - Free Tier Available)

1. **Create a new Web Service**
   - Connect your GitHub repo
   - Select "Node" environment

2. **Configure Build & Start Commands**
   ```
   Build Command: npm run build:full
   Start Command: npm start
   ```

3. **Add Environment Variables**
   ```
   NODE_ENV=production
   DATABASE_URL=your-neon-database-url
   ```

4. **Deploy!** Render will automatically build and deploy your app.

### Option 2: Railway.app

1. **Create New Project** → Deploy from GitHub repo

2. **Add Environment Variables**
   ```
   NODE_ENV=production
   DATABASE_URL=${{Postgres.DATABASE_URL}}
   ```

3. **Configure Start Command** (in `railway.json` or dashboard)
   ```json
   {
     "build": {
       "builder": "NIXPACKS"
     },
     "deploy": {
       "startCommand": "npm start",
       "restartPolicyType": "ON_FAILURE"
     }
   }
   ```

### Option 3: Heroku

1. **Create Heroku App**
   ```bash
   heroku create your-app-name
   ```

2. **Add PostgreSQL Add-on**
   ```bash
   heroku addons:create heroku-postgresql:mini
   ```

3. **Set Environment Variables**
   ```bash
   heroku config:set NODE_ENV=production
   ```

4. **Deploy**
   ```bash
   git push heroku main
   ```

5. **Run Migrations**
   ```bash
   heroku run npx prisma migrate deploy
   ```

### Option 4: DigitalOcean App Platform

1. Create new App → Import from GitHub
2. Set build command: `npm run build:full`
3. Set run command: `npm start`
4. Add DATABASE_URL environment variable
5. Deploy!

### Option 5: VPS (Ubuntu/Linux Server)

1. **Install Node.js and PM2**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   sudo npm install -g pm2
   ```

2. **Clone and Setup**
   ```bash
   git clone your-repo-url
   cd your-repo
   npm run build:full
   ```

3. **Create ecosystem.config.js**
   ```javascript
   module.exports = {
     apps: [{
       name: 'mixmaster',
       cwd: './server',
       script: 'server.js',
       instances: 'max',
       exec_mode: 'cluster',
       env: {
         NODE_ENV: 'production',
         PORT: 5000
       }
     }]
   };
   ```

4. **Start with PM2**
   ```bash
   pm2 start ecosystem.config.js
   pm2 save
   pm2 startup
   ```

5. **Setup Nginx as Reverse Proxy**
   ```nginx
   server {
     listen 80;
     server_name yourdomain.com;

     location / {
       proxy_pass http://localhost:5000;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
       proxy_cache_bypass $http_upgrade;
     }
   }
   ```

---

## 🗄️ Database Options

### Neon (Recommended - Serverless PostgreSQL)

1. Sign up at [neon.tech](https://neon.tech)
2. Create new project
3. Copy connection string
4. Add to your environment variables:
   ```
   DATABASE_URL="postgresql://user:pass@ep-xxx.region.aws.neon.tech/dbname?sslmode=require"
   ```

### Railway PostgreSQL

1. Add PostgreSQL plugin in Railway dashboard
2. Use the auto-generated `DATABASE_URL` variable

### Supabase

1. Create project at [supabase.com](https://supabase.com)
2. Get connection string from Settings → Database
3. Use "Connection pooling" URL for better performance

---

## 📁 Project Structure (Production)

```
your-app/
├── dist/                   # Built React app (generated)
├── server/
│   ├── controllers/
│   ├── routes/
│   ├── prisma/
│   ├── server.js          # Serves API + static files
│   ├── package.json
│   └── .env               # Production env vars
├── src/                   # React source (not deployed)
├── package.json           # Root package.json with build scripts
└── README.md
```

---

## 🔍 Troubleshooting

### Routes return 404
- Ensure `server.js` has the wildcard route: `app.get('*', ...)`
- Check that `dist/` folder exists in server directory

### Database Connection Fails
- Verify DATABASE_URL is correct
- Check SSL mode is set (add `?sslmode=require` for most cloud DBs)
- Run `npx prisma generate` after changing schema

### Build Fails
- Clear node_modules: `rm -rf node_modules package-lock.json`
- Reinstall: `npm install`
- Check Node version: `node --version` (should be v16+)

### API Calls Fail
- Check browser console for CORS errors
- Verify API routes start with `/api/`
- Ensure `NODE_ENV=production` is set

### Images Not Loading
- Check image URLs are absolute or properly resolved
- For base64 images, verify server has increased JSON limit

---

## 🎯 Performance Tips

1. **Enable Compression**
   ```bash
   cd server && npm install compression
   ```
   ```javascript
   import compression from 'compression';
   app.use(compression());
   ```

2. **Add Caching Headers**
   ```javascript
   app.use(express.static(buildPath, {
     maxAge: '1y',
     etag: true
   }));
   ```

3. **Use CDN for Static Assets** (Optional)
   - Upload `dist/assets/` to Cloudflare, AWS S3, etc.

4. **Database Connection Pooling**
   - Use Prisma's connection pooling
   - For Neon, use pooled connection URL

---

## 🔐 Security Checklist

- [ ] Environment variables are not committed to git
- [ ] CORS is configured for production domains
- [ ] Database uses SSL connections
- [ ] API rate limiting enabled (optional)
- [ ] Input validation on all forms
- [ ] SQL injection protected (Prisma handles this)

---

## 📊 Monitoring

- Add logging: `npm install winston`
- Monitor uptime: Use UptimeRobot or Pingdom
- Track errors: Sentry.io integration
- Database monitoring: Built-in with most providers

---

## 🔄 Updates & Redeployment

```bash
# Pull latest changes
git pull origin main

# Rebuild frontend
npm run build

# Restart server (PM2)
pm2 restart mixmaster

# Or for Render/Railway/Heroku - just push to main branch
git push origin main
```

---

## 📝 Quick Deploy Checklist

1. ✅ Build frontend: `npm run build`
2. ✅ Configure environment variables
3. ✅ Run database migrations
4. ✅ Test locally: `npm start`
5. ✅ Deploy to hosting platform
6. ✅ Verify all routes work
7. ✅ Test API endpoints
8. ✅ Check database connection

---

## 🆘 Need Help?

- Server logs: Check your hosting platform's logs
- Database issues: Use `npx prisma studio` to inspect data
- Build issues: Clear cache and rebuild

---

**Your app is now ready for production! 🎉🍹**
