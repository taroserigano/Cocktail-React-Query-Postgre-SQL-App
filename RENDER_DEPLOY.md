# Render.com Deployment Configuration

## Service Configuration

### Build Command
```
npm run build:full
```

### Start Command
```
npm start
```

### Environment Variables

Add these in the Render dashboard:

```
NODE_ENV=production
DATABASE_URL=your-neon-database-url-here
PORT=5000
```

### Auto-Deploy
- ✅ Enable auto-deploy from main branch
- ✅ Branch: main
- ✅ Root Directory: /

### Health Check Path (Optional)
```
/api/health
```

## Database Setup (Neon)

1. Create a Neon database at https://neon.tech
2. Copy the connection string
3. Add to Render environment variables as `DATABASE_URL`
4. Format: `postgresql://user:pass@host.region.aws.neon.tech/dbname?sslmode=require`

## Post-Deploy

After first deployment, run migrations in Render Shell:

```bash
cd server
npx prisma migrate deploy
npx prisma generate
```

## Logs

Monitor deployment logs in Render dashboard:
- Build logs: Shows npm install and build process
- Runtime logs: Shows server startup and requests

## Custom Domain (Optional)

1. Go to Settings → Custom Domain
2. Add your domain
3. Update DNS records as shown
4. SSL certificate automatically provisioned

---

**That's it! Your app should be live at your Render URL** 🚀
