-- TycoonManager - Creates and manages individual player tycoons
local TycoonManager = {}

local ReplicatedStorage = game:GetService("ReplicatedStorage")
local RunService = game:GetService("RunService")

-- Tycoon template reference (will be cloned)
local TycoonTemplate = ReplicatedStorage:WaitForChild("TycoonTemplate")

-- Configuration
local TYCOON_CONFIG = {
	baseIncome = 67,  -- $67 per second base
	incomeInterval = 1,  -- seconds
	maxFloors = 10,
	floorHeight = 20
}

-- Active tycoons
local activeTycoons = {}

-- Create new tycoon instance
function TycoonManager:CreateTycoon(player, data)
	local tycoon = setmetatable({}, {__index = self})
	
	tycoon.player = player
	tycoon.data = data
	tycoon.instance = nil
	tycoon.droppers = {}
	tycoon.collectors = {}
	tycoon.incomeLoop = nil
	tycoon.floorInstances = {}
	
	-- Build the physical tycoon
	tycoon:Build()
	
	activeTycoons[player.UserId] = tycoon
	return tycoon
end

-- Build tycoon structure
function TycoonManager:Build()
	-- Clone template
	self.instance = TycoonTemplate:Clone()
	self.instance.Name = self.player.Name .. "_Tycoon"
	
	-- Position tycoon (simple grid placement)
	local tycoonIndex = #activeTycoons + 1
	local spacing = 100
	self.instance:PivotTo(CFrame.new(tycoonIndex * spacing, 0, 0))
	
	self.instance.Parent = workspace
	
	-- Setup initial floor
	self:SetupFloor(1)
	
	-- Restore purchased items
	self:RestorePurchases()
end

-- Setup a floor
function TycoonManager:SetupFloor(floorNum)
	local floor = self.instance:FindFirstChild("Floor" .. floorNum)
	if not floor then return end
	
	self.floorInstances[floorNum] = floor
	
	-- Setup purchase buttons
	local buttons = floor:FindFirstChild("Buttons")
	if buttons then
		for _, button in ipairs(buttons:GetChildren()) do
			if button:IsA("BasePart") then
				self:SetupPurchaseButton(button)
			end
		end
	end
end

-- Setup purchase button
function TycoonManager:SetupPurchaseButton(button)
	local cost = button:GetAttribute("Cost") or 67
	local itemType = button:GetAttribute("ItemType") or "dropper"
	local itemId = button:GetAttribute("ItemId") or button.Name
	
	-- Create prompt
	local prompt = Instance.new("ProximityPrompt")
	prompt.ObjectText = button.Name
	prompt.ActionText = "Buy ($" .. tostring(cost) .. ")"
	prompt.KeyboardKeyCode = Enum.KeyCode.E
	prompt.HoldDuration = 0
	prompt.MaxActivationDistance = 10
	prompt.RequiresLineOfSight = false
	
	prompt.Triggered:Connect(function(player)
		if player == self.player then
			self:AttemptPurchase(itemId, cost, itemType, button)
		end
	end)
	
	prompt.Parent = button
end

-- Attempt purchase
function TycoonManager:AttemptPurchase(itemId, cost, itemType, button)
	if self.data.cash < cost then
		-- Not enough money feedback
		return
	end
	
	-- Deduct cash
	self.data.cash -= cost
	self.data.stats.totalSpent += cost
	self.data.stats.itemsPurchased += 1
	
	-- Mark as purchased
	self.data.purchasedItems[itemId] = true
	
	-- Activate the item
	self:ActivateItem(itemType, button)
	
	-- Remove button
	button:Destroy()
	
	-- Update UI
	self:UpdateUI()
	
	-- Check for 67th purchase achievement
	if self.data.stats.itemsPurchased == 67 then
		self:Grant67Bonus()
	end
end

-- Activate purchased item
function TycoonManager:ActivateItem(itemType, button)
	local item = button:FindFirstChild("Item")
	if not item then return end
	
	item.Parent = button.Parent
	
	if itemType == "dropper" then
		self:RegisterDropper(item)
	elseif itemType == "collector" then
		self:RegisterCollector(item)
	elseif itemType == "upgrader" then
		self:RegisterUpgrader(item)
	elseif itemType == "floorUnlock" then
		self:UnlockNextFloor()
	end
