#!/bin/bash
# Check CSS path mismatch

echo "=== CSS files on server ==="
ls /var/www/html/_next/static/chunks/*.css

echo ""
echo "=== CSS references in HTML ==="
grep -o '_next/static/chunks/[^"]*\.css' /var/www/html/index.html | head -3

echo ""
echo "=== Check if paths match ==="
CSS_FILE=$(ls /var/www/html/_next/static/chunks/*.css | head -1)
HTML_REF=$(grep -o '_next/static/chunks/[^"]*\.css' /var/www/html/index.html | head -1)

echo "Server has: $CSS_FILE"
echo "HTML asks for: $HTML_REF"

echo ""
echo "=== If different, we need to rebuild ==="
