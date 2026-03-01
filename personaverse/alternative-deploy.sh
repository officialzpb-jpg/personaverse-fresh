#!/bin/bash
# Alternative: Download via HTTP

# Option 1: If you can upload to any web server
# Upload personaverse-deploy.zip to any file hosting service
# Then on your server:
cd /tmp
wget [URL_TO_YOUR_FILE]
unzip -o personaverse-deploy.zip -d /var/www/html/

# Option 2: Use GitHub raw URL
# Upload to your GitHub repo, then:
cd /tmp
wget https://raw.githubusercontent.com/officialzpb-jpg/personaverse/main/personaverse-deploy.zip
unzip -o personaverse-deploy.zip -d /var/www/html/

# Option 3: Use Python simple server on your local machine
# On Windows: python -m http.server 8000
# Then on server: wget http://YOUR_IP:8000/personaverse-deploy.zip
