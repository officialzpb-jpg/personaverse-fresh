#!/bin/bash
# Restore to working state and rebuild

echo "=== Step 1: Backup current (broken) files ==="
mv /var/www/html /var/www/html-broken-$(date +%s)

echo ""
echo "=== Step 2: Restore from backup if exists ==="
if [ -d "/var/www/personaverse-backup" ]; then
    cp -r /var/www/personaverse-backup /var/www/html
    echo "Restored from backup"
else
    echo "No backup found, will need to re-extract"
fi

echo ""
echo "=== Step 3: Clear all caches ==="
systemctl restart nginx

echo ""
echo "=== Done! ==="
echo "Test: https://personaverse.space"
echo ""
echo "If still broken, we need to:"
echo "1. Download fresh zip"
echo "2. Extract properly"
echo "3. Fix permissions"
