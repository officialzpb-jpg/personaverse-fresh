-- 67 Tycoon - Main Game Handler
-- Handles player data, initialization, and core loops

local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local ServerStorage = game:GetService("ServerStorage")
local RunService = game:GetService("RunService")

-- Load modules
local DataManager = require(script.Parent.DataManager)
local TycoonManager = require(script.Parent.TycoonManager)
local RebirthSystem = require(script.Parent.RebirthSystem)
local Event67 = require(script.Parent.Event67)

-- Player sessions cache
local activeSessions = {}

-- Initialize player
local function setupPlayer(player)
	local userId = player.UserId
	
	-- Load or create data
	local playerData = DataManager:LoadData(userId)
	activeSessions[userId] = playerData
	
	-- Setup tycoon instance
	local tycoon = TycoonManager:CreateTycoon(player, playerData)
	activeSessions[userId].tycoon = tycoon
	
	-- Start income loop
	tycoon:StartIncomeLoop()
	
	print(string.format("[67 Tycoon] %s initialized | Cash: %s | Rebirths: %d", 
		player.Name, 
		tostring(playerData.cash),
		playerData.rebirths
	))
end

-- Cleanup player
local function cleanupPlayer(player)
	local userId = player.UserId
	local session = activeSessions[userId]
	
	if session then
		DataManager:SaveData(userId, session)
		if session.tycoon then
			session.tycoon:Destroy()
		end
		activeSessions[userId] = nil
	end
end

-- Event connections
Players.PlayerAdded:Connect(setupPlayer)
Players.PlayerRemoving:Connect(cleanupPlayer)

-- Auto-save every 60 seconds
while true do
	task.wait(60)
	for userId, session in pairs(activeSessions) do
		DataManager:SaveData(userId, session)
	end
	print("[67 Tycoon] Auto-save complete")
end
