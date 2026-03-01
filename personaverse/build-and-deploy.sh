#!/bin/bash
# Build and deploy admin dashboard

cd /var/www/personaverse

echo "Installing dependencies..."
npm install

echo ""
echo "Building site..."
npm run build

echo ""
echo "Checking for admin folder..."
ls -la dist/ | grep admin

echo ""
echo "Deploying to web root..."
cp -r dist/* /var/www/html/

echo ""
echo "Verifying admin folder..."
ls -la /var/www/html/admin/

echo ""
echo "Done! Check https://personaverse.space/admin/login"
