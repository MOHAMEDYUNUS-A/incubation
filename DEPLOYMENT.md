# MASTER Incubation Foundation (MIF) — Global Hosting & Production Deployment Guide

This repository contains the full production-ready web application for the **MASTER Incubation Foundation (MAM College of Engineering and Technology, Siruganur, Tiruchirappalli)**.

This guide provides step-by-step instructions for deploying the platform globally across:
1. **Hostinger VPS / Linux Ubuntu (PM2 + Nginx + SSL)** *(Recommended for custom domains & full server control)*
2. **Docker & Docker Compose** *(Containerized, reproducible one-click setup)*
3. **Vercel / Cloudflare / Netlify** *(Serverless Git-integrated CI/CD)*

---

## 1. System Architecture & Live-Admin Sync Connectivity

The platform includes a real-time dual-tier persistence and live synchronization architecture:
- **Admin CMS**: Changes to hero statements, leadership, ecosystem metrics, mentors, photo gallery, events, startups, and contact channels are saved via `POST /api/admin/content`.
- **Dual Persistence**: On VPS/local disk, data persists directly to bundled JSON files (`src/data/site-content.json`). On serverless read-only hosts (such as Vercel), data seamlessly dual-writes to ephemeral `/tmp/` storage with fallback.
- **Client Synchronization**:
  - **Cross-Tab Sync**: Uses `window.addEventListener('storage')` and custom `mif_content_changed` events.
  - **Focus & Visibility Revalidation**: Live client windows automatically re-fetch whenever the user returns to the tab.
  - **Continuous Background Polling**: A lightweight 20-second background timer syncs changes to live visitor screens without requiring hard page refreshes.
  - **Zero-Cache API Headers**: `no-store, no-cache, must-revalidate` guarantees visitors never see stale cached data.

---

## 2. Option A: Hostinger VPS / Linux (Ubuntu 22.04 / 24.04 LTS)

### Prerequisites
- Node.js 20.x LTS or higher
- Git
- PM2 (`npm install -g pm2`)
- Nginx & Certbot (for free Let's Encrypt SSL)

### Step 1: Install Node.js & Dependencies on the Server
```bash
# Update server packages
sudo apt update && sudo apt upgrade -y

# Install Node.js 20 LTS via NodeSource
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs nginx git certbot python3-certbot-nginx

# Install PM2 globally
sudo npm install -g pm2
```

### Step 2: Clone & Build the Application
```bash
# Navigate to web root
cd /var/www

# Clone repository
git clone https://github.com/niranjanr2005/Incubation.git master-incubation
cd master-incubation

# Install dependencies and generate Prisma client
npm ci
npx prisma generate

# Create production environment file
cp .env.example .env
nano .env
```

Ensure `.env` contains:
```env
NODE_ENV=production
PORT=3000
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your-random-32-char-secret-key-here
ADMIN_PASSWORD=your-secure-admin-password
DATABASE_URL="file:./prisma/dev.db"
```

### Step 3: Compile Production Build
```bash
npm run build
```

### Step 4: Launch with PM2 (Cluster Mode)
The repository includes an optimized `ecosystem.config.js`:
```bash
# Start the PM2 cluster utilizing all CPU cores
pm2 start ecosystem.config.js

# Save PM2 process list so it automatically restarts on system reboot
pm2 save
pm2 startup
```

To manage the app:
- `pm2 status` — Check status and CPU/RAM usage
- `pm2 logs master-incubation-foundation` — View real-time logs
- `pm2 reload master-incubation-foundation` — Zero-downtime rolling reload

### Step 5: Configure Nginx as Reverse Proxy
Create `/etc/nginx/sites-available/master-incubation`:
```nginx
server {
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Cache static Next.js assets
    location /_next/static {
        proxy_pass http://127.0.0.1:3000;
        proxy_cache_valid 200 365d;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    client_max_body_size 25M;
}
```

Enable site and restart Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/master-incubation /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Step 6: Activate SSL with Let's Encrypt
```bash
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

---

## 3. Option B: Docker & Docker Compose Deployment

The repository includes a multi-stage `Dockerfile` and `docker-compose.yml`.

### Quick Start
```bash
# 1. Build and run container in detached mode
docker compose up -d --build

# 2. Inspect running container
docker ps

# 3. View application logs
docker compose logs -f

# 4. Stop container
docker compose down
```

The container runs with unprivileged user `nextjs:nodejs`, includes built-in health checks (`/api/health`), and binds to port `3000`.

---

## 4. Option C: Vercel One-Click Deployment

1. Push your code to GitHub.
2. In the Vercel Dashboard, click **Add New Project** and select the repository.
3. Configure Environment Variables:
   - `NEXTAUTH_URL`: `https://your-project.vercel.app`
   - `NEXTAUTH_SECRET`: (Random 32-character string)
   - `ADMIN_PASSWORD`: (Your admin dashboard password)
4. Click **Deploy**. Vercel uses `vercel.json` with automated headers and Prisma generation.

---

## 5. Verifying Admin-to-Live Connectivity
1. Open the live homepage `/` in a browser window.
2. In a second window or mobile device, log in to `/admin` using your admin credentials.
3. Update a field (e.g., Announcement banner or Hero badge) and click **Save Changes**.
4. Observe the live window: the content automatically revalidates and updates via real-time sync.

---

## 6. Health & Monitoring Endpoints
- **Health check**: `GET /api/health` — Returns `200 OK` with JSON status.
- **Admin Content Sync**: `GET /api/admin/content` / `POST /api/admin/content`.
- **Ecosystem API**: `GET /api/ecosystem` / `POST /api/ecosystem`.
