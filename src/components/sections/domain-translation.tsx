'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Section } from '@/components/ui/section';

gsap.registerPlugin(ScrollTrigger);

const translations = [
  { aerospace: 'Test Matrices', software: 'Test Coverage' },
  { aerospace: 'Failure Analysis', software: 'Debugging' },
  { aerospace: 'Systems Integration', software: 'Architecture' },
  { aerospace: 'Zero-Defect Culture', software: 'Production Reliability' },
];

export function DomainTranslation() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      });

      gsap.from('.translation-item', {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: itemsRef.current,
          start: 'top 75%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Section ref={sectionRef} padding="lg">
      <h2
        ref={titleRef}
        className="mb-12 text-center font-display text-display-md font-bold text-text-primary md:text-display-lg"
      >
        Built Different. <span className="text-gradient">Literally.</span>
      </h2>

      <div ref={itemsRef} className="mx-auto max-w-4xl">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8">
          {/* Headers */}
          <div className="hidden text-center font-mono text-body-sm uppercase tracking-wider text-thrust md:block">
            Aerospace Systems
          </div>
          <div className="hidden text-center font-mono text-body-sm uppercase tracking-wider text-ion md:block">
            Software Systems
          </div>

          {/* Translation items */}
          {translations.map((item, index) => (
            <div key={index} className="translation-item contents">
              <div className="rounded-lg bg-tungsten p-4 text-center md:text-right">
                <span className="text-body-md text-text-primary">{item.aerospace}</span>
              </div>
              <div className="rounded-lg bg-tungsten p-4 text-center md:text-left">
                <span className="text-body-md text-text-primary">{item.software}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
