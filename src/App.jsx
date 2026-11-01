import {
   BrowserRouter as Router,
   Routes,
   Route,
   Navigate,
} from "react-router-dom";
import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import Discover from "./pages/Discover";
import Watched from "./pages/Watched";
import WatchList from "./pages/WatchList";
import { loadSavedMovies, saveMovies } from "./utils/localStorage";

function App() {
   const [savedMovies, setSavedMovies] = useState(() => loadSavedMovies());

   // Persist collection changes to localStorage
   useEffect(() => {
      saveMovies(savedMovies);
   }, [savedMovies]);

   /**
    * Adds a movie to the personal watchlist without creating duplicates.
    */
   const handleAddToWatchlist = (movie) => {
      setSavedMovies((prev) => {
         const existing = prev.find((m) => m.id === movie.id);
         if (existing) {
            // If already in collection, ensure it is set to watchlist status
            return prev.map((m) =>
               m.id === movie.id ? { ...m, status: "watchlist" } : m,
            );
         }
         return [...prev, { ...movie, status: "watchlist" }];
      });
   };

   /**
    * Marks a movie as watched and transitions it out of the pending watchlist.
    */
   const handleMarkAsWatched = (movieId, movie = null) => {
      setSavedMovies((prev) => {
         const existing = prev.find((m) => m.id === movieId);
         if (existing) {
            return prev.map((m) =>
               m.id === movieId ? { ...m, status: "watched" } : m,
            );
         }
         if (movie) {
            return [...prev, { ...movie, status: "watched" }];
         }
         return prev;
      });
   };

   /**
    * Removes a movie from the saved collection.
    */
   const handleRemoveFromSaved = (movieId) => {
      setSavedMovies((prev) => prev.filter((m) => m.id !== movieId));
   };

   // Derive counts dynamically
   const watchlistCount = savedMovies.filter(
      (m) => m.status === "watchlist",
   ).length;
   const watchedCount = savedMovies.filter(
      (m) => m.status === "watched",
   ).length;

   return (
      <div className="min-h-screen bg-[#f5f0e8]text-[#1a1a1a] flex flex-col font-sans">
         <NavBar watchlistCount={watchlistCount} watchedCount={watchedCount} />

         <div className="flex-1">
            <Routes>
               <Route
                  path="/"
                  element={
                     <Discover
                        savedMovies={savedMovies}
                        onAddToWatchlist={handleAddToWatchlist}
                        onMarkAsWatched={handleMarkAsWatched}
                        onRemove={handleRemoveFromSaved}
                     />
                  }
               />
               <Route
                  path="/watched"
                  element={
                     <Watched
                        savedMovies={savedMovies}
                        onAddToWatchlist={handleAddToWatchlist}
                        onMarkAsWatched={handleMarkAsWatched}
                        onRemove={handleRemoveFromSaved}
                     />
                  }
               />
               <Route
                  path="/watchlist"
                  element={
                     <WatchList
                        savedMovies={savedMovies}
                        onAddToWatchlist={handleAddToWatchlist}
                        onMarkAsWatched={handleMarkAsWatched}
                        onRemove={handleRemoveFromSaved}
                     />
                  }
               />

               {/* Fallback route */}
               <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
         </div>

         {/* Archival brutalist footer */}
         <footer className="mt-auto border-t-2 border-[#1a1a1a] bg-[#f2ede5] py-6 px-4 md:px-8">
            <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono font-bold uppercase text-[#4a4a4a]">
               <div>
                  <span>MOVIES EXPLORER</span>
                  <span className="mx-2">--</span>
                  <span>&copy; 2026 All Rights Reserved</span>
               </div>
               <div className="flex items-center gap-4">
                  <span>SAVED: {savedMovies.length}</span>
                  <span>•</span>
                  <span>LOCAL PERSISTENCE: ACTIVE</span>
               </div>
            </div>
         </footer>
      </div>
   );
}

export default App;
