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
            Open To
          </h3>
          <p className="text-body-md text-text-primary">
            AI Engineer (W2)
          </p>
          <p className="mt-2 text-body-sm text-text-secondary">
            Contract Projects, Advisory, Full-Time Roles
          </p>
        </div>

        {/* Domains */}
        <div className="focus-item rounded-xl border border-steel bg-tungsten p-6">
          <h3 className="mb-3 font-display text-body-lg font-semibold text-thrust">
            Specialties
          </h3>
          <ul className="space-y-1 text-body-sm text-text-secondary">
            <li>Production ML/AI Systems</li>
            <li>Industrial IoT + AI</li>
            <li>LLMs & RAG Pipelines</li>
            <li>Fleet Automation</li>
          </ul>
        </div>

        {/* Strengths */}
        <div className="focus-item rounded-xl border border-steel bg-tungsten p-6 md:col-span-2">
          <h3 className="mb-3 font-display text-body-lg font-semibold text-ion">
            What Sets Me Apart
          </h3>
          <ul className="space-y-2 text-body-sm text-text-secondary">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ion" />
              I speak fluent business AND write production code—most engineers do one or the other
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ion" />
              Built systems that run in -40°F mines and 130°F deserts—I understand harsh environments
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ion" />
              Aerospace background means I think in systems, not features—everything connects
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ion" />
              I ship production AI (HeavyOps, FleetPulse live now), not slide decks
            </li>
          </ul>
        </div>
      </div>

      <p className="focus-item mt-8 text-body-lg text-text-secondary">
        Most AI engineers build models. I build <span className="text-text-primary font-medium">production systems</span> that integrate with ERPs, process telematics, and survive in industrial environments.
      </p>
    </Section>
  );
}
