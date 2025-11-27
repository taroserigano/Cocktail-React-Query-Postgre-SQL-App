# Deployment Checklist

## Pre-Deployment ✓

- [ ] **Environment file created**
  - Copy `.env.example` to `server/.env`
  - Add production `DATABASE_URL`

- [ ] **Database setup**
  - Created PostgreSQL database (Neon/Railway/Supabase)
  - Connection string copied

- [ ] **Code ready**
  - All changes committed to git
  - Pushed to main branch

## Build & Test Locally ✓

- [ ] **Install dependencies**
  ```bash
  npm install
  cd server && npm install && cd ..
  ```

- [ ] **Build frontend**
  ```bash
  npm run build
  ```
  Should create `dist/` folder with HTML, CSS, JS

- [ ] **Test production mode locally**
  ```bash
  npm start
  ```
  Visit http://localhost:5000
  - [ ] Homepage loads
  - [ ] Search works
  - [ ] Filters work
  - [ ] My Cocktails page loads
  - [ ] Can create a cocktail
  - [ ] Individual cocktail pages load
  - [ ] API endpoints respond

## Deploy to Hosting Platform ✓

### Render.com
- [ ] Created new Web Service
- [ ] Connected GitHub repo
- [ ] Set Build Command: `npm run build:full`
- [ ] Set Start Command: `npm start`
- [ ] Added environment variable: `NODE_ENV=production`
- [ ] Added environment variable: `DATABASE_URL=...`
- [ ] Triggered first deployment
- [ ] Deployment succeeded
- [ ] App is accessible at Render URL

### Railway.app
- [ ] Created new project from GitHub
- [ ] Added PostgreSQL plugin
- [ ] Set environment variable: `NODE_ENV=production`
- [ ] Deployment triggered automatically
- [ ] App is accessible at Railway URL

### Other Platforms
- [ ] Build command configured
- [ ] Start command configured
- [ ] Environment variables set
- [ ] First deployment completed

## Post-Deployment Testing ✓

Visit your deployed URL and test:

- [ ] **Homepage**
  - [ ] Page loads without errors
  - [ ] Particles animate smoothly
  - [ ] Search bar works
  - [ ] Cocktails display

- [ ] **Filters**
  - [ ] Alcoholic/Non-alcoholic filter works
  - [ ] Category filters work
  - [ ] Favorites filter works

- [ ] **Cocktail Details**
  - [ ] Click on cocktail opens detail page
  - [ ] All data displays correctly
  - [ ] Share button works
  - [ ] Browser back button works

- [ ] **My Cocktails**
  - [ ] Form loads
  - [ ] Can fill out form
  - [ ] Image upload works
  - [ ] URL input works
  - [ ] Can submit cocktail
  - [ ] Redirects to homepage
  - [ ] New cocktail appears in list

- [ ] **Navigation**
  - [ ] All nav links work
  - [ ] Logo links to home
  - [ ] Random cocktail button works
  - [ ] About page loads

- [ ] **Database**
  - [ ] Custom cocktails persist
  - [ ] Can create new cocktails
  - [ ] Favorites save to localStorage

## Performance Check ✓

- [ ] **Load Times**
  - [ ] Initial page load < 3 seconds
  - [ ] API responses < 1 second
  - [ ] Images load properly

- [ ] **Mobile**
  - [ ] Test on phone browser
  - [ ] Responsive design works
  - [ ] Touch interactions work

- [ ] **Console**
  - [ ] No errors in browser console
  - [ ] No 404s for assets
  - [ ] No CORS errors

## Database Verification ✓

- [ ] **Migrations**
  ```bash
  # In hosting platform shell/terminal
  cd server
  npx prisma migrate deploy
  npx prisma generate
  ```

- [ ] **Connection**
  - [ ] Database connects successfully
  - [ ] Tables created
  - [ ] Can insert data
  - [ ] Can query data

## Monitoring Setup ✓

- [ ] **Logs configured**
  - [ ] Can view server logs
  - [ ] Can view build logs
  - [ ] Error tracking enabled

- [ ] **Uptime monitoring** (Optional)
  - [ ] UptimeRobot configured
  - [ ] Email alerts set up

## Documentation ✓

- [ ] **README updated**
  - [ ] Live URL added
  - [ ] Deployment instructions included

- [ ] **Environment variables documented**
  - [ ] All required vars listed
  - [ ] Example values provided

## Security ✓

- [ ] **Environment**
  - [ ] `.env` files not committed to git
  - [ ] `.env.production` in `.gitignore`
  - [ ] Database credentials secure

- [ ] **API**
  - [ ] CORS configured if needed
  - [ ] API routes protected
  - [ ] Input validation working

## Optional Enhancements ✓

- [ ] **Custom Domain**
  - [ ] Domain purchased
  - [ ] DNS configured
  - [ ] SSL certificate active

- [ ] **CDN** (Optional)
  - [ ] Static assets on CDN
  - [ ] Images optimized

- [ ] **Analytics** (Optional)
  - [ ] Google Analytics added
  - [ ] Tracking code installed

---

## Troubleshooting Issues

### Build Fails
```bash
# Clear and rebuild
rm -rf node_modules dist
npm install
npm run build
```

### Database Connection Issues
- Check connection string format
- Verify SSL mode (`?sslmode=require`)
- Test connection in Prisma Studio

### 404 Errors on Routes
- Ensure server.js has wildcard route
- Verify dist/ folder exists
- Check build completed successfully

### API Not Working
- Verify environment variables set
- Check server logs for errors
- Test API endpoints directly

---

**Deployment Complete! 🎉**

Your Mixmaster app is now live and ready to serve cocktails! 🍹
