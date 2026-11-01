# Movies Explorer // Bauhaus Cine-Archive

An archival web application built with **React**, **Vite**, **React Router DOM**, and **Tailwind CSS**, integrated with **The Movie Database (TMDB)**. It allows cinephiles and curators to discover cinema, search titles across collections, save films to a personal watchlist without duplicates, and track completed viewings in a dedicated watched archive.

Styled in a **Bauhaus Neo-Brutalist** aesthetic with sharp 0px borders, bold 2px ink lines, crisp mechanical drop shadows, and constructivist primary accents.

---

## Features

| Feature | Implementation Details |
|---|---|
| **Discover Movies** | Initial collections (Popular, Top Rated, Trending) fetched from TMDB (`/`) with titles, release years, vote ratings, genre tags, and 2:3 aspect ratio posters with fallback support. |
| **Title Search** | Search films by title against TMDB with keyboard shortcuts (`ESC` clear), loading spinners, and informative empty-result feedback. |
| **Watchlist Management** | Save any movie to personal queue (`/watchlist`) without creating duplicates. Updates real-time navigation badges. |
| **Watched Tracking** | Mark films as watched (`/watched`) to move them out of the pending watchlist into the completed archive. |
| **Persistence** | Saved collection automatically persists in browser `localStorage`. Survives page refreshes and browser restarts. |
| **Client-Side Routing** | Powered by `react-router-dom` with Netlify (`_redirects`) and Vercel (`vercel.json`) SPA rewrites. |

---

## Project Structure

This project strictly adheres to the requested architecture without unnecessary additions:

```text
movies-explorer/
├── public/
│   ├── _redirects                # Netlify SPA fallback to index.html
│   └── poster-fallback.svg       # Custom Bauhaus fallback vector graphic
├── src/
│   ├── components/
│   │   ├── Navbar.jsx            # Uses <NavLink> for /, /watchlist, and /watched
│   │   ├── SearchBar.jsx         # Labeled search input, submit, and clear button
│   │   ├── MovieGrid.jsx         # Responsive grid container for MovieCards
│   │   ├── MovieCard.jsx         # Individual movie card with status action buttons
│   │   └── StatusMessage.jsx     # UI feedback for loading, empty states, and errors
│   ├── data/
│   │   └── sampleMovies.js       # Curated archival movie records for testing and fallback
│   ├── pages/
│   │   ├── DiscoverPage.jsx      # Renders on "/"
│   │   ├── WatchlistPage.jsx     # Renders on "/watchlist"
│   │   └── WatchedPage.jsx       # Renders on "/watched"
│   ├── services/
│   │   └── movieApi.js           # Centralized fetch calls and TMDB data-shape mapping
│   ├── utils/
│   │   └── localStorage.js       # Helper functions for persisting saved movies
│   ├── App.jsx                   # Holds shared state and <Routes>
│   ├── index.css                 # Main stylesheet importing Tailwind CSS
│   └── main.jsx                  # Wraps <App /> in <BrowserRouter>
├── .env                          # Local API keys (ignored by Git)
├── .env.example                  # Safe template showing required VITE_ variable names
├── .gitignore                    # Excludes node_modules, dist, and .env files
├── index.html                    # HTML root template with Space Grotesk fonts
├── package.json                  # Dependencies and build scripts
├── PLAN.md                       # Answers to the 7 pre-build research questions
├── README.md                     # Project documentation and setup guide
├── vercel.json                   # Vercel SPA fallback configuration
└── vite.config.js                # Vite configuration with React and Tailwind plugins
```

---

## State Management

- **No Redux / Redux Toolkit**: Built using standard React state (`useState`, `useEffect`) and pure props/callbacks.
- **Single Source of Truth**: User collection (`savedMovies`) is held in `App.jsx`.
- **Status Lifecycle**: Each saved movie has a status property (`'watchlist'` or `'watched'`).
  - Adding to Watchlist sets `status: 'watchlist'`.
  - Marking as Watched transitions `status: 'watched'`.
  - Watchlist count and Watched count are dynamically derived from `savedMovies`.
- **LocalStorage Sync**: Every modification to `savedMovies` is validated and serialized to `localStorage` via `src/utils/localStorage.js`.

---

## Local Setup & Development

### 1. Prerequisites
- Node.js (v18 or newer)
- npm (v9 or newer)

### 2. Installation
```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/movies-explorer.git
cd movies-explorer

# Install dependencies
npm install
```

### 3. Environment Variables (TMDB Setup)
The application works immediately out of the box using the built-in TMDB-modeled archive catalog. To connect to live TMDB data:
1. Register a free account at [themoviedb.org](https://www.themoviedb.org/) and generate an API key at [themoviedb.org/settings/api](https://www.themoviedb.org/settings/api).
2. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
3. Set your TMDB API Key:
   ```env
   VITE_TMDB_API_KEY=your_tmdb_api_key_here
   ```
   *(Or set `VITE_TMDB_ACCESS_TOKEN` if using v4 Bearer Auth)*

### 4. Running the Development Server
```bash
npm run dev
```
Open your browser at the local Vite URL (typically `http://localhost:5173`).

### 5. Production Build
```bash
npm run build
npm run preview
```

---

## Deployment Configuration

- **Netlify**: Configured with `public/_redirects` routing `/*` to `/index.html 200`.
- **Vercel**: Configured with `vercel.json` rewrite routing `/(.*)` to `/index.html`.

---

## Credits & Attribution

- **Data Provider**: This product uses the TMDB API but is not endorsed or certified by TMDB.
- **Typography**: Space Grotesk and Geist Mono by Google Fonts.
- **Design System**: Bauhaus Neo-Brutalist design principles from `Design.md`.
