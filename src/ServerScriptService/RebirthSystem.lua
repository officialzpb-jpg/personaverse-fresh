-- RebirthSystem - Handles rebirth mechanics
local RebirthSystem = {}

local ReplicatedStorage = game:GetService("ReplicatedStorage")

-- Rebirth configuration
local REBIRTH_CONFIG = {
	baseCost = 100000,  -- 100K for first rebirth
	costMultiplier = 2.5,
	pointMultiplier = 1.5,
	bonusPerRebirth = 0.5  -- +50% income per rebirth
}

-- Calculate rebirth cost
function RebirthSystem:GetRebirthCost(currentRebirths)
	return math.floor(REBIRTH_CONFIG.baseCost * (REBIRTH_CONFIG.costMultiplier ^ currentRebirths))
end

-- Calculate rebirth points earned
function RebirthSystem:GetRebirthPoints(cash, currentRebirths)
	local basePoints = math.floor(cash / 10000)  -- 1 point per 10K
	return math.floor(basePoints * (REBIRTH_CONFIG.pointMultiplier ^ currentRebirths))
end

-- Attempt rebirth
function RebirthSystem:AttemptRebirth(player, data)
	local cost = self:GetRebirthCost(data.rebirths)
	
	if data.cash < cost then
		return false, "Not enough cash! Need: $" .. tostring(cost)
	end
	
	-- Check for perfect 67 rebirth
	local isPerfect67 = (data.cash >= 67000000 and data.cash < 68000000) or
	                    (tostring(data.cash):match("67") and math.random(1,3) == 1)
	
	-- Calculate points
	local points = self:GetRebirthPoints(data.cash, data.rebirths)
	if isPerfect67 then
		points = math.floor(points * 6.7)
	end
	
	-- Apply rebirth
	data.rebirths += 1
	data.rebirthPoints += points
	data.multiplier += REBIRTH_CONFIG.bonusPerRebirth
	
	-- Reset progress (keep some things)
	data.cash = 67  -- Start with 67 again
	data.unlockedFloors = {1}
	data.purchasedItems = {}
	data.equippedPet = nil
	
	-- Keep best pet
	local bestPet = nil
	local bestBonus = 0
	for petId, petData in pairs(data.pets) do
		if petData.bonus > bestBonus then
			bestBonus = petData.bonus
			bestPet = petId
		end
	end
	data.equippedPet = bestPet
	
	return true, {
		rebirths = data.rebirths,
		points = points,
		isPerfect67 = isPerfect67
	}
end

-- Get rebirth shop items
function RebirthSystem:GetShopItems()
	return {
		{
			id = "67_pet",
			name = "The 67th Pet",
			cost = 67,
			description = "+67% income boost",
			bonus = 0.67
		},
		{
			id = "double_income",
			name = "Double Trouble",
			cost = 500,
			description = "Permanent 2x income",
			bonus = 2.0
		},
		{
			id = "auto_collect",
			name = "Auto Collector",
			cost = 1000,
			description = "Automatically collect from all floors",
			bonus = 0
		},
		{
			id = "lucky_67",
			name = "Lucky 67",
			cost = 670,
			description = "67% chance for 6.7x income on any drop",
			bonus = 0
		}
	}
end

return RebirthSystem
