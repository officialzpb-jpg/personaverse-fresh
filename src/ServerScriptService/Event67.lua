-- Event67 - Special 67-themed events
local Event67 = {}

local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Players = game:GetService("Players")

-- Active events
local activeEvents = {}

-- Event types
local EVENT_TYPES = {
	RAIN_67 = "rain_67",
	TYPING_RUSH = "typing_rush",
	GOLDEN_67 = "golden_67",
	RAID_67 = "raid_67"
}

-- Start random 67 event
function Event67:StartRandomEvent()
	local eventType = self:GetRandomEventType()
	self:StartEvent(eventType)
end

-- Get random event type
function Event67:GetRandomEventType()
	local types = {}
	for _, v in pairs(EVENT_TYPES) do
		table.insert(types, v)
	end
	return types[math.random(1, #types)]
end

-- Start specific event
function Event67:StartEvent(eventType)
	if activeEvents[eventType] then return end
	
	activeEvents[eventType] = true
	
	if eventType == EVENT_TYPES.RAIN_67 then
		self:StartRain67()
	elseif eventType == EVENT_TYPES.TYPING_RUSH then
		self:StartTypingRush()
	elseif eventType == EVENT_TYPES.GOLDEN_67 then
		self:StartGolden67()
	elseif eventType == EVENT_TYPES.RAID_67 then
		self:StartRaid67()
	end
end

-- 67 Rain: Numbers fall from sky, collect for cash
function Event67:StartRain67()
	local event = ReplicatedStorage:WaitForChild("Events"):WaitForChild("Start67Event")
	event:FireAllClients("RAIN_67")
	
	-- Server-side spawning
	local spawnLoop = task.spawn(function()
		for i = 1, 67 do
			self:SpawnFalling67()
			task.wait(0.5)
		end
	end)
	
	-- End after 67 seconds
	task.delay(67, function()
		activeEvents[EVENT_TYPES.RAIN_67] = nil
		local endEvent = ReplicatedStorage:WaitForChild("Events"):WaitForChild("End67Event")
		endEvent:FireAllClients("RAIN_67")
	end)
end

-- Spawn a falling 67
function Event67:SpawnFalling67()
	-- Implementation would spawn physical 67s
	-- For now, just grant random players cash
	local players = Players:GetPlayers()
	if #players > 0 then
		local luckyPlayer = players[math.random(1, #players)]
		local bonus = math.random(670, 6700)
		-- Would add to player data here
	end
end

-- Typing Rush: Type "67" fast for bonus
function Event67:StartTypingRush()
	local event = ReplicatedStorage:WaitForChild("Events"):WaitForChild("Start67Event")
	event:FireAllClients("TYPING_RUSH")
	
	-- Track responses
	local responses = {}
	local connection
	
	connection = ReplicatedStorage:WaitForChild("Events"):WaitForChild("TypingRushResponse").OnServerEvent:Connect(function(player)
		if not responses[player.UserId] then
			responses[player.UserId] = tick()
			local speed = #responses
			local bonus = math.max(6700 - (speed * 100), 670)
			-- Grant bonus based on speed
		end
	end)
	
	task.delay(10, function()
		connection:Disconnect()
		activeEvents[EVENT_TYPES.TYPING_RUSH] = nil
	end)
end

-- Golden 67: One dropper becomes super valuable
function Event67:StartGolden67()
	local event = ReplicatedStorage:WaitForChild("Events"):WaitForChild("Start67Event")
	event:FireAllClients("GOLDEN_67")
	
	-- Would mark a random dropper as golden
	-- Players race to find and collect from it
	
	task.delay(67, function()
		activeEvents[EVENT_TYPES.GOLDEN_67] = nil
	end)
end

-- Raid 67: Requires 67 players for mega bonus
function Event67:StartRaid67()
	local playerCount = #Players:GetPlayers()
	
	if playerCount >= 67 then
		-- Mega bonus for everyone
		for _, player in ipairs(Players:GetPlayers()) do
			-- Grant 6.7x multiplier for 6.7 minutes
		end
	else
		-- Partial bonus based on player count
		local progress = playerCount / 67
		-- Grant partial bonus
	end
	
	activeEvents[EVENT_TYPES.RAID_67] = nil
end

-- Check for 67 player raid condition
function Event67:CheckRaid67()
	if #Players:GetPlayers() >= 67 then
		self:StartEvent(EVENT_TYPES.RAID_67)
	end
end

-- Schedule random events
function Event67:StartEventScheduler()
	task.spawn(function()
		while true do
			-- Random interval between 6.7 and 67 minutes
			local waitTime = math.random(402, 4020)
			task.wait(waitTime)
			self:StartRandomEvent()
		end
	end)
end

return Event67
