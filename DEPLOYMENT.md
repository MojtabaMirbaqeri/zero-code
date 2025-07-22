# راهنمای Deployment - HR-Tech AI Hub

این راهنما مراحل کامل deployment وب‌سایت HR-Tech AI Hub را در پلتفرم‌های مختلف شرح می‌دهد.

## 📋 فهرست مطالب

1. [آماده‌سازی برای Production](#آماده‌سازی-برای-production)
2. [GitHub Pages](#github-pages)
3. [Netlify](#netlify)
4. [Vercel](#vercel)
5. [Custom Server](#custom-server)
6. [تنظیمات DNS](#تنظیمات-dns)
7. [SSL Certificate](#ssl-certificate)
8. [Monitoring و Analytics](#monitoring-و-analytics)

## 🔧 آماده‌سازی برای Production

### 1. بررسی و تست نهایی

```bash
# تست محلی
pnpm run dev

# بررسی build
pnpm run build
pnpm run preview
```

### 2. بهینه‌سازی فایل‌ها

#### تنظیمات Vite برای Production
فایل `vite.config.js`:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/', // برای GitHub Pages: '/repository-name/'
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          icons: ['lucide-react']
        }
      }
    }
  },
  server: {
    port: 5173,
    host: true
  }
})
```

### 3. متغیرهای محیطی

فایل `.env.production`:

```env
VITE_APP_TITLE=HR-Tech AI Hub
VITE_API_BASE_URL=https://api.hrtech-ai.com
VITE_ANALYTICS_ID=your-analytics-id
```

## 🐙 GitHub Pages

### روش 1: GitHub Actions (توصیه شده)

#### 1. ایجاد Workflow

فایل `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install pnpm
        run: npm install -g pnpm

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Build
        run: pnpm run build

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

#### 2. تنظیمات Repository

1. به **Settings** > **Pages** بروید
2. **Source** را **GitHub Actions** انتخاب کنید
3. فایل workflow را commit کنید

#### 3. تنظیم Base URL

اگر repository شما `username.github.io` نیست، `vite.config.js` را تغییر دهید:

```javascript
export default defineConfig({
  base: '/repository-name/',
  // ...
})
```

### روش 2: Manual Deployment

```bash
# Build کردن پروژه
pnpm run build

# نصب gh-pages
pnpm add -D gh-pages

# اضافه کردن script به package.json
"scripts": {
  "deploy": "gh-pages -d dist"
}

# Deploy
pnpm run deploy
```

## 🌐 Netlify

### روش 1: Git Integration (توصیه شده)

#### 1. اتصال Repository

1. وارد [Netlify](https://netlify.com) شوید
2. **New site from Git** را کلیک کنید
3. Repository خود را انتخاب کنید

#### 2. تنظیمات Build

```
Build command: pnpm run build
Publish directory: dist
Node version: 18
```

#### 3. فایل netlify.toml

```toml
[build]
  command = "pnpm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"
  NPM_FLAGS = "--version"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "*.css"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

### روش 2: Netlify CLI

```bash
# نصب Netlify CLI
npm install -g netlify-cli

# ورود به حساب
netlify login

# Build و deploy
pnpm run build
netlify deploy --prod --dir=dist
```

## ⚡ Vercel

### روش 1: Git Integration

#### 1. اتصال Repository

1. وارد [Vercel](https://vercel.com) شوید
2. **New Project** را کلیک کنید
3. Repository خود را import کنید

#### 2. تنظیمات Build

```
Framework Preset: Vite
Build Command: pnpm run build
Output Directory: dist
Install Command: pnpm install
```

#### 3. فایل vercel.json

```json
{
  "buildCommand": "pnpm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### روش 2: Vercel CLI

```bash
# نصب Vercel CLI
npm install -g vercel

# ورود به حساب
vercel login

# Deploy
vercel --prod
```

## 🖥️ Custom Server

### Docker Deployment

#### Dockerfile

```dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm run build

# Production stage
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### nginx.conf

```nginx
events {
    worker_connections 1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    server {
        listen 80;
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html;

        # Gzip compression
        gzip on;
        gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

        # Cache static assets
        location /assets/ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }

        # Handle client-side routing
        location / {
            try_files $uri $uri/ /index.html;
        }

        # Security headers
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header X-XSS-Protection "1; mode=block" always;
    }
}
```

#### Docker Commands

```bash
# Build image
docker build -t hr-tech-ai-hub .

# Run container
docker run -p 80:80 hr-tech-ai-hub

# Docker Compose
version: '3.8'
services:
  web:
    build: .
    ports:
      - "80:80"
    restart: unless-stopped
```

### VPS Deployment

#### 1. آماده‌سازی سرور

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install pnpm
npm install -g pnpm

# Install nginx
sudo apt install nginx -y

# Install PM2
npm install -g pm2
```

#### 2. Deploy کردن پروژه

```bash
# Clone repository
git clone https://github.com/your-username/hr-tech-ai-hub.git
cd hr-tech-ai-hub

# Install dependencies
pnpm install

# Build project
pnpm run build

# Copy files to nginx
sudo cp -r dist/* /var/www/html/

# Configure nginx
sudo nano /etc/nginx/sites-available/hr-tech-ai-hub
```

#### 3. تنظیمات Nginx

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/hr-tech-ai-hub /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## 🌍 تنظیمات DNS

### A Record
```
Type: A
Name: @
Value: YOUR_SERVER_IP
TTL: 3600
```

### CNAME Record
```
Type: CNAME
Name: www
Value: your-domain.com
TTL: 3600
```

### برای GitHub Pages
```
Type: CNAME
Name: @
Value: username.github.io
TTL: 3600
```

## 🔒 SSL Certificate

### Let's Encrypt (رایگان)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

### Cloudflare (توصیه شده)

1. دامنه را به Cloudflare اضافه کنید
2. DNS records را تنظیم کنید
3. SSL/TLS را روی "Full" قرار دهید
4. Always Use HTTPS را فعال کنید

## 📊 Monitoring و Analytics

### Google Analytics

```html
<!-- در index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Uptime Monitoring

#### UptimeRobot
1. حساب رایگان ایجاد کنید
2. Monitor جدید اضافه کنید
3. URL سایت را وارد کنید

#### Pingdom
1. حساب ایجاد کنید
2. Check جدید اضافه کنید
3. Alert تنظیم کنید

### Error Tracking

#### Sentry

```bash
# Install Sentry
pnpm add @sentry/react @sentry/tracing
```

```javascript
// در main.jsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  integrations: [
    new Sentry.BrowserTracing(),
  ],
  tracesSampleRate: 1.0,
});
```

## 🚀 Performance Optimization

### Build Optimization

```javascript
// vite.config.js
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['lucide-react']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
})
```

### CDN Setup

#### Cloudflare
1. دامنه را به Cloudflare اضافه کنید
2. Caching rules تنظیم کنید
3. Minification فعال کنید
4. Brotli compression فعال کنید

### Image Optimization

```bash
# Install imagemin
pnpm add -D vite-plugin-imagemin

