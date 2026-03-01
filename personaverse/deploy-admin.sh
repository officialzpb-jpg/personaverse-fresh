#!/bin/bash
# Check and fix admin deployment

echo "Checking dist folder..."
ls -la /var/www/personaverse/dist/ | grep admin

echo ""
echo "Checking web root..."
ls -la /var/www/html/ | grep admin

echo ""
echo "Copying admin folder..."
cp -r /var/www/personaverse/dist/admin /var/www/html/

echo ""
echo "Verifying..."
ls -la /var/www/html/admin/

echo ""
echo "Done!"
