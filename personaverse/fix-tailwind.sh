#!/bin/bash
# Fix Tailwind CSS installation

cd /var/www/personaverse

echo "Checking node_modules..."
ls node_modules/ | grep tailwind || echo "Tailwind not in node_modules"

echo ""
echo "Reinstalling all dependencies..."
rm -rf node_modules package-lock.json

# Install all dependencies at once
npm install

# Install dev dependencies explicitly
npm install -D tailwindcss postcss autoprefixer

echo ""
echo "Verifying installation..."
ls node_modules/ | grep -E "tailwind|postcss|autoprefixer"

echo ""
echo "Trying build again..."
npm run build
