#!/bin/bash
# Complete restore of website files

cd /tmp

echo "=== Removing old files ==="
rm -rf /var/www/html
mkdir -p /var/www/html

echo "=== Downloading fresh zip ==="
wget -O personaverse-deploy.zip "https://raw.githubusercontent.com/officialzpb-jpg/personaverse/main/personaverse-deploy.zip"

echo "=== Extracting ==="
unzip -o personaverse-deploy.zip -d /var/www/html/

echo "=== Fixing permissions ==="
chmod -R 755 /var/www/html/_next/
find /var/www/html -type f -exec chmod 644 {} \;

echo "=== Restarting nginx ==="
systemctl restart nginx

echo "=== Done! ==="
echo "Test: https://personaverse.space"
