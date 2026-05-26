# HealthSync Frontend

## Overview

HealthSync is a **Doctor Appointment & Healthcare Management System**. The frontend is a modern single‑page application built with **React** and **Vite**. It provides patients and doctors with a clean, responsive UI for:
- User registration & login (including Google OAuth)
- Appointment booking & management
- Real‑time toast notifications
- Loading overlays that stay visible for a configurable period (4‑5 seconds) to improve perceived performance

## Tech Stack

- **React 18** – component based UI
- **Vite** – fast dev server & bundler
- **Vanilla CSS / Tailwind‑like utilities** – custom design system (glass‑morphism, dark‑mode, micro‑animations)
- **Axios** – HTTP client for the API layer (`src/api/*`)
- **React‑OAuth Google** – Google Sign‑In integration
- **React‑Toastify** – toast messages (top‑right corner)

## Project Structure (important folders)

```
src/
├─ api/               # API wrappers (authApi, userApi, …)
├─ components/        # Re‑usable UI components (Dashboard, Home, …)
├─ context/           # AuthContext, ToastContext
├─ pages/             # Route pages – Login, Register, Home, …
├─ App.jsx            # Root component – routes & layout
└─ main.jsx           # Application bootstrap (GoogleOAuthProvider)
```

## Development

```bash
# install dependencies
npm ci   # clean install (npm ci respects lockfile)

# start dev server (http://localhost:5173)
npm run dev
```

The dev server hot‑reloads changes instantly. The loading overlay and toast context work out‑of‑the‑box.

## Build & Production

```bash
npm run build   # creates the production bundle under ./dist
```
Deploy the content of `dist/` to any static‑file host (nginx, Vercel, Netlify, …).

## Environment Variables

Create a `.env` file at the project root (it is ignored by Git). Example:

```
VITE_API_BASE_URL=https://api.healthsync.com   # backend base URL
VITE_GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
```

## Scripts Overview

| Script | Description |
|--------|-------------|
| `dev`  | Starts Vite dev server |
| `build`| Produces optimized production bundle |
| `preview` | Serves the built bundle locally |

---

> **Note** – All UI components follow a premium design system (glass‑morphism, subtle gradients, smooth hover animations) to meet the project's visual excellence requirements.
