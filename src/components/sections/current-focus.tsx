'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Section } from '@/components/ui/section';

gsap.registerPlugin(ScrollTrigger);

export function CurrentFocus() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from('.focus-item', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Section ref={sectionRef} id="focus" padding="lg">
      <h2 className="focus-item mb-8 font-display text-display-md font-bold text-text-primary md:text-display-lg">
        Current Focus
      </h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Role */}
        <div className="focus-item rounded-xl border border-steel bg-tungsten p-6">
          <h3 className="mb-3 font-display text-body-lg font-semibold text-plasma">
            Role
          </h3>
          <p className="text-body-md text-text-primary">
            AI Solutions Engineer
          </p>
          <p className="mt-2 text-body-sm text-text-secondary">
            Pre/Post-Sales, Solution Design, Integration
          </p>
        </div>

        {/* Domains */}
        <div className="focus-item rounded-xl border border-steel bg-tungsten p-6">
          <h3 className="mb-3 font-display text-body-lg font-semibold text-thrust">
            Domains
          </h3>
          <ul className="space-y-1 text-body-sm text-text-secondary">
            <li>Construction & Heavy Equipment</li>
            <li>Mining</li>
            <li>Aerospace</li>
            <li>B2B SaaS</li>
          </ul>
        </div>

        {/* Strengths */}
        <div className="focus-item rounded-xl border border-steel bg-tungsten p-6 md:col-span-2">
          <h3 className="mb-3 font-display text-body-lg font-semibold text-ion">
            Strengths
          </h3>
          <ul className="space-y-2 text-body-sm text-text-secondary">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ion" />
              Translating non-technical requirements into clear AI/software architectures
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ion" />
              Designing chatbots, RAG systems, and automations around real business workflows
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ion" />
              Working with stakeholders, sales, and engineering to get from idea → working demo → production
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ion" />
              Documenting solutions so anyone on the team can understand, maintain, and extend the build
            </li>
          </ul>
        </div>
      </div>

      <p className="focus-item mt-8 text-body-lg text-text-secondary">
        I use this portfolio to <span className="text-text-primary font-medium">show, not tell</span> what that looks like in practice.
      </p>
    </Section>
  );
}
