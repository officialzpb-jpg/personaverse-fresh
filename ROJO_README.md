# 67 Tycoon - Rojo Setup

## What is Rojo?
Rojo syncs your code files directly into Roblox Studio. Edit files in VS Code/Notepad, press save, and Studio updates instantly.

## Installation

### 1. Install Rojo
**Option A: With aftman (recommended)**
```bash
# Install aftman first: https://github.com/LPGhatguy/aftman
aftman install
```

**Option B: Direct download**
- Download from: https://github.com/rojo-rbx/rojo/releases
- Add to your PATH

**Option C: Cargo (if you have Rust)**
```bash
cargo install rojo
```

### 2. Verify installation
```bash
rojo --version
```

## Project Setup

### 1. Folder structure
Your project should look like this:
```
67-tycoon/
├── default.project.json
├── README.md
└── src/
    ├── ReplicatedStorage/
    │   ├── Config.lua
    │   ├── MonetizationConfig.lua
    │   └── Events/
    │       ├── UpdateUI.model.json
    │       ├── SixtySevenEvent.model.json
    │       └── ... (all events as .model.json files)
    ├── ServerScriptService/
    │   ├── Main.server.lua
    │   ├── DataManager.lua
    │   ├── TycoonManager.lua
    │   ├── RebirthSystem.lua
    │   ├── Event67.lua
    │   ├── LeaderboardHandler.lua
    │   ├── PetSystem.lua
    │   ├── AdminCommands.lua
    │   └── MonetizationHandler.lua
    ├── StarterPlayerScripts/
    │   └── TycoonUI.client.lua
    └── StarterGui/
        ├── TycoonUI/
        │   └── init.client.lua
        └── PremiumShopUI/
            └── init.client.lua
```

### 2. Build the project
```bash
# In the 67-tycoon folder
rojo build -o 67-tycoon.rbxl
```

This creates `67-tycoon.rbxl` — open this file in Roblox Studio.

### 3. Live sync (optional but amazing)
```bash
# Start the Rojo server
rojo serve

# In Studio: Rojo plugin → Connect
```

Now when you edit any file, it auto-updates in Studio!

## File Templates

### Creating RemoteEvents
Each RemoteEvent is a `.model.json` file:

**src/ReplicatedStorage/Events/UpdateUI.model.json**
```json
{
  "className": "RemoteEvent"
}
```

### Creating Scripts
- `.server.lua` → ServerScript
- `.client.lua` → LocalScript
- `.lua` → ModuleScript

## Quick Commands

| Command | What it does |
|---------|--------------|
| `rojo build -o game.rbxl` | Build place file |
| `rojo serve` | Start live sync |
| `rojo plugin install` | Install Studio plugin |

## Troubleshooting

**"rojo is not recognized"**
→ Add Rojo to your system PATH

**"Failed to connect"**
→ Make sure port 34872 is open, or specify: `rojo serve --port 34873`

**Changes not syncing**
→ Check that file paths match default.project.json exactly

## Next Steps

1. Install Rojo
2. Run `rojo build -o 67-tycoon.rbxl`
3. Open the file in Roblox Studio
4. Add the TycoonTemplate model to ReplicatedStorage manually (Rojo doesn't handle models well)
5. Publish and play!
