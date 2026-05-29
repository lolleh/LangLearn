# LangLearn - Installation Guide

LangLearn is a language learning web app for Chinese, Spanish, and Arabic with flashcard, quiz, and voice pronunciation features. All progress is stored locally in your browser.

## Prerequisites

- **Node.js** version 18 or higher (includes `npm`)
- **Git** (optional, for cloning the repository)

### Verify Prerequisites

```bash
node --version   # Should show v18.x or higher
npm --version    # Should show 9.x or higher
```

## Linux Installation

### 1. Clone or Download

```bash
git clone https://github.com/lolleh/LangLearn
cd langlearn
```

Or download and extract the ZIP file, then open a terminal in the extracted folder.

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```

The app will be available at **http://localhost:5173/**.

### 4. Build for Production (optional)

```bash
npm run build
```

This creates a `dist/` folder with static files you can serve with any web server.

To preview the production build locally:

```bash
npm run preview
```

## Windows Installation

### 1. Install Node.js

1. Go to [nodejs.org](https://nodejs.org/)
2. Download the **LTS** version (18.x or later)
3. Run the installer — check "Add to PATH" during installation
4. Restart your terminal/command prompt

### 2. Clone or Download

Using Git Bash, PowerShell, or Command Prompt:

```bash
git clone <repository-url> language-learner
cd language-learner
```

Or download and extract the ZIP file, then open a terminal (Command Prompt or PowerShell) in the extracted folder.

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

The app will be available at **http://localhost:5173/**.

### 5. Build for Production (optional)

```bash
npm run build
```

### Troubleshooting Windows

- **"npm is not recognized"** — Close and reopen your terminal after installing Node.js, or manually add Node.js to your system PATH.
- **Permission errors** — Do NOT use `sudo` on Windows. Run your terminal as Administrator if needed.
- **Long path errors** — Enable long paths in Windows: run `git config --system core.longpaths true` or extract the ZIP to a short path like `C:\projects\`.

## Running on a Server

### Using the Built Files (Static Hosting)

```bash
npm run build
```

Copy the `dist/` directory to your web server's root. Any static file server (Nginx, Apache, Caddy, etc.) can serve it.

### Using Node.js as a Server

For a simple Node.js production server, install `serve`:

```bash
npm install -g serve
serve -s dist -l 3000
```

Then access the app at **http://your-server-ip:3000/**.

## Voice Pronunciation

The app uses the browser's built-in **Web Speech API** for voice pronunciation — no external API keys or downloads needed.

- **Chrome/Edge**: Best support across all languages
- **Firefox**: Good support
- **Safari**: Limited language support for Arabic

If voice doesn't work for a language:
1. Make sure your device has text-to-speech voices installed for that language
2. On **Windows**: Settings → Time & Language → Speech → Add voices
3. On **Linux**: Install speech-dispatcher and language packs
4. On **macOS**: System Settings → Accessibility → Spoken Content → System Voice

## Tech Stack

- **Vite 5** — Build tool
- **React 18** — UI framework
- **TypeScript** — Type safety
- **Tailwind CSS 3** — Styling
- **React Router** — Navigation
- **Web Speech API** — Voice pronunciation

## Project Structure

```
language-learner/
├── public/           # Static assets (favicon, logo)
├── src/
│   ├── components/   # Reusable UI components
│   ├── data/         # Word and sentence data per language
│   ├── lib/          # Types and storage utilities
│   └── pages/        # Route pages
├── INSTALL.md        # This file
└── README.md         # Project overview
```

## License

