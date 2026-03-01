#!/bin/bash
# Verify admin deployment

echo "=== Checking admin folder ==="
ls -la /var/www/html/admin/

echo ""
echo "=== Checking admin login page ==="
ls -la /var/www/html/admin/login/ 2>/dev/null || echo "Login folder not found"

echo ""
echo "=== Test with curl ==="
curl -s -o /dev/null -w "%{http_code}" http://personaverse.space/admin/login
echo " - http://personaverse.space/admin/login"

curl -s -o /dev/null -w "%{http_code}" https://personaverse.space/admin/login
echo " - https://personaverse.space/admin/login"

echo ""
echo "=== Done! Test these URLs ==="
echo "Main site: https://personaverse.space"
echo "Admin login: https://personaverse.space/admin/login"
echo "Demo credentials: admin@personaverse.space / admin123"
