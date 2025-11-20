# FinTrack - Deployment Guide

This guide covers deploying FinTrack to production using popular hosting platforms.

## Table of Contents

1. [Railway (Backend + Database)](#railway-deployment)
2. [Vercel (Frontend)](#vercel-deployment)
3. [Alternative: Render (Full Stack)](#render-deployment)
4. [Alternative: DigitalOcean](#digitalocean-deployment)

---

## Railway Deployment (Backend + Database)

Railway provides easy PostgreSQL hosting and Node.js deployment.

### Step 1: Create Railway Account

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub

### Step 2: Create New Project

1. Click "New Project"
2. Select "Provision PostgreSQL"
3. Wait for database to be created

### Step 3: Get Database URL

1. Click on PostgreSQL service
2. Go to "Connect" tab
3. Copy the `DATABASE_URL` (starts with `postgresql://`)

### Step 4: Deploy Backend

1. In the same project, click "New Service"
2. Select "GitHub Repo" and connect your repository
3. Select the `ITPM_PROJ` repository
4. Configure:
   - **Root Directory:** `server`
   - **Build Command:** `npm install && npx prisma generate && npm run build`
   - **Start Command:** `npm start`

### Step 5: Add Environment Variables

1. Go to backend service → Variables tab
2. Add the following:

```
DATABASE_URL=<paste-from-step-3>
JWT_SECRET=<generate-random-secret>
NODE_ENV=production
PORT=3000
```

To generate JWT_SECRET:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Step 6: Run Database Migrations

1. Go to backend service
2. Click "Settings" → "Deploy"
3. After deployment, open the service
4. Go to "Deployments" → Latest deployment → "View Logs"
5. Or use Railway CLI:

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Link to project
railway link

# Run migration
railway run npx prisma migrate deploy

# Seed database
railway run npm run seed
```

### Step 7: Get API URL

1. Go to backend service → Settings
2. Under "Networking", click "Generate Domain"
3. Copy the URL (e.g., `https://your-app.up.railway.app`)

---

## Vercel Deployment (Frontend)

### Step 1: Prepare Frontend

1. Update `client/.env.production`:

```env
VITE_API_URL=https://your-railway-backend.up.railway.app/api
```

### Step 2: Deploy to Vercel

1. Install Vercel CLI:

```bash
npm i -g vercel
```

2. Navigate to client directory:

```bash
cd client
```

3. Deploy:

```bash
vercel
```

4. Follow prompts:
   - Set up and deploy? **Y**
   - Which scope? (select your account)
   - Link to existing project? **N**
   - Project name: `fintrack-client`
   - In which directory is your code located? `./`
   - Want to override settings? **Y**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Development Command: `npm run dev`

### Step 3: Add Environment Variables

```bash
vercel env add VITE_API_URL
# Paste: https://your-railway-backend.up.railway.app/api
# Select: Production
```

### Step 4: Deploy to Production

```bash
vercel --prod
```

Your app will be live at: `https://fintrack-client.vercel.app`

---

## Render Deployment (Alternative Full Stack)

### Backend Deployment

1. Go to [render.com](https://render.com)
2. Sign up/Login with GitHub
3. Click "New +" → "PostgreSQL"
4. Configure:
   - Name: `fintrack-db`
   - Database: `fintrack`
   - User: `fintrack`
   - Region: (choose closest)
   - Plan: Free
5. Click "Create Database"
6. Copy "Internal Database URL"

### Create Web Service

1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Configure:
   - Name: `fintrack-api`
   - Region: (same as database)
   - Branch: `main`
   - Root Directory: `server`
   - Runtime: `Node`
   - Build Command: `npm install && npx prisma generate && npx prisma migrate deploy && npm run build`
   - Start Command: `npm start`

4. Add Environment Variables:
```
DATABASE_URL=<paste-internal-database-url>
JWT_SECRET=<generate-random>
NODE_ENV=production
```

5. Click "Create Web Service"

### Frontend Deployment on Render

1. Click "New +" → "Static Site"
2. Connect repository
3. Configure:
   - Name: `fintrack-app`
   - Branch: `main`
   - Root Directory: `client`
   - Build Command: `npm install && npm run build`
   - Publish Directory: `dist`

4. Add Environment Variable:
```
VITE_API_URL=https://fintrack-api.onrender.com/api
```

5. Click "Create Static Site"

---

## DigitalOcean Deployment (Alternative)

### Option 1: App Platform

1. Go to [DigitalOcean](https://www.digitalocean.com/)
2. Navigate to App Platform
3. Click "Create App"
4. Connect GitHub repository
5. Configure both frontend and backend as separate components
6. Add PostgreSQL database
7. Set environment variables
8. Deploy

### Option 2: Droplet + Docker

1. Create a Droplet (Ubuntu 22.04)
2. SSH into droplet
3. Install Docker and Docker Compose
4. Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:14
    environment:
      POSTGRES_DB: fintrack
      POSTGRES_USER: fintrack
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  backend:
    build: ./server
    environment:
      DATABASE_URL: postgresql://fintrack:${DB_PASSWORD}@postgres:5432/fintrack
      JWT_SECRET: ${JWT_SECRET}
      NODE_ENV: production
    ports:
      - "3000:3000"
    depends_on:
      - postgres

  frontend:
    build: ./client
    ports:
      - "80:80"
    depends_on:
      - backend

volumes:
  postgres_data:
```

5. Create `.env` file
6. Run `docker-compose up -d`

---

## Post-Deployment Checklist

### Backend

- [ ] Database migrations applied successfully
- [ ] Default categories seeded
- [ ] Environment variables set correctly
- [ ] API endpoint accessible
- [ ] CORS configured for frontend domain
- [ ] HTTPS enabled
- [ ] Health check endpoint working (`GET /`)

### Frontend

- [ ] Builds without errors
- [ ] API URL points to production backend
- [ ] All routes working
- [ ] Authentication flow working
- [ ] Data displays correctly
- [ ] Forms submit successfully
- [ ] Charts render properly

### Testing

- [ ] Create new user account
- [ ] Login/logout works
- [ ] Add transaction
- [ ] Edit transaction
- [ ] Delete transaction
- [ ] Dashboard loads correctly
- [ ] Filters work
- [ ] Charts display data

### Security

- [ ] Strong JWT secret used
- [ ] Database credentials secure
- [ ] `.env` files not committed
- [ ] HTTPS enabled
- [ ] CORS properly configured
- [ ] Input validation working
- [ ] SQL injection protected (Prisma)

### Performance

- [ ] API response times acceptable
- [ ] Frontend loads quickly
- [ ] Images optimized
- [ ] Database queries optimized
- [ ] Proper indexing on database

---

## Monitoring & Maintenance

### Logs

**Railway:**
- Go to service → Deployments → View Logs

**Render:**
- Go to service → Logs tab

**Vercel:**
- Go to deployment → Runtime Logs

### Database Backups

**Railway:**
- Automatic daily backups on paid plans
- Manual backup: Use `pg_dump`

**Render:**
- Automatic daily backups
- Point-in-time recovery available

### Updating the Application

1. Push changes to GitHub
2. Most platforms auto-deploy on push
3. Or trigger manual deployment from dashboard

```bash
# For Vercel
cd client
vercel --prod

# For Railway (if not auto-deploy)
railway up
```

---

## Troubleshooting

### Build Fails

- Check build logs
- Verify `package.json` scripts
- Ensure all dependencies are listed
- Check Node version compatibility

### Database Connection Fails

- Verify DATABASE_URL format
- Check database is running
- Verify network access
- Check credentials

### API Not Accessible

- Check service status
- Verify domain/URL
- Check CORS settings
- Review security groups/firewall

### Frontend Can't Reach API

- Verify VITE_API_URL is correct
- Check CORS on backend
- Verify API is running
- Check browser console for errors

---

## Cost Estimation

### Free Tier Options

**Railway:**
- $5 free credit monthly
- Good for development/testing

**Render:**
- Free tier available
- Services spin down after inactivity
- Database: 90 days retention

**Vercel:**
- Generous free tier
- Unlimited deployments
- Good for frontend

### Recommended Production Setup

- **Backend + Database:** Railway/Render ($5-10/month)
- **Frontend:** Vercel (Free)
- **Total:** ~$5-10/month

---

## Support

For deployment issues:

1. Check platform documentation
2. Review error logs
3. Verify environment variables
4. Check platform status page
5. Contact platform support

## Additional Resources

- [Railway Docs](https://docs.railway.app/)
- [Vercel Docs](https://vercel.com/docs)
- [Render Docs](https://render.com/docs)
- [Prisma Deployment](https://www.prisma.io/docs/guides/deployment)

---

Good luck with your deployment! 🚀
