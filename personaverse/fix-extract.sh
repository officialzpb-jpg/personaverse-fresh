#!/bin/bash
# Fix the extracted files

echo "Checking what we have..."
ls -la

echo ""
echo "Looking for source files..."
find . -name "package.json" 2>/dev/null
find . -name "src" -type d 2>/dev/null

echo ""
echo "If files are in a subdirectory, move them up:"
echo "mv subdirectory/* ."
echo "mv subdirectory/.* . 2>/dev/null"
echo "rmdir subdirectory"
