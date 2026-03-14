-- TycoonUI - ScreenGui layout for 67 Tycoon
-- This creates the main game UI

local Players = game:GetService("Players")
local player = Players.LocalPlayer

-- Create ScreenGui
local screenGui = Instance.new("ScreenGui")
screenGui.Name = "TycoonUI"
screenGui.ResetOnSpawn = false
screenGui.ZIndexBehavior = Enum.ZIndexBehavior.Sibling

-- Main frame (bottom center)
local mainFrame = Instance.new("Frame")
mainFrame.Name = "MainFrame"
mainFrame.Size = UDim2.new(0, 400, 0, 80)
mainFrame.Position = UDim2.new(0.5, -200, 1, -100)
mainFrame.BackgroundColor3 = Color3.fromRGB(30, 30, 30)
mainFrame.BackgroundTransparency = 0.1
mainFrame.BorderSizePixel = 0
mainFrame.Parent = screenGui

local mainCorner = Instance.new("UICorner")
mainCorner.CornerRadius = UDim.new(0, 15)
mainCorner.Parent = mainFrame

-- Cash Label
local cashLabel = Instance.new("TextLabel")
cashLabel.Name = "CashLabel"
cashLabel.Size = UDim2.new(0.5, 0, 1, 0)
cashLabel.Position = UDim2.new(0, 10, 0, 0)
cashLabel.BackgroundTransparency = 1
cashLabel.Text = "$67"
cashLabel.TextColor3 = Color3.fromRGB(0, 255, 100)
cashLabel.Font = Enum.Font.GothamBlack
cashLabel.TextSize = 36
cashLabel.TextXAlignment = Enum.TextXAlignment.Left
cashLabel.Parent = mainFrame

-- Multiplier Label
local multiplierLabel = Instance.new("TextLabel")
multiplierLabel.Name = "MultiplierLabel"
multiplierLabel.Size = UDim2.new(0.25, 0, 0.4, 0)
multiplierLabel.Position = UDim2.new(0.55, 0, 0.1, 0)
multiplierLabel.BackgroundTransparency = 1
multiplierLabel.Text = "1.00x"
multiplierLabel.TextColor3 = Color3.fromRGB(255, 200, 0)
multiplierLabel.Font = Enum.Font.GothamBold
multiplierLabel.TextSize = 20
multiplierLabel.Parent = mainFrame

-- Rebirth Label
local rebirthLabel = Instance.new("TextLabel")
rebirthLabel.Name = "RebirthLabel"
rebirthLabel.Size = UDim2.new(0.25, 0, 0.4, 0)
rebirthLabel.Position = UDim2.new(0.55, 0, 0.5, 0)
rebirthLabel.BackgroundTransparency = 1
rebirthLabel.Text = "0 Rebirths"
rebirthLabel.TextColor3 = Color3.fromRGB(100, 200, 255)
rebirthLabel.Font = Enum.Font.GothamBold
rebirthLabel.TextSize = 16
rebirthLabel.Parent = mainFrame

-- Rebirth Button
local rebirthButton = Instance.new("TextButton")
rebirthButton.Name = "RebirthButton"
rebirthButton.Size = UDim2.new(0.15, 0, 0.7, 0)
rebirthButton.Position = UDim2.new(0.82, 0, 0.15, 0)
rebirthButton.BackgroundColor3 = Color3.fromRGB(255, 50, 50)
rebirthButton.Text = "67"
rebirthButton.TextColor3 = Color3.fromRGB(255, 255, 255)
rebirthButton.Font = Enum.Font.GothamBlack
rebirthButton.TextSize = 24
rebirthButton.Parent = mainFrame

local rebirthCorner = Instance.new("UICorner")
rebirthCorner.CornerRadius = UDim.new(0, 10)
rebirthCorner.Parent = rebirthButton

-- Event Frame (top center, hidden by default)
local eventFrame = Instance.new("Frame")
eventFrame.Name = "EventFrame"
eventFrame.Size = UDim2.new(0, 400, 0, 100)
eventFrame.Position = UDim2.new(0.5, -200, 0, -120)
eventFrame.BackgroundColor3 = Color3.fromRGB(67, 20, 100)
eventFrame.BackgroundTransparency = 0.2
eventFrame.BorderSizePixel = 0
eventFrame.Visible = false
eventFrame.Parent = screenGui

local eventCorner = Instance.new("UICorner")
eventCorner.CornerRadius = UDim.new(0, 15)
eventCorner.Parent = eventFrame

local eventTitle = Instance.new("TextLabel")
eventTitle.Name = "Title"
eventTitle.Size = UDim2.new(1, 0, 0.4, 0)
eventTitle.BackgroundTransparency = 1
eventTitle.Text = "67 EVENT!"
eventTitle.TextColor3 = Color3.fromRGB(255, 215, 0)
eventTitle.Font = Enum.Font.GothamBlack
eventTitle.TextSize = 28
eventTitle.Parent = eventFrame

