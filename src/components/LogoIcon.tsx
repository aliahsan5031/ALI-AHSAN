import React from 'react';

interface LogoIconProps {
  className?: string;
}

export const LogoIcon: React.FC<LogoIconProps> = ({ className = 'w-6 h-6' }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Primary Terracotta Gradient */}
        <linearGradient id="logo-primary" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFA07A" />
          <stop offset="50%" stopColor="#CD6E4E" />
          <stop offset="100%" stopColor="#9E4125" />
        </linearGradient>

        {/* Glow Accent Gradient */}
        <linearGradient id="logo-accent" x1="40" y1="0" x2="0" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="50%" stopColor="#FF9E7B" />
          <stop offset="100%" stopColor="#CD6E4E" />
        </linearGradient>

        {/* Subtle Drop Glow Filter */}
        <filter id="logo-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#CD6E4E" floodOpacity="0.4" />
        </filter>
      </defs>

      {/* Standalone Architectural "A" Monogram */}
      <g filter="url(#logo-glow)">
        {/* Main Monogram Body */}
        <path
          d="M20 3L34 33H28.2L20 15L11.8 33H6L20 3Z"
          fill="url(#logo-primary)"
        />

        {/* Inner Cutout */}
        <path
          d="M14.5 25.5H25.5L20 13.5L14.5 25.5Z"
          fill="#1A1C1B"
        />

        {/* Precision Core Diamond Spark */}
        <polygon
          points="20,21 22.5,25 20,29 17.5,25"
          fill="url(#logo-accent)"
        />
      </g>
    </svg>
  );
};

