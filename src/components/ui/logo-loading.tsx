'use client';

import { useEffect, useState } from 'react';
import { gsap } from 'gsap';

export function LogoLoading({ onComplete }: { onComplete: () => void }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(() => {
          setIsLoading(false);
          onComplete();
        }, 300);
      }
    });

    // Diamond border animation
    tl.fromTo(
      '.diamond-border',
      {
        opacity: 0,
        scale: 0.8,
        rotate: 0
      },
      {
        opacity: 1,
        scale: 1,
        rotate: 360,
        duration: 1.2,
        ease: 'power2.out'
      }
    );

    // JR logo fade in
    tl.fromTo(
      '.jr-logo',
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' },
      '-=0.6'
    );

    // Loading dots animation
    tl.to('.loading-dot', {
      opacity: 0.3,
      stagger: {
        each: 0.3,
        repeat: 2,
        yoyo: true
      }
    }, '-=0.3');

    // Hold for a moment
    tl.to({}, { duration: 0.8 });

    // Fade out
    tl.to('.loading-screen', {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.inOut'
    });
  }, [onComplete]);

  if (!isLoading) return null;

  return (
    <div className="loading-screen fixed inset-0 z-[9999] flex items-center justify-center bg-void">
      <div className="relative">
        {/* Animated Diamond Border */}
        <svg
          className="diamond-border absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          width="200"
          height="200"
          viewBox="0 0 200 200"
        >
          <defs>
            <linearGradient id="diamondGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E31AFF" />
              <stop offset="50%" stopColor="#FF6B9D" />
              <stop offset="100%" stopColor="#6C63FF" />
            </linearGradient>
          </defs>

          {/* Diamond shape */}
          <path
            d="M 100 10 L 190 100 L 100 190 L 10 100 Z"
            fill="none"
            stroke="url(#diamondGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <animate
              attributeName="stroke-dasharray"
              from="0 1000"
              to="1000 0"
              dur="2s"
              repeatCount="indefinite"
            />
          </path>

          {/* Rotating glow effect */}
          <path
            d="M 100 10 L 190 100 L 100 190 L 10 100 Z"
            fill="none"
            stroke="url(#diamondGradient)"
            strokeWidth="6"
            opacity="0.3"
            filter="blur(8px)"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 100 100"
              to="360 100 100"
              dur="3s"
              repeatCount="indefinite"
            />
          </path>
        </svg>

        {/* JR Logo */}
        <div className="jr-logo relative z-10 flex flex-col items-center">
          <h1 className="font-display text-8xl font-bold text-text-primary">
            JR<span className="text-plasma">.</span>
          </h1>

          {/* Loading dots */}
          <div className="mt-4 flex gap-2">
            <div className="loading-dot h-2 w-2 rounded-full bg-plasma"></div>
            <div className="loading-dot h-2 w-2 rounded-full bg-thrust"></div>
            <div className="loading-dot h-2 w-2 rounded-full bg-ion"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
