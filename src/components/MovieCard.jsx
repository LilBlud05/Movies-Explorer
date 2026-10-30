import React, { useState } from 'react'

function MovieCard({ movie, status = null, onAddToWatchlist, onMarkAsWatched, onRemove}) {

    const [imgError, setImgError] = useState(false)
    const fallbackPoster = '/poster-fallback.svg';

    const posterSrc = !imgError && movie.posterUrl ? movie.posterUrl : fallbackPoster;

  return (
    <article className="bg-white border-2 border-[#1a1a1a] brutalist-shadow flex flex-col justify-between overflow-hidden group transition-all duration-150">
      {/* Poster area (2:3 aspect ratio) */}
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-[#eee9e0] border-b-2 border-[#1a1a1a]">
        <img
          src={posterSrc}
          alt={`Poster for ${movie.title}`}
          onError={() => setImgError(true)}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Year Badge */}
        <div className="absolute top-2 left-2 px-2 py-0.5 bg-[#faf8f5] border border-[#1a1a1a] brutalist-shadow-sm font-mono text-[11px] font-bold text-[#1a1a1a]">
          {movie.year || 'N/A'}
        </div>

        {/* Rating Chip */}
        {movie.rating && (
          <div className="absolute top-2 right-2 px-2 py-0.5 bg-[#ffcc00] border border-[#1a1a1a] brutalist-shadow-sm font-mono text-[11px] font-bold text-[#1a1a1a] flex items-center gap-1">
            <span>★</span>
            <span>{movie.rating}</span>
          </div>
        )}

        {/* Status Ribbon Tag */}
        {status === 'watched' && (
          <div className="absolute bottom-2 right-2 px-2.5 py-1 bg-[#0055ff] text-white border border-[#1a1a1a] font-mono text-[10px] font-extrabold tracking-wider uppercase brutalist-shadow-sm">
            ✓ Watched
          </div>
        )}
        {status === 'watchlist' && (
          <div className="absolute bottom-2 right-2 px-2.5 py-1 bg-[#e63b2e] text-white border border-[#1a1a1a] font-mono text-[10px] font-extrabold tracking-wider uppercase brutalist-shadow-sm">
            + Watchlist
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between gap-3">
        <div>
          <h3 className="font-extrabold text-base uppercase tracking-tight text-[#1a1a1a] line-clamp-1 leading-snug">
            {movie.title}
          </h3>

          <div className="mt-1 flex items-center justify-between text-xs font-mono text-[#4a4a4a]">
            <span className="line-clamp-1">{movie.genre || 'Film Record'}</span>
            <span className="text-[10px] text-[#747878] font-bold ml-1">#{movie.id}</span>
          </div>

          {movie.overview && (
            <p className="mt-2 text-xs text-[#4a4a4a] line-clamp-2 leading-relaxed font-medium">
              {movie.overview}
            </p>
          )}
        </div>

        {/* Action Controls Deck */}
        <div className="pt-3 border-t-2 border-[#1a1a1a] flex flex-col gap-2">
          {/* Watchlist Action */}
          {status !== 'watched' && (
            <button
              type="button"
              onClick={() => onAddToWatchlist(movie)}
              disabled={status === 'watchlist'}
              className={`w-full py-2 px-3 text-xs font-extrabold uppercase tracking-wider border-2 border-[#1a1a1a] transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                status === 'watchlist'
                  ? 'bg-[#e63b2e] text-white cursor-default'
                  : 'bg-[#faf8f5] text-[#1a1a1a] hover:bg-[#e63b2e] hover:text-white brutalist-shadow-sm hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5'
              }`}
            >
              <span>{status === 'watchlist' ? 'Saved in Watchlist' : '+ Add to Watchlist'}</span>
            </button>
          )}

          {/* Watched Action */}
          <button
            type="button"
            onClick={() => onMarkAsWatched(movie.id, movie)}
            disabled={status === 'watched'}
            className={`w-full py-2 px-3 text-xs font-extrabold uppercase tracking-wider border-2 border-[#1a1a1a] transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              status === 'watched'
                ? 'bg-[#0055ff] text-white cursor-default'
                : 'bg-[#faf8f5] text-[#1a1a1a] hover:bg-[#0055ff] hover:text-white brutalist-shadow-sm hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5'
            }`}
          >
            <span>{status === 'watched' ? 'Screened / Watched' : '✓ Mark as Watched'}</span>
          </button>

          {/* Remove Button if saved */}
          {status && onRemove && (
            <button
              type="button"
              onClick={() => onRemove(movie.id)}
              className="w-full py-1 text-[11px] font-mono font-bold uppercase tracking-wider text-[#747878] hover:text-[#e63b2e] transition-colors cursor-pointer text-center"
            >
              ✕ Remove from {status === 'watched' ? 'Watched' : 'Watchlist'}
            </button>
          )}
        </div>
      </div>
    </article>
  )
}

export default MovieCard