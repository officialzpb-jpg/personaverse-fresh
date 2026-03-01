#!/bin/bash
# Fix git branch

cd C:\Users\43wq\.openclaw\workspace\personaverse-fresh

# Check current branch
git branch

# Create main branch if missing
git checkout -b main

# Add all files
git add .

# Commit
git commit -m "Add Tailwind config files"

# Push
git push -u origin main
