# 🥙 Döner Dash

[![CI](https://github.com/lightning1389/donergame/actions/workflows/ci.yml/badge.svg)](https://github.com/lightning1389/donergame/actions/workflows/ci.yml)
![Tests](https://img.shields.io/badge/tests-130%20passed-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)

A retro arcade browser game where you run a döner kebab shop under time pressure. Fill customer orders by adding the right ingredients before time runs out!

## How to Play

- **Customers** appear with orders shown as ingredient emojis
- **Add ingredients** using keys `1`-`6` or by clicking/tapping the buttons
- Ingredients must be added in the **exact order** shown
- **Serve** completed orders with `SPACE` or the Serve button
- Wrong ingredients cost you **1 second** off the timer
- Run out of time = **lose a life** (3 lives total)
- Orders get **faster and more complex** as you level up
- Build **combos** for consecutive correct orders for bonus points

## Controls

| Input | Action |
|-------|--------|
| `1` | Add Meat 🥩 |
| `2` | Add Lettuce 🥬 |
| `3` | Add Tomato 🍅 |
| `4` | Add Onion 🧅 |
| `5` | Add Sauce 🫗 |
| `6` | Add Chili 🌶️ |
| `SPACE` / `ENTER` | Serve Order |

On mobile: tap the ingredient buttons and Serve button.

---

## Running Locally

Just open the file in your browser — no build step required:

```
open index.html
```

Or double-click `index.html` in your file manager.

---

## Deployment

### Option A: GitHub Pages (free hosting)

1. Create a new GitHub repository (e.g., `doner-dash`)
2. Push the game files:
   ```bash
   cd doner-dash
   git init
   git add index.html style.css game.js
   git commit -m "Initial commit: Döner Dash"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/doner-dash.git
   git push -u origin main
   ```
3. Go to your repo on GitHub → **Settings** → **Pages**
4. Under "Source", select **Deploy from a branch**
5. Choose **main** branch, **/ (root)** folder, click **Save**
6. Your game will be live at `https://YOUR_USERNAME.github.io/doner-dash/` within a few minutes

### Option B: Simple Node.js Static Server

No installation required — just use `npx`:

```bash
cd doner-dash
npx serve .
```

This starts a local server (usually at `http://localhost:3000`). Open that URL in your browser.

Alternative with Python (if you have Python installed):

```bash
cd doner-dash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

### Option C: Docker

Build and run with Docker:

```bash
cd doner-dash
docker build -t doner-dash .
docker run -d -p 8080:80 doner-dash
```

Open `http://localhost:8080` in your browser.

---

## File Structure

```
doner-dash/
├── index.html    # Game HTML structure
├── style.css     # Retro arcade styling
├── game.js       # Game logic, rendering, audio
├── Dockerfile    # Optional Docker deployment
└── README.md     # This file
```

## Technical Notes

- **Zero dependencies** — pure HTML/CSS/JS
- **Web Audio API** for sound effects (no external audio files)
- **requestAnimationFrame** game loop
- **localStorage** for high score persistence
- Works on desktop and mobile browsers
- Responsive layout (max-width 480px centered)
