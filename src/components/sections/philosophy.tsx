'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Section } from '@/components/ui/section';

gsap.registerPlugin(ScrollTrigger);

export function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(quoteRef.current, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Section ref={sectionRef} id="about" variant="elevated" padding="lg">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="mb-8 font-display text-display-sm font-bold text-text-primary">
          How I Think
        </h2>

        <blockquote
          ref={quoteRef}
          className="border-l-4 border-plasma pl-6 text-left"
        >
          <p className="font-display text-display-sm font-semibold text-text-primary md:text-display-md">
            &ldquo;Rockets don&apos;t accept technical debt. Neither do I.&rdquo;
          </p>
        </blockquote>

        <p className="mt-8 text-body-lg text-text-secondary">
          17 years in aerospace and construction taught me that systems fail at their integrations.
          I bring that same rigor to software—obsessing over how pieces connect,
          where failures propagate, and what actually ships.
        </p>
      </div>
    </Section>
  );
}
