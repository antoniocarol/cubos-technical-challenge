'use client'

interface CircularRatingProps {
  rating: number
  className?: string
}

export function CircularRating({ rating, className = '' }: CircularRatingProps) {
  const percentage = Math.round(rating * 10)
  const circumference = 2 * Math.PI * 14
  const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`

  return (
    <div className={`relative w-16 h-16 ${className}`}>
      <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 32 32">
        <circle
          cx="16"
          cy="16"
          r="14"
          fill="none"
          stroke="rgba(0, 0, 0, 0.3)"
          strokeWidth="2"
        />
        <circle
          cx="16"
          cy="16"
          r="14"
          fill="none"
          stroke="#FFD700"
          strokeWidth="2"
          strokeDasharray={strokeDasharray}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-bold text-white">
          {percentage}%
        </span>
      </div>
    </div>
  )
}