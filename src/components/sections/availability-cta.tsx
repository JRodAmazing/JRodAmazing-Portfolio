'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Section } from '@/components/ui/section';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

gsap.registerPlugin(ScrollTrigger);

export function AvailabilityCta() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(contentRef.current?.children || [], {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Section ref={sectionRef} id="contact" padding="lg">
      <div ref={contentRef} className="mx-auto max-w-2xl text-center">
        <Badge variant="success" className="mb-6 inline-flex items-center gap-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
          Open to Contract Work
        </Badge>

        <h2 className="font-display text-display-md font-bold text-text-primary md:text-display-lg">
          Let&apos;s Build Something
        </h2>

        <p className="mt-4 text-body-lg text-text-secondary">
          Looking for fully remote, high-value projects. Complex problems, technical architecture,
          systems integration—that&apos;s where I thrive.
        </p>

        <div className="mt-8 flex flex-col items-center gap-4">
          <Button variant="cta" size="lg">
            <a href="mailto:jcroden25@gmail.com">Start a Conversation</a>
          </Button>
          <p className="text-body-sm text-text-tertiary">
            I respond within 48 hours
          </p>
        </div>

        <div className="mt-12 border-t border-steel pt-8">
          <h3 className="mb-4 font-display text-body-lg font-semibold text-text-primary">
            What I Take On
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {['Systems Architecture', 'Full-Stack Development', 'AI Integration', 'Technical Consulting'].map((service) => (
              <span
                key={service}
                className="rounded-full bg-tungsten px-4 py-2 text-body-sm text-text-secondary"
              >
                {service}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
