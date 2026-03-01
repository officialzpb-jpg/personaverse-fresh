#!/bin/bash
# Fix conflicting nginx configs

echo "Finding and removing conflicting nginx configs..."

# Find all configs that reference our IP
echo "Configs with our IP:"
grep -r "107.170.57.250" /etc/nginx/ 2>/dev/null | grep -v ".bak"

# Remove all enabled sites except ours
echo ""
echo "Removing all enabled sites..."
rm -f /etc/nginx/sites-enabled/*

# Create clean config
echo "Creating clean config..."
cat > /etc/nginx/sites-available/personaverse << 'EOF'
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    
    server_name _;
    
    root /var/www/personaverse;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
EOF

# Enable only our site
ln -s /etc/nginx/sites-available/personaverse /etc/nginx/sites-enabled/personaverse

# Test
echo ""
echo "Testing nginx:"
nginx -t

# Restart
echo ""
echo "Restarting nginx:"
systemctl restart nginx

echo ""
echo "Done! Check http://107.170.57.250"
