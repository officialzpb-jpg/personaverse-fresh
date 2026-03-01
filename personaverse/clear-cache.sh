#!/bin/bash
# Clear all caches and verify files

echo "=== Clear nginx cache ==="
find /var/cache/nginx -type f -delete 2>/dev/null || echo "No nginx cache"

echo ""
echo "=== Check current _next folder ==="
ls -la /var/www/html/_next/static/chunks/ | grep -E "css|js" | wc -l

echo ""
echo "=== Verify CSS is accessible ==="
curl -s https://personaverse.space/_next/static/chunks/90ce22a39848a4c9.css | head -5

echo ""
echo "=== Check for 404s ==="
grep "404" /var/log/nginx/access.log | tail -5

echo ""
echo "=== Restart nginx ==="
systemctl restart nginx

echo ""
echo "Done! Now do a hard refresh in browser:"
echo "Ctrl+Shift+R or Cmd+Shift+R"
