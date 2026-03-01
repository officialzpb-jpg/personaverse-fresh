#!/bin/bash
# Full diagnostic

echo "=== NGINX STATUS ==="
systemctl status nginx --no-pager

echo ""
echo "=== NGINX CONFIG ==="
cat /etc/nginx/sites-enabled/personaverse

echo ""
echo "=== TEST NGINX ==="
nginx -t

echo ""
echo "=== CHECK FILES ==="
ls -la /var/www/html/

echo ""
echo "=== CHECK DOMAIN ==="
curl -I http://personaverse.space 2>/dev/null | head -5
curl -I http://107.170.57.250 2>/dev/null | head -5

echo ""
echo "=== ERROR LOG ==="
tail -5 /var/log/nginx/error.log
