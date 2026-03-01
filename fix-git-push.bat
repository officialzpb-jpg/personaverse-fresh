#!/bin/bash
# Fix git push rejection

cd C:\Users\43wq\.openclaw\workspace\personaverse-vercel

# Pull remote changes first
git pull origin main --allow-unrelated-histories

# Then push
git push -u origin main
