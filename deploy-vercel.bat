#!/bin/bash
# Vercel deployment steps

cd C:\Users\43wq\.openclaw\workspace\personaverse-fresh

echo "Step 1: Login to Vercel"
vercel login

echo ""
echo "Step 2: After login, deploy"
vercel --prod
