# Vibium Demo 🔧

A minimal synchronous browser automation demo using Vibium's "sync bridge" API. This repository demonstrates automating the Manan dashboard (login, navigation, screenshots, and element verification) to showcase a small end-to-end flow.

---

## 🚀 Quick Start

Prerequisites:
- Node.js 18+ installed
- Local Chrome installed and available
- A `.env` file with your credentials (see example below)

Install dependencies:

```bash
npm install
```

Run the demo:

```bash
node MananApp.js
```

---

## ⚙️ Configuration (.env)
Create a `.env` file in the project root with the following values:

```
EMAIL=you@example.com
PASSWORD=yourpassword
BASE_URL=https://manan.numpyninja.com
```

Adjust `BASE_URL` if you run against a different environment.

---

## 🧩 Selectors & Locators
This project supports both string selectors and array-style locators (spread into `vibe.find`). Use array locators when the underlying `vibe.find` accepts multiple arguments (e.g., tag + attributes).

Example `Pages/LoginPage.js` selectors:

```js
const selectors = {
  signInButton: [
    ['button', { text: 'Sign In' }], // preferred locator (array)
    'button[aria-label="Sign In"]' // fallback string locator
  ],
  emailInput: ['#login-username', 'input[name="email"]'],
  passwordInput: ['#login-password', 'input[name="password"]']
};
```

`clickElement` options:
- `attempts` (number)
- `delay` (ms between attempts)
- `takeScreenshot` (boolean)
- `screenshotName` (string)
- `assertVisible` (boolean)

---

## 🗂 Project Structure
```
Vibium_Explored-main/
├─ MananApp.js        # main demo runner
├─ package.json
├─ .env               # (create locally)
├─ Helpers/
│  ├─ eleClick.js     # click helper (supports array locators)
│  ├─ eleTypeIn.js    # input typing helper
│  └─ Screenshot.js   # screenshot helper
└─ Pages/
   ├─ LoginPage.js    # login page actions
   └─ Dashboard.js    # dashboard-specific actions
```

---

## 🧪 Running & Troubleshooting
- If a locator isn't found, verify the selector value in `Pages/*` and consider adding an array locator form.
- Ensure Chrome is available and your `BASE_URL` is correct.
- Check `eleClick.js`'s `takeScreenshot` option to capture a failure image for debugging.

---

## Contributing
Feel free to open issues or create PRs for improvements. For changes to locator handling, keep tests (or manual checks) to ensure find behavior remains consistent across Vibium versions.

---

## License
MIT — see `LICENSE` (or add one) if you plan to publish.
