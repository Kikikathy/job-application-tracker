@echo off
REM Job Application Tracker - Extension Packaging Script (Windows)
REM This script packages the browser extension for distribution

echo.
echo 📦 Packaging Job Application Tracker Extension...
echo.

REM Get version from manifest.json (simplified for Windows)
set VERSION=1.0.0
echo Version: %VERSION%
echo.

REM Create output directory
if not exist dist mkdir dist

REM Package the extension (requires 7-Zip or PowerShell)
echo Creating ZIP file...

REM Using PowerShell to create ZIP
powershell -Command "Compress-Archive -Path 'browser-extension\*' -DestinationPath 'dist\job-tracker-extension-v%VERSION%.zip' -Force -CompressionLevel Optimal"

echo.
echo ✅ Packaging complete!
echo.
echo 📁 Output file:
echo    - dist\job-tracker-extension-v%VERSION%.zip
echo.
echo 📤 Next steps:
echo    1. Test the packaged extension
echo    2. Upload to GitHub Releases
echo    3. Update download links in your application
echo    4. Share with users!
echo.
pause

@REM Made with Bob
