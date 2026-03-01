#!/bin/bash
# Fix nginx for proper CSS/JS serving

cat > /etc/nginx/sites-available/personaverse << 'EOF'
server {
    listen 80;
    listen [::]:80;
    server_name personaverse.space www.personaverse.space;
    
    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name personaverse.space www.personaverse.space;
    
    root /var/www/html;
    index index.html;
    
    # SSL certificates
    ssl_certificate /etc/letsencrypt/live/personaverse.space/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/personaverse.space/privkey.pem;
    
    # Proper MIME types for static files
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        try_files $uri =404;
    }
    
    # Handle _next static files
    location /_next/ {
        alias /var/www/html/_next/;
        try_files $uri $uri/ =404;
    }
    
    # All routes serve index.html (SPA)
    location / {
        try_files $uri $uri/ /index.html;
    }
}
EOF

nginx -t && systemctl reload nginx

echo "Nginx config updated!"
