#!/bin/bash
# Revert to working version

echo "=== Step 1: Remove broken files ==="
rm -rf /var/www/html
mkdir -p /var/www/html

echo ""
echo "=== Step 2: Download last known working version ==="
cd /tmp
wget -O personaverse-working.zip "https://raw.githubusercontent.com/officialzpb-jpg/personaverse/main/personaverse-working.zip" 2>/dev/null || echo "URL not available"

echo ""
echo "=== Step 3: If working zip not available, use backup ==="
if [ -f "personaverse-working.zip" ]; then
    unzip -o personaverse-working.zip -d /var/www/html/
    echo "Restored from working zip"
elif [ -d "/var/www/personaverse-backup" ]; then
    cp -r /var/www/personaverse-backup/* /var/www/html/
    echo "Restored from backup"
else
    echo "No working backup found"
fi

echo ""
echo "=== Step 4: Fix permissions ==="
chmod -R 755 /var/www/html/_next/ 2>/dev/null || true

echo ""
echo "=== Step 5: Restart nginx ==="
systemctl restart nginx

echo ""
echo "=== Done! Test: https://personaverse.space ==="
