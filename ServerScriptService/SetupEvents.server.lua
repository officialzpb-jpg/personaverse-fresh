-- Events setup script
-- Run this to create all required RemoteEvents in ReplicatedStorage

local ReplicatedStorage = game:GetService("ReplicatedStorage")

-- Create Events folder
local eventsFolder = Instance.new("Folder")
eventsFolder.Name = "Events"
eventsFolder.Parent = ReplicatedStorage

-- List of required events
local eventNames = {
	"UpdateUI",
	"SixtySevenEvent",
	"AchievementUnlocked",
	"Start67Event",
	"End67Event",
	"TypingRushResponse",
	"RebirthRequest",
	"RebirthResponse",
	"HatchPetRequest",
	"HatchPetResponse",
	"EquipPetRequest",
	"GetLeaderboard"
}

-- Create each event
for _, name in ipairs(eventNames) do
	local event = Instance.new("RemoteEvent")
	event.Name = name
	event.Parent = eventsFolder
	print("Created RemoteEvent: " .. name)
end

print("All events created successfully!")
