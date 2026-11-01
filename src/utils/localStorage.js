const STORAGE_KEY = 'movies_explorer_saved_films';

/**
 * Safely load saved movies from browser localStorage.
 * Returns an array of movie objects or an empty array if invalid / unavailable.
 */
export function loadSavedMovies() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Failed to load saved movies from localStorage:', error);
    return [];
  }
}

/**
 * Persist saved movies array into browser localStorage.
 */
export function saveMovies(movies) {
  try {
    if (Array.isArray(movies)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(movies));
    }
  } catch (error) {
    console.error('Failed to save movies to localStorage:', error);
  }
}
