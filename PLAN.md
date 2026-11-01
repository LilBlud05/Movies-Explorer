# Movies Explorer — Project Plan & Architectural Research

## 1. Target Audience & Usability
**Target Audience**: Film archivists, cinephiles, repertory cinema programmers, and movie enthusiasts seeking a focused, clutter-free application to discover cinema, build an upcoming watchlist without duplicates, and maintain a historical log of screened movies.

**Usability Design**:
- High-contrast **Bauhaus Neo-Brutalist** editorial aesthetic with strict typography hierarchy (Space Grotesk and Geist Mono).
- Immediate feedback with visible real-time counters on navigation links (`/`, `/watchlist`, `/watched`).
- Single-click actions to save titles to the watchlist or move them to watched.
- Responsive, fluid grid layout adapting from 1 column on mobile to 4 columns on large screens.

---

## 2. API Selection & Rationale
**Primary API**: [The Movie Database (TMDB) API](https://developer.themoviedb.org/docs/getting-started) via client-side fetch, backed by an offline-ready **Curated Archival Catalog** (`sampleMovies.js`).

**Why this choice?**
- TMDB is the gold standard for global cinema indexes, providing high-resolution posters (`w500`), release dates, vote ratings, genre taxonomies, and film overviews.
- Supported endpoints include `/movie/popular`, `/movie/top_rated`, `/trending/movie/week`, and `/search/movie`.
- The hybrid architecture ensures zero downtime: if an API key is provided in `.env` (`VITE_TMDB_API_KEY` or `VITE_TMDB_ACCESS_TOKEN`), live queries run seamlessly; if absent or rate-limited, the application automatically falls back to curated classic cinema records.

---

## 3. Initial Collection & Search Retrieval
- **Initial Collection**: On initial load, the app queries featured titles (or the curated sample archive) to immediately populate the grid with iconic titles without requiring an empty search input. Users can filter by Popular, Top Rated, and Trending.
- **Search Queries**: User enters a title query into `SearchBar`. Submitting triggers `searchMovies(query, signal)` in `movieApi.js` targeting `/search/movie`.
- **Concurrency & Cancellation**: Requests use native `AbortController` signals to cancel previous pending requests and prevent race conditions if a newer search completes first.

---

## 4. Browser Access, Authentication & Limits
- **Browser Origin**: TMDB supports direct cross-origin browser requests (`Access-Control-Allow-Origin: *`).
- **Authentication**: Supports both TMDB v3 API Key (`api_key=...`) and v4 Read Access Token (`Authorization: Bearer ...`). Vite exposes the key safely to browser code via `import.meta.env.VITE_TMDB_API_KEY`.
- **Limits**: TMDB permits robust standard rate limits (~40 requests every 10 seconds). The built-in archive fallback shields the app from breaking if offline or when credentials are not configured.

---

## 5. Movie Identity & Core Data Fields
Movies are normalized to a consistent internal shape:
```javascript
{
  id: '157336',                                                          // Stable TMDB ID (string)
  title: 'Interstellar',                                                 // Movie title (string)
  year: '2014',                                                          // 4-digit release year (string)
  posterUrl: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg', // Image URL or null
  genre: 'Adventure / Drama / Sci-Fi',                                   // Genre names
  rating: '8.4',                                                         // Vote score
  overview: 'The adventures of a group of explorers...',                 // Plot summary
  status: 'watchlist'                                                    // 'watchlist' | 'watched' (when saved)
}
```

---

## 6. Edge Cases: Missing Posters, Empty Results & Failures
- **Missing or Broken Poster**: Handled by an `onError` event handler on `<img>` falling back to `/poster-fallback.svg`—a custom Bauhaus geometric vector illustration.
- **Empty Search Results**: Displays `<StatusMessage type="empty" />` informing the user that no records match the query and offering a one-click reset button.
- **Network / API Failures**: Displays `<StatusMessage type="error" />` with explicit error details and a "Retry" button.

---

## 7. State Management Architecture
- **No Redux Toolkit**: As specified, the app uses standard React state (`useState`) without Redux.
- **State Location**: The user's saved collection (`savedMovies`) is held in the top-level parent component `App.jsx`.
- **Propagation**:
  - `savedMovies` array is passed to `DiscoverPage`, `WatchlistPage`, and `WatchedPage`.
  - Actions (`addToWatchlist`, `markAsWatched`, `removeFromSaved`) are defined in `App.jsx` and passed down as callbacks.
  - Derived collections: `watchlistMovies` (`status === 'watchlist'`) and `watchedMovies` (`status === 'watched'`) are computed on demand.
  - Real-time counters are derived directly and displayed in `Navbar.jsx`.
- **Persistence**: Synced to browser `localStorage` on every change via `src/utils/localStorage.js`, surviving reloads and browser restarts.
