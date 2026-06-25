# React + Tailwind App

A minimal starter built with [Vite](https://vite.dev), [React 19](https://react.dev), and [Tailwind CSS v4](https://tailwindcss.com).

## Getting started

```bash
npm install
npm run dev
```

Then open the URL printed in the terminal (default: http://localhost:5173).

## Scripts

| Command           | Description                       |
| ----------------- | --------------------------------- |
| `npm run dev`     | Start the dev server              |
| `npm run build`   | Build for production into `dist/` |
| `npm run preview` | Preview the production build      |

## Project structure

```
.
├── index.html          # App entry HTML
├── vite.config.js      # Vite + React + Tailwind plugin config
├── src
│   ├── main.jsx        # React root
│   ├── App.jsx         # Main component
│   └── index.css       # Tailwind import
└── public              # Static assets
```

Tailwind is configured via the `@tailwindcss/vite` plugin and imported in `src/index.css` with `@import "tailwindcss";` — no separate config file needed for basic use.
