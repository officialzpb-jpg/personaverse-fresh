-- TycoonTemplateBuilder - Creates the physical tycoon structure
-- Place this in ServerScriptService, run once, then move template to ReplicatedStorage

local function createTycoonTemplate()
	local template = Instance.new("Model")
	template.Name = "TycoonTemplate"
	
	-- Base platform
	local base = Instance.new("Part")
	base.Name = "Base"
	base.Size = Vector3.new(50, 2, 50)
	base.Position = Vector3.new(0, 0, 0)
	base.Anchored = true
	base.Color = Color3.fromRGB(100, 100, 100)
	base.Material = Enum.Material.Concrete
	base.Parent = template
	
	-- Spawn point
	local spawnPoint = Instance.new("SpawnLocation")
	spawnPoint.Name = "SpawnPoint"
	spawnPoint.Size = Vector3.new(6, 1, 6)
	spawnPoint.Position = Vector3.new(-20, 2, -20)
	spawnPoint.Anchored = true
	spawnPoint.Color = Color3.fromRGB(0, 255, 0)
	spawnPoint.Parent = template
	
	-- Create 10 floors
	for floorNum = 1, 10 do
		local floorHeight = 20
		local yPos = 10 + (floorNum - 1) * floorHeight
		
		-- Floor platform
		local floor = Instance.new("Part")
		floor.Name = "Floor" .. floorNum
		floor.Size = Vector3.new(40, 2, 40)
		floor.Position = Vector3.new(0, yPos, 0)
		floor.Anchored = true
		
		-- Color gradient from floor 1 to 10
		local hue = (floorNum - 1) / 10
		floor.Color = Color3.fromHSV(hue, 0.7, 0.8)
		floor.Material = Enum.Material.SmoothPlastic
		floor.Parent = template
		
		-- Buttons folder
		local buttons = Instance.new("Folder")
		buttons.Name = "Buttons"
		buttons.Parent = floor
		
		-- Add purchase buttons based on floor
		local buttonConfigs = {
			[1] = {
				{id = "basic_dropper_1", name = "Basic 67 Dropper", cost = 67, type = "dropper"},
				{id = "basic_collector_1", name = "Basic Collector", cost = 167, type = "collector"},
				{id = "upgrader_1", name = "67% Upgrader", cost = 670, type = "upgrader"},
				{id = "floor_2_unlock", name = "Unlock Floor 2", cost = 1670, type = "floorUnlock"}
			},
			[2] = {
				{id = "better_dropper_2", name = "Better Dropper", cost = 2670, type = "dropper"},
				{id = "dual_dropper_2", name = "Dual Dropper", cost = 5670, type = "dropper"},
				{id = "floor_3_unlock", name = "Unlock Floor 3", cost = 10670, type = "floorUnlock"}
			},
			[3] = {
				{id = "sixty_seven_dropper", name = "The 67 Dropper", cost = 16670, type = "dropper"},
				{id = "lucky_dropper_3", name = "Lucky Dropper", cost = 26670, type = "dropper"},
				{id = "floor_4_unlock", name = "Unlock Floor 4", cost = 50000, type = "floorUnlock"}
			},
			[4] = {
				{id = "golden_dropper_4", name = "Golden Dropper", cost = 75000, type = "dropper"},
				{id = "auto_collector_4", name = "Auto Collector", cost = 100000, type = "collector"},
				{id = "floor_5_unlock", name = "Unlock Floor 5", cost = 200000, type = "floorUnlock"}
			},
			[5] = {
				{id = "platinum_dropper_5", name = "Platinum Dropper", cost = 300000, type = "dropper"},
				{id = "67x_upgrader", name = "67x Upgrader", cost = 500000, type = "upgrader"},
				{id = "floor_6_unlock", name = "Unlock Floor 6", cost = 750000, type = "floorUnlock"}
			},
			[6] = {
				{id = "six_dropper", name = "The Six Dropper", cost = 1000000, type = "dropper"},
				{id = "floor_7_unlock", name = "Unlock Floor 7", cost = 2000000, type = "floorUnlock"}
			},
			[7] = {
				{id = "seven_dropper", name = "The Seven Dropper", cost = 2500000, type = "dropper"},
				{id = "sixty_seven_shrine", name = "67 Shrine", cost = 6700000, type = "dropper"},
				{id = "floor_8_unlock", name = "Unlock Floor 8", cost = 10000000, type = "floorUnlock"}
			},
			[8] = {
				{id = "diamond_dropper_8", name = "Diamond Dropper", cost = 15000000, type = "dropper"},
				{id = "floor_9_unlock", name = "Unlock Floor 9", cost = 30000000, type = "floorUnlock"}
			},
			[9] = {
				{id = "quantum_dropper_9", name = "Quantum Dropper", cost = 50000000, type = "dropper"},
				{id = "floor_10_unlock", name = "Unlock Floor 10", cost = 100000000, type = "floorUnlock"}
			},
			[10] = {
				{id = "ultimate_67_dropper", name = "ULTIMATE 67 DROPPER", cost = 670000000, type = "dropper"},
				{id = "max_upgrader", name = "MAX 67 Upgrader", cost = 1000000000, type = "upgrader"}
			}
		}
		
		local floorButtons = buttonConfigs[floorNum] or {}
		for i, config in ipairs(floorButtons) do
			-- Create button
			local button = Instance.new("Part")
			button.Name = config.id
			button.Size = Vector3.new(6, 3, 2)
			button.Position = Vector3.new(-15 + (i * 8), yPos + 2, -15)
			button.Anchored = true
			
			-- Color based on type
			local colors = {
				dropper = Color3.fromRGB(0, 150, 255),
				collector = Color3.fromRGB(0, 255, 100),
				upgrader = Color3.fromRGB(255, 200, 0),
				floorUnlock = Color3.fromRGB(255, 50, 50)
			}
			button.Color = colors[config.type] or Color3.fromRGB(200, 200, 200)
			button.Material = Enum.Material.Neon
			
			-- Set attributes
			button:SetAttribute("Cost", config.cost)
			button:SetAttribute("ItemType", config.type)
			button:SetAttribute("ItemId", config.id)
			
			-- Item placeholder (hidden initially)
			local item = Instance.new("Part")
			item.Name = "Item"
			item.Size = Vector3.new(4, 4, 4)
			item.Position = Vector3.new(0, 5, 0)
			item.Anchored = true
			item.Color = button.Color
			item.Transparency = 1
			item.Parent = button
			
			button.Parent = buttons
		end
	end
	
	-- Stairs connecting floors
	for i = 1, 9 do
		local stairHeight = 20
		local startY = 10 + (i - 1) * stairHeight
		local endY = startY + stairHeight
		
		local stairs = Instance.new("Part")
		stairs.Name = "Stairs" .. i
		stairs.Size = Vector3.new(6, stairHeight, 20)
		stairs.Position = Vector3.new(18, (startY + endY) / 2, 0)
		stairs.Anchored = true
		stairs.Color = Color3.fromRGB(150, 150, 150)
		stairs.Material = Enum.Material.Concrete
		stairs.Parent = template
	end
	
	return template
end

-- CREATE THE TEMPLATE NOW
template = createTycoonTemplate()
template.Parent = workspace

print("✓ TycoonTemplate created in Workspace!")
print("Now: Cut it from Workspace, paste into ReplicatedStorage, rename to 'TycoonTemplate'")
