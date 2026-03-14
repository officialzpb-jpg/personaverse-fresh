-- PremiumShopUI - Beautiful monetization interface
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local TweenService = game:GetService("TweenService")
local MarketplaceService = game:GetService("MarketplaceService")

local player = Players.LocalPlayer
local playerGui = player:WaitForChild("PlayerGui")

-- Colors
local COLORS = {
	background = Color3.fromRGB(25, 25, 35),
	card = Color3.fromRGB(40, 40, 55),
	accent = Color3.fromRGB(255, 200, 50),
	accent67 = Color3.fromRGB(200, 50, 150),
	text = Color3.fromRGB(255, 255, 255),
	textDim = Color3.fromRGB(180, 180, 180),
	success = Color3.fromRGB(0, 200, 100),
	robux = Color3.fromRGB(0, 180, 255)
}

-- Create main shop GUI
local shopGui = Instance.new("ScreenGui")
shopGui.Name = "PremiumShop"
shopGui.ResetOnSpawn = false
shopGui.ZIndexBehavior = Enum.ZIndexBehavior.Sibling

-- Main frame
local mainFrame = Instance.new("Frame")
mainFrame.Name = "MainFrame"
mainFrame.Size = UDim2.new(0, 900, 0, 600)
mainFrame.Position = UDim2.new(0.5, -450, 0.5, -300)
mainFrame.BackgroundColor3 = COLORS.background
mainFrame.BackgroundTransparency = 0.05
mainFrame.BorderSizePixel = 0
mainFrame.Visible = false
mainFrame.Parent = shopGui

local corner = Instance.new("UICorner")
corner.CornerRadius = UDim.new(0, 20)
corner.Parent = mainFrame

-- Top bar
local topBar = Instance.new("Frame")
topBar.Name = "TopBar"
topBar.Size = UDim2.new(1, 0, 0, 70)
topBar.BackgroundColor3 = COLORS.card
topBar.BorderSizePixel = 0
topBar.Parent = mainFrame

local topCorner = Instance.new("UICorner")
topCorner.CornerRadius = UDim.new(0, 20)
topCorner.Parent = topBar

-- Title
local title = Instance.new("TextLabel")
title.Name = "Title"
title.Size = UDim2.new(0, 300, 1, 0)
title.Position = UDim2.new(0, 30, 0, 0)
title.BackgroundTransparency = 1
title.Text = "💎 67 PREMIUM"
title.TextColor3 = COLORS.accent
title.Font = Enum.Font.GothamBlack
title.TextSize = 32
title.TextXAlignment = Enum.TextXAlignment.Left
title.Parent = topBar

-- Close button
local closeBtn = Instance.new("TextButton")
closeBtn.Name = "Close"
closeBtn.Size = UDim2.new(0, 50, 0, 50)
closeBtn.Position = UDim2.new(1, -60, 0.5, -25)
closeBtn.BackgroundColor3 = Color3.fromRGB(200, 50, 50)
closeBtn.Text = "✕"
closeBtn.TextColor3 = Color3.fromRGB(255, 255, 255)
closeBtn.Font = Enum.Font.GothamBlack
closeBtn.TextSize = 24
closeBtn.Parent = topBar

local closeCorner = Instance.new("UICorner")
closeCorner.CornerRadius = UDim.new(0, 10)
closeCorner.Parent = closeBtn

-- Content area
local contentFrame = Instance.new("ScrollingFrame")
contentFrame.Name = "Content"
contentFrame.Size = UDim2.new(1, -40, 1, -150)
contentFrame.Position = UDim2.new(0, 20, 0, 90)
contentFrame.BackgroundTransparency = 1
contentFrame.BorderSizePixel = 0
contentFrame.ScrollBarThickness = 8
contentFrame.ScrollBarImageColor3 = COLORS.accent
contentFrame.Parent = mainFrame

-- Grid layout
local grid = Instance.new("UIGridLayout")
grid.CellSize = UDim2.new(0, 200, 0, 280)
grid.CellPadding = UDim2.new(0, 15, 0, 15)
grid.SortOrder = Enum.SortOrder.LayoutOrder
grid.Parent = contentFrame

-- Open/Close functions
local function openShop()
	mainFrame.Visible = true
	mainFrame.Position = UDim2.new(0.5, -450, 0.6, -300)
	
	local tween = TweenService:Create(mainFrame, TweenInfo.new(0.3, Enum.EasingStyle.Quart), {
		Position = UDim2.new(0.5, -450, 0.5, -300)
	})
	tween:Play()
end

local function closeShop()
	local tween = TweenService:Create(mainFrame, TweenInfo.new(0.2), {
		Position = UDim2.new(0.5, -450, 0.6, -300)
	})
	tween:Play()
	tween.Completed:Wait()
	mainFrame.Visible = false
end

closeBtn.MouseButton1Click:Connect(closeShop)

-- Shop button
local shopButton = Instance.new("TextButton")
shopButton.Name = "ShopButton"
shopButton.Size = UDim2.new(0, 80, 0, 80)
shopButton.Position = UDim2.new(1, -180, 0.5, -40)
shopButton.BackgroundColor3 = COLORS.accent
shopButton.Text = "💎"
shopButton.TextColor3 = COLORS.text
shopButton.Font = Enum.Font.GothamBlack
shopButton.TextSize = 40
shopButton.Parent = shopGui

local shopCorner = Instance.new("UICorner")
shopCorner.CornerRadius = UDim.new(1, 0)
shopCorner.Parent = shopButton

shopButton.MouseButton1Click:Connect(openShop)

-- Parent to PlayerGui
shopGui.Parent = playerGui

print("✓ Premium Shop UI loaded!")
