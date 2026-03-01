#!/bin/bash
# Fix nginx configuration for PersonaVerse

echo "Checking nginx configuration..."

# Check if default site exists and remove it
if [ -f /etc/nginx/sites-enabled/default ]; then
    echo "Removing default site..."
    rm -f /etc/nginx/sites-enabled/default
fi

# Ensure our site is enabled
if [ ! -f /etc/nginx/sites-enabled/personaverse ]; then
    echo "Enabling personaverse site..."
    ln -sf /etc/nginx/sites-available/personaverse /etc/nginx/sites-enabled/
fi

# Update the config to be default server
cat > /etc/nginx/sites-available/personaverse << 'EOF'
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    
    server_name 107.170.57.250 _;
    
    root /var/www/personaverse;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml;
}
EOF

# Test configuration
echo "Testing nginx configuration..."
nginx -t

# Restart nginx
echo "Restarting nginx..."
systemctl restart nginx

# Check status
echo "Nginx status:"
systemctl status nginx --no-pager

echo ""
echo "Checking if index.html exists..."
ls -la /var/www/personaverse/index.html

echo ""
echo "Done! Try accessing http://107.170.57.250"
