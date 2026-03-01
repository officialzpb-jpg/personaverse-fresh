#!/bin/bash
# Deploy chatbot update

cd C:\Users\43wq\.openclaw\workspace\personaverse-fresh

echo "Pushing to GitHub..."
git add .
git commit -m "Add AI chatbot widget"
git push

echo ""
echo "Deploying to Vercel..."
vercel --prod

echo ""
echo "Done! Chatbot is now live."
