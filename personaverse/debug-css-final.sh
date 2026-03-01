#!/bin/bash
# Debug CSS serving issue

echo "=== Test CSS file directly ==="
curl -s https://personaverse.space/_next/static/chunks/90ce22a39848a4c9.css | head -3

echo ""
echo "=== Check file permissions ==="
ls -la /var/www/html/_next/static/chunks/90ce22a39848a4c9.css

echo ""
echo "=== Check if file is readable ==="
head -3 /var/www/html/_next/static/chunks/90ce22a39848a4c9.css

echo ""
echo "=== Check nginx config ==="
grep -A3 "location /_next" /etc/nginx/sites-available/personaverse

echo ""
echo "=== Test with verbose curl ==="
curl -v https://personaverse.space/_next/static/chunks/90ce22a39848a4c9.css 2>&1 | grep -E "HTTP|Content-Type|Content-Length"
