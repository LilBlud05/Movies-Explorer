import React from 'react'
import { Link } from 'react-router-dom'

function StatusMessage({
    type = 'info', // 'loading' | 'error' | 'empty'
    title,
    message,
    actionText,
    actionLink,
    onAction
}) {
    const getBadgeStyle = () => {
        switch (type) {
            case 'error':
                return 'bg-[#e63b26] text-white';
            case 'loading':
                return 'bg-[#ffcc00] text-[#1a1a1a]';
            case 'empty':
                return 'bg-[#0055ff] text-white';
            default:
                return 'bg-[#1a1a1a] text-white'
        }
    }
  return (
    
    <div className="w-full max-w-xl mx-auto my-12 p-8 bg-white border-2 border-[#1a1a1a] brutalist-shadow text-center flex flex-col items-center">
      {/* Status category pill */}
      <div
        className={`px-3 py-1 font-mono text-[11px] font-extrabold uppercase tracking-widest border border-[#1a1a1a] brutalist-shadow-sm mb-4 ${getBadgeStyle()}`}
      >
        {type === 'loading' && 'PROCESSING RECORD'}
        {type === 'error' && 'ERROR'}
        {type === 'empty' && 'RECORD EMPTY'}
        {type === 'info' && 'NOTICE'}
      </div>

      {/* Title */}
      {title && (
        <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight text-[#1a1a1a] mb-2">
          {title}
        </h2>
      )}

      {/* Description */}
      {message && (
        <p className="text-sm font-medium text-[#4a4a4a] max-w-md mb-6 leading-relaxed">
          {message}
        </p>
      )}

      {/* Spinner for loading state */}
      {type === 'loading' && (
        <div className="flex items-center gap-2 font-mono text-sm font-bold text-[#1a1a1a] my-2">
          <span className="inline-block animate-spin text-xl font-mono">◓</span>
          <span>CONNECTING...</span>
        </div>
      )}

      {/* Optional action triggers */}
      {actionText && actionLink && (
        <Link
          to={actionLink}
          className="px-6 py-2.5 bg-[#1a1a1a] hover:bg-[#e63b2e] text-white font-extrabold text-xs uppercase tracking-wider border-2 border-[#1a1a1a] brutalist-shadow-sm brutalist-interactive cursor-pointer"
        >
          {actionText}
        </Link>
      )}

      {actionText && onAction && !actionLink && (
        <button
          type="button"
          onClick={onAction}
          className="px-6 py-2.5 bg-[#1a1a1a] hover:bg-[#e63b2e] text-white font-extrabold text-xs uppercase tracking-wider border-2 border-[#1a1a1a] brutalist-shadow-sm brutalist-interactive cursor-pointer"
        >
          {actionText}
        </button>
      )}
    </div>

  )
}

export default StatusMessage