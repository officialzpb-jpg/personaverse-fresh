#!/bin/bash
# Build and deploy PersonaVerse

cd /var/www/personaverse

echo "Building PersonaVerse..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "Files in dist folder:"
    ls -la dist/
    echo ""
    echo "To deploy, run:"
    echo "cp -r dist/* /var/www/html/"
    echo ""
    echo "Or update nginx to point to dist folder"
else
    echo "❌ Build failed"
fi
