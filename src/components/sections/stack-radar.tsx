'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Section } from '@/components/ui/section';

gsap.registerPlugin(ScrollTrigger);

const stackCategories = [
  {
    name: 'Frontend',
    colorClass: 'text-plasma',
    items: [
      { name: 'Next.js', badge: 'https://img.shields.io/badge/Next.js-000?logo=nextdotjs&logoColor=white' },
      { name: 'TypeScript', badge: 'https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white' },
      { name: 'React', badge: 'https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB' },
      { name: 'Node.js', badge: 'https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white' },
      { name: 'TailwindCSS', badge: 'https://img.shields.io/badge/TailwindCSS-38B2AC?logo=tailwindcss&logoColor=white' },
    ],
  },
  {
    name: 'AI & Data',
    colorClass: 'text-thrust',
    items: [
      { name: 'OpenAI', badge: 'https://img.shields.io/badge/OpenAI-412991?logo=openai&logoColor=white' },
      { name: 'Anthropic', badge: 'https://img.shields.io/badge/Anthropic-000000?logo=anthropic&logoColor=white' },
      { name: 'Gemini', badge: 'https://img.shields.io/badge/Gemini-4285F4?logo=google&logoColor=white' },
      { name: 'Python', badge: 'https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=white' },
      { name: 'PostgreSQL', badge: 'https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white' },
    ],
  },
  {
    name: 'Dev & Ops',
    colorClass: 'text-ion',
    items: [
      { name: 'GitHub', badge: 'https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=white' },
      { name: 'Vercel', badge: 'https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=white' },
      { name: 'VS Code', badge: 'https://img.shields.io/badge/VS%20Code-007ACC?logo=visualstudiocode&logoColor=white' },
      { name: 'Windows', badge: 'https://img.shields.io/badge/Windows-0078D6?logo=windows&logoColor=white' },
    ],
  },
];

export function StackRadar() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from('.stack-category', {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });

      gsap.from('.stack-item', {
        scale: 0.8,
        opacity: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '.stack-grid',
          start: 'top 75%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Section ref={sectionRef} id="stack" padding="lg">
      <h2 className="mb-4 font-display text-display-md font-bold text-text-primary md:text-display-lg">
        Core Stack
      </h2>
      <p className="mb-10 text-body-lg text-text-secondary">
        Technologies I use to build and ship solutions
      </p>

      <div className="stack-grid grid gap-8 md:grid-cols-3">
        {stackCategories.map((category) => (
          <div key={category.name} className="stack-category">
            <h3 className="text-lg font-semibold text-text-primary mb-3">
              {category.name}
            </h3>
            <div className="flex flex-wrap gap-2">
              {category.items.map((item) => (
                <img
                  key={item.name}
                  src={item.badge}
                  alt={item.name}
                  className="stack-item h-7 transition-transform duration-300 hover:scale-110"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
