'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Section } from '@/components/ui/section';
import { Badge } from '@/components/ui/badge';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'HeavyOps',
    description: 'Fleet and financial optimization platform for equipment rental and construction operations',
    tech: ['Next.js', 'Python', 'SQL', 'Power BI'],
    status: 'live',
  },
  {
    title: 'FleetPulse',
    description: 'Diagnostic and KPI tracking dashboard integrating CAN data (J1939) with budget metrics',
    tech: ['React', 'Node.js', 'PostgreSQL'],
    status: 'live',
  },
  {
    title: 'ContractGuard Pro',
    description: 'AI contract risk analysis tool for construction and aerospace procurement',
    tech: ['Python', 'LangChain', 'OpenAI'],
    status: 'in-progress',
  },
];

export function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });

      gsap.from('.project-card', {
        y: 80,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '.projects-grid',
          start: 'top 75%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Section ref={sectionRef} id="work" padding="lg">
      <h2
        ref={titleRef}
        className="mb-12 font-display text-display-md font-bold text-text-primary md:text-display-lg"
      >
        Systems in Production
      </h2>

      <div className="projects-grid grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <article
            key={index}
            className="project-card group rounded-2xl border border-steel bg-tungsten p-6 transition-all duration-500 ease-thrust hover:border-plasma/50 hover:shadow-glow-plasma/10"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-body-xl font-semibold text-text-primary transition-colors group-hover:text-plasma">
                {project.title}
              </h3>
              <Badge variant={project.status === 'live' ? 'success' : 'warning'}>
                {project.status}
              </Badge>
            </div>

            <p className="mb-4 text-body-md text-text-secondary">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md bg-steel px-2 py-1 font-mono text-body-xs text-text-tertiary"
                >
                  {tech}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8 text-center">
        <a
          href="https://github.com/JRodAmazing"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-body text-body-md text-plasma transition-colors hover:text-plasma-300"
        >
          View all projects on GitHub
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>
    </Section>
  );
}
