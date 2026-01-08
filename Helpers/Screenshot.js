// Helpers/Screenshot.js
const fs = require('fs');
const path = require('path');

/**
 * Safely types into an element or selector.
 *
 * @param {object} vibe - vibium browserSync instance
 * @param {string} FileName - text to type
 * @param {object} opts - { type, screenshotPath }
 */
function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function timestamp() {
  return new Date().toISOString().replace(/[:.]/g, '-');
}

function defaultFilename(prefix = 'screenshot', ext = '.png') {
  return `${prefix}-${timestamp()}${ext}`;
}

function saveScreenshot(vibe, FileName) {
  const fName = FileName || defaultFilename();
  // Default directory at project root: /Reports/Screenshots
  const defaultDir = path.join(process.cwd(), 'Reports', 'Screenshots');
  const outPath = defaultDir.join(fName);
  try{
    if (ensureDir(defaultDir)){const buffer = vibe.screenshot();
  fs.writeFileSync(outPath, buffer);
  return outPath;    }  }
  catch(err){
    console.error("Error creating directory:", err);
  }
}

module.exports = {
  saveScreenshot
};