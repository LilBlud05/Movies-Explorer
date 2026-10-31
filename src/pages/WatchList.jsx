import React from 'react'
import MovieGrid from '../components/MovieGrid'
import StatusMessage from '../components/StatusMessage'

function WatchList() {
  return (
    <main className="max-w-[1280px] mx-auto px-4 md:px-8 py-8">
         {/* Editorial Header */}
         <div className="border-b-2 border-[#1a1a1a] pb-6 mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
               <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-[#1a1a1a] mt-1">
                  PENDING WATCHLIST
               </h1>
               <p className="text-sm md:text-base text-[#4a4a4a] font-medium mt-1">
                  Films bookmarked for upcoming screenings. Marking a title as
                  watched moves it to your archive.
               </p>
            </div>

            <div className="font-mono text-xs font-bold uppercase bg-[#e63b2e] text-white px-3.5 py-1.5 border-2 border-[#1a1a1a] brutalist-shadow-sm self-start md:self-auto">
            </div>
         </div>
      </main>
  )
}

export default WatchList