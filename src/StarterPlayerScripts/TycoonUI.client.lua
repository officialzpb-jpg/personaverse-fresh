-- Client UI Controller for 67 Tycoon
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local TweenService = game:GetService("TweenService")

local player = Players.LocalPlayer
local playerGui = player:WaitForChild("PlayerGui")

-- UI References
local mainUI = nil
local cashLabel = nil
local multiplierLabel = nil
local rebirthLabel = nil
local eventFrame = nil

-- Initialize UI
local function initUI()
	-- Wait for UI to be provided (from StarterGui)
	mainUI = playerGui:WaitForChild("TycoonUI")
	
	cashLabel = mainUI:FindFirstChild("CashLabel", true)
	multiplierLabel = mainUI:FindFirstChild("MultiplierLabel", true)
	rebirthLabel = mainUI:FindFirstChild("RebirthLabel", true)
	eventFrame = mainUI:FindFirstChild("EventFrame", true)
	
	-- Connect update event
	local updateEvent = ReplicatedStorage:WaitForChild("Events"):WaitForChild("UpdateUI")
	updateEvent.OnClientEvent:Connect(updateUI)
	
	-- Connect 67 event
	local sixtySevenEvent = ReplicatedStorage:WaitForChild("Events"):WaitForChild("SixtySevenEvent")
	sixtySevenEvent.OnClientEvent:Connect(show67Effect)
	
	-- Connect achievement event
	local achievementEvent = ReplicatedStorage:WaitForChild("Events"):WaitForChild("AchievementUnlocked")
	achievementEvent.OnClientEvent:Connect(showAchievement)
	
	-- Connect 67 game events
	local startEvent = ReplicatedStorage:WaitForChild("Events"):WaitForChild("Start67Event")
	startEvent.OnClientEvent:Connect(handleEventStart)
end

-- Update UI with new data
function updateUI(data)
	if cashLabel then
		cashLabel.Text = formatCash(data.cash)
	end
	if multiplierLabel then
		multiplierLabel.Text = string.format("%.2fx", data.multiplier)
	end
	if rebirthLabel then
		rebirthLabel.Text = tostring(data.rebirths)
	end
end

-- Format cash with suffixes
function formatCash(amount)
	local suffixes = {"", "K", "M", "B", "T", "QD"}
	local suffixIndex = 1
	
	while amount >= 1000 and suffixIndex < #suffixes do
		amount = amount / 1000
		suffixIndex += 1
	end
	
	if suffixIndex == 1 then
		return "$" .. tostring(math.floor(amount))
	else
		return string.format("$%.2f%s", amount, suffixes[suffixIndex])
	end
end

-- Show 67 special effect
function show67Effect()
	-- Create floating 67 text
	local screenGui = Instance.new("ScreenGui")
	screenGui.Name = "SixtySevenEffect"
	
	local label = Instance.new("TextLabel")
	label.Size = UDim2.new(0, 400, 0, 200)
	label.Position = UDim2.new(0.5, -200, 0.5, -100)
	label.BackgroundTransparency = 1
	label.Text = "67!"
	label.TextColor3 = Color3.fromRGB(255, 215, 0)
	label.TextStrokeTransparency = 0
	label.TextStrokeColor3 = Color3.fromRGB(255, 0, 0)
	label.Font = Enum.Font.GothamBlack
	label.TextSize = 120
	label.Parent = screenGui
	
	screenGui.Parent = playerGui
	
	-- Animate
	local tween = TweenService:Create(label, TweenInfo.new(0.5, Enum.EasingStyle.Bounce), {
		Rotation = math.random(-15, 15),
		TextSize = 150
	})
	tween:Play()
	
	-- Remove after delay
	task.delay(2, function()
		local fade = TweenService:Create(label, TweenInfo.new(0.5), {
			TextTransparency = 1,
			TextStrokeTransparency = 1
		})
		fade:Play()
		fade.Completed:Wait()
		screenGui:Destroy()
	end)
end

