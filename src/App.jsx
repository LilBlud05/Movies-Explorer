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

function App() {
   return (
      <div className="min-h-screen bg-[#f5f0e8]text-[#1a1a1a] flex flex-col font-sans">
         <NavBar watchlistCount={watchlistCount} watchedCount={watchedCount} />

         <div className="flex-1">
         <Router>
            <Routes>
               <Route 
               path="/" 
               element={
                  <Discover
                     sa
                     
                     
                     />} />
               <Route path="/watched" element={<Watched />} />
               <Route path="/watchlist" element={<WatchList />} />
            </Routes>
         </Router>
         </div>
      </div>
   );
}

export default App;
