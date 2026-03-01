#!/bin/bash
# Check and update Node.js

echo "Current Node.js version:"
node --version

echo ""
echo "Installing Node.js 20.x..."

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

echo ""
echo "New Node.js version:"
node --version

echo ""
echo "Now try: npm run build"
