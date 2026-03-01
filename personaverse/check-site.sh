#!/bin/bash
# Check if site is accessible

echo "Testing from server..."
curl -s -o /dev/null -w "%{http_code}" http://personaverse.space
echo " - personaverse.space"

curl -s -o /dev/null -w "%{http_code}" http://107.170.57.250
echo " - 107.170.57.250"

echo ""
echo "Checking DNS..."
dig personaverse.space +short

echo ""
echo "Checking nginx is listening..."
netstat -tlnp | grep :80

echo ""
echo "Checking firewall..."
ufw status
