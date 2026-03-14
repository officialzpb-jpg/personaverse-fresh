-- PremiumShopUI - Beautiful monetization interface
-- Place in StarterGui as a ScreenGui

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

-- Corner
local corner = Instance.new("UICorner")
corner.CornerRadius = UDim.new(0, 20)
corner.Parent = mainFrame

-- Gradient background
local gradient = Instance.new("UIGradient")
gradient.Color = ColorSequence.new({
	ColorSequenceKeypoint.new(0, COLORS.background),
	ColorSequenceKeypoint.new(1, Color3.fromRGB(35, 25, 45))
})
gradient.Parent = mainFrame

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

-- Fix bottom corners
local bottomFix = Instance.new("Frame")
bottomFix.Size = UDim2.new(1, 0, 0, 20)
bottomFix.Position = UDim2.new(0, 0, 1, -20)
bottomFix.BackgroundColor3 = COLORS.card
bottomFix.BorderSizePixel = 0
bottomFix.Parent = topBar

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

-- Robux balance
local balanceFrame = Instance.new("Frame")
balanceFrame.Name = "Balance"
balanceFrame.Size = UDim2.new(0, 150, 0, 40)
balanceFrame.Position = UDim2.new(1, -170, 0.5, -20)
balanceFrame.BackgroundColor3 = COLORS.robux
 balanceFrame.BorderSizePixel = 0
 balanceFrame.Parent = topBar

local balanceCorner = Instance.new("UICorner")
balanceCorner.CornerRadius = UDim.new(0, 10)
balanceCorner.Parent = balanceFrame

local robuxIcon = Instance.new("TextLabel")
robuxIcon.Size = UDim2.new(0, 30, 1, 0)
robuxIcon.Position = UDim2.new(0, 10, 0, 0)
robuxIcon.BackgroundTransparency = 1
robuxIcon.Text = "💰"
robuxIcon.Font = Enum.Font.GothamBold
robuxIcon.TextSize = 20
robuxIcon.Parent = balanceFrame

local balanceText = Instance.new("TextLabel")
balanceText.Name = "BalanceText"
balanceText.Size = UDim2.new(1, -40, 1, 0)
balanceText.Position = UDim2.new(0, 35, 0, 0)
balanceText.BackgroundTransparency = 1
balanceText.Text = "..."
balanceText.TextColor3 = Color3.fromRGB(255, 255, 255)
balanceText.Font = Enum.Font.GothamBold
balanceText.TextSize = 18
balanceText.Parent = balanceFrame

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

-- Tab buttons
local tabFrame = Instance.new("Frame")
tabFrame.Name = "Tabs"
tabFrame.Size = UDim2.new(1, -40, 0, 50)
tabFrame.Position = UDim2.new(0, 20, 0, 80)
tabFrame.BackgroundTransparency = 1
tabFrame.Parent = mainFrame

local tabs = {"GAMEPASSES", "CASH", "EGGS", "BOOSTS", "COSMETICS"}
local tabButtons = {}

for i, tabName in ipairs(tabs) do
	local btn = Instance.new("TextButton")
	btn.Name = tabName
	btn.Size = UDim2.new(0.19, -5, 1, 0)
	btn.Position = UDim2.new((i-1) * 0.2, 0, 0, 0)
	btn.BackgroundColor3 = i == 1 and COLORS.accent67 or COLORS.card
	btn.Text = tabName
	btn.TextColor3 = COLORS.text
	btn.Font = Enum.Font.GothamBold
	btn.TextSize = 14
	btn.Parent = tabFrame
	
	local btnCorner = Instance.new("UICorner")
	btnCorner.CornerRadius = UDim.new(0, 10)
	btnCorner.Parent = btn
	
	tabButtons[tabName] = btn
end

-- Content area
local contentFrame = Instance.new("ScrollingFrame")
contentFrame.Name = "Content"
contentFrame.Size = UDim2.new(1, -40, 1, -150)
contentFrame.Position = UDim2.new(0, 20, 0, 140)
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

-- Featured banner
local featuredFrame = Instance.new("Frame")
featuredFrame.Name = "Featured"
featuredFrame.Size = UDim2.new(0, 620, 0, 120)
featuredFrame.BackgroundColor3 = Color3.fromRGB(200, 50, 150)
featuredFrame.BorderSizePixel = 0
featuredFrame.Visible = false
featuredFrame.Parent = contentFrame

local featuredCorner = Instance.new("UICorner")
featuredCorner.CornerRadius = UDim.new(0, 15)
featuredCorner.Parent = featuredFrame

