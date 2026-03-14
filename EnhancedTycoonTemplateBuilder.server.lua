-- EnhancedTycoonTemplateBuilder - Creates a beautiful tycoon structure
-- Place this in ServerScriptService and run once

local function createEnhancedTycoonTemplate()
	local template = Instance.new("Model")
	template.Name = "TycoonTemplate"
	
	-- Lighting setup
	local lighting = game:GetService("Lighting")
	lighting.Technology = Enum.Technology.Future
	lighting.Brightness = 2
	lighting.Ambient = Color3.fromRGB(40, 40, 60)
	lighting.OutdoorAmbient = Color3.fromRGB(60, 60, 80)
	
	-- Atmosphere
	local atmosphere = Instance.new("Atmosphere")
	atmosphere.Density = 0.3
	atmosphere.Offset = 0
	atmosphere.Color = Color3.fromRGB(120, 120, 150)
	atmosphere.Decay = Color3.fromRGB(80, 80, 100)
	atmosphere.Glare = 0.5
	atmosphere.Haze = 0.3
	atmosphere.Parent = lighting
	
	-- Base platform with texture
	local base = Instance.new("Part")
	base.Name = "Base"
	base.Size = Vector3.new(60, 4, 60)
	base.Position = Vector3.new(0, -2, 0)
	base.Anchored = true
	base.Color = Color3.fromRGB(45, 45, 55)
	base.Material = Enum.Material.Concrete
	base.Parent = template
	
	-- Add neon border
	local border = Instance.new("Part")
	border.Name = "NeonBorder"
	border.Size = Vector3.new(62, 0.5, 62)
	border.Position = Vector3.new(0, 0.25, 0)
	border.Anchored = true
	border.Color = Color3.fromRGB(200, 50, 150)
	border.Material = Enum.Material.Neon
	border.Parent = template
	
	-- Spawn point with nice design
	local spawnPlatform = Instance.new("Part")
	spawnPlatform.Name = "SpawnPlatform"
	spawnPlatform.Size = Vector3.new(8, 1, 8)
	spawnPlatform.Position = Vector3.new(-25, 0.5, -25)
	spawnPlatform.Anchored = true
	spawnPlatform.Color = Color3.fromRGB(0, 200, 100)
	spawnPlatform.Material = Enum.Material.Neon
	spawnPlatform.Parent = template
	
	local spawnPoint = Instance.new("SpawnLocation")
	spawnPoint.Name = "SpawnPoint"
	spawnPoint.Size = Vector3.new(6, 1, 6)
	spawnPoint.Position = Vector3.new(-25, 1.5, -25)
	spawnPoint.Anchored = true
	spawnPoint.Color = Color3.fromRGB(0, 255, 100)
	spawnPoint.Material = Enum.Material.Neon
	spawnPoint.Parent = template
	
	-- Floor colors gradient (purple to gold)
	local floorColors = {
		Color3.fromRGB(80, 40, 100),   -- Floor 1: Purple
		Color3.fromRGB(100, 50, 120),  -- Floor 2
		Color3.fromRGB(120, 60, 100),  -- Floor 3
		Color3.fromRGB(140, 70, 80),   -- Floor 4
		Color3.fromRGB(160, 100, 60),  -- Floor 5
		Color3.fromRGB(180, 140, 40),  -- Floor 6
		Color3.fromRGB(200, 180, 50),  -- Floor 7: Gold
		Color3.fromRGB(220, 200, 80),  -- Floor 8
		Color3.fromRGB(240, 220, 120), -- Floor 9
		Color3.fromRGB(255, 215, 0)    -- Floor 10: Pure Gold
	}
	
	-- Create 10 floors
	for floorNum = 1, 10 do
		local floorHeight = 18
		local yPos = 8 + (floorNum - 1) * floorHeight
		
		-- Main floor platform
		local floor = Instance.new("Part")
		floor.Name = "Floor" .. floorNum
		floor.Size = Vector3.new(50, 1.5, 50)
		floor.Position = Vector3.new(0, yPos, 0)
		floor.Anchored = true
		floor.Color = floorColors[floorNum]
		floor.Material = Enum.Material.Metal
		floor.Parent = template
		
		-- Floor number display
		local numberPart = Instance.new("Part")
		numberPart.Name = "FloorNumber"
		numberPart.Size = Vector3.new(4, 4, 0.5)
		numberPart.Position = Vector3.new(0, yPos + 3, -26)
		numberPart.Anchored = true
		numberPart.Color = Color3.fromRGB(30, 30, 30)
		numberPart.Material = Enum.Material.SmoothPlastic
		numberPart.Parent = floor
		
		-- Neon accent strip
		local accent = Instance.new("Part")
		accent.Name = "Accent"
		accent.Size = Vector3.new(52, 0.5, 52)
		accent.Position = Vector3.new(0, yPos + 1, 0)
		accent.Anchored = true
		accent.Color = floorNum == 6 or floorNum == 7 and Color3.fromRGB(255, 50, 50) or Color3.fromRGB(100, 100, 120)
		accent.Material = Enum.Material.Neon
		accent.Parent = floor
		
		-- Buttons folder
		local buttons = Instance.new("Folder")
		buttons.Name = "Buttons"
		buttons.Parent = floor
		
		-- Add purchase buttons
		local buttonConfigs = getFloorButtonConfigs(floorNum)
		for i, config in ipairs(buttonConfigs) do
			local button = createEnhancedButton(config, i, yPos + 2)
			button.Parent = buttons
		end
		
		-- Decorative pillars
		for _, pos in ipairs({{-24, -24}, {24, -24}, {-24, 24}, {24, 24}}) do
			local pillar = Instance.new("Part")
			pillar.Name = "Pillar"
			pillar.Size = Vector3.new(2, floorHeight - 2, 2)
			pillar.Position = Vector3.new(pos[1], yPos - floorHeight/2 + 1, pos[2])
			pillar.Anchored = true
			pillar.Color = Color3.fromRGB(60, 60, 70)
			pillar.Material = Enum.Material.Concrete
			pillar.Parent = floor
		end
	end
	
	-- Enhanced stairs with lighting
	for i = 1, 9 do
		local stairHeight = 18
		local startY = 8 + (i - 1) * stairHeight
		local endY = startY + stairHeight
		
		-- Main stairs
		local stairs = Instance.new("Part")
		stairs.Name = "Stairs" .. i
		stairs.Size = Vector3.new(8, stairHeight - 2, 15)
		stairs.Position = Vector3.new(22, (startY + endY) / 2, 0)
		stairs.Anchored = true
		stairs.Color = Color3.fromRGB(80, 80, 90)
		stairs.Material = Enum.Material.Concrete
		stairs.Parent = template
		
		-- Stair lighting
		local stairLight = Instance.new("Part")
		stairLight.Name = "StairLight"
		stairLight.Size = Vector3.new(1, stairHeight - 4, 1)
		stairLight.Position = Vector3.new(26, (startY + endY) / 2, 5)
		stairLight.Anchored = true
		stairLight.Color = floorColors[i]
		stairLight.Material = Enum.Material.Neon
		stairLight.Parent = stairs
	end
	
	-- Central elevator shaft
	local elevator = Instance.new("Part")
	elevator.Name = "Elevator"
	elevator.Size = Vector3.new(6, 180, 6)
	elevator.Position = Vector3.new(0, 90, 0)
	elevator.Anchored = true
	elevator.Color = Color3.fromRGB(40, 40, 50)
	elevator.Material = Enum.Material.Metal
	elevator.Parent = template
	
	-- Elevator glow
	local elevatorGlow = Instance.new("Part")
	elevatorGlow.Name = "ElevatorGlow"
	elevatorGlow.Size = Vector3.new(7, 180, 7)
	elevatorGlow.Position = Vector3.new(0, 90, 0)
	elevatorGlow.Anchored = true
	elevatorGlow.Color = Color3.fromRGB(200, 50, 150)
	elevatorGlow.Material = Enum.Material.Neon
	elevatorGlow.Transparency = 0.8
	elevatorGlow.Parent = template
	
	return template
