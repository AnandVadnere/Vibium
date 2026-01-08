// Helpers/eleTypeIn.js
const fs = require('fs');

function sleep(ms) {
  const start = Date.now();
  while (Date.now() - start < ms) {}
}

/**
 * Safely types into an element or selector.
 *
 * @param {object} vibe - vibium browserSync instance
 * @param {string|object} selectorOrElement - selector string or found element
 * @param {string} text - text to type
 * @param {object} opts - { attempts, delay, findOptions, clearFirst, assertVisible, takeScreenshot, screenshotPath }
 */
function typeInElement(vibe, selectorOrElement, text, opts = {}) {
  const attempts = opts.attempts ?? 3;
  const delay = opts.delay ?? 700;
  const findOptions = opts.findOptions; // optional second arg to vibe.find
  const clearFirst = opts.clearFirst ?? true;
  const assertVisible = opts.assertVisible ?? true;
  const takeScreenshot = opts.takeScreenshot ?? false;
  const screenshotPath = opts.screenshotPath;

  let lastError = null;

  for (let i = 0; i < attempts; i++) {
    const el = typeof selectorOrElement === 'string'
      ? (findOptions ? vibe.find(selectorOrElement, findOptions) : vibe.find(selectorOrElement))
      : selectorOrElement;

    if (!el) {
      lastError = new Error('Element not found');
      sleep(delay);
      continue;
    }

    try {
      if (assertVisible) {
        if (typeof el.isVisible === 'function' && !el.isVisible()) {
          throw new Error('Element not visible (isVisible() returned false)');
        }
        if ('visible' in el && el.visible === false) {
          throw new Error('Element not visible (visible === false)');
        }
      }

      if (clearFirst) {
        if (typeof el.clear === 'function') {
          el.clear();
        } else {
          // best-effort clear: replace current value by focusing and typing backspaces if value available
          try {
            const current = typeof el.value !== 'undefined' ? el.value : '';
            if (current && typeof el.type === 'function') {
              // send backspaces equal to current length
              el.type('\b'.repeat(String(current).length));
            }
          } catch (_) {
            // ignore
          }
        }
      }

      if (typeof el.type !== 'function') {
        throw new Error('Element does not support type()');
      }

      el.type(text);
      return el;
    } catch (err) {
      lastError = err;
      if (i < attempts - 1) sleep(delay);
    }
  }

  if (takeScreenshot) {
    try {
      if (screenshotPath && typeof vibe.screenshot === 'function') {
        fs.writeFileSync(screenshotPath, vibe.screenshot());
      }
    } catch (e) { /* ignore file errors */ }
  }

  const selectorText = typeof selectorOrElement === 'string' ? ` (${selectorOrElement})` : '';
  throw new Error(`Failed to type into element${selectorText}: ${lastError?.message || 'unknown error'}`);
}

module.exports = { typeInElement };