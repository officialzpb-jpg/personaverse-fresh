#!/bin/bash
# Check CSS files

echo "=== Check _next folder ==="
ls -la /var/www/html/_next/ 2>/dev/null || echo "_next folder missing"

echo ""
echo "=== Check CSS files ==="
find /var/www/html/_next -name "*.css" 2>/dev/null | head -5

echo ""
echo "=== Check permissions ==="
ls -la /var/www/html/_next/static/ 2>/dev/null || echo "static folder missing"

echo ""
echo "=== Fix permissions ==="
chmod -R 755 /var/www/html/_next/ 2>/dev/null || echo "Cannot fix permissions"

echo ""
echo "=== Test CSS loading ==="
curl -I http://personaverse.space/_next/static/css/*.css 2>/dev/null | head -5
