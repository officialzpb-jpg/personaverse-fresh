-- 67 Tycoon Configuration
local Config = {}

-- Game Settings
Config.GAME_NAME = "67 Tycoon"
Config.VERSION = "1.0.0"

-- Economy Settings
Config.STARTING_CASH = 67
Config.BASE_INCOME = 67
Config.INCOME_INTERVAL = 1  -- seconds

-- Rebirth Settings
Config.REBIRTH = {
	BASE_COST = 100000,
	COST_MULTIPLIER = 2.5,
	POINT_MULTIPLIER = 1.5,
	BONUS_PER_REBIRTH = 0.5
}

-- Floor Settings
Config.FLOORS = {
	MAX_FLOORS = 10,
	FLOOR_HEIGHT = 20,
	UNLOCK_COST_MULTIPLIER = 10
}

-- Event Settings
Config.EVENTS = {
	RAIN_67 = {
		duration = 67,
		spawnCount = 67,
		spawnInterval = 0.5
	},
	TYPING_RUSH = {
		duration = 10,
		maxBonus = 6700,
		minBonus = 670
	},
	GOLDEN_67 = {
		duration = 67,
		multiplier = 67
	},
	RAID_67 = {
		requiredPlayers = 67,
		bonusMultiplier = 6.7,
		bonusDuration = 402  -- 6.7 minutes in seconds
	}
}

-- Item Definitions
Config.ITEMS = {
	-- Floor 1 Items
	{
		id = "basic_dropper_1",
		name = "Basic 67 Dropper",
		cost = 67,
		value = 67,
		interval = 1,
		floor = 1,
		type = "dropper"
	},
	{
		id = "basic_collector_1",
		name = "Basic Collector",
		cost = 167,
		floor = 1,
		type = "collector"
	},
	{
		id = "upgrader_1",
		name = "67% Upgrader",
		cost = 670,
		multiplier = 1.67,
		floor = 1,
		type = "upgrader"
	},
	{
		id = "floor_2_unlock",
		name = "Unlock Floor 2",
		cost = 1670,
		floor = 1,
		type = "floorUnlock"
	},
	
	-- Floor 2 Items
	{
		id = "better_dropper_2",
		name = "Better Dropper",
		cost = 2670,
		value = 267,
		interval = 1,
		floor = 2,
		type = "dropper"
	},
	{
		id = "dual_dropper_2",
		name = "Dual Dropper",
		cost = 5670,
		value = 467,
		interval = 0.5,
		floor = 2,
		type = "dropper"
	},
	{
		id = "floor_3_unlock",
		name = "Unlock Floor 3",
		cost = 10670,
		floor = 2,
		type = "floorUnlock"
	},
	
	-- Floor 3 Items (The 67 Floor)
	{
		id = "sixty_seven_dropper",
		name = "The 67 Dropper",
		cost = 16670,
		value = 667,
		interval = 0.67,
		floor = 3,
		type = "dropper"
	},
	{
		id = "lucky_dropper_3",
		name = "Lucky Dropper",
		cost = 26670,
		value = 100,
		interval = 1,
		luckyChance = 0.67,
		luckyMultiplier = 6.7,
		floor = 3,
		type = "dropper"
	},
	{
		id = "floor_4_unlock",
		name = "Unlock Floor 4",
		cost = 50000,
		floor = 3,
		type = "floorUnlock"
	},
	
	-- Floor 4 Items
	{
		id = "golden_dropper_4",
		name = "Golden Dropper",
		cost = 75000,
		value = 1500,
		interval = 1,
		floor = 4,
		type = "dropper"
	},
	{
		id = "auto_collector_4",
		name = "Auto Collector",
		cost = 100000,
		floor = 4,
		type = "collector"
	},
	{
		id = "floor_5_unlock",
		name = "Unlock Floor 5",
		cost = 200000,
		floor = 4,
		type = "floorUnlock"
	},
	
	-- Floor 5 Items
	{
		id = "platinum_dropper_5",
		name = "Platinum Dropper",
		cost = 300000,
		value = 5000,
		interval = 1,
		floor = 5,
		type = "dropper"
	},
	{
		id = "67x_upgrader",
		name = "67x Upgrader",
		cost = 500000,
		multiplier = 6.7,
		floor = 5,
		type = "upgrader"
	},
	{
		id = "floor_6_unlock",
		name = "Unlock Floor 6",
		cost = 750000,
		floor = 5,
		type = "floorUnlock"
	},
	
	-- Floor 6 Items (Part of 67)
	{
		id = "six_dropper",
		name = "The Six Dropper",
		cost = 1000000,
		value = 10000,
		interval = 0.6,
		floor = 6,
		type = "dropper"
	},
	{
		id = "floor_7_unlock",
		name = "Unlock Floor 7",
		cost = 2000000,
		floor = 6,
		type = "floorUnlock"
	},
	
	-- Floor 7 Items (Part of 67)
	{
		id = "seven_dropper",
		name = "The Seven Dropper",
		cost = 2500000,
		value = 25000,
		interval = 0.7,
		floor = 7,
		type = "dropper"
	},
	{
		id = "sixty_seven_shrine",
		name = "67 Shrine",
		cost = 6700000,
		value = 67000,
		interval = 0.67,
		floor = 7,
		type = "dropper"
	},
	{
		id = "floor_8_unlock",
		name = "Unlock Floor 8",
		cost = 10000000,
		floor = 7,
		type = "floorUnlock"
	},
	
	-- Floor 8 Items
	{
		id = "diamond_dropper_8",
		name = "Diamond Dropper",
		cost = 15000000,
		value = 150000,
		interval = 1,
		floor = 8,
		type = "dropper"
	},
	{
		id = "floor_9_unlock",
		name = "Unlock Floor 9",
		cost = 30000000,
		floor = 8,
		type = "floorUnlock"
	},
	
	-- Floor 9 Items
	{
		id = "quantum_dropper_9",
		name = "Quantum Dropper",
		cost = 50000000,
		value = 500000,
		interval = 0.5,
		floor = 9,
		type = "dropper"
	},
	{
		id = "floor_10_unlock",
		name = "Unlock Floor 10",
		cost = 100000000,
		floor = 9,
		type = "floorUnlock"
	},
	
	-- Floor 10 Items (Final)
	{
		id = "ultimate_67_dropper",
		name = "ULTIMATE 67 DROPPER",
		cost = 670000000,
		value = 6700000,
		interval = 0.067,
		floor = 10,
		type = "dropper"
	},
	{
		id = "max_upgrader",
		name = "MAX 67 Upgrader",
		cost = 1000000000,
		multiplier = 67,
		floor = 10,
		type = "upgrader"
	}
}

-- Pet Definitions
Config.PETS = {
	{
		id = "basic_67",
		name = "Basic 67",
		rarity = "common",
		bonus = 0.1,
		chance = 0.5
	},
	{
		id = "lucky_67",
		name = "Lucky 67",
		rarity = "uncommon",
		bonus = 0.25,
		chance = 0.3
	},
	{
		id = "golden_67",
		name = "Golden 67",
		rarity = "rare",
		bonus = 0.5,
		chance = 0.15
	},
	{
		id = "diamond_67",
		name = "Diamond 67",
		rarity = "epic",
		bonus = 1.0,
		chance = 0.04
	},
	{
		id = "the_67th",
		name = "The 67th",
		rarity = "legendary",
		bonus = 6.7,
		chance = 0.01
	}
}

return Config
