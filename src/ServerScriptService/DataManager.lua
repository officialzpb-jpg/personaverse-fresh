-- DataManager - Handles player data persistence
local DataManager = {}

-- Template for new players
local DATA_TEMPLATE = {
	cash = 67,  -- Start with 67!
	rebirths = 0,
	rebirthPoints = 0,
	multiplier = 1,
	unlockedFloors = {1},
	purchasedItems = {},
	pets = {},
	equippedPet = nil,
	stats = {
		totalEarned = 0,
		totalSpent = 0,
		playTime = 0,
		itemsPurchased = 0
	},
	settings = {
		autoCollect = false,
		notifications = true
	}
}

-- In-memory store (replace with DataStore for live game)
local dataStore = {}

function DataManager:LoadData(userId)
	-- Check if we have saved data
	if dataStore[userId] then
		return self:MigrateData(dataStore[userId])
	end
	
	-- Return fresh data
	return self:DeepCopy(DATA_TEMPLATE)
end

function DataManager:SaveData(userId, data)
	dataStore[userId] = self:DeepCopy(data)
	return true
end

-- Deep copy utility
function DataManager:DeepCopy(original)
	local copy = {}
	for k, v in pairs(original) do
		if type(v) == "table" then
			copy[k] = self:DeepCopy(v)
		else
			copy[k] = v
		end
	end
	return copy
end

-- Handle data version migrations
function DataManager:MigrateData(data)
	-- Ensure all fields exist
	for key, value in pairs(DATA_TEMPLATE) do
		if data[key] == nil then
			if type(value) == "table" then
				data[key] = self:DeepCopy(value)
			else
				data[key] = value
			end
		end
	end
	return data
end

return DataManager
