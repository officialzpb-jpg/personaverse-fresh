# Avatar Hub - Multi-Platform Setup Guide

## Overview
The Avatar Hub is available on three platforms:
1. **Web** (Unity WebGL) - Runs in browser at personaverse.space
2. **Desktop** (Electron) - Floating companion on your desktop
3. **Browser Extension** - Follows you across the web

---

## 🌐 Web Platform (Unity WebGL)

### Setup
1. Install Unity 2022.3 LTS with WebGL Build Support
2. Create new 3D URP project
3. Copy scripts from `unity-scripts/` folder:
   - `AvatarAI.cs` - AI behavior
   - `RoomCustomizer.cs` - Room customization
   - `WebGLBridge.cs` - JavaScript bridge

4. Import avatar GLB file from `public/avatars/`
5. Build WebGL to `public/unity/Build/`

### Build Settings
- Platform: WebGL
- Compression: Gzip
- Code Optimization: Size
- Player Settings:
  - Resolution: 960x600 (responsive)
  - Template: Default
  - WebGL 2.0: Enabled

---

## 💻 Desktop App (Electron)

### Setup
```bash
cd electron
npm install
npm start
```

### Build for Distribution
```bash
# Windows
npm run build:win

# macOS
npm run build:mac

# Linux
npm run build:linux

# All platforms
npm run build
```

### Features
- Floating frameless window
- Always on top option
- System tray integration
- Settings persistence
- Auto-start on login

### Configuration
Settings stored in:
- Windows: `%APPDATA%/personaverse-avatar-hub/`
- macOS: `~/Library/Application Support/personaverse-avatar-hub/`
- Linux: `~/.config/personaverse-avatar-hub/`

---

## 🔌 Browser Extension

### Setup
1. Open Chrome/Edge and go to `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Load unpacked"
4. Select the `extension/` folder

### Features
- Injects avatar on all websites
- Draggable positioning
- Quick chat from popup
- Personality switching
- Size and opacity controls

### Permissions
- `storage` - Save settings
- `activeTab` - Inject on current page
- `scripting` - Run content scripts

### Publishing
1. Zip the `extension/` folder
2. Go to Chrome Web Store Developer Dashboard
3. Upload and publish

---

## 🔗 Shared API

All platforms use the same backend API:

### Chat Endpoint
```
POST /api/avatar/chat
{
  "message": "Hello!",
  "personality": "wacky",
  "conversationHistory": []
}
```

### Personalities
- `wacky` - Energetic and playful
- `chill` - Relaxed and calm
- `smart` - Intelligent and curious
- `sassy` - Confident and stylish

---

## 📁 File Structure

```
personaverse-fresh/
├── unity-scripts/          # Unity C# scripts
│   ├── AvatarAI.cs
│   ├── RoomCustomizer.cs
│   └── WebGLBridge.cs
├── electron/               # Desktop app
│   ├── main.js
│   ├── preload.js
│   └── package.json
├── extension/              # Browser extension
│   ├── manifest.json
│   ├── background.js
│   ├── content.js
│   ├── popup.html
│   └── styles.css
├── src/
│   ├── app/
│   │   ├── api/avatar/chat/route.ts
│   │   └── avatar-hub/page.tsx
│   └── components/avatar/
│       └── UnityAvatarHub.tsx
└── public/avatars/         # Avatar GLB files
    ├── meshy-avatar.glb
    └── meshy-avatar-v2.glb
```

---

## 🚀 Deployment Checklist

### Web
- [ ] Unity WebGL build in `public/unity/`
- [ ] API routes deployed
- [ ] Environment variables set
- [ ] Test on multiple browsers

### Desktop
- [ ] Code signing certificate
- [ ] Build for all platforms
- [ ] Auto-updater configured
- [ ] Test installers

### Extension
- [ ] Icons created (16, 32, 48, 128px)
- [ ] Store listing prepared
- [ ] Screenshots taken
- [ ] Privacy policy written

---

## 🎨 Customization

### Adding New Themes
Edit `RoomCustomizer.cs`:
```csharp
case "MyTheme":
    SetColors(new Color(r, g, b), new Color(r, g, b));
    SetLighting(intensity, new Color(r, g, b));
    break;
```

### Adding New Furniture
1. Create prefab in Unity
2. Add to `furniturePrefabs` array
3. Add spawn point

### Changing Avatar Personality
Edit system prompt in `AvatarAI.cs` or use API personality parameter.

---

## 🔧 Troubleshooting

### Unity WebGL
- **Build fails**: Check WebGL module installed
- **Avatar not loading**: Verify GLB file path
- **Slow performance**: Reduce polygon count, enable compression

### Electron
- **Window not showing**: Check `show: false` in main.js
- **Settings not saving**: Verify electron-store installed
- **Tray icon missing**: Check icon path

### Extension
- **Not injecting**: Check host permissions
- **Chat not working**: Verify API endpoint
- **Settings lost**: Check storage permissions

---

Ready to build across all platforms! 🎉
