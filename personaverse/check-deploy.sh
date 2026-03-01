#!/bin/bash
# Check what happened with the deploy

echo "=== Check /tmp ==="
ls -la /tmp/ | grep personaverse

echo ""
echo "=== Check if zip was downloaded ==="
ls -la /tmp/personaverse-deploy.zip 2>/dev/null || echo "Zip not found"

echo ""
echo "=== Check web root ==="
ls -la /var/www/html/ | head -20

echo ""
echo "=== Try download again ==="
cd /tmp
wget -O personaverse-deploy.zip "https://raw.githubusercontent.com/officialzpb-jpg/personaverse/main/personaverse-deploy.zip" 2>&1 | tail -5

echo ""
echo "=== Check if download worked ==="
ls -la personaverse-deploy.zip 2>/dev/null || echo "Download failed"
