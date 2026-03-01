#!/bin/bash
# Fix MIME types for CSS

echo "=== Check nginx mime.types ==="
grep "css" /etc/nginx/mime.types

echo ""
echo "=== Add CSS mime type if missing ==="
if ! grep -q "text/css" /etc/nginx/mime.types; then
    echo "Adding CSS mime type..."
    sed -i '/text\/plain/a\    text/css                             css;' /etc/nginx/mime.types
fi

echo ""
echo "=== Update nginx config ==="
cat > /etc/nginx/sites-available/personaverse <> /dev/null; then
    echo "CSS is accessible"
else
    echo "CSS returned HTTP $CSS_STATUS"
fi

echo ""
echo "=== Clear browser cache ==="
echo "Press Ctrl+Shift+R to hard refresh"
