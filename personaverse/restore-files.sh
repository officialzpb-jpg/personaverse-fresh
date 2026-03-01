#!/bin/bash
# Fix broken HTML from sed command

cd /var/www/html

echo "=== Checking index.html ==="
head -20 index.html

echo ""
echo "=== If broken, restore from backup or re-extract ==="

# Re-extract fresh files
cd /tmp
rm -rf personaverse-deploy.zip
wget "https://raw.githubusercontent.com/officialzpb-jpg/personaverse/main/personaverse-deploy.zip"

# Backup current
mv /var/www/html /var/www/html-broken-$(date +%s)
mkdir -p /var/www/html

# Extract fresh
unzip -o personaverse-deploy.zip -d /var/www/html/

# Fix permissions
chmod -R 755 /var/www/html/_next/

# Restart nginx
systemctl restart nginx

echo "Fresh files deployed!"
