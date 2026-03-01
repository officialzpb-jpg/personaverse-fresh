#!/bin/bash
# Fix Node.js installation conflict

echo "Removing old Node.js packages..."
apt-get remove -y libnode-dev nodejs npm
apt-get autoremove -y

echo ""
echo "Cleaning up..."
dpkg --configure -a
apt-get clean
apt-get update

echo ""
echo "Installing Node.js 20..."
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

echo ""
echo "Node.js version:"
node --version

echo ""
echo "npm version:"
npm --version
