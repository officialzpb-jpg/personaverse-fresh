-- PetSystem - Handles pet hatching, equipping, and bonuses
local PetSystem = {}

local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Config = require(ReplicatedStorage:WaitForChild("Config"))

-- Get random pet based on rarity chances
function PetSystem:RollPet()
	local roll = math.random()
	local cumulative = 0
	
	for _, pet in ipairs(Config.PETS) do
		cumulative += pet.chance
		if roll <= cumulative then
			return self:CreatePetInstance(pet)
		end
	end
	
	-- Fallback to common
	return self:CreatePetInstance(Config.PETS[1])
end

-- Create pet instance for player data
function PetSystem:CreatePetInstance(petConfig)
	local pet = {
		id = petConfig.id .. "_" .. tostring(tick()),
		templateId = petConfig.id,
		name = petConfig.name,
		rarity = petConfig.rarity,
		bonus = petConfig.bonus,
		obtainedAt = tick()
	}
	return pet
end

-- Hatch a pet (costs in-game currency)
function PetSystem:HatchPet(player, data, cost)
	if data.cash < cost then
		return false, "Not enough cash!"
	end
	
	data.cash -= cost
	local pet = self:RollPet()
	data.pets[pet.id] = pet
	
	-- Auto-equip if no pet equipped
	if not data.equippedPet then
		data.equippedPet = pet.id
	end
	
	return true, pet
end

-- Equip a pet
function PetSystem:EquipPet(data, petId)
	if not data.pets[petId] then
		return false, "Pet not found!"
	end
	
	data.equippedPet = petId
	return true, data.pets[petId]
end

-- Unequip current pet
function PetSystem:UnequipPet(data)
	data.equippedPet = nil
	return true
end

-- Get equipped pet bonus
function PetSystem:GetEquippedBonus(data)
	if not data.equippedPet then return 0 end
	
	local pet = data.pets[data.equippedPet]
	if not pet then return 0 end
	
	return pet.bonus
end

-- Get pet display info
function PetSystem:GetPetInfo(pet)
	local rarityColors = {
		common = Color3.fromRGB(169, 169, 169),
		uncommon = Color3.fromRGB(0, 255, 0),
		rare = Color3.fromRGB(0, 100, 255),
		epic = Color3.fromRGB(150, 0, 200),
		legendary = Color3.fromRGB(255, 215, 0)
	}
	
	return {
		name = pet.name,
		rarity = pet.rarity,
		color = rarityColors[pet.rarity] or Color3.fromRGB(255, 255, 255),
		bonus = pet.bonus,
		bonusText = string.format("+%d%% Income", math.floor(pet.bonus * 100))
	}
end

return PetSystem
