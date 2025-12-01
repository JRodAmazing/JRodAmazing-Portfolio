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
            &ldquo;I&apos;m the engineer you call when AI needs to work in the real world—not in a notebook.&rdquo;
          </p>
        </blockquote>

        <p className="mt-8 text-body-lg text-text-secondary text-left">
          17 years building systems that <span className="font-semibold text-text-primary">can&apos;t fail</span>:
          aerospace test operations, $485M+ industrial portfolios, mission-critical software running 24/7 in harsh environments.
        </p>

        <p className="mt-4 text-body-lg text-text-secondary text-left">
          Most AI engineers have never stood in a muddy field at 2am troubleshooting million-dollar equipment.
          Most operations people can&apos;t write production code. <span className="font-semibold text-text-primary">I&apos;ve done both</span>.
        </p>

        <p className="mt-4 text-body-lg text-text-secondary text-left">
          I taught myself to code <span className="font-semibold text-text-primary">in the dark</span>—late nights,
          Stack Overflow, broken code—because the tools I needed didn&apos;t exist yet. That&apos;s why I understand
          both the business problem <span className="italic">and</span> the technical solution.
        </p>
      </div>
    </Section>
  );
}
