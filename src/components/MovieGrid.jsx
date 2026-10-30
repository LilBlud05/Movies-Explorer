import React from 'react'
import MovieCard from './MovieCard'

function MovieGrid({
    movies = [],
    savedMovies = [],
    onAddToWatchlist, 
    onMarkAsWatched,
    onRemove,
}) {

    const statusMap = new Map();
    savedMovies.forEach((item) => {
        statusMap.set(item.id, item,status);
    })

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-6">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          status={statusMap.get(movie.id) || null}
          onAddToWatchlist={onAddToWatchlist}
          onMarkAsWatched={onMarkAsWatched}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}

export default MovieGrid