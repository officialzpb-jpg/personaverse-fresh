@echo off
echo ==========================================
echo 67 Tycoon - Roblox Place Builder
echo ==========================================
echo.

REM Check common Rojo installation locations
set ROJO_PATH=

if exist "%LOCALAPPDATA%\aftman\bin\rojo.exe" (
    set ROJO_PATH=%LOCALAPPDATA%\aftman\bin\rojo.exe
    echo Found Rojo via aftman
) else if exist "%USERPROFILE%\.aftman\bin\rojo.exe" (
    set ROJO_PATH=%USERPROFILE%\.aftman\bin\rojo.exe
    echo Found Rojo via aftman (user)
) else if exist "%USERPROFILE%\AppData\Local\Programs\Rojo\rojo.exe" (
    set ROJO_PATH=%USERPROFILE%\AppData\Local\Programs\Rojo\rojo.exe
    echo Found Rojo in Programs
) else if exist "C:\Program Files\Rojo\rojo.exe" (
    set ROJO_PATH=C:\Program Files\Rojo\rojo.exe
    echo Found Rojo in Program Files
) else if exist "C:\Rojo\rojo.exe" (
    set ROJO_PATH=C:\Rojo\rojo.exe
    echo Found Rojo in C:\Rojo
)

if "%ROJO_PATH%"=="" (
    echo.
    echo ERROR: Rojo not found!
    echo.
    echo Please install Rojo from: https://github.com/rojo-rbx/rojo/releases
    echo Or if already installed, add it to your PATH.
    echo.
    echo Alternative: Download rojo.exe and place it in this folder.
    echo.
    pause
    exit /b 1
)

echo.
echo Building 67-tycoon.rbxl...
echo Using: %ROJO_PATH%
echo.

cd /d "%~dp0"
"%ROJO_PATH%" build -o 67-tycoon.rbxl

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ==========================================
    echo SUCCESS! Built 67-tycoon.rbxl
    echo ==========================================
    echo.
    echo Next steps:
    echo 1. Double-click 67-tycoon.rbxl to open in Studio
    echo 2. Add TycoonTemplate to ReplicatedStorage
    echo 3. Save and publish!
    echo.
) else (
    echo.
    echo ERROR: Build failed!
    echo.
)

pause
