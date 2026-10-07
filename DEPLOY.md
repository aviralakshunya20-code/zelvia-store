# Deployment & Domain Configuration Guide for OnlineMeasurer.com

This document explains how to set up and verify a permanent **301 redirect** between the `www` and `non-www` (apex) domain for **onlinemeasurer.com**, ensuring SEO equity is consolidated to a single canonical URL.

---

## 1. Choosing Your Canonical Domain

For `onlinemeasurer.com`, we recommend the apex domain as canonical:
- **Canonical Address**: `https://onlinemeasurer.com/`
- **Redirect Address**: `https://www.onlinemeasurer.com/` &rarr; 301 &rarr; `https://onlinemeasurer.com/`

---

## 2. Setting Up 301 Redirect on Popular Hosts

### Option A: Vercel (Recommended if hosting on Vercel)
1. Go to your project dashboard on Vercel: **Settings &rarr; Domains**.
2. Add both domains:
   - `onlinemeasurer.com`
   - `www.onlinemeasurer.com`
3. Click **Edit** next to `www.onlinemeasurer.com`.
4. Choose **"Redirect to onlinemeasurer.com"** with status code **301 (Permanent)**.
5. In your DNS provider (e.g., Cloudflare, Namecheap, GoDaddy):
   - Apex `A` record points to `76.76.21.21` (or CNAME `@` to `cname.vercel-dns.com`)
   - `CNAME` for `www` points to `cname.vercel-dns.com`

---

### Option B: Cloudflare DNS / Page Rules
1. Add both DNS records in Cloudflare:
   - `A` record for `@` pointing to your origin server IP (Proxied - Orange Cloud).
   - `CNAME` for `www` pointing to `onlinemeasurer.com` (Proxied - Orange Cloud).
2. Go to **Rules &rarr; Redirect Rules** (or Page Rules):
   - **Rule Name**: "Redirect WWW to Apex"
   - **When incoming requests match**: `Hostname equals www.onlinemeasurer.com`
   - **Then redirect to**: `Dynamic` &rarr; `concat("https://onlinemeasurer.com", http.request.uri.path)`
   - **Status code**: `301 Moved Permanently`

---

### Option C: Nginx (VPS / Dedicated Server)
Add a server block in your Nginx configuration (`/etc/nginx/sites-available/onlinemeasurer`):

```nginx
# Redirect www to non-www
server {
    listen 80;
    listen 443 ssl http2;
    server_name www.onlinemeasurer.com;

    # SSL certificates for www
    ssl_certificate /etc/letsencrypt/live/www.onlinemeasurer.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/www.onlinemeasurer.com/privkey.pem;

    return 301 https://onlinemeasurer.com$request_uri;
}

# Main site block
server {
    listen 80;
    listen 443 ssl http2;
    server_name onlinemeasurer.com;
    root /var/www/onlinemeasurer;
    index index.html;
    # ... rest of configuration ...
}
```

---

### Option D: Apache (.htaccess)
Add the following to the top of your `.htaccess` file in the document root:

```apache
RewriteEngine On
RewriteCond %{HTTP_HOST} ^www\.onlinemeasurer\.com$ [NC]
RewriteRule ^(.*)$ https://onlinemeasurer.com/$1 [L,R=301]
```

---

## 3. How to Verify the 301 Redirect

Run the following commands in your terminal or command prompt:

### Test 1: Verify HTTP to HTTPS Redirect
```bash
curl -I http://onlinemeasurer.com/
```
**Expected Output:**
```http
HTTP/1.1 301 Moved Permanently
Location: https://onlinemeasurer.com/
```

### Test 2: Verify WWW to Non-WWW 301 Redirect
```bash
curl -I https://www.onlinemeasurer.com/
```
**Expected Output:**
```http
HTTP/2 301
location: https://onlinemeasurer.com/
```

### Test 3: Verify Subpath Preservation
```bash
curl -I https://www.onlinemeasurer.com/ruler/
```
**Expected Output:**
```http
HTTP/2 301
location: https://onlinemeasurer.com/ruler/
```

### Test 4: Verify Canonical Host Serves 200 OK
```bash
curl -I https://onlinemeasurer.com/
```
**Expected Output:**
```http
HTTP/2 200
content-type: text/html; charset=utf-8
```

---

## 4. Google Search Console & AdSense Notes
- In **Google Search Console**, add the **Domain property** `onlinemeasurer.com` via DNS TXT record. This automatically covers all subdomains, protocols (`http://` and `https://`), and `www`.
- In **Google AdSense**, add the apex domain `onlinemeasurer.com`. AdSense will automatically inspect both apex and `www` when the 301 redirect is active.
