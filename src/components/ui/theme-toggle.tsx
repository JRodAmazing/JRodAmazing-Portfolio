'use client';

import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setIsDark(savedTheme === 'dark');
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    setIsDark(!isDark);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center justify-center p-2"
      aria-label="Toggle theme"
    >
      <svg
        className="toggle-scene"
        width="60"
        height="100"
        viewBox="0 0 60 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Cord - Much more visible now */}
        <line
          x1="30"
          y1="0"
          x2="30"
          y2="40"
          className="toggle-scene_cord"
          stroke={isDark ? '#A1A1AA' : '#6B7280'}
          strokeWidth="3"
          fill="none"
        />

        {/* Light bulb */}
        <g className="transition-transform duration-500" transform={isDark ? 'translate(0, 0)' : 'translate(0, -8)'}>
          {/* Glow effect when dark mode (bulb is ON) */}
          {isDark && (
            <>
              <ellipse
                cx="30"
                cy="60"
                rx="26"
                ry="30"
                fill="rgba(251, 191, 36, 0.3)"
                className="animate-pulse"
              />
              <ellipse
                cx="30"
                cy="60"
                rx="20"
                ry="24"
                fill="rgba(251, 191, 36, 0.2)"
              />
            </>
          )}

          {/* Bulb glass - LIT in dark mode, DARK in light mode */}
          <ellipse
            cx="30"
            cy="60"
            rx="16"
            ry="20"
            fill={isDark ? '#FDE047' : 'rgba(39, 39, 42, 0.8)'}
            stroke={isDark ? '#FBBF24' : '#52525B'}
            strokeWidth="2"
            className="transition-all duration-500"
          />

          {/* Filament - Bright in dark mode, dim in light mode */}
          <path
            d="M 25 60 Q 30 55 35 60"
            fill="none"
            stroke={isDark ? '#F59E0B' : '#71717A'}
            strokeWidth="2"
            className="transition-all duration-500"
            opacity={isDark ? '1' : '0.5'}
          />

          {/* Base - Brass colored */}
          <rect
            x="23"
            y="76"
            width="14"
            height="8"
            rx="1"
            fill={isDark ? '#A16207' : '#52525B'}
            stroke={isDark ? '#92400E' : '#3F3F46'}
            strokeWidth="1"
            className="transition-all duration-500"
          />
          <line
            x1="23"
            y1="78"
            x2="37"
            y2="78"
            stroke={isDark ? '#92400E' : '#27272A'}
            strokeWidth="0.5"
          />
          <line
            x1="23"
            y1="80"
            x2="37"
            y2="80"
            stroke={isDark ? '#92400E' : '#27272A'}
            strokeWidth="0.5"
          />
          <line
            x1="23"
            y1="82"
            x2="37"
            y2="82"
            stroke={isDark ? '#92400E' : '#27272A'}
            strokeWidth="0.5"
          />
        </g>
      </svg>
    </button>
  );
}
