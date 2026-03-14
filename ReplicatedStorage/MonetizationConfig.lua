-- 67 Tycoon - MONETIZATION CONFIG
-- Premium features, gamepasses, and dev products

local Monetization = {}

-- GAMEPASSES (One-time purchase)
Monetization.GAMEPASSES = {
	{
		id = "vip_67",
		name = "67 VIP",
		price = 399,  -- Robux
		icon = "👑",
		benefits = {
			"2x income permanently",
			"VIP chat tag",
			"Golden name color",
			"Access to VIP floor",
			"Exclusive 67 Crown pet",
			"Skip 1 ad per day",
			"+67% rebirth points"
		}
	},
	{
		id = "auto_farm",
		name = "Auto Farmer",
		price = 249,
		icon = "🤖",
		benefits = {
			"Auto-collect from all droppers",
			"Auto-purchase when affordable",
			"Works offline for 4 hours",
			"Smart upgrade priority",
			"AFK farming mode"
		}
	},
	{
		id = "lucky_67",
		name = "Lucky 67",
		price = 199,
		icon = "🍀",
		benefits = {
			"2x legendary pet chance",
			"67% more event rewards",
			"Golden 67s appear 2x more",
			"Free daily premium egg",
			"Better trade deals"
		}
	},
	{
		id = "double_pets",
		name = "Double Pets",
		price = 299,
		icon = "🥚",
		benefits = {
			"Equip 2 pets at once",
			"Pet inventory +50 slots",
			"Trade 3 pets at once",
			"Pet fusion unlocked",
			"Exclusive pet skins"
		}
	},
	{
		id = "tycoon_wars",
		name = "Tycoon Wars",
		price = 149,
		icon = "⚔️",
		benefits = {
			"Raid other players' tycoons",
			"Steal 6.7% of their income",
			"Defensive turrets unlocked",
			"War leaderboard access",
			"Peace treaty option"
		}
	}
}

-- DEVELOPER PRODUCTS (Repeat purchase)
Monetization.DEV_PRODUCTS = {
	-- CASH PACKS
	{
		id = "cash_small",
		name = "67K Cash",
		price = 49,
		icon = "💵",
		reward = 67000,
		description = "Quick boost to get started"
	},
	{
		id = "cash_medium",
		name = "670K Cash",
		price = 199,
		icon = "💰",
		reward = 670000,
		description = "Skip the early grind",
		bonus = "+10% bonus (737K total)"
	},
	{
		id = "cash_large",
		name = "6.7M Cash",
		price = 499,
		icon = "🏦",
		reward = 6700000,
		description = "Instant tycoon empire",
		bonus = "+20% bonus (8.04M total)"
	},
	{
		id = "cash_mega",
		name = "67M Cash",
		price = 1299,
		icon = "🤑",
		reward = 67000000,
		description = "The ultimate whale package",
		bonus = "+35% bonus (90.45M total)"
	},
	
	-- PET EGGS
	{
		id = "egg_basic",
		name = "67 Egg",
		price = 29,
		icon = "🥚",
		reward = "Random pet",
		description = "Common to Rare pets"
	},
	{
		id = "egg_premium",
		name = "Golden 67 Egg",
		price = 99,
		icon = "✨",
		reward = "Better random pet",
		description = "Rare to Legendary pets",
		bonus = "2x chance for The 67th"
	},
	{
		id = "egg_legendary",
		name = "Ultimate 67 Egg",
		price = 249,
		icon = "🌟",
		reward = "Guaranteed good pet",
		description = "Epic or Legendary only",
		bonus = "10% chance for Secret pet"
	},
	{
		id = "egg_67th",
		name = "The 67th Egg",
		price = 499,
		icon = "👑",
		reward = "The 67th pet guaranteed",
		description = "The legendary 6.7x income pet",
		limited = true
	},
	
	-- BOOSTS
	{
		id = "boost_2x",
		name = "2x Income (1hr)",
		price = 79,
		icon = "⏫",
		duration = 3600,
		multiplier = 2,
		description = "Double income for 1 hour"
	},
	{
		id = "boost_6x",
		name = "6.7x Income (30min)",
		price = 149,
		icon = "🚀",
		duration = 1800,
		multiplier = 6.7,
		description = "The holy 6.7x multiplier"
	},
	{
		id = "boost_67x",
		name = "67x Income (6.7min)",
		price = 299,
		icon = "🔥",
		duration = 402,  -- 6.7 minutes
		multiplier = 67,
		description = "INSANE 67x for 6.7 minutes",
		flash_sale = true
	},
	{
		id = "boost_lucky",
		name = "Lucky 67 Boost",
		price = 99,
		icon = "🍀",
		duration = 1800,
		description = "Golden 67s spawn 5x more often"
	},
	
	-- REBIRTH & PROGRESS
	{
		id = "instant_rebirth",
		name = "Instant Rebirth",
		price = 199,
		icon = "🔄",
		description = "Rebirth without losing progress",
		bonus = "Keep all floors unlocked"
	},
	{
		id = "rebirth_points",
		name = "67 Rebirth Points",
		price = 149,
		reward = 67,
		description = "Buy permanent upgrades"
	},
	{
		id = "skip_floor",
		name = "Skip Floor",
		price = 99,
		icon = "⏭️",
		description = "Unlock next floor instantly",
		stackable = true
	},
	
	-- COSMETICS
	{
		id = "title_67",
		name = "67 Title Pack",
		price = 49,
		icon = "🏷️",
		rewards = {"The 67th", "Six Seven", "67 Enthusiast", "Number Lover"},
		description = "4 exclusive chat titles"
	},
	{
		id = "aura_golden",
		name = "Golden 67 Aura",
		price = 199,
		icon = "✨",
		description = "Shine like the number 67"
	},
	{
		id = "trail_67",
		name = "67 Trail",
		price = 129,
		icon = "🌠",
		description = "Leave 67s behind as you walk"
	},
	{
		id = "pet_skin_pack",
		name = "67 Pet Skins",
		price = 79,
		icon = "🎨",
		description = "Golden, Diamond, Rainbow skins"
	},
	
	-- CONVENIENCE
	{
		id = "no_ads_day",
		name = "No Ads (24hr)",
		price = 49,
		icon = "🚫",
		duration = 86400,
		description = "Ad-free experience"
	},
	{
		id = "no_ads_week",
		name = "No Ads (7 days)",
		price = 199,
		icon = "🚫",
		duration = 604800,
		description = "Week of peace",
		bonus = "Save 30% vs daily"
	},
	{
		id = "trade_pass",
		name = "Trade Pass",
		price = 29,
		icon = "🤝",
		description = "Unlock trading for 24 hours",
		stackable = true
	}
}

