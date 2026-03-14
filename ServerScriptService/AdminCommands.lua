-- AdminCommands - Testing and admin utilities
local AdminCommands = {}

local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

-- Admin user IDs (add yours here)
local ADMINS = {
	-- Add your Roblox UserId here
}

-- Check if player is admin
function AdminCommands:IsAdmin(player)
	return table.find(ADMINS, player.UserId) ~= nil or player.UserId < 1  -- Studio players
end

-- Process chat commands
function AdminCommands:ProcessCommand(player, message)
	if not self:IsAdmin(player) then return end
	
	local args = message:split(" ")
	local command = args[1]:lower()
	
	if command == "/give" then
		local amount = tonumber(args[2]) or 1000
		self:GiveCash(player, amount)
		
	elseif command == "/rebirth" then
		self:ForceRebirth(player)
		
	elseif command == "/event" then
		local eventType = args[2] or "RAIN_67"
		self:TriggerEvent(eventType)
		
	elseif command == "/pet" then
		self:GiveRandomPet(player)
		
	elseif command == "/reset" then
		self:ResetPlayer(player)
		
	elseif command == "/setmultiplier" then
		local mult = tonumber(args[2]) or 1
		self:SetMultiplier(player, mult)
		
	elseif command == "/67" then
		self:Trigger67Effect(player)
	end
end

-- Give cash to player
function AdminCommands:GiveCash(player, amount)
	local event = ReplicatedStorage:WaitForChild("Events"):WaitForChild("AdminGiveCash")
	event:Fire(player, amount)
	print(string.format("[Admin] Gave %s $%s", player.Name, tostring(amount)))
end

-- Force rebirth
function AdminCommands:ForceRebirth(player)
	local event = ReplicatedStorage:WaitForChild("Events"):WaitForChild("AdminForceRebirth")
	event:Fire(player)
	print(string.format("[Admin] Forced rebirth for %s", player.Name))
end

-- Trigger event
function AdminCommands:TriggerEvent(eventType)
	local Event67 = require(script.Parent.Event67)
	Event67:StartEvent(eventType)
	print(string.format("[Admin] Triggered event: %s", eventType))
end

-- Give random pet
function AdminCommands:GiveRandomPet(player)
	local PetSystem = require(script.Parent.PetSystem)
	-- Implementation would add pet to player data
	print(string.format("[Admin] Gave pet to %s", player.Name))
end

-- Reset player
function AdminCommands:ResetPlayer(player)
	local event = ReplicatedStorage:WaitForChild("Events"):WaitForChild("AdminResetPlayer")
	event:Fire(player)
	print(string.format("[Admin] Reset %s", player.Name))
end

-- Set multiplier
function AdminCommands:SetMultiplier(player, multiplier)
	local event = ReplicatedStorage:WaitForChild("Events"):WaitForChild("AdminSetMultiplier")
	event:Fire(player, multiplier)
	print(string.format("[Admin] Set %s multiplier to %sx", player.Name, tostring(multiplier)))
end

-- Trigger 67 effect
function AdminCommands:Trigger67Effect(player)
	local event = ReplicatedStorage:WaitForChild("Events"):WaitForChild("SixtySevenEvent")
	event:FireClient(player)
	print(string.format("[Admin] 67 effect for %s", player.Name))
end

-- Initialize
function AdminCommands:Init()
	Players.PlayerAdded:Connect(function(player)
		player.Chatted:Connect(function(message)
			self:ProcessCommand(player, message)
		end)
	end)
	print("[AdminCommands] Initialized")
end

return AdminCommands
