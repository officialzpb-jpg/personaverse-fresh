#!/bin/bash
# Debug _next folder issues

echo "=== CHECKING _NEXT FOLDER ==="
echo ""

echo "1. Check if _next exists:"
ls -la /var/www/personaverse/ | grep _next
echo ""

echo "2. Check _next contents:"
ls -la /var/www/personaverse/_next/ 2>/dev/null || echo "_next folder not found or empty"
echo ""

echo "3. Check permissions:"
stat /var/www/personaverse/_next/ 2>/dev/null || echo "Cannot stat _next"
echo ""

echo "4. Check nginx error log for 404s:"
grep "_next" /var/log/nginx/error.log | tail -10
echo ""

echo "5. Check nginx access log:"
grep "_next" /var/log/nginx/access.log | tail -5
echo ""

echo "6. Test direct access to CSS:"
ls /var/www/personaverse/_next/static/css/ 2>/dev/null || echo "No CSS folder"
echo ""