end

function getFloorButtonConfigs(floorNum)
	local configs = {
		[1] = {
			{id = "basic_dropper_1", name = "Basic 67 Dropper", cost = 67, type = "dropper", color = Color3.fromRGB(0, 150, 255)},
			{id = "basic_collector_1", name = "Basic Collector", cost = 167, type = "collector", color = Color3.fromRGB(0, 255, 100)},
			{id = "upgrader_1", name = "67% Upgrader", cost = 670, type = "upgrader", color = Color3.fromRGB(255, 200, 0)},
			{id = "floor_2_unlock", name = "Unlock Floor 2", cost = 1670, type = "floorUnlock", color = Color3.fromRGB(255, 50, 50)}
		},
		[2] = {
			{id = "better_dropper_2", name = "Better Dropper", cost = 2670, type = "dropper", color = Color3.fromRGB(0, 150, 255)},
			{id = "dual_dropper_2", name = "Dual Dropper", cost = 5670, type = "dropper", color = Color3.fromRGB(0, 150, 255)},
			{id = "floor_3_unlock", name = "Unlock Floor 3", cost = 10670, type = "floorUnlock", color = Color3.fromRGB(255, 50, 50)}
		},
		[3] = {
			{id = "sixty_seven_dropper", name = "The 67 Dropper", cost = 16670, type = "dropper", color = Color3.fromRGB(200, 50, 200)},
			{id = "lucky_dropper_3", name = "Lucky Dropper", cost = 26670, type = "dropper", color = Color3.fromRGB(200, 200, 50)},
			{id = "floor_4_unlock", name = "Unlock Floor 4", cost = 50000, type = "floorUnlock", color = Color3.fromRGB(255, 50, 50)}
		},
		[4] = {
			{id = "golden_dropper_4", name = "Golden Dropper", cost = 75000, type = "dropper", color = Color3.fromRGB(255, 215, 0)},
			{id = "auto_collector_4", name = "Auto Collector", cost = 100000, type = "collector", color = Color3.fromRGB(0, 255, 100)},
			{id = "floor_5_unlock", name = "Unlock Floor 5", cost = 200000, type = "floorUnlock", color = Color3.fromRGB(255, 50, 50)}
		},
		[5] = {
			{id = "platinum_dropper_5", name = "Platinum Dropper", cost = 300000, type = "dropper", color = Color3.fromRGB(200, 200, 220)},
			{id = "67x_upgrader", name = "67x Upgrader", cost = 500000, type = "upgrader", color = Color3.fromRGB(255, 200, 0)},
			{id = "floor_6_unlock", name = "Unlock Floor 6", cost = 750000, type = "floorUnlock", color = Color3.fromRGB(255, 50, 50)}
		},
		[6] = {
			{id = "six_dropper", name = "The Six Dropper", cost = 1000000, type = "dropper", color = Color3.fromRGB(255, 100, 100)},
			{id = "floor_7_unlock", name = "Unlock Floor 7", cost = 2000000, type = "floorUnlock", color = Color3.fromRGB(255, 50, 50)}
		},
		[7] = {
			{id = "seven_dropper", name = "The Seven Dropper", cost = 2500000, type = "dropper", color = Color3.fromRGB(100, 100, 255)},
			{id = "sixty_seven_shrine", name = "67 Shrine", cost = 6700000, type = "dropper", color = Color3.fromRGB(255, 50, 200)},
			{id = "floor_8_unlock", name = "Unlock Floor 8", cost = 10000000, type = "floorUnlock", color = Color3.fromRGB(255, 50, 50)}
		},
		[8] = {
			{id = "diamond_dropper_8", name = "Diamond Dropper", cost = 15000000, type = "dropper", color = Color3.fromRGB(100, 200, 255)},
			{id = "floor_9_unlock", name = "Unlock Floor 9", cost = 30000000, type = "floorUnlock", color = Color3.fromRGB(255, 50, 50)}
		},
		[9] = {
			{id = "quantum_dropper_9", name = "Quantum Dropper", cost = 50000000, type = "dropper", color = Color3.fromRGB(150, 0, 255)},
			{id = "floor_10_unlock", name = "Unlock Floor 10", cost = 100000000, type = "floorUnlock", color = Color3.fromRGB(255, 50, 50)}
		},
		[10] = {
			{id = "ultimate_67_dropper", name = "ULTIMATE 67 DROPPER", cost = 670000000, type = "dropper", color = Color3.fromRGB(255, 215, 0)},
			{id = "max_upgrader", name = "MAX 67 Upgrader", cost = 1000000000, type = "upgrader", color = Color3.fromRGB(255, 100, 0)}
		}
	}
	return configs[floorNum] or {}
