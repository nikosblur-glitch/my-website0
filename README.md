# BotForge - Premium Discord Bots & Hosting

Professional multi-page website for selling Discord bots and hosting plans.

## How to use on Glitch

1. Go to https://glitch.com and create a new project (or remix a blank one).
2. Delete the default files.
3. Upload / create these files:
   - index.html
   - bots.html
   - hosting.html
   - support.html
   - cart.html
   - styles.css
   - script.js

4. For a pure static site on Glitch you can keep it simple. If you want a package.json:

```json
{
  "name": "botforge",
  "version": "1.0.0",
  "scripts": {
    "start": "npx serve ."
  }
}
```

Or just open index.html directly (Glitch will serve static files).

## Features

- Beautiful dark Discord-inspired design
- 20 premium bots with categories and filters
- 4 hosting plans (Starter → Ultimate)
- Working shopping cart (localStorage)
- Support ticket system (stores in localStorage)
- FAQ accordion
- Fully responsive (mobile friendly)
- Toast notifications

## Pages

- **Home** – Hero, features, popular bots
- **Bots** – Full catalog with category filters
- **Hosting** – Pricing cards
- **Support** – Ticket form + FAQ
- **Cart** – View items & checkout (demo)

Made for quick deployment on Glitch.


## Checkout (Updated)

Multi-step checkout:
1. Cart review + Login (Discord / Google / Guest email) — currently **demo** simulation
2. Payment method: Card / PayPal / Revolut — **demo only**, no real charges
3. Confirmation

### Real payments (important)

To actually receive money you must:

1. **PayPal** → Create a PayPal Business account → get Client ID / use PayPal Buttons SDK
2. **Revolut** → Revolut Business → Payment Links or Merchant API
3. **Cards** → Best option is **Stripe** (or similar PCI-compliant processor). Never handle raw card data yourself.

Discord & Google login also need official OAuth apps + preferably a small backend so secrets are not exposed in the browser.

This site is front-end only (perfect for Glitch static). Real money requires backend + merchant accounts.
