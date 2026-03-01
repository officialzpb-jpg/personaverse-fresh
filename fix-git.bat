#!/bin/bash
# Fix git remote and push

cd C:\Users\43wq\.openclaw\workspace\personaverse-fresh

# Add remote
git remote add origin https://github.com/officialzpb-jpg/personaverse-fresh.git

# Pull first (to avoid conflicts)
git pull origin main --allow-unrelated-histories

# Push
git push -u origin main
