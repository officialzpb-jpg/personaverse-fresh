#!/bin/bash
# Fix CSS/JS loading issues

echo "Checking _next folder..."
ls -la /var/www/personaverse/_next/

echo ""
echo "Checking _next/static..."
ls -la /var/www/personaverse/_next/static/ 2>/dev/null || echo "No static folder"

echo ""
echo "Checking nginx config for _next..."

# Update nginx config to properly serve _next files
cat > /etc/nginx/sites-available/personaverse << 'EOF'
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name _;
    root /var/www/personaverse;
    index index.html;
    
    # Serve static files with proper MIME types
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        try_files $uri =404;
    }
    
    # Handle Next.js _next static files
    location /_next/ {
        alias /var/www/personaverse/_next/;
        try_files $uri $uri/ =404;
    }
    
    # All other routes serve index.html (SPA)
    location / {
        try_files $uri $uri/ /index.html;
    }
}
EOF

echo ""
echo "Testing nginx..."
nginx -t && systemctl restart nginx

echo ""
echo "Done! Refresh your browser."
