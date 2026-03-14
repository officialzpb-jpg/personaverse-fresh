-- MonetizationHandler - Server-side purchase processing
local MonetizationHandler = {}

local MarketplaceService = game:GetService("MarketplaceService")
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local Monetization = require(ReplicatedStorage:WaitForChild("MonetizationConfig"))

-- Product ID mappings (replace with actual IDs when published)
local PRODUCT_IDS = {
	-- Cash packs
	cash_small = 123456789,
	cash_medium = 123456790,
	cash_large = 123456791,
	cash_mega = 123456792,
	
	-- Eggs
	egg_basic = 123456793,
	egg_premium = 123456794,
	egg_legendary = 123456795,
	egg_67th = 123456796,
	
	-- Boosts
	boost_2x = 123456797,
	boost_6x = 123456798,
	boost_67x = 123456799,
	boost_lucky = 123456800,
	
	-- Progress
	instant_rebirth = 123456801,
	rebirth_points = 123456802,
	skip_floor = 123456803,
	
	-- Cosmetics
	title_67 = 123456804,
	aura_golden = 123456805,
	trail_67 = 123456806,
	pet_skin_pack = 123456807,
	
	-- Convenience
	no_ads_day = 123456808,
	no_ads_week = 123456809,
	trade_pass = 123456810
}

-- GamePass IDs
local GAMEPASS_IDS = {
	vip_67 = 123456811,
	auto_farm = 123456812,
	lucky_67 = 123456813,
	double_pets = 123456814,
	tycoon_wars = 123456815
}

-- Active boosts
local activeBoosts = {}

-- Process developer product purchase
function MonetizationHandler:ProcessReceipt(receiptInfo)
	local player = Players:GetPlayerByUserId(receiptInfo.PlayerId)
	if not player then
		return Enum.ProductPurchaseDecision.NotProcessedYet
	end
	
	local productId = receiptInfo.ProductId
	local productKey = self:GetProductKey(productId)
	
	if not productKey then
		return Enum.ProductPurchaseDecision.NotProcessedYet
	end
	
	-- Grant rewards
	local success = self:GrantProductRewards(player, productKey)
	
	if success then
		return Enum.ProductPurchaseDecision.PurchaseGranted
	else
		return Enum.ProductPurchaseDecision.NotProcessedYet
	end
end

-- Get product key from ID
function MonetizationHandler:GetProductKey(productId)
	for key, id in pairs(PRODUCT_IDS) do
		if id == productId then
			return key
		end
	end
	return nil
end

-- Grant product rewards
function MonetizationHandler:GrantProductRewards(player, productKey)
	local data = self:GetPlayerData(player)
	if not data then return false end
	
	-- Cash packs
	if productKey:match("^cash_") then
		local amounts = {
			cash_small = 67000,
			cash_medium = 737000,  -- +10%
			cash_large = 8040000,  -- +20%
			cash_mega = 90450000   -- +35%
		}
		data.cash += amounts[productKey] or 0
		self:Notify(player, "💰 Purchased " .. amounts[productKey] .. " cash!")
		return true
	end
	
	-- Eggs
	if productKey:match("^egg_") then
		local PetSystem = require(script.Parent.PetSystem)
		local rarities = {
			egg_basic = "common",
			egg_premium = "rare",
			egg_legendary = "epic",
			egg_67th = "legendary"
		}
		local pet = PetSystem:RollPremiumPet(rarities[productKey])
		data.pets[pet.id] = pet
		self:Notify(player, "🥚 Hatched " .. pet.name .. "!")
		return true
	end
	
	-- Boosts
	if productKey:match("^boost_") then
		local boosts = {
			boost_2x = {mult = 2, duration = 3600},
			boost_6x = {mult = 6.7, duration = 1800},
			boost_67x = {mult = 67, duration = 402},
			boost_lucky = {lucky = true, duration = 1800}
		}
		local boost = boosts[productKey]
		if boost then
			self:ActivateBoost(player, boost)
			self:Notify(player, "🚀 " .. boost.mult .. "x boost activated!")
		end
		return true
	end
	
	-- Rebirth points
	if productKey == "rebirth_points" then
		data.rebirthPoints += 67
		self:Notify(player, "✨ +67 Rebirth Points!")
		return true
	end
	
	-- Skip floor
	if productKey == "skip_floor" then
		-- Unlock next floor
		local tycoon = self:GetPlayerTycoon(player)
		if tycoon then
			tycoon:UnlockNextFloor()
			self:Notify(player, "⏭️ Floor unlocked!")
		end
		return true
	end
	
	-- Titles
	if productKey == "title_67" then
		data.unlockedTitles = data.unlockedTitles or {}
		for _, title in ipairs({"The 67th", "Six Seven", "67 Enthusiast", "Number Lover"}) do
			table.insert(data.unlockedTitles, title)
		end
		self:Notify(player, "🏷️ Titles unlocked!")
		return true
	end
	
	-- No ads
	if productKey:match("^no_ads") then
		data.noAdsUntil = tick() + (productKey == "no_ads_week" and 604800 or 86400)
		self:Notify(player, "🚫 Ads disabled!")
		return true
	end
	
	return false
