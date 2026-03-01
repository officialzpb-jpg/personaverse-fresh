#!/bin/bash
# Setup HTTPS with Let's Encrypt

echo "Installing Certbot..."
apt update
apt install -y certbot python3-certbot-nginx

echo ""
echo "Obtaining SSL certificate..."
certbot --nginx -d personaverse.space -d www.personaverse.space --non-interactive --agree-tos --email your-email@example.com

echo ""
echo "Testing auto-renewal..."
certbot renew --dry-run

echo ""
echo "Done! Your site should now be accessible at:"
echo "  https://personaverse.space"
echo "  https://www.personaverse.space"
