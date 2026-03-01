#!/bin/bash
# Fix permissions for _next folder

echo "Fixing permissions..."

# Make _next and all subdirectories executable (so nginx can read them)
chmod -R 755 /var/www/personaverse/_next/

# Also ensure all files are readable
chmod -R 644 /var/www/personaverse/_next/static/
find /var/www/personaverse/_next -type f -exec chmod 644 {} \;

echo ""
echo "New permissions:"
ls -la /var/www/personaverse/_next/

echo ""
echo "Testing CSS file access:"
ls -la /var/www/personaverse/_next/static/chunks/*.css

echo ""
echo "Done! Refresh your browser."
