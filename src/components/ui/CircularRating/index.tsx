export function CircularRating({ rating, size = 80 } : { rating: number; size?: number }) {
  const percentage = Math.round(rating * 10);
  const radius = size / 2 - 6; // Adjust for stroke width
  const circumference = 2 * Math.PI * radius;
  const strokeWidth = size * 0.075; // 7.5% of size for stroke
  const fontSize = size * 0.25; // 25% of size for main rating text
  const percentFontSize = size * 0.12; // 15% of size for % symbol
  
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        fill="none"
        className="transform -rotate-90"
      >
        {/* Background blur circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={size / 2}
          fill="#121113"
          fillOpacity="0.7"
        />

        {/* Outer border ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="white"
          strokeWidth={strokeWidth}
          strokeOpacity="0.27"
          fill="none"
        />

        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#FFE000"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (percentage / 100) * circumference}
          className="transition-all duration-700 ease-out"
        />
      </svg>

      {/* Rating text overlay */}
      <div
        className="absolute inset-0 flex items-center justify-center"
  
      >
        <span
          className="text-yellow-400 font-medium leading-none"
          style={{ fontSize: fontSize }}
        >
          {percentage.toFixed(1)}
        </span>
        <span
          className="text-white font-medium leading-none"
          style={{ fontSize: percentFontSize, marginTop: size * 0.05 }}
        >
          %
        </span>
      </div>
    </div>
  );
}