-- Show achievement notification
function showAchievement(title, description)
	local notification = Instance.new("ScreenGui")
	notification.Name = "AchievementNotification"
	
	local frame = Instance.new("Frame")
	frame.Size = UDim2.new(0, 300, 0, 100)
	frame.Position = UDim2.new(1, 20, 0.8, 0)
	frame.BackgroundColor3 = Color3.fromRGB(40, 40, 40)
	frame.BorderSizePixel = 0
	frame.Parent = notification
	
	local corner = Instance.new("UICorner")
	corner.CornerRadius = UDim.new(0, 10)
	corner.Parent = frame
	
	local titleLabel = Instance.new("TextLabel")
	titleLabel.Size = UDim2.new(1, 0, 0.4, 0)
	titleLabel.Position = UDim2.new(0, 0, 0, 0)
	titleLabel.BackgroundTransparency = 1
	titleLabel.Text = "🏆 " .. title
	titleLabel.TextColor3 = Color3.fromRGB(255, 215, 0)
	titleLabel.Font = Enum.Font.GothamBold
	titleLabel.TextSize = 24
	titleLabel.Parent = frame
	
	local descLabel = Instance.new("TextLabel")
	descLabel.Size = UDim2.new(1, -20, 0.6, 0)
	descLabel.Position = UDim2.new(0, 10, 0.4, 0)
	descLabel.BackgroundTransparency = 1
	descLabel.Text = description
	descLabel.TextColor3 = Color3.fromRGB(255, 255, 255)
	descLabel.Font = Enum.Font.Gotham
	descLabel.TextSize = 16
	descLabel.TextWrapped = true
	descLabel.Parent = frame
	
	notification.Parent = playerGui
	
	-- Slide in
	local slideIn = TweenService:Create(frame, TweenInfo.new(0.5, Enum.EasingStyle.Quart), {
		Position = UDim2.new(1, -320, 0.8, 0)
	})
	slideIn:Play()
	
	-- Slide out after delay
	task.delay(4, function()
		local slideOut = TweenService:Create(frame, TweenInfo.new(0.5, Enum.EasingStyle.Quart), {
			Position = UDim2.new(1, 20, 0.8, 0)
		})
		slideOut:Play()
		slideOut.Completed:Wait()
		notification:Destroy()
	end)
end

-- Handle 67 event start
function handleEventStart(eventType)
	if eventType == "RAIN_67" then
		showEventNotification("🌧️ 67 RAIN!", "Collect falling 67s for bonus cash!")
	elseif eventType == "TYPING_RUSH" then
		showEventNotification("⌨️ TYPING RUSH!", "Type '67' fast for big rewards!")
		startTypingRush()
	elseif eventType == "GOLDEN_67" then
		showEventNotification("✨ GOLDEN 67!", "Find the golden dropper!")
	elseif eventType == "RAID_67" then
		showEventNotification("⚔️ RAID 67!", "67 players = 6.7x bonus!")
	end
end

-- Show event notification
function showEventNotification(title, description)
	if not eventFrame then return end
	
	local titleLabel = eventFrame:FindFirstChild("Title")
	local descLabel = eventFrame:FindFirstChild("Description")
	
	if titleLabel then titleLabel.Text = title end
	if descLabel then descLabel.Text = description end
	
	eventFrame.Visible = true
	
	local tween = TweenService:Create(eventFrame, TweenInfo.new(0.5), {
		BackgroundTransparency = 0.2
	})
	tween:Play()
end

-- Typing rush mini-game
function startTypingRush()
	local typingGui = Instance.new("ScreenGui")
	typingGui.Name = "TypingRush"
	
	local frame = Instance.new("Frame")
	frame.Size = UDim2.new(0, 300, 0, 200)
	frame.Position = UDim2.new(0.5, -150, 0.3, 0)
	frame.BackgroundColor3 = Color3.fromRGB(30, 30, 30)
	frame.Parent = typingGui
	
	local corner = Instance.new("UICorner")
	corner.CornerRadius = UDim.new(0, 15)
	corner.Parent = frame
	
	local prompt = Instance.new("TextLabel")
	prompt.Size = UDim2.new(1, 0, 0.3, 0)
	prompt.BackgroundTransparency = 1
	prompt.Text = "TYPE: 67"
	prompt.TextColor3 = Color3.fromRGB(255, 255, 255)
	prompt.Font = Enum.Font.GothamBlack
	prompt.TextSize = 36
	prompt.Parent = frame
	
	local input = Instance.new("TextBox")
	input.Size = UDim2.new(0.8, 0, 0.3, 0)
	input.Position = UDim2.new(0.1, 0, 0.5, 0)
	input.BackgroundColor3 = Color3.fromRGB(50, 50, 50)
	input.TextColor3 = Color3.fromRGB(255, 255, 255)
	input.Font = Enum.Font.GothamBold
	input.TextSize = 48
	input.Text = ""
	input.ClearTextOnFocus = true
	input.Parent = frame
	
	typingGui.Parent = playerGui
	input:CaptureFocus()
	
	input.FocusLost:Connect(function()
		if input.Text == "67" then
			ReplicatedStorage:WaitForChild("Events"):WaitForChild("TypingRushResponse"):FireServer()
			showAchievement("Fast Fingers!", "You typed 67!")
		end
		typingGui:Destroy()
	end)
end

-- Initialize
initUI()
