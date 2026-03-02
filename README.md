# AX Portal UX starter

Vite + React + TypeScript front end scaffolded for the AX Portal UX (per provided PDF), styled with Tailwind CSS and Radix UI, and state managed with Zustand.

## Tech stack

- Vite + React 19 + TypeScript
- Ant Design 5
- Zustand for lightweight state

## Getting started

1. Install dependencies
   ```bash
   yarn install
   ```
2. Run the dev server
   ```bash
   yarn dev
   ```
   Vite will print the local URL (default http://localhost:5173).

## Scripts

- `yarn dev` – start Vite with HMR
- `yarn build` – type-check and create a production build
- `yarn preview` – preview the production build
- `yarn lint` – run ESLint

## Notes

- Global styles and the background treatment live in `src/index.css`.
- Ant Design theme config lives in `src/App.tsx` and the theme toggle in `src/store/theme.ts`.
