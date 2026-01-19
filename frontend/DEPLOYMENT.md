# MindWise Frontend - Deployment Guide

## Development Setup (Local)

### Requirements
- Node.js 16 or higher
- npm or yarn
- Backend running at http://localhost:8000

### Steps
```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# Server will start at http://localhost:3000 (or 3001 if 3000 is busy)
```

## Production Build

### Create Build
```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### Test Production Build Locally
```bash
npm run preview
```

## Environment Configuration

### Development (.env.local - optional)
```env
VITE_API_BASE_URL=http://localhost:8000
```

### Production (.env.production - optional)
```env
VITE_API_BASE_URL=https://api.yourdomain.com
```

**Note:** Currently API URL is hardcoded in `src/utils/constants.js`. Update it for production.

## Deployment Options

### Option 1: Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Configure:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
4. Add environment variable:
   - `VITE_API_BASE_URL`: Your production API URL
5. Deploy

### Option 2: Netlify

1. Push code to GitHub
2. Import project in Netlify
3. Configure:
   - Build Command: `npm run build`
   - Publish Directory: `dist`
4. Add environment variable:
   - `VITE_API_BASE_URL`: Your production API URL
5. Create `netlify.toml`:

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Option 3: Static Hosting (Nginx/Apache)

1. Build the project:
```bash
npm run build
```

2. Upload `dist/` contents to your web server

3. Configure server for SPA (Single Page App):

**Nginx:**
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/mindwise;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

**Apache (.htaccess):**
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### Option 4: Docker

Create `Dockerfile`:
```dockerfile
FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Create `nginx.conf`:
```nginx
server {
    listen 80;
    location / {
        root /usr/share/nginx/html;
        index index.html;
        try_files $uri $uri/ /index.html;
    }
}
```

Build and run:
```bash
docker build -t mindwise-frontend .
docker run -p 80:80 mindwise-frontend
```

## Pre-Deployment Checklist

- [ ] Update API base URL in `src/utils/constants.js` or use environment variables
- [ ] Test production build locally (`npm run build && npm run preview`)
- [ ] Verify all API endpoints are accessible from production
- [ ] Configure CORS on backend to allow frontend domain
- [ ] Test authentication flow end-to-end
- [ ] Verify Google Drive resume links work in production
- [ ] Check responsive design on mobile devices
- [ ] Test all routes and navigation
- [ ] Verify error handling and loading states
- [ ] Check toast notifications work correctly

## Backend Requirements for Production

1. **CORS Configuration**
   - Allow your frontend domain
   - Allow credentials for JWT

2. **HTTPS**
   - Backend should use HTTPS in production
   - Update frontend API URL to https://

3. **Environment Variables**
   - Set up production database
   - Configure production API keys
   - Set secure JWT secret

## Monitoring & Analytics (Optional)

### Add Google Analytics
1. Create GA4 property
2. Add to `index.html`:
```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Error Tracking (Sentry)
```bash
npm install @sentry/react
```

Add to `src/main.jsx`:
```javascript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: import.meta.env.MODE,
});
```

## Performance Optimization

### Code Splitting
Update routes to use lazy loading:
```javascript
import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const JobDetail = lazy(() => import('./pages/JobDetail'));

// In Routes:
<Suspense fallback={<Loader />}>
  <Dashboard />
</Suspense>
```

### Image Optimization
- Use WebP format
- Implement lazy loading
- Add proper alt tags

### Bundle Analysis
```bash
npm run build -- --mode analyze
```

## Security Best Practices

1. **Environment Variables**
   - Never commit `.env` files
   - Use different values for dev/prod

2. **JWT Tokens**
   - Consider using httpOnly cookies instead of localStorage
   - Implement token refresh mechanism

3. **API Security**
   - Validate all inputs
   - Sanitize user data
   - Implement rate limiting on backend

4. **Content Security Policy**
   Add to `index.html`:
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline'; 
               style-src 'self' 'unsafe-inline'; 
               img-src 'self' data: https:;">
```

## Troubleshooting Production Issues

**Issue: White screen after deployment**
- Check browser console for errors
- Verify build was successful
- Check server routing configuration
- Ensure all assets loaded correctly

**Issue: API calls failing**
- Verify CORS configuration
- Check API base URL
- Verify backend is accessible
- Check network tab in DevTools

**Issue: Authentication not working**
- Clear localStorage
- Check JWT token format
- Verify backend accepts Bearer token
- Check token expiry

## Post-Deployment Testing

1. Test all user flows:
   - Registration → Login → Dashboard → Analyze → Job Detail
2. Test on different devices (mobile, tablet, desktop)
3. Test on different browsers (Chrome, Firefox, Safari, Edge)
4. Verify all API integrations
5. Check loading states and error handling
6. Test logout and re-login

## Maintenance

### Update Dependencies
```bash
# Check for updates
npm outdated

# Update all dependencies
npm update

# Update major versions (carefully)
npm install <package>@latest
```

### Monitor Performance
- Use Lighthouse for audits
- Monitor bundle size
- Track Core Web Vitals
- Monitor API response times

---

## Quick Reference

**Dev Server:** `npm run dev`  
**Build:** `npm run build`  
**Preview Build:** `npm run preview`  
**Port:** 3000 (default)  
**Build Output:** `dist/`  

For questions or issues, check the main README.md or QUICKSTART.md
