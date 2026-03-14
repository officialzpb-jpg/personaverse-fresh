-- Quick Setup Guide for 67 Tycoon
-- =================================

--[[
STEP 1: CREATE NEW ROBLOX PLACE
-------------------------------
1. Open Roblox Studio
2. Create New → Baseplate (or Empty)
3. Save the place as "67 Tycoon"

STEP 2: CREATE FOLDER STRUCTURE
-------------------------------
In the Explorer panel, create these folders:

ReplicatedStorage/
└── Events/          (Folder - will hold RemoteEvents)

ServerScriptService/
├── Main.server.lua
├── DataManager.lua
├── TycoonManager.lua
├── RebirthSystem.lua
├── Event67.lua
├── LeaderboardHandler.lua
├── PetSystem.lua
├── AdminCommands.lua
└── SetupEvents.server.lua

StarterPlayer/
└── StarterPlayerScripts/
    └── TycoonUI.client.lua

StarterGui/
└── TycoonUI/        (ScreenGui - paste TycoonUI.lua here)

ServerStorage/
└── (Leave empty for now, or add TycoonTemplateBuilder)

STEP 3: COPY SCRIPTS
--------------------
1. For each .lua file in the project:
   - Create a new Script/LocalScript in the correct location
   - Copy the file contents
   - Paste into the script

2. Script types:
   - .server.lua files → Script (ServerScriptService)
   - .client.lua files → LocalScript (StarterPlayerScripts)
   - Regular .lua files → ModuleScript

STEP 4: CREATE REMOTE EVENTS
----------------------------
Option A: Run SetupEvents.server.lua
1. Put SetupEvents.server.lua in ServerScriptService
2. Run the game once in Studio
3. Check ReplicatedStorage/Events was created

Option B: Manual creation
1. In ReplicatedStorage, create folder "Events"
2. Create these RemoteEvents:
   - UpdateUI
   - SixtySevenEvent
   - AchievementUnlocked
   - Start67Event
   - End67Event
   - TypingRushResponse
   - RebirthRequest
   - RebirthResponse
   - HatchPetRequest
   - HatchPetResponse
   - EquipPetRequest
   - GetLeaderboard

STEP 5: CREATE TYCOON TEMPLATE
------------------------------
Option A: Use TycoonTemplateBuilder
1. Open Command Bar (View → Command Bar)
2. Copy contents of TycoonTemplateBuilder.lua
3. Paste and press Enter
4. Template will be created in workspace
5. Move it to ReplicatedStorage, rename to "TycoonTemplate"

Option B: Build manually
1. Create a Model in ReplicatedStorage named "TycoonTemplate"
2. Add parts for floors, buttons, droppers
3. See TycoonTemplateBuilder.lua for layout reference

STEP 6: CREATE UI
-----------------
1. In StarterGui, create ScreenGui named "TycoonUI"
2. Copy contents of StarterGui/TycoonUI.lua
3. Paste into a LocalScript in TycoonUI
4. OR build the UI manually using the structure in the file

STEP 7: CONFIGURE
-----------------
1. Open ReplicatedStorage/Config.lua
2. Adjust prices, multipliers, etc. as desired
3. Add your UserId to AdminCommands.lua ADMINS table

STEP 8: TEST
------------
1. Press F5 to play in Studio
2. Check Output window for errors
3. Walk around, test purchase buttons
4. Try admin commands: /give 10000, /67, /event RAIN_67

STEP 9: PUBLISH
---------------
1. File → Publish to Roblox
2. Configure game settings
3. Set icon, thumbnail, description
4. Enable if you want it public

COMMON ISSUES
-------------
Issue: "Attempt to index nil with 'WaitForChild'"
Fix: Make sure Events folder and RemoteEvents exist in ReplicatedStorage

Issue: "Module not found"
Fix: Check script is in correct location, named correctly

Issue: UI not showing
Fix: Make sure TycoonUI is in StarterGui, not StarterPlayerScripts

Issue: Can't purchase items
Fix: Check TycoonTemplate exists in ReplicatedStorage with correct structure

NEXT FEATURES TO ADD
--------------------
- [ ] DataStore integration (for live game saves)
- [ ] Sound effects
- [ ] Particle effects for 67 events
- [ ] More pet models
- [ ] Trading system
- [ ] VIP gamepass
- [ ] More event types
- [ ] Achievements system
- [ ] Tutorial for new players
--]]
