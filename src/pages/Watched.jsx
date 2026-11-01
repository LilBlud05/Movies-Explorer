import React from "react";
import MovieGrid from "../components/MovieGrid";
import StatusMessage from "../components/StatusMessage";

function Watched({ savedMovies, onAddToWatchlist, onMarkAsWatched, onRemove }) {
   const watchedMovies = savedMovies.filter(
      (movie) => movie.status === "watched",
   );

   return (
      <main className="max-w-[1280px] mx-auto px-4 md:px-8 py-8">
         {/* Editorial Header */}
         <div className="border-b-2 border-[#1a1a1a] pb-6 mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
               <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#0055ff]">
                     INDEX // 03
                  </span>
                  <span className="text-xs font-mono text-[#747878]">•</span>
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#4a4a4a]">
                     COMPLETED LOG
                  </span>
               </div>
               <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-[#1a1a1a] mt-1">
                  WATCHED ARCHIVE
               </h1>
               <p className="text-sm md:text-base text-[#4a4a4a] font-medium mt-1">
                  Historical catalog of screened and reviewed cinematic works.
               </p>
            </div>

            <div className="font-mono text-xs font-bold uppercase bg-[#0055ff] text-white px-3.5 py-1.5 border-2 border-[#1a1a1a] brutalist-shadow-sm self-start md:self-auto">
               COMPLETED: {watchedMovies.length}
            </div>
         </div>

         {/* Content */}
         {watchedMovies.length === 0 ? (
            <StatusMessage
               type="empty"
               title="No Films Logged as Watched"
               message="You have not recorded any watched films yet. Mark films from your watchlist or the discover catalog once viewed."
               actionText="Review Watchlist"
               actionLink="/watchlist"
            />
         ) : (
            <MovieGrid
               movies={watchedMovies}
               savedMovies={savedMovies}
               onAddToWatchlist={onAddToWatchlist}
               onMarkAsWatched={onMarkAsWatched}
               onRemove={onRemove}
            />
         )}
      </main>
   );
}

export default Watched;
