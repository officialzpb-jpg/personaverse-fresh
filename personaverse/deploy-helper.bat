@echo off
REM PersonaVerse Deployment Helper for Windows
REM This creates the commands you need to run

echo ==========================================
echo   PersonaVerse Deployment Helper
echo ==========================================
echo.
echo This will help you deploy to your server.
echo.

set /p SERVER_IP="Enter your server IP address: "
set /p USERNAME="Enter your username (e.g., root, ubuntu): "
set /p WEB_ROOT="Enter web root path (press Enter for /var/www/personaverse): "

if "%WEB_ROOT%"=="" set WEB_ROOT=/var/www/personaverse

echo.
echo ==========================================
echo   STEP 1: Upload Files
echo ==========================================
echo.
echo Copy and paste this command into PowerShell:
echo.
echo scp -r "C:\Users\43wq\.openclaw\workspace\personaverse\dist\*" %USERNAME%@%SERVER_IP%:%WEB_ROOT%/
echo.

echo ==========================================
echo   STEP 2: SSH into Server
echo ==========================================
echo.
echo Copy and paste this command:
echo.
echo ssh %USERNAME%@%SERVER_IP%
echo.

echo ==========================================
echo   STEP 3: Configure Server (run on server)
echo ==========================================
echo.
echo Once logged in via SSH, run these commands:
echo.
echo sudo apt update ^&^& sudo apt install -y nginx
echo sudo mkdir -p %WEB_ROOT%
echo sudo chown -R $USER:$USER %WEB_ROOT%
echo.
echo 'Create Nginx config:'
echo sudo nano /etc/nginx/sites-available/personaverse
echo.
echo 'Paste this into the file:'
echo.
echo server {
echo     listen 80;
echo     server_name %SERVER_IP%;
echo     root %WEB_ROOT%;
echo     index index.html;
echo     location / {
echo         try_files $uri $uri/ /index.html;
echo     }
echo }
echo.
echo 'Then run:'
echo sudo ln -s /etc/nginx/sites-available/personaverse /etc/nginx/sites-enabled/
echo sudo rm -f /etc/nginx/sites-enabled/default
echo sudo nginx -t
echo sudo systemctl restart nginx
echo.

echo ==========================================
echo   Done!
echo ==========================================
echo.
echo Your site will be at: http://%SERVER_IP%
echo.
pause
