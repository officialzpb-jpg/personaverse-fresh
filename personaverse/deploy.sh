#!/bin/bash
# PersonaVerse Deployment Script
# Run this on your local machine after filling in your details

# ==================== FILL IN YOUR DETAILS HERE ====================

SERVER_IP="YOUR_SERVER_IP_HERE"           # e.g., "192.168.1.100"
USERNAME="YOUR_USERNAME_HERE"             # e.g., "root" or "ubuntu"
PASSWORD="YOUR_PASSWORD_HERE"             # Your server password
# OR use SSH key instead:
SSH_KEY_PATH=""                           # e.g., "C:/Users/You/Downloads/key.pem"

WEB_ROOT="/var/www/personaverse"          # Where to upload files
DOMAIN=""                                 # Your domain (optional, leave blank for IP)

# Project path on your local machine
LOCAL_DIST_PATH="C:/Users/43wq/.openclaw/workspace/personaverse/dist"

# ==================== DON'T EDIT BELOW THIS LINE ====================

echo "=========================================="
echo "  PersonaVerse Deployment Script"
echo "=========================================="
echo ""

# Check if details are filled in
if [ "$SERVER_IP" = "YOUR_SERVER_IP_HERE" ]; then
    echo "❌ ERROR: Please fill in your SERVER_IP"
    exit 1
fi

if [ "$USERNAME" = "YOUR_USERNAME_HERE" ]; then
    echo "❌ ERROR: Please fill in your USERNAME"
    exit 1
fi

echo "📍 Server: $SERVER_IP"
echo "👤 Username: $USERNAME"
echo "📁 Web Root: $WEB_ROOT"
echo ""

# Create remote directory
echo "📂 Creating web directory on server..."
if [ -n "$SSH_KEY_PATH" ]; then
    ssh -i "$SSH_KEY_PATH" $USERNAME@$SERVER_IP "sudo mkdir -p $WEB_ROOT && sudo chown -R $USERNAME:$USERNAME $WEB_ROOT"
else
    sshpass -p "$PASSWORD" ssh -o StrictHostKeyChecking=no $USERNAME@$SERVER_IP "sudo mkdir -p $WEB_ROOT && sudo chown -R $USERNAME:$USERNAME $WEB_ROOT"
fi

# Upload files
echo ""
echo "📤 Uploading files (this may take a few minutes)..."
echo "   Source: $LOCAL_DIST_PATH"
echo "   Destination: $SERVER_IP:$WEB_ROOT"
echo ""

if [ -n "$SSH_KEY_PATH" ]; then
    scp -i "$SSH_KEY_PATH" -r "$LOCAL_DIST_PATH"/* $USERNAME@$SERVER_IP:$WEB_ROOT/
else
    sshpass -p "$PASSWORD" scp -o StrictHostKeyChecking=no -r "$LOCAL_DIST_PATH"/* $USERNAME@$SERVER_IP:$WEB_ROOT/
fi

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Files uploaded successfully!"
else
    echo ""
    echo "❌ Upload failed. Check your credentials."
    exit 1
fi

# Install and configure Nginx
echo ""
echo "🌐 Configuring web server..."

NGINX_CONFIG="server {
    listen 80;
    server_name ${DOMAIN:-$SERVER_IP};
    
    root $WEB_ROOT;
    index index.html;
    
    location / {
        try_files \$uri \$uri/ /index.html;
    }
    
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml;
}"

if [ -n "$SSH_KEY_PATH" ]; then
    # Install nginx
    ssh -i "$SSH_KEY_PATH" $USERNAME@$SERVER_IP "sudo apt update && sudo apt install -y nginx"
    
    # Create config
    echo "$NGINX_CONFIG" | ssh -i "$SSH_KEY_PATH" $USERNAME@$SERVER_IP "sudo tee /etc/nginx/sites-available/personaverse"
    
    # Enable site
    ssh -i "$SSH_KEY_PATH" $USERNAME@$SERVER_IP "sudo ln -sf /etc/nginx/sites-available/personaverse /etc/nginx/sites-enabled/ && sudo rm -f /etc/nginx/sites-enabled/default && sudo nginx -t && sudo systemctl restart nginx"
else
    # Install nginx
    sshpass -p "$PASSWORD" ssh -o StrictHostKeyChecking=no $USERNAME@$SERVER_IP "sudo apt update && sudo apt install -y nginx"
    
    # Create config
    echo "$NGINX_CONFIG" | sshpass -p "$PASSWORD" ssh -o StrictHostKeyChecking=no $USERNAME@$SERVER_IP "sudo tee /etc/nginx/sites-available/personaverse"
    
    # Enable site
    sshpass -p "$PASSWORD" ssh -o StrictHostKeyChecking=no $USERNAME@$SERVER_IP "sudo ln -sf /etc/nginx/sites-available/personaverse /etc/nginx/sites-enabled/ && sudo rm -f /etc/nginx/sites-enabled/default && sudo nginx -t && sudo systemctl restart nginx"
fi

if [ $? -eq 0 ]; then
    echo "✅ Web server configured!"
else
    echo "⚠️  Web server config had issues, but files are uploaded."
fi

# Done!
echo ""
echo "=========================================="
echo "  🎉 DEPLOYMENT COMPLETE!"
echo "=========================================="
echo ""
echo "Your website is now live at:"
echo "  http://${DOMAIN:-$SERVER_IP}"
echo ""
echo "Next steps:"
echo "  1. Visit the URL above to test"
echo "  2. Set up HTTPS with: sudo certbot --nginx"
echo "  3. Point your domain DNS to: $SERVER_IP"
echo ""