local eventDesc = Instance.new("TextLabel")
eventDesc.Name = "Description"
eventDesc.Size = UDim2.new(1, -20, 0.5, 0)
eventDesc.Position = UDim2.new(0, 10, 0.45, 0)
eventDesc.BackgroundTransparency = 1
eventDesc.Text = "Something 67 is happening!"
eventDesc.TextColor3 = Color3.fromRGB(255, 255, 255)
eventDesc.Font = Enum.Font.Gotham
eventDesc.TextSize = 18
eventDesc.TextWrapped = true
eventDesc.Parent = eventFrame

-- Pet Button (right side)
local petButton = Instance.new("TextButton")
petButton.Name = "PetButton"
petButton.Size = UDim2.new(0, 80, 0, 80)
petButton.Position = UDim2.new(1, -100, 0.5, -40)
petButton.BackgroundColor3 = Color3.fromRGB(100, 50, 150)
petButton.Text = "🥚"
petButton.TextColor3 = Color3.fromRGB(255, 255, 255)
petButton.Font = Enum.Font.GothamBlack
petButton.TextSize = 40
petButton.Parent = screenGui

local petCorner = Instance.new("UICorner")
petCorner.CornerRadius = UDim.new(1, 0)
petCorner.Parent = petButton

-- Pet cost label
local petCost = Instance.new("TextLabel")
petCost.Name = "PetCost"
petCost.Size = UDim2.new(1, 0, 0.3, 0)
petCost.Position = UDim2.new(0, 0, 0.7, 0)
petCost.BackgroundTransparency = 1
petCost.Text = "$6,700"
petCost.TextColor3 = Color3.fromRGB(255, 255, 100)
petCost.Font = Enum.Font.GothamBold
petCost.TextSize = 14
petCost.Parent = petButton

-- Leaderboard Button (top right)
local leaderboardButton = Instance.new("TextButton")
leaderboardButton.Name = "LeaderboardButton"
leaderboardButton.Size = UDim2.new(0, 60, 0, 60)
leaderboardButton.Position = UDim2.new(1, -80, 0, 20)
leaderboardButton.BackgroundColor3 = Color3.fromRGB(50, 100, 150)
leaderboardButton.Text = "🏆"
leaderboardButton.TextColor3 = Color3.fromRGB(255, 255, 255)
leaderboardButton.Font = Enum.Font.GothamBlack
leaderboardButton.TextSize = 30
leaderboardButton.Parent = screenGui

local lbCorner = Instance.new("UICorner")
lbCorner.CornerRadius = UDim.new(0, 10)
lbCorner.Parent = leaderboardButton

-- Settings Button (top left)
local settingsButton = Instance.new("TextButton")
settingsButton.Name = "SettingsButton"
settingsButton.Size = UDim2.new(0, 50, 0, 50)
settingsButton.Position = UDim2.new(0, 20, 0, 20)
settingsButton.BackgroundColor3 = Color3.fromRGB(60, 60, 60)
settingsButton.Text = "⚙️"
settingsButton.TextColor3 = Color3.fromRGB(255, 255, 255)
settingsButton.Font = Enum.Font.GothamBlack
settingsButton.TextSize = 24
settingsButton.Parent = screenGui

local settingsCorner = Instance.new("UICorner")
settingsCorner.CornerRadius = UDim.new(0, 10)
settingsCorner.Parent = settingsButton

-- 67 Badge (top center)
local sixtySevenBadge = Instance.new("Frame")
sixtySevenBadge.Name = "SixtySevenBadge"
sixtySevenBadge.Size = UDim2.new(0, 120, 0, 50)
sixtySevenBadge.Position = UDim2.new(0.5, -60, 0, 20)
sixtySevenBadge.BackgroundColor3 = Color3.fromRGB(200, 50, 50)
sixtySevenBadge.BorderSizePixel = 0
sixtySevenBadge.Parent = screenGui

local badgeCorner = Instance.new("UICorner")
badgeCorner.CornerRadius = UDim.new(0, 25)
badgeCorner.Parent = sixtySevenBadge

local badgeText = Instance.new("TextLabel")
badgeText.Name = "BadgeText"
badgeText.Size = UDim2.new(1, 0, 1, 0)
badgeText.BackgroundTransparency = 1
badgeText.Text = "67 TYCOON"
badgeText.TextColor3 = Color3.fromRGB(255, 255, 255)
badgeText.Font = Enum.Font.GothamBlack
badgeText.TextSize = 18
badgeText.Parent = sixtySevenBadge

-- Parent to PlayerGui
screenGui.Parent = player:WaitForChild("PlayerGui")

return screenGui
