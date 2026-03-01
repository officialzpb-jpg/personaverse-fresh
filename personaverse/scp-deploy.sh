#!/bin/bash
# Deploy using SCP from Windows

# On your Windows machine, open PowerShell and run:

# Option 1: Using scp with password
scp -r C:\path\to\personaverse-deploy.zip root@107.170.57.250:/tmp/

# Then SSH in and extract
ssh root@107.170.57.250 "cd /tmp && unzip -o personaverse-deploy.zip -d /var/www/html/ && rm personaverse-deploy.zip"

# Option 2: Extract locally and upload folder
scp -r C:\path\to\dist\* root@107.170.57.250:/var/www/html/

# Verify
ssh root@107.170.57.250 "ls -la /var/www/html/admin/"
