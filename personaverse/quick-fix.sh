#!/bin/bash
# Quick fix - just restart services and clear caches

echo "Restarting nginx..."
systemctl restart nginx

echo "Clearing system cache..."
sync && echo 3 > /proc/sys/vm/drop_caches 2>/dev/null || true

echo "Done!"
echo ""
echo "Now on your browser:"
echo "1. Press Ctrl+Shift+R (hard refresh)"
echo "2. OR clear browser cache completely"
echo "3. Then visit https://personaverse.space"
