// Helpers/clickRElement.js
const { saveScreenshot } = require('../Helpers/Screenshot');

function sleep(ms) {
  const start = Date.now();
  while (Date.now() - start < ms) {}
}

function clickElement(vibe, selectorOrElement, opts = {}) {
  const attempts = opts.attempts ?? 3;
  const delay = opts.delay ?? 0;
  const screenshotName = opts.screenshotName;
  const takeScreenshot = opts.takeScreenshot ?? false;
  const assertVisible = opts.assertVisible ?? true;

  const locators = Array.isArray(selectorOrElement)
    ? selectorOrElement
    : [selectorOrElement];

  let lastError = null;

  for (let attempt = 0; attempt < attempts; attempt++) {
    for (const locator of locators) {
      let el;

      try {
        el = vibe.find(locator);
        // el = typeof locator === 'string'
        //   ? vibe.find(locator)
        //   : locator;
      } catch (err) {
        lastError = err;
        continue; // try next locator
      }

      if (!el) {
        lastError = new Error('Element not found');
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

        el.click();
        console.log('Clicked element successfully.', attempt + 1, 'of', attempts);
        return el;

      } catch (err) {
        lastError = err;
      }
    }
  }

  // Screenshot on final failure
  if (takeScreenshot) {
    if (!screenshotName) {
      throw new Error('screenshotName must be provided when takeScreenshot is true');
    }
    saveScreenshot(vibe, screenshotName);
  }

  const selectorText = locators
    .map(l => typeof l === 'string' ? l : '[element]')
    .join(', ');

  throw new Error(
    `Failed to click element(s) (${selectorText}): ${lastError?.message || 'unknown error'}`


  );
sleep(delay);

}

module.exports = { clickElement };
