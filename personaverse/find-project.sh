#!/bin/bash
# Check what's in the workspace

cd /workspaces/personaverse 2>/dev/null || cd /workspaces
echo "=== Current directory ==="
pwd
ls -la

echo ""
echo "=== Looking for personaverse ==="
find /workspaces -name "package.json" 2>/dev/null | head -5
