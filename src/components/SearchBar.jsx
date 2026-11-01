import React from 'react';

/**
 * Labeled SearchBar component in Bauhaus Neo-Brutalist styling.
 */
export default function SearchBar({
  searchTerm,
  onSearchChange,
  onSearchSubmit,
  onClearSearch,
  isSearching = false,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearchSubmit();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClearSearch();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto my-6">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <label htmlFor="movie-search" className="sr-only">
            Search Movies by Title
          </label>
          <div className="relative flex items-center">
            <span className="absolute left-3.5 text-[#1a1a1a] pointer-events-none font-mono text-sm font-bold">
              ⌕
            </span>
            <input
              id="movie-search"
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="SEARCH TMDB MOVIES (E.G. INTERSTELLAR, PARASITE)..."
              className="w-full pl-9 pr-14 py-3 bg-white focus:bg-[#faf7f2] border-2 border-[#1a1a1a] brutalist-shadow font-bold text-sm sm:text-base uppercase tracking-tight placeholder:text-[#747878] placeholder:font-normal placeholder:capitalize focus:outline-none focus:ring-0 transition-colors"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={onClearSearch}
                title="Clear search (ESC)"
                className="absolute right-3 px-2 py-0.5 text-[11px] font-mono font-bold bg-[#eee9e0] hover:bg-[#e63b2e] hover:text-white border border-[#1a1a1a] transition-colors cursor-pointer"
              >
                ESC
              </button>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={isSearching}
          className="px-6 py-3 bg-[#1a1a1a] hover:bg-[#e63b2e] active:bg-[#1a1a1a] text-white font-extrabold text-sm uppercase tracking-wider border-2 border-[#1a1a1a] brutalist-shadow brutalist-interactive disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
        >
          {isSearching ? (
            <>
              <span className="inline-block animate-spin font-mono">◓</span>
              <span>Searching...</span>
            </>
          ) : (
            <span>Search</span>
          )}
        </button>
      </form>
    </div>
  );
}