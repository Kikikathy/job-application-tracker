#!/bin/bash

# Job Application Tracker - Extension Packaging Script
# This script packages the browser extension for distribution

echo "📦 Packaging Job Application Tracker Extension..."
echo ""

# Get version from manifest.json
VERSION=$(grep -o '"version": "[^"]*' browser-extension/manifest.json | grep -o '[0-9.]*')
echo "Version: $VERSION"
echo ""

# Create output directory
mkdir -p dist

# Package the extension
echo "Creating ZIP file..."
cd browser-extension
zip -r "../dist/job-tracker-extension-v${VERSION}.zip" . \
  -x "*.git*" \
  -x "*.DS_Store" \
  -x "*GUIDE.md" \
  -x "*README.md" \
  -x "DEBUGGING_GUIDE.md" \
  -x "BUTTON_FIX_GUIDE.md" \
  -x "POPUP_FIX_GUIDE.md" \
  -x "REGIONAL_SITES_GUIDE.md"

cd ..

# Create a copy without documentation for Chrome Web Store
echo "Creating Chrome Web Store package..."
cd browser-extension
zip -r "../dist/job-tracker-extension-store-v${VERSION}.zip" . \
  -x "*.git*" \
  -x "*.DS_Store" \
  -x "*.md" \
  -x "icons/ICONS_README.txt"

cd ..

echo ""
echo "✅ Packaging complete!"
echo ""
echo "📁 Output files:"
echo "   - dist/job-tracker-extension-v${VERSION}.zip (for GitHub/direct distribution)"
echo "   - dist/job-tracker-extension-store-v${VERSION}.zip (for Chrome Web Store)"
echo ""
echo "📤 Next steps:"
echo "   1. Test the packaged extension"
echo "   2. Create a GitHub release with the ZIP file"
echo "   3. Update download links in your application"
echo "   4. Share with users!"
echo ""
echo "🔗 GitHub Release command:"
echo "   gh release create v${VERSION} dist/job-tracker-extension-v${VERSION}.zip --title \"v${VERSION}\" --notes \"Release notes here\""
echo ""

# Made with Bob