end

function createEnhancedButton(config, index, yPos)
	-- Button base
	local button = Instance.new("Part")
	button.Name = config.id
	button.Size = Vector3.new(5, 2.5, 5)
	button.Position = Vector3.new(-18 + (index * 10), yPos, -20)
	button.Anchored = true
	button.Color = Color3.fromRGB(40, 40, 50)
	button.Material = Enum.Material.SmoothPlastic
	
	-- Neon top
	local neonTop = Instance.new("Part")
	neonTop.Name = "NeonTop"
	neonTop.Size = Vector3.new(4.5, 0.5, 4.5)
	neonTop.Position = Vector3.new(0, 1.25, 0)
	neonTop.Anchored = true
	neonTop.Color = config.color
	neonTop.Material = Enum.Material.Neon
	neonTop.Parent = button
	
	-- Set attributes
	button:SetAttribute("Cost", config.cost)
	button:SetAttribute("ItemType", config.type)
	button:SetAttribute("ItemId", config.id)
	
	-- Item placeholder (hidden initially)
	local item = Instance.new("Model")
	item.Name = "Item"
	
	local itemBase = Instance.new("Part")
	itemBase.Name = "Base"
	itemBase.Size = Vector3.new(3, 3, 3)
	itemBase.Position = Vector3.new(0, 4, 0)
	itemBase.Anchored = true
	itemBase.Color = config.color
	itemBase.Material = Enum.Material.Neon
	itemBase.Parent = item
	
	item.Parent = button
	
	return button
end

-- CREATE THE ENHANCED TEMPLATE
template = createEnhancedTycoonTemplate()
template.Parent = workspace

print("✓ Enhanced TycoonTemplate created in Workspace!")
print("Features:")
print("  - Future lighting technology")
print("  - Atmospheric fog effects")
print("  - Gradient floor colors (purple to gold)")
print("  - Neon accents and lighting")
print("  - Decorative pillars")
print("  - Enhanced stairs with lighting")
print("  - Central elevator shaft")
print("")
print("Next: Copy to ReplicatedStorage, delete old template, test!")
