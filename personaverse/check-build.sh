#!/bin/bash
# Check build status and fix

cd /workspaces/personaverse

echo "=== Checking if dist exists ==="
if [ -d "dist" ]; then
    echo "dist folder exists"
    ls -la dist/
else
    echo "dist folder does NOT exist - build failed"
fi

echo ""
echo "=== Checking src/app/admin ==="
ls -la src/app/admin/ 2>/dev/null || echo "admin folder missing in src"

echo ""
echo "=== Trying build again ==="
npm run build
