#!/bin/bash
# Full build with error capture

cd /workspaces/personaverse

echo "=== Starting build ==="
npm run build 2>&1 | tee build.log

echo ""
echo "=== Build exit code: $? ==="

echo ""
echo "=== Checking for errors ==="
grep -i "error\|failed\|cannot" build.log | head -10

echo ""
echo "=== Checking if dist was created ==="
ls -la dist/ 2>/dev/null || echo "dist folder not created"
