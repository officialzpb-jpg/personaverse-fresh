#!/bin/bash
# Fix merge conflict

cd C:\Users\43wq\.openclaw\workspace\personaverse-vercel

# Keep our version of README
git checkout --ours README.md

# Add the resolved file
git add README.md

# Commit the merge
git commit -m "Merge remote with local"

# Now push
git push -u origin main
