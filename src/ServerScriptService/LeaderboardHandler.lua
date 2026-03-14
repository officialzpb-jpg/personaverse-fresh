-- LeaderboardHandler - Manages game leaderboards
local LeaderboardHandler = {}

local Players = game:GetService("Players")

-- Leaderboard data
local leaderboards = {
	cash = {},
	rebirths = {},
	playTime = {}
}

-- Create leaderboard for player
function LeaderboardHandler:SetupPlayer(player)
	local folder = Instance.new("Folder")
	folder.Name = "leaderstats"
	
	local cashStat = Instance.new("IntValue")
	cashStat.Name = "Cash"
	cashStat.Value = 0
	cashStat.Parent = folder
	
	local rebirthStat = Instance.new("IntValue")
	rebirthStat.Name = "Rebirths"
	rebirthStat.Value = 0
	rebirthStat.Parent = folder
	
	folder.Parent = player
	
	return {
		cash = cashStat,
		rebirths = rebirthStat
	}
end

-- Update leaderboard stats
function LeaderboardHandler:UpdateStats(player, data)
	local leaderstats = player:FindFirstChild("leaderstats")
	if not leaderstats then return end
	
	local cashStat = leaderstats:FindFirstChild("Cash")
	local rebirthStat = leaderstats:FindFirstChild("Rebirths")
	
	if cashStat then
		cashStat.Value = math.floor(data.cash)
	end
	if rebirthStat then
		rebirthStat.Value = data.rebirths
	end
end

-- Get top players
function LeaderboardHandler:GetTopPlayers(category, count)
	count = count or 10
	local sorted = {}
	
	for userId, value in pairs(leaderboards[category] or {}) do
		table.insert(sorted, {userId = userId, value = value})
	end
	
	table.sort(sorted, function(a, b)
		return a.value > b.value
	end)
	
	local result = {}
	for i = 1, math.min(count, #sorted) do
		result[i] = sorted[i]
	end
	
	return result
end

return LeaderboardHandler
