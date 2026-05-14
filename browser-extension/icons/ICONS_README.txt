Browser Extension Icons
=======================

This folder should contain PNG icon files in the following sizes:

Required Icons:
- icon16.png  (16x16 pixels)  - Toolbar icon
- icon48.png  (48x48 pixels)  - Extension management page
- icon128.png (128x128 pixels) - Chrome Web Store

How to Generate Icons:
1. Use the icon.svg file as the source
2. Convert to PNG at each required size
3. Use tools like:
   - Inkscape (free, open-source)
   - Adobe Illustrator
   - Online converters (e.g., cloudconvert.com)
   - ImageMagick command line

Example using ImageMagick:
  convert icon.svg -resize 16x16 icon16.png
  convert icon.svg -resize 48x48 icon48.png
  convert icon.svg -resize 128x128 icon128.png

Or use an online SVG to PNG converter:
1. Go to https://cloudconvert.com/svg-to-png
2. Upload icon.svg
3. Set dimensions (16x16, 48x48, 128x128)
4. Download and save as icon16.png, icon48.png, icon128.png

Design Guidelines:
- Use simple, recognizable shapes
- Ensure visibility at small sizes (16x16)
- Use high contrast colors
- Follow platform design guidelines
- Test on light and dark backgrounds

Current Design:
- Purple gradient background (#667eea to #764ba2)
- White briefcase icon
- Green checkmark badge
- Professional and modern look