#!/bin/bash
# Fix nginx configuration

echo "Checking current setup..."

# Check if index.html exists in dist
ls -la /var/www/personaverse/dist/index.html

# The issue is nginx is looking at /var/www/personaverse/ not /var/www/personaverse/dist/
# Let's copy dist contents to the web root or fix nginx

echo ""
echo "Option 1: Copy dist to web root"
cp -r /var/www/personaverse/dist/* /var/www/html/

# Or update nginx to point directly to dist
cat > /etc/nginx/sites-available/personaverse << 'EOF'
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name _;
    
    root /var/www/personaverse/dist;
    index index.html;
    
    location / {
        try_files $uri $uri.html $uri/ =404;
    }
    
    location /_next/ {
        alias /var/www/personaverse/dist/_next/;
    }
}
EOF

echo ""
echo "Testing nginx..."
nginx -t

echo ""
echo "Reloading nginx..."
systemctl reload nginx

echo ""
echo "Done!"
