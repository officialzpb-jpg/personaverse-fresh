#!/bin/bash
# Build and deploy with error checking

cd /workspaces/personaverse

echo "=== Building ==="
npm run build

if [ $? -eq 0 ]; then
    echo "=== Build successful ==="
    echo "=== Checking for admin folder ==="
    ls -la dist/ | grep admin
    
    echo "=== Deploying ==="
    cp -r dist/* /var/www/html/
    
    echo "=== Verifying ==="
    ls -la /var/www/html/admin/
    
    echo "=== Done! ==="
    echo "Visit: https://personaverse.space/admin/login"
else
    echo "=== Build failed ==="
    echo "Check errors above"
fi
