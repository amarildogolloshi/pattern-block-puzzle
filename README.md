# Pattern Block Puzzle

A responsive pattern-matching puzzle game where players arrange four tiles to recreate a target pattern. The app is designed for both desktop and mobile, with a polished UI, printable worksheets, and a simple progress tracker.

## Play Online

Play Pattern Block Puzzle here: [Pattern Block Puzzle](https://amarildogolloshi.github.io/pattern-block-puzzle/)

## Features
- Responsive layout for desktop and mobile
- Target pattern board and draggable tile puzzle
- New puzzle generation for each round
- Solve timer and elapsed-time display
- Player name and game history saved in local storage
- User profile modal with history and editable name
- Print options for all combinations or 24 unique puzzles
- Did You Know? facts modal

## How to Run Locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the local server:
   ```bash
   npm start
   ```
3. Open the app in your browser at:
   ```text
   http://localhost:3000
   ```

## Project Structure

- public/index.html - Main app layout
- public/styles.css - Responsive styling and modal design
- public/script.js - Puzzle logic, timer, persistence, and print features
- server.js - Express server for local development

## Deployment

Deploy the public folder to GitHub Pages with:
```bash
npm run deploy
```