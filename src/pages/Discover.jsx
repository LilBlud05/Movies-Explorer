import React from 'react'

function Discover() {
  return (
    <main className='max-w-[1280px] mx-auto px-4 md:px-8 py-8'>
      <div className="border-b-2 border-[#1a1a1a] pb-6 mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className='flex items-center gap-2'>
          <span className='font-mono text-xs font-bold uppercase tracking-wider text-[#e63b2e]'>
            HOME // 01 
          </span>
          <span className='text-xs font-mono text-[#747878]'>.</span>
          <span className='font-mono text-xs font-bold uppercase tracking-wider text-[#4a4a4a]'>
            TMDB ARCHIVE
          </span>
        </div>
        <h1 className='text-3xl md:text-5xl font-black uppercase tracking-tight text-[#1a1a1a] mt-1'>
          DISCOVER MOVIES
        </h1>
        <p className='text-sm md:text-base text-[#4a4a4a] font-medium mt-1'>
          Explore Curated Collections From The Movie Database Or Search Titles Directly
        </p>
      </div>
    </main>
  )
}

export default Discover