local featuredText = Instance.new("TextLabel")
featuredText.Size = UDim2.new(1, -20, 1, 0)
featuredText.Position = UDim2.new(0, 10, 0, 0)
featuredText.BackgroundTransparency = 1
featuredText.Text = "🔥 LIMITED: 67x Boost - 67% OFF!"
featuredText.TextColor3 = COLORS.text
featuredText.Font = Enum.Font.GothamBlack
featuredText.TextSize = 28
featuredText.Parent = featuredFrame

-- Create product card function
local function createProductCard(product, isGamepass)
	local card = Instance.new("Frame")
	card.Name = product.id
	card.Size = UDim2.new(0, 200, 0, 280)
	card.BackgroundColor3 = COLORS.card
	card.BorderSizePixel = 0
	
	local cardCorner = Instance.new("UICorner")
	cardCorner.CornerRadius = UDim.new(0, 15)
	cardCorner.Parent = card
	
	-- Icon
	local icon = Instance.new("TextLabel")
	icon.Size = UDim2.new(1, 0, 0, 80)
	icon.BackgroundTransparency = 1
	icon.Text = product.icon or "💎"
	icon.Font = Enum.Font.GothamBlack
	icon.TextSize = 60
	icon.Parent = card
	
	-- Name
	local name = Instance.new("TextLabel")
	name.Size = UDim2.new(1, -20, 0, 40)
	name.Position = UDim2.new(0, 10, 0, 85)
	name.BackgroundTransparency = 1
	name.Text = product.name
	name.TextColor3 = COLORS.text
	name.Font = Enum.Font.GothamBold
	name.TextSize = 18
	name.TextWrapped = true
	name.Parent = card
	
	-- Description
	local desc = Instance.new("TextLabel")
	desc.Size = UDim2.new(1, -20, 0, 60)
	desc.Position = UDim2.new(0, 10, 0, 125)
	desc.BackgroundTransparency = 1
	desc.Text = product.description or (product.benefits and table.concat(product.benefits, "\n") or "")
	desc.TextColor3 = COLORS.textDim
	desc.Font = Enum.Font.Gotham
	desc.TextSize = 12
	desc.TextWrapped = true
	desc.TextYAlignment = Enum.TextYAlignment.Top
	desc.Parent = card
	
	-- Price button
	local buyBtn = Instance.new("TextButton")
	buyBtn.Name = "Buy"
	buyBtn.Size = UDim2.new(0.8, 0, 0, 45)
	buyBtn.Position = UDim2.new(0.1, 0, 1, -60)
	buyBtn.BackgroundColor3 = COLORS.success
	buyBtn.Text = "💰 " .. product.price .. " R$"
	buyBtn.TextColor3 = COLORS.text
	buyBtn.Font = Enum.Font.GothamBlack
	buyBtn.TextSize = 18
	buyBtn.Parent = card
	
	local btnCorner = Instance.new("UICorner")
	btnCorner.CornerRadius = UDim.new(0, 10)
	btnCorner.Parent = buyBtn
	
	-- Value badge (if applicable)
	if product.value_text then
		local badge = Instance.new("Frame")
		badge.Size = UDim2.new(0, 80, 0, 25)
		badge.Position = UDim2.new(1, -90, 0, 10)
		badge.BackgroundColor3 = Color3.fromRGB(255, 50, 50)
		badge.BorderSizePixel = 0
		badge.Parent = card
		
		local badgeCorner = Instance.new("UICorner")
		badgeCorner.CornerRadius = UDim.new(0, 5)
		badgeCorner.Parent = badge
		
		local badgeText = Instance.new("TextLabel")
		badgeText.Size = UDim2.new(1, 0, 1, 0)
		badgeText.BackgroundTransparency = 1
		badgeText.Text = product.value_text
		badgeText.TextColor3 = COLORS.text
		badgeText.Font = Enum.Font.GothamBold
		badgeText.TextSize = 12
		badgeText.Parent = badge
	end
	
	-- Click handler
	buyBtn.MouseButton1Click:Connect(function()
		if isGamepass then
			MarketplaceService:PromptGamePassPurchase(player, product.id)
		else
			MarketplaceService:PromptProductPurchase(player, product.id)
		end
	end)
	
	return card
end

-- Populate shop
local Monetization = require(ReplicatedStorage:WaitForChild("MonetizationConfig"))

-- Gamepasses tab
for _, gp in ipairs(Monetization.GAMEPASSES) do
	local card = createProductCard(gp, true)
	card.Parent = contentFrame
end

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

-- Shop button in main UI
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

-- Update balance
local function updateBalance()
	local success, balance = pcall(function()
		return player:WaitForChild("leaderstats"):WaitForChild("Cash").Value
	end)
	if success then
		balanceText.Text = tostring(balance)
	end
end

print("✓ Premium Shop UI loaded!")
