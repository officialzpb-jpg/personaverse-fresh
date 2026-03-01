#!/bin/bash
# Debug CSS loading issue

echo "=== Check CSS file permissions ==="
ls -la /var/www/html/_next/static/chunks/90ce22a39848a4c9.css

echo ""
echo "=== Check nginx config for _next ==="
grep -A5 "_next" /etc/nginx/sites-enabled/personaverse

echo ""
echo "=== Test direct CSS access ==="
curl -I http://personaverse.space/_next/static/chunks/90ce22a39848a4c9.css

echo ""
echo "=== Check if CSS is readable ==="
head -5 /var/www/html/_next/static/chunks/90ce22a39848a4c9.css

echo ""
echo "=== Check for 404 errors in nginx ==="
grep "_next" /var/log/nginx/error.log | tail -5
