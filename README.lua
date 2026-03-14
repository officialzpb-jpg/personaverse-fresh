-- 67 Tycoon - README
-- ==================

-- GAME OVERVIEW
-- --------------
-- A meme-themed Roblox tycoon centered around the number 67.
-- Players build their tycoon, unlock floors, and compete to become
-- the richest 67 enthusiast.

-- PROJECT STRUCTURE
-- -----------------
--[[
ServerScriptService/
├── Main.server.lua          -- Entry point, player management
├── DataManager.lua          -- Data persistence
├── TycoonManager.lua        -- Individual tycoon logic
├── RebirthSystem.lua        -- Rebirth mechanics
├── Event67.lua              -- Special 67 events
├── LeaderboardHandler.lua   -- Leaderboards
└── PetSystem.lua            -- Pet hatching/equipping

StarterPlayerScripts/
└── TycoonUI.client.lua      -- Client UI controller

ReplicatedStorage/
├── Config.lua               -- Game configuration
├── Events/                  -- RemoteEvents folder
│   ├── UpdateUI
│   ├── SixtySevenEvent
│   ├── AchievementUnlocked
│   ├── Start67Event
│   ├── End67Event
│   └── TypingRushResponse
└── TycoonTemplate/          -- Tycoon model template

StarterGui/
└── TycoonUI/                -- Main UI interface

ServerStorage/
└── (Reserved for assets)
--]]

-- SETUP INSTRUCTIONS
-- ------------------
-- 1. Create a new Roblox place
-- 2. Copy all scripts to their respective locations
-- 3. Create RemoteEvents in ReplicatedStorage/Events
-- 4. Build a TycoonTemplate model with:
--    - Floor1, Floor2, etc. parts
--    - Buttons folder in each floor
--    - Purchase button parts with attributes:
--      * Cost (number)
--      * ItemType (string: "dropper", "collector", "upgrader", "floorUnlock")
--      * ItemId (string)
-- 5. Create UI in StarterGui/TycoonUI
-- 6. Test in Studio

-- KEY FEATURES
-- ------------
-- ✓ 10 floors with progressive costs
-- ✓ 67-themed items and pricing
-- ✓ Rebirth system with permanent bonuses
-- ✓ Pet system with rarity tiers
-- ✓ Special 67 events (rain, typing rush, golden 67, raid)
-- ✓ Leaderboards
-- ✓ Auto-save every 60 seconds

-- 67 MEME INTEGRATION
-- -------------------
-- - Starting cash: $67
-- - Base income: $67/second
-- - 67th purchase achievement
-- - Floors 6 & 7 special bonus when both unlocked
-- - 1 in 670 chance for 6.7x income
-- - Perfect rebirth at exactly 67M
-- - 67 player raid event
-- - 67 second event durations

-- COMMANDS (for testing)
-- ----------------------
-- /give [amount] - Give cash (admin only)
-- /rebirth - Force rebirth (admin only)
-- /event [type] - Trigger event (admin only)

-- NEXT STEPS
-- ----------
-- 1. Add DataStore for live game persistence
-- 2. Create visual effects for 67 events
-- 3. Add sound effects
-- 4. Build the tycoon models
-- 5. Create pet models
-- 6. Add more event types
-- 7. Implement trading system
-- 8. Add achievements beyond 67
