#!/bin/bash
# Fix domain configuration

echo "Checking DNS resolution..."
dig personaverse.space +short

echo ""
echo "Checking nginx server_name config..."
grep -r "server_name" /etc/nginx/sites-enabled/

echo ""
echo "Updating nginx to handle both IP and domain..."
cat > /etc/nginx/sites-available/personaverse << 'EOF'
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    
    server_name personaverse.space www.personaverse.space _;
    
    root /var/www/html;
    index index.html;
    
    location / {
        try_files $uri $uri/ =404;
    }
    
    location /_next/ {
        alias /var/www/html/_next/;
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
echo "Done! Try https://personaverse.space now"
