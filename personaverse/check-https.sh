#!/bin/bash
# Check HTTPS vs HTTP

echo "=== Test HTTP ==="
curl -s http://personaverse.space/_next/static/chunks/90ce22a39848a4c9.css | wc -c

echo ""
echo "=== Test HTTPS ==="
curl -s https://personaverse.space/_next/static/chunks/90ce22a39848a4c9.css | wc -c

echo ""
echo "=== Check for redirect loops ==="
curl -I http://personaverse.space/_next/static/chunks/90ce22a39848a4c9.css 2>&1 | grep -E "HTTP|Location"

echo ""
echo "=== Check SSL certificate ==="
echo | openssl s_client -connect personaverse.space:443 2>/dev/null | openssl x509 -noout -dates
