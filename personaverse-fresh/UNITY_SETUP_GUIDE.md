# Unity Avatar Hub - Complete Setup Guide

## Prerequisites
- Unity 2022.3 LTS installed with WebGL Build Support
- This guide assumes Unity Hub is open

---

## STEP 1: Create Unity Project (5 minutes)

1. Open **Unity Hub**
2. Click **New Project**
3. Select **3D (URP)** template
4. Name it: `PersonaverseAvatarHub`
5. Choose location (remember this path)
6. Click **Create Project**

Wait for Unity to open (this takes a few minutes first time).

---

## STEP 2: Install Required Packages (5 minutes)

### Install glTFast (for GLB import)
1. In Unity, go to **Window → Package Manager**
2. Click **+** button (top left)
3. Select **Add package from git URL...**
4. Enter: `https://github.com/atteneder/glTFast.git`
5. Click **Add**

Wait for installation (about 2-3 minutes).

### Install TextMeshPro (if not already installed)
1. In Package Manager, search for "TextMeshPro"
2. Click **Install** if not already installed

---

## STEP 3: Create Folder Structure (2 minutes)

In Unity **Project** window (bottom), create these folders:

```
Assets/
├── _Project/
│   ├── Animations/
│   ├── Materials/
│   ├── Models/
│   ├── Prefabs/
│   ├── Scripts/
│   │   ├── AI/
│   │   ├── Room/
│   │   ├── UI/
│   │   └── WebGL/
│   └── Scenes/
└── StreamingAssets/
    └── Avatars/
```

Right-click in Project window → **Create → Folder**

---

## STEP 4: Copy Scripts (3 minutes)

1. Open file explorer to your project:
   `C:\Users\43wq\.openclaw\workspace\personaverse-fresh\unity-scripts`

2. Copy these files to Unity `Assets/_Project/Scripts/`:
   - `AvatarAI.cs` → `Assets/_Project/Scripts/AI/`
   - `RoomCustomizer.cs` → `Assets/_Project/Scripts/Room/`
   - `WebGLBridge.cs` → `Assets/_Project/Scripts/WebGL/`
   - `ChatUI.cs` → `Assets/_Project/Scripts/UI/`
   - `AvatarLoader.cs` → `Assets/_Project/Scripts/Avatar/`

3. In Unity, scripts will auto-import. Check Console for errors (Window → General → Console).

---

## STEP 5: Import Avatar GLB (3 minutes)

1. Copy your avatar file:
   ```
   From: personaverse-fresh/public/avatars/meshy-avatar-v2.glb
   To: Unity Project/Assets/StreamingAssets/Avatars/
   ```

2. In Unity, the file appears in StreamingAssets folder.

---

## STEP 6: Create the Room Scene (15 minutes)

### 6.1 Create Room Floor
1. Right-click in Hierarchy → **3D Object → Plane**
2. Name it: `Floor`
3. Set Scale: X=20, Y=1, Z=20
4. Position: Y=0

### 6.2 Create Walls (4 walls)
1. Right-click → **3D Object → Cube**
2. Name it: `Wall_Back`
3. Position: Z=-10, Y=2.5
4. Scale: X=20, Y=5, Z=0.5
5. Duplicate (Ctrl+D) 3 times for other walls
6. Position:
   - `Wall_Front`: Z=10
   - `Wall_Left`: X=-10, Rotate Y=90
   - `Wall_Right`: X=10, Rotate Y=90

