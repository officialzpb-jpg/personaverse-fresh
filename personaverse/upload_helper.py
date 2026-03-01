#!/usr/bin/env python3
"""
Simple file upload script for PersonaVerse deployment
Run this on your local machine to upload files to your server
"""

import http.client
import os
import base64
import sys

SERVER_IP = "107.170.57.250"
USERNAME = "root"
WEB_ROOT = "/var/www/personaverse"
LOCAL_FILE = r"C:\Users\43wq\.openclaw\workspace\personaverse\dist.zip"

def main():
    print("=" * 50)
    print("PersonaVerse File Uploader")
    print("=" * 50)
    print()
    
    # Check if file exists
    if not os.path.exists(LOCAL_FILE):
        print(f"❌ Error: File not found: {LOCAL_FILE}")
        print("Please make sure dist.zip exists")
        return
    
    file_size = os.path.getsize(LOCAL_FILE)
    print(f"📁 File: {LOCAL_FILE}")
    print(f"📊 Size: {file_size / 1024 / 1024:.2f} MB")
    print()
    
    print("⚠️  This script requires manual steps:")
    print()
    print("1. Open PowerShell as Administrator")
    print("2. Run: cd C:\Users\43wq\.openclaw\workspace\personaverse")
    print("3. Run: python -m http.server 8000")
    print()
    print("4. Then on your SERVER, run:")
    print(f"   wget http://YOUR_PUBLIC_IP:8000/dist.zip")
    print()
    print("To find your PUBLIC IP:")
    print("   - Go to https://whatismyipaddress.com")
    print("   - Use the IPv4 address shown")
    print()
    print("⚠️  IMPORTANT: You may need to:")
    print("   - Disable Windows Firewall temporarily")
    print("   - Port forward port 8000 on your router")
    print("   - Or use a different method")
    print()

if __name__ == "__main__":
    main()
