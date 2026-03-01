#!/bin/bash
# Force cache refresh by modifying index.html

cd /var/www/html

# Add cache-busting meta tag to index.html
sed -i 's/<head>/<head>\n  <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">\n  <meta http-equiv="Pragma" content="no-cache">\n  <meta http-equiv="Expires" content="0">/' index.html

# Also add version query to CSS/JS references
sed -i 's/\.css"/\.css?v=2"/g' index.html
sed -i 's/\.js"/\.js?v=2"/g' index.html

echo "Cache headers added!"

# Restart nginx
systemctl restart nginx

echo "Done! Hard refresh your browser now."