### 6.3 Create Materials
1. Right-click in Project → **Create → Material**
2. Name: `Floor_Mat`
3. Set Albedo color to light gray (#CCCCCC)
4. Drag to Floor object

5. Create `Wall_Mat` - white color
6. Drag to all walls

### 6.4 Add Lighting
1. Select `Directional Light` in Hierarchy
2. Set Intensity: 1.2
3. Set Color: White
4. Rotation: X=50, Y=-30

5. Right-click → **Light → Point Light**
6. Position: 0, 5, 0
7. Intensity: 0.5
8. Range: 15

### 6.5 Add Camera
1. Select `Main Camera`
2. Position: X=0, Y=3, Z=-8
3. Rotation: X=15, Y=0, Z=0
4. Clear Flags: Solid Color
5. Background: Black (#000000)

---

## STEP 7: Setup Avatar (10 minutes)

### 7.1 Create Avatar Container
1. Right-click in Hierarchy → **Create Empty**
2. Name: `AvatarContainer`
3. Position: 0, 0, 0

### 7.2 Add AvatarLoader Script
1. Select `AvatarContainer`
2. In Inspector, click **Add Component**
3. Search: `AvatarLoader`
4. Click to add

### 7.3 Configure AvatarLoader
In Inspector:
- Avatar Parent: Drag `AvatarContainer` here
- Avatar Scale: 1, 1, 1
- Avatar Position: 0, 0, 0
- Avatar Rotation: 0, 0, 0

### 7.4 Create Animator Controller
1. Right-click in Project → **Create → Animator Controller**
2. Name: `AvatarAnimator`
3. Save in `Assets/_Project/Animations/`
4. Drag to AvatarLoader's "Animator Controller" field

### 7.5 Create Animation States
Double-click `AvatarAnimator`:

1. Right-click in grid → **Create State → Empty**
2. Name: `Idle`
3. Set as Layer Default State
4. Create more states: `Walk`, `Dance`, `Talk`

---

## STEP 8: Setup WebGL Bridge (5 minutes)

### 8.1 Create Bridge Object
1. Right-click → **Create Empty**
2. Name: `WebGLBridge`
3. Position: 0, 0, 0

### 8.2 Add Bridge Script
1. Add Component → `WebGLBridge`
2. Drag references:
   - Avatar AI: Find AvatarContainer (after play)
   - Room Customizer: (we'll create this)

### 8.3 Create Room Customizer Object
1. Create Empty → `RoomCustomizer`
2. Add Component → `RoomCustomizer`
3. Configure:
   - Room Container: Create Empty `Room` and drag all walls/floor into it
   - Furniture Container: Create Empty `Furniture`
   - Floor Material: Drag `Floor_Mat`
   - Wall Material: Drag `Wall_Mat`
   - Main Light: Drag `Directional Light`

---

## STEP 9: Setup UI (10 minutes)

### 9.1 Create Canvas
1. Right-click → **UI → Canvas**
2. Select Canvas
3. Render Mode: **Screen Space - Overlay**
4. Canvas Scaler → UI Scale Mode: **Scale With Screen Size**
5. Reference Resolution: 1920 x 1080

### 9.2 Create Chat Panel
1. Right-click Canvas → **UI → Panel**
2. Name: `ChatPanel`
3. Position: Bottom-left
4. Size: 400 x 300
5. Color: Black with 50% alpha

### 9.3 Add Chat UI Script
1. Add Component → `ChatUI`
2. Create prefabs for messages (simple text objects)

### 9.4 Add Input Field
1. Right-click Canvas → **UI → Input Field - TextMeshPro**
2. Position: Bottom of chat panel
3. Size: 350 x 40

### 9.5 Add Send Button
1. Right-click Canvas → **UI → Button - TextMeshPro**
2. Text: "Send"
3. Position: Right of input field

---

## STEP 10: Configure Build Settings (5 minutes)

### 10.1 Open Build Settings
1. **File → Build Settings...**
2. Click **WebGL** platform
3. Click **Switch Platform** (if not already)

### 10.2 Player Settings
Click **Player Settings...** button:

**Resolution and Presentation:**
- Default Canvas Width: 960
- Default Canvas Height: 600
- Run in background: ✓

**Publishing Settings:**
- Compression Format: Gzip
- Name: Personaverse Avatar Hub
- Company: Personaverse

**Other Settings:**
- Color Space: Gamma
- Api Compatibility Level: .NET Standard 2.1

---

## STEP 11: Build WebGL (5 minutes)

1. **File → Build Settings...**
2. Click **Build**
3. Create folder: `WebGL_Build`
4. Select it and click **Select Folder**
5. Wait for build (2-5 minutes)

---

## STEP 12: Copy Build to Next.js (2 minutes)

After build completes:

1. Open build folder location
2. Copy entire contents to:
   ```
   personaverse-fresh/public/unity/
   ```

3. Your structure should be:
   ```
   public/unity/
   ├── Build/
   │   ├── AvatarHub.data.gz
   │   ├── AvatarHub.framework.js.gz
   │   ├── AvatarHub.loader.js
   │   ├── AvatarHub.wasm.gz
   │   └── ...
   └── StreamingAssets/
       └── Avatars/
           └── meshy-avatar-v2.glb
   ```

---

## STEP 13: Test Locally (3 minutes)

1. Open terminal in `personaverse-fresh/`
2. Run: `npm run dev`
3. Open browser: `http://localhost:3000/avatar-hub`
4. You should see:
   - Loading screen
   - Unity canvas loads
   - Avatar appears
   - Chat panel works

---

## STEP 14: Deploy to Vercel (2 minutes)

1. Commit changes:
   ```bash
   git add .
   git commit -m "Add Unity Avatar Hub"
   git push
   ```

2. Vercel auto-deploys
3. Visit: `https://www.personaverse.space/avatar-hub`

---

## Troubleshooting

### Build Errors
- **"WebGL module not installed"**: Install via Unity Hub → Installs
- **Script errors**: Check Console for missing references
- **GLB not loading**: Verify file in StreamingAssets

### Runtime Issues
- **Black screen**: Check camera clear flags
- **Avatar not moving**: Verify Animator Controller assigned
- **Chat not working**: Check API endpoint in WebGLBridge

### Performance
- Reduce shadow quality
- Lower texture resolution
- Enable compression

---

## Next Steps

Once working:
1. Add more animations
2. Create furniture prefabs
3. Add particle effects
4. Implement save/load
5. Build desktop app
6. Publish extension

**Total Time: ~60-75 minutes**

Good luck! 🎮
