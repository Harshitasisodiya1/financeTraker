@echo off
echo ====================================================
echo      FinFlow - GitHub Upload Setup
echo ====================================================
echo.

where git >nul 2>nul
if %errorlevel% neq 0 (
    echo [!] Git is not installed or not found in PATH.
    echo Please install Git from: https://git-scm.com/download/win
    echo After installing Git, double-click this file again.
    echo.
    pause
    exit /b
)

echo [*] Initializing Git repository...
git init
git add .
git commit -m "FinFlow - Minimalist Wealth & Expense Tracker"

echo.
set /p REPO_URL="Enter your GitHub Repository URL (e.g., https://github.com/username/finflow.git): "

if "%REPO_URL%"=="" (
    echo [!] No URL provided. Aborted.
    pause
    exit /b
)

git branch -M main
git remote remove origin 2>nul
git remote add origin %REPO_URL%
git push -u origin main

echo.
echo ====================================================
echo  Project successfully pushed to GitHub!
echo ====================================================
pause