end

-- Check gamepass ownership
function MonetizationHandler:HasGamepass(player, passKey)
	local passId = GAMEPASS_IDS[passKey]
	if not passId then return false end
	
	local success, hasPass = pcall(function()
		return MarketplaceService:UserOwnsGamePassAsync(player.UserId, passId)
	end)
	
	return success and hasPass
end

-- Get gamepass benefits
function MonetizationHandler:GetGamepassBenefits(player)
	local benefits = {
		incomeMultiplier = 1,
		petSlots = 1,
		autoCollect = false,
		canRaid = false
	}
	
	if self:HasGamepass(player, "vip_67") then
		benefits.incomeMultiplier += 1  -- 2x total
		benefits.rebirthBonus = 0.67
	end
	
	if self:HasGamepass(player, "auto_farm") then
		benefits.autoCollect = true
		benefits.autoPurchase = true
	end
	
	if self:HasGamepass(player, "double_pets") then
		benefits.petSlots = 2
	end
	
	if self:HasGamepass(player, "tycoon_wars") then
		benefits.canRaid = true
	end
	
	return benefits
end

-- Activate boost
function MonetizationHandler:ActivateBoost(player, boostData)
	local userId = player.UserId
	
	if not activeBoosts[userId] then
		activeBoosts[userId] = {}
	end
	
	activeBoosts[userId].multiplier = boostData.mult or 1
	activeBoosts[userId].lucky = boostData.lucky or false
	activeBoosts[userId].expires = tick() + boostData.duration
	
	-- Notify client
	local event = ReplicatedStorage:WaitForChild("Events"):WaitForChild("BoostActivated")
	event:FireClient(player, boostData)
end

-- Get active boost multiplier
function MonetizationHandler:GetBoostMultiplier(player)
	local boost = activeBoosts[player.UserId]
	if not boost then return 1 end
	
	if tick() > boost.expires then
		activeBoosts[player.UserId] = nil
		return 1
	end
	
	return boost.multiplier or 1
end

-- Notify player
function MonetizationHandler:Notify(player, message)
	local event = ReplicatedStorage:WaitForChild("Events"):WaitForChild("PurchaseNotification")
	event:FireClient(player, message)
end

-- Initialize
function MonetizationHandler:Init()
	-- Connect receipt processing
	MarketplaceService.ProcessReceipt = function(receiptInfo)
		return self:ProcessReceipt(receiptInfo)
	end
	
	-- Handle gamepass purchases
	MarketplaceService.PromptGamePassPurchaseFinished:Connect(function(player, passId, wasPurchased)
		if wasPurchased then
			self:Notify(player, "💎 GamePass purchased! Restart for full benefits.")
		end
	end)
	
	print("[MonetizationHandler] Initialized")
end

-- Helper functions (stubs - integrate with your data system)
function MonetizationHandler:GetPlayerData(player)
	-- Return player data from your data manager
	return nil
end

function MonetizationHandler:GetPlayerTycoon(player)
	-- Return player's tycoon instance
	return nil
end

return MonetizationHandler