-- SUBSCRIPTION (Monthly)
Monetization.SUBSCRIPTION = {
	id = "67_club",
	name = "67 Club",
	price = 499,  -- Monthly Robux
	icon = "💎",
	benefits = {
		"All VIP perks included",
		"+67% income permanently",
		"Exclusive 67 Club pet",
		"Monthly 67M cash bonus",
		"Early access to new floors",
		"Special 67 Club chat color",
		"Priority support",
		"Exclusive 67 Club badge"
	},
	monthly_rewards = {
		cash = 67000000,
		pet_egg = "legendary",
		title = "67 Club Member"
	}
}

-- LIMITED TIME OFFERS
Monetization.LIMITED_OFFERS = {
	{
		id = "starter_pack",
		name = "67 Starter Pack",
		price = 99,
		icon = "🎁",
		available_hours = 24,
		rewards = {
			cash = 67000,
			pet = "starter_67",
			boost_2x = 1,
			title = "67 Newbie"
		},
		value_text = "500% VALUE!"
	},
	{
		id = "weekend_bundle",
		name = "67 Weekend Bundle",
		price = 399,
		icon = "🎉",
		available_days = {"Friday", "Saturday", "Sunday"},
		rewards = {
			cash = 670000,
			eggs = 5,
			boost_6x = 2,
			rebirth_points = 20
		},
		value_text = "Save 40%!"
	},
	{
		id = "flash_sale_67",
		name = "FLASH: 67x Boost",
		price = 199,
		icon = "⚡",
		duration_minutes = 67,
		reward = "67x_income_boost",
		value_text = "67% OFF!"
	}
}

-- AD PLACEMENTS
Monetization.ADS = {
	{
		placement = "cash_boost",
		trigger = "Every 10 minutes",
		reward = "2x income for 5 min",
		skip_cost = 29
	},
	{
		placement = "free_egg",
		trigger = "Every 15 minutes",
		reward = "Free basic egg",
		skip_cost = 19
	},
	{
		placement = "rebirth_bonus",
		trigger = "On rebirth",
		reward = "+20% rebirth points",
		skip_cost = 49
	},
	{
		placement = "event_reroll",
		trigger = "When event starts",
		reward = "Reroll to better event",
		skip_cost = 39
	}
}

return Monetization
