# ⚛️ HealthSync React Frontend Interface

Welcome to the frontend application for **HealthSync** – a premium React-based single-page application (SPA) optimized with **Vite** for fast builds and hot module replacement.

---

## 🎨 Key Interface Features

*   **Responsive Scheduling:** Adaptable grid-based schedule view that dynamically reorders components for desktop and mobile viewports.
*   **Aesthetics:** Sleek dark modes, glassmorphism overlays, curated color palettes, and smooth CSS micro-animations.
*   **Loading State Overlays:** Perceived performance optimizations including global loading screens.
*   **Real-time Alerts:** Integrated toast notification panels positioned in the upper right.

---

## 🛠️ Tech Stack

*   **React 18** – UI Component Framework
*   **Vite** – Build Tool and Development Server
*   **Axios** – Promise-based HTTP Client
*   **Vanilla CSS / Custom Utility Rules** – Styling System (responsive layouts, custom gradients)
*   **React-OAuth Google** – Google Sign-In SDK
*   **React-Toastify** – Toast Notification Provider

---

## 💻 Running Locally (Without Docker)

Follow these instructions to run the frontend application in development mode on your local machine.

### Prerequisites
*   **Node.js 22** or higher (with `npm` package manager).

### Steps to Run

1.  **Navigate to the Frontend Directory:**
    ```bash
    cd Frontend
    ```

2.  **Install Dependencies:**
    Use `npm install` to download dependencies:
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a file named `.env` at the root of the `Frontend` directory:
    ```env
    VITE_API_BASE_URL=http://localhost:8080
    VITE_GOOGLE_CLIENT_ID=your_google_oauth_client_id.apps.googleusercontent.com
    ```
    *Note: `VITE_API_BASE_URL` must point to the **API Gateway** port (8080), not to the individual backend services.*

4.  **Start Development Server:**
    ```bash
    npm run dev
    ```
    The app will start and be accessible at **`http://localhost:5173`**.

---

## 🐳 Running with Docker

You can containerize the frontend server using the provided `Dockerfile`.

### 1. Build and Run via Global Docker Compose (Recommended)
From the root of the project repository (where `docker-compose.yml` resides), simply execute:
```bash
docker-compose up --build
```
This builds the frontend container and binds port `5173` to your host machine.

### 2. Build and Run the Frontend Container Individually
If you want to run only the frontend container:

1.  **Build the Image:**
    ```bash
    cd Frontend
    docker build -t healthsync-frontend .
    ```
2.  **Start the Container:**
    ```bash
    docker run -p 5173:5173 healthsync-frontend
    ```
    The application will be exposed on **`http://localhost:5173`**.

---

## 📂 Key Directory Structures

```
src/
├── api/             # HTTP Client modules (authApi.js, doctorApi.js, etc.)
├── components/      # Shared components (Header, Dashboard, Home, Loader)
├── context/         # React Contexts (AuthContext, ToastContext)
├── pages/           # High-level route pages (BookAppointment, Doctors, Login)
├── App.jsx          # Route paths, page layouts, and wrapper boundaries
└── main.jsx         # App bootstrapping and Google OAuth initialization
```

---

## ⚙️ Available Scripts

Execute the following commands inside the `Frontend` folder:

| Command | Action |
| :--- | :--- |
| `npm run dev` | Launches the Vite dev server with Hot Module Replacement (HMR). |
| `npm run build` | Builds and compiles optimized assets to `dist/` for production deployment. |
| `npm run preview` | Runs a local server to preview the compiled production build in `dist/`. |
