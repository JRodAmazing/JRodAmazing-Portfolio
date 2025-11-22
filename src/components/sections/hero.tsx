'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        delay: 0.2,
      })
      .from(taglineRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
      }, '-=0.5')
      .from(ctaRef.current, {
        y: 30,
        opacity: 0,
        scale: 0.9,
        duration: 0.6,
      }, '-=0.4');
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-void pt-20"
    >
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-plasma/10 blur-[120px]" />
        <div className="absolute left-1/4 top-1/3 h-[400px] w-[400px] rounded-full bg-nebula/10 blur-[100px]" />
      </div>

      <div className="container-custom relative z-10 text-center">
        {/* Main title */}
        <h1
          ref={titleRef}
          className="font-display text-display-xl font-bold tracking-tight text-text-primary md:text-display-2xl"
        >
          Systems Architect
          <span className="block text-gradient">Propulsion to Production</span>
        </h1>

        {/* Tagline */}
        <p
          ref={taglineRef}
          className="mx-auto mt-6 max-w-2xl text-body-xl text-text-secondary md:text-2xl"
        >
          From Launch Pads to Launch Days
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button variant="cta" size="lg">
            <a href="#work">View Work</a>
          </Button>
          <Button variant="secondary" size="lg">
            <a href="#contact">Get in Touch</a>
          </Button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center gap-2 text-text-tertiary">
            <span className="text-body-xs uppercase tracking-wider">Scroll</span>
            <svg
              className="h-6 w-6 animate-bounce"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
