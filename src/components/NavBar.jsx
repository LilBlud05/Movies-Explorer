import React from "react";
import { NavLink } from "react-router-dom";


function NavBar({
    watchlistCount = 0,
    watchedCount = 0
}) {
    const getNavLinkClass = ({isActive}) => `px-3 sm:px-4 py-2 text-xs sm:text-sm font-extrabold uppercase tracking-wider border-2 border-[#1a1a1a] transition-all flex items-center gap-2 ${
        isActive
        ? 'bg-[#1a1a1a] text-white shadow-[2px_2px_0px_#e63b2e] -translate-x-0.5 -translate-y-0.5'
        : 'bg-[#faf8f5] text-[#1a1a1a] hover:bg-[#ffcc00] hover:-translate-x-0.5 hover:-translate-y-0.5 brutalist-shadow-sm'
    }`
  return (
     <header className="bg-[#f5f0e8] border-b-2 border-[#1a1a1a] sticky top-0 z-50">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Brand identity */}
        <NavLink to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-[#e63b2e] border-2 border-[#1a1a1a] brutalist-shadow-sm flex items-center justify-center font-black text-white text-xl tracking-tighter group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
            M
          </div>
            <div className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#1a1a1a] leading-none">
              MOVIES EXPLORER
            </div>
        </NavLink>

        {/* Navigation links */}
        <nav className="flex items-center gap-2 sm:gap-3" aria-label="Main Navigation">
          <NavLink to="/" end className={getNavLinkClass}>
            <span>DISCOVER</span>
          </NavLink>

          <NavLink to="/watchlist" className={getNavLinkClass}>
            <span>WATCHLIST</span>
            <span
              className={`font-mono text-xs px-1.5 py-0.2 border border-[#1a1a1a] ${
                watchlistCount > 0 ? 'bg-[#e63b2e] text-white' : 'bg-[#ded9d2] text-[#1a1a1a]'
              }`}
            >
              {watchlistCount}
            </span>
          </NavLink>

          <NavLink to="/watched" className={getNavLinkClass}>
            <span>WATCHED</span>
            <span
              className={`font-mono text-xs px-1.5 py-0.2 border border-[#1a1a1a] ${
                watchedCount > 0 ? 'bg-[#0055ff] text-white' : 'bg-[#ded9d2] text-[#1a1a1a]'
              }`}
            >
              {watchedCount}
            </span>
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default NavBar