# vite.config.js
import { defineConfig } from 'vite'
import { ViteImageOptimize } from 'vite-plugin-imagemin'

export default defineConfig({
  plugins: [
    ViteImageOptimize({
      gifsicle: { optimizationLevel: 7 },
      mozjpeg: { quality: 80 },
      pngquant: { quality: [0.65, 0.8] },
      svgo: {
        plugins: [
          { name: 'removeViewBox', active: false },
          { name: 'removeEmptyAttrs', active: false }
        ]
      }
    })
  ]
})
```

## 🔄 CI/CD Pipeline

### GitHub Actions Complete Workflow

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

env:
  NODE_VERSION: '18'

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
          
      - name: Install pnpm
        run: npm install -g pnpm
        
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
        
      - name: Run tests
        run: pnpm run test
        
      - name: Run linting
        run: pnpm run lint
        
      - name: Check build
        run: pnpm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
          
      - name: Install pnpm
        run: npm install -g pnpm
        
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
        
      - name: Build
        run: pnpm run build
        
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## 🐛 Troubleshooting

### مشکلات رایج

#### 1. 404 Error در Refresh
**علت**: SPA routing
**حل**: اضافه کردن redirect rules

#### 2. Assets Load نمی‌شوند
**علت**: Base URL اشتباه
**حل**: تنظیم صحیح `base` در vite.config.js

#### 3. Build Error
**علت**: Memory کم
**حل**: افزایش memory limit
```bash
NODE_OPTIONS="--max-old-space-size=4096" pnpm run build
```

#### 4. Slow Loading
**علت**: Bundle size زیاد
**حل**: Code splitting و lazy loading

### Logs و Debugging

```bash
# Netlify logs
netlify logs

# Vercel logs
vercel logs

# GitHub Actions logs
# در tab Actions repository
```

## 📞 پشتیبانی

برای مشکلات deployment:

1. **GitHub Issues**: [پروژه](https://github.com/your-username/hr-tech-ai-hub/issues)
2. **ایمیل**: deployment@hrtech-ai.com
3. **تلگرام**: @hrtech_deployment

---

**موفق باشید!** 🚀

