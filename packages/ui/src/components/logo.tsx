import * as React from 'react';

export interface LogoProps extends React.SVGProps<SVGSVGElement> {
  variant?: 'light' | 'dark';
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'dark',
  showTagline = true,
  size = 'md',
  className = '',
  ...props
}) => {
  const isLight = variant === 'light';

  const sizeDimensions = {
    sm: { height: 32, width: 120 },
    md: { height: 42, width: 165 },
    lg: { height: 52, width: 205 },
    xl: { height: 64, width: 250 },
  }[size];

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Official Fresh Produce Shopping Basket Icon */}
      <svg
        width={sizeDimensions.height}
        height={sizeDimensions.height}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
        {...props}
      >
        <defs>
          <linearGradient id="basketGrad" x1="10" y1="45" x2="90" y2="85" gradientUnits="userSpaceOnUse">
            <stop stopColor="#2EBD70" />
            <stop offset="1" stopColor="#123C2D" />
          </linearGradient>
          <linearGradient id="carrotGrad" x1="30" y1="20" x2="45" y2="45" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F97316" />
            <stop offset="1" stopColor="#EA580C" />
          </linearGradient>
          <linearGradient id="tomatoGrad" x1="18" y1="22" x2="38" y2="42" gradientUnits="userSpaceOnUse">
            <stop stopColor="#EF4444" />
            <stop offset="1" stopColor="#B91C1C" />
          </linearGradient>
          <linearGradient id="appleGrad" x1="62" y1="20" x2="82" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="#DC2626" />
            <stop offset="1" stopColor="#991B1B" />
          </linearGradient>
        </defs>

        {/* Veggies & Fruits popping from basket */}
        {/* Leafy Greens in background */}
        <path d="M42 16C42 16 48 8 56 14C64 20 54 28 54 28" fill="#22C55E" />
        <path d="M50 20C50 20 60 12 68 18C76 24 64 32 64 32" fill="#16A34A" />

        {/* Tomato Left */}
        <circle cx="28" cy="34" r="14" fill="url(#tomatoGrad)" />
        <path d="M28 20C28 20 26 15 28 12C30 15 28 20 28 20Z" fill="#15803D" stroke="#15803D" strokeWidth="2" strokeLinecap="round" />
        <path d="M25 18C25 18 20 17 18 19C21 20 25 18 25 18Z" fill="#15803D" />
        <path d="M31 18C31 18 36 17 38 19C35 20 31 18 31 18Z" fill="#15803D" />

        {/* Carrot Center-Right */}
        <path d="M46 18C44 14 42 8 38 6C42 10 46 14 46 18Z" fill="#22C55E" />
        <path d="M48 18C50 14 54 8 58 6C54 10 50 14 48 18Z" fill="#16A34A" />
        <path d="M38 24L56 22L50 48L44 48Z" fill="url(#carrotGrad)" />

        {/* Red Ripe Apple Right */}
        <circle cx="72" cy="34" r="13" fill="url(#appleGrad)" />
        <path d="M72 21C74 17 78 15 80 16C78 19 75 22 72 21Z" fill="#15803D" />

        {/* Yellow Lemon / Citrus */}
        <ellipse cx="46" cy="38" rx="10" ry="8" fill="#FACC15" />

        {/* Shopping Basket Body with Slits */}
        <path
          d="M12 44C12 40.6863 14.6863 38 18 38H82C85.3137 38 88 40.6863 88 44L80 78C79.2 81.5 76.2 84 72.6 84H27.4C23.8 84 20.8 81.5 20 78L12 44Z"
          fill="url(#basketGrad)"
        />

        {/* Basket Rim */}
        <rect x="10" y="38" width="80" height="7" rx="3.5" fill="#123C2D" />

        {/* Basket Slits / Handles */}
        <rect x="25" y="52" width="6" height="18" rx="3" fill="#D8F3DC" opacity="0.85" />
        <rect x="37" y="52" width="6" height="20" rx="3" fill="#D8F3DC" opacity="0.85" />
        <rect x="49" y="52" width="6" height="20" rx="3" fill="#D8F3DC" opacity="0.85" />
        <rect x="61" y="52" width="6" height="20" rx="3" fill="#D8F3DC" opacity="0.85" />
        <rect x="73" y="52" width="6" height="18" rx="3" fill="#D8F3DC" opacity="0.85" />

        {/* Basket Rolling Wheels */}
        <circle cx="34" cy="89" r="6" fill="#123C2D" stroke="#D8F3DC" strokeWidth="2" />
        <circle cx="66" cy="89" r="6" fill="#123C2D" stroke="#D8F3DC" strokeWidth="2" />
      </svg>

      {/* Brand Wordmark & Official Tagline */}
      <div className="flex flex-col text-left leading-none">
        <div className="flex items-center tracking-tight font-black font-sans">
          <span className={`text-xl sm:text-2xl font-black ${isLight ? 'text-white' : 'text-[#123C2D]'}`}>
            ECO
          </span>
          <span className="text-xl sm:text-2xl font-black text-[#21A366]">
            BAZAR
          </span>
        </div>
        {showTagline && (
          <span
            className={`text-[8.5px] sm:text-[9.5px] font-extrabold tracking-[0.16em] uppercase mt-0.5 font-sans ${
              isLight ? 'text-[#D8F3DC]' : 'text-[#21A366]'
            }`}
          >
            Freshness In Every Choice
          </span>
        )}
      </div>
    </div>
  );
};
