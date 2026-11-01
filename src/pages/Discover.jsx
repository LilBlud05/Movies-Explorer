import React, { useEffect, useRef, useState } from "react";
import SearchBar from "../components/SearchBar";
import MovieGrid from "../components/MovieGrid";
import StatusMessage from "../components/StatusMessage";
import { fetchInitialMovies, searchMovies } from "../services/movieApi";

function Discover({
   savedMovies,
   onAddToWatchlist,
   onMarkAsWatched,
   onRemove,
}) {
   const [movies, setMovies] = useState([]);
   const [category, setCategory] = useState("popular"); // 'popular' | 'top_rated' | 'trending'
   const [searchTerm, setSearchTerm] = useState("");
   const [activeQuery, setActiveQuery] = useState("");
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   const abortControllerRef = useRef(null);

   useEffect(() => {
      if (!activeQuery) {
         loadCollection(category);
      }
      return () => {
         if (abortControllerRef.current) {
            abortControllerRef.current.abort();
         }
      };
   }, [category]);

   const loadCollection = async (cat) => {
      if (abortControllerRef.current) {
         abortControllerRef.current.abort();
      }
      abortControllerRef.current = new AbortController();

      setLoading(true);
      setError(null);

      try {
         const data = await fetchInitialMovies(
            cat,
            abortControllerRef.current.signal,
         );
         setMovies(data);
         setActiveQuery("");
      } catch (err) {
         if (err.name !== "AbortError") {
            setError(err.message || "Unable to retrieve records.");
         }
      } finally {
         setLoading(false);
      }
   };

   const handleSearchSubmit = async () => {
      const trimmed = searchTerm.trim();
      if (!trimmed) {
         loadCollection(category);
         return;
      }

      if (abortControllerRef.current) {
         abortControllerRef.current.abort();
      }
      abortControllerRef.current = new AbortController();

      setLoading(true);
      setError(null);
      setActiveQuery(trimmed);

      try {
         const results = await searchMovies(
            trimmed,
            abortControllerRef.current.signal,
         );
         setMovies(results);
      } catch (err) {
         if (err.name !== "AbortError") {
            setError(err.message || "Search transmission failed.");
         }
      } finally {
         setLoading(false);
      }
   };

   const handleClearSearch = () => {
      setSearchTerm("");
      setActiveQuery("");
      loadCollection(category);
   };

   return (
      <main className="max-w-[1280px] mx-auto px-4 md:px-8 py-8">
         <div className="border-b-2 border-[#1a1a1a] pb-6 mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
               <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-[#1a1a1a] mt-1">
                  DISCOVER MOVIES
               </h1>
               <p className="text-sm md:text-base text-[#4a4a4a] font-medium mt-1">
                  Explore Curated Collections From The Movie Database Or Search
                  Titles Directly
               </p>
            </div>

            {/* Collection Category Filter Pills */}
            <div className="flex items-center gap-1.5 flex-wrap self-start md:self-auto">
               {[
                  { id: "popular", label: "Popular" },
                  { id: "top_rated", label: "Top Rated" },
                  { id: "trending", label: "Trending" },
               ].map((tab) => {
                  const isCurrent = category === tab.id && !activeQuery;
                  return (
                     <button
                        key={tab.id}
                        type="button"
                        onClick={() => {
                           setSearchTerm("");
                           setActiveQuery("");
                           setCategory(tab.id);
                        }}
                        className={`px-3 py-1.5 text-xs font-extrabold uppercase tracking-wider border-2 border-[#1a1a1a] transition-all cursor-pointer ${
                           isCurrent
                              ? "bg-[#1a1a1a] text-white shadow-[2px_2px_0px_#ffcc00] -translate-x-0.5 -translate-y-0.5"
                              : "bg-[#faf8f5] text-[#1a1a1a] hover:bg-[#ffcc00] brutalist-shadow-sm"
                        }`}
                     >
                        {tab.label}
                     </button>
                  );
               })}
            </div>
         </div>

         {/* Search Input Bar */}
         <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onSearchSubmit={handleSearchSubmit}
            onCLearSearch={handleClearSearch}
            isSearching={loading}
         />

         {/* Query status feedback */}
         {activeQuery && !loading && !error && (
            <div className="mb-4 flex items-center justify-between text-xs font-mono font-bold uppercase text-[#4a4a4a] border-b border-[#ded9d2] pb-2">
               <span>
                  Search: "<span className="text-[#1a1a1a]">{activeQuery}</span>
                  " ({movies.length} results)
               </span>
               <button
                  type="button"
                  onClick={handleClearSearch}
                  className="text-[#e63b2e] hover:underline cursor-pointer flex items-center gap-1"
               >
                  ✕ Reset search
               </button>
            </div>
         )}

         {/* Content Rendering States */}
         {loading && (
            <StatusMessage
               type="loading"
               title="Querying Records"
               message="Connecting to the cinematic index and processing metadata..."
            />
         )}

         {!loading && error && (
            <StatusMessage
               type="error"
               title="Archive Query Failed"
               message={error}
               actionText="Retry Transmission"
               onAction={
                  activeQuery
                     ? handleSearchSubmit
                     : () => loadCollection(category)
               }
            />
         )}

         {!loading && !error && movies.length === 0 && (
            <StatusMessage
               type="empty"
               title="No Matching Films Found"
               message={`No records matched "${activeQuery}". Try adjusting your keywords or clearing the search.`}
               actionText="Clear Search"
               onAction={handleClearSearch}
            />
         )}

         {!loading && !error && movies.length > 0 && (
            <MovieGrid
               movies={movies}
               savedMovies={savedMovies}
               onAddToWatchlist={onAddToWatchlist}
               onMarkAsWatched={onMarkAsWatched}
               onRemove={onRemove}
            />
         )}
      </main>
   );
}

export default Discover;
