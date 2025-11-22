'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Section } from '@/components/ui/section';

gsap.registerPlugin(ScrollTrigger);

export function CredibilityBar() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Section ref={sectionRef} variant="elevated" padding="md">
      <div ref={contentRef} className="text-center">
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
          <span className="text-display-md font-display font-bold text-ion">17+</span>
          <span className="text-body-lg text-text-primary">Years Experience</span>
          <span className="hidden text-text-tertiary md:inline">|</span>
          <span className="text-body-lg text-text-secondary">
            Aerospace & Defense • Construction • Software Engineering
          </span>
        </div>
      </div>
    </Section>
  );
}
