#!/bin/bash
# Debug nginx 404 issue

echo "=== NGINX DEBUG ==="
echo ""

echo "1. Checking nginx configuration:"
cat /etc/nginx/sites-enabled/personaverse
echo ""

echo "2. Checking what sites are enabled:"
ls -la /etc/nginx/sites-enabled/
echo ""

echo "3. Checking files in web root:"
ls -la /var/www/personaverse/ | head -20
echo ""

echo "4. Checking if index.html exists:"
file /var/www/personaverse/index.html
echo ""

echo "5. Checking nginx error log:"
tail -20 /var/log/nginx/error.log
echo ""

echo "6. Checking nginx access log:"
tail -10 /var/log/nginx/access.log
echo ""

echo "7. Testing nginx config again:"
nginx -t
echo ""

echo "8. Checking nginx process:"
ps aux | grep nginx
echo ""

echo "9. Checking default nginx config:"
grep -r "root" /etc/nginx/nginx.conf | head -5
echo ""