end

-- Register a dropper
function TycoonManager:RegisterDropper(dropper)
	table.insert(self.droppers, {
		instance = dropper,
		value = dropper:GetAttribute("Value") or 67,
		interval = dropper:GetAttribute("Interval") or 1
	})
end

-- Register a collector
function TycoonManager:RegisterCollector(collector)
	table.insert(self.collectors, collector)
end

-- Start income generation
function TycoonManager:StartIncomeLoop()
	self.incomeLoop = task.spawn(function()
		while self.instance and self.instance.Parent do
			self:GenerateIncome()
			task.wait(TYCOON_CONFIG.incomeInterval)
		end
	end)
end

-- Calculate and add income
function TycoonManager:GenerateIncome()
	local totalIncome = 0
	
	-- Calculate from droppers
	for _, dropper in ipairs(self.droppers) do
		totalIncome += dropper.value * self.data.multiplier
	end
	
	-- Apply pet bonuses
	if self.data.equippedPet then
		local petData = self.data.pets[self.data.equippedPet]
		if petData then
			totalIncome *= (1 + petData.bonus)
		end
	end
	
	-- The 67 Event check
	if math.random(1, 670) == 67 then  -- 1 in 670 chance
		totalIncome *= 6.7
		self:Trigger67Event()
	end
	
	self.data.cash += totalIncome
	self.data.stats.totalEarned += totalIncome
	
	self:UpdateUI()
end

-- Trigger special 67 event
function TycoonManager:Trigger67Event()
	-- Fire client event for visual/sound effects
	local event = ReplicatedStorage:WaitForChild("Events"):WaitForChild("SixtySevenEvent")
	event:FireClient(self.player)
end

-- Grant 67th purchase bonus
function TycoonManager:Grant67Bonus()
	self.data.multiplier += 0.67
	local event = ReplicatedStorage:WaitForChild("Events"):WaitForChild("AchievementUnlocked")
	event:FireClient(self.player, "67 Club", "Purchased 67 items! +67% multiplier")
end

-- Update player UI
function TycoonManager:UpdateUI()
	local event = ReplicatedStorage:WaitForChild("Events"):WaitForChild("UpdateUI")
	event:FireClient(self.player, {
		cash = self.data.cash,
		multiplier = self.data.multiplier,
		rebirths = self.data.rebirths
	})
end

-- Restore purchases on load
function TycoonManager:RestorePurchases()
	for itemId, _ in pairs(self.data.purchasedItems) do
		-- Find and activate the item
		for _, floor in ipairs(self.floorInstances) do
			local buttons = floor:FindFirstChild("Buttons")
			if buttons then
				local button = buttons:FindFirstChild(itemId)
				if button then
					local itemType = button:GetAttribute("ItemType") or "dropper"
					self:ActivateItem(itemType, button)
					button:Destroy()
				end
			end
		end
	end
end

-- Unlock next floor
function TycoonManager:UnlockNextFloor()
	local currentFloor = #self.data.unlockedFloors
	local nextFloor = currentFloor + 1
	
	if nextFloor <= TYCOON_CONFIG.maxFloors then
		table.insert(self.data.unlockedFloors, nextFloor)
		self:SetupFloor(nextFloor)
		
		-- Floor 67 special
		if nextFloor == 6 or nextFloor == 7 then
			self:Check67FloorBonus()
		end
	end
end

-- Check for floors 6 + 7 both unlocked
function TycoonManager:Check67FloorBonus()
	local has6 = table.find(self.data.unlockedFloors, 6)
	local has7 = table.find(self.data.unlockedFloors, 7)
	
	if has6 and has7 then
		self.data.multiplier += 0.067
	end
end

-- Destroy tycoon
function TycoonManager:Destroy()
	if self.incomeLoop then
		self.incomeLoop = nil
	end
	if self.instance then
		self.instance:Destroy()
	end
	activeTycoons[self.player.UserId] = nil
end

return TycoonManager
