#!/bin/bash
# Configure nginx for personaverse.space with HTTPS

echo "Updating nginx for personaverse.space..."

# Create new config with your domain
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
    
    root /var/www/personaverse;
    index index.html;
    
    # SSL certificates (Certbot will create these)
    ssl_certificate /etc/letsencrypt/live/personaverse.space/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/personaverse.space/privkey.pem;
    
    # SSL security settings
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    
    # HSTS (optional but recommended)
    add_header Strict-Transport-Security "max-age=63072000" always;
    
    # Static files
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # _next static files
    location /_next/ {
        alias /var/www/personaverse/_next/;
    }
    
    # All routes
    location / {
        try_files $uri $uri/ /index.html;
    }
}
EOF

# Test nginx
echo "Testing nginx configuration..."
nginx -t

# Reload nginx
echo "Reloading nginx..."
systemctl reload nginx

echo ""
echo "Done! Your site should be accessible at:"
echo "  https://personaverse.space"
echo "  https://www.personaverse.space"
