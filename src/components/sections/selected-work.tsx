'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Section } from '@/components/ui/section';
import { Badge } from '@/components/ui/badge';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'Estimator AI v5',
    description: 'AI-powered Discord bot for construction automation. Handles truss design, floor estimation, and structural workflows with intelligent design automation.',
    tech: ['Node.js', 'Discord.js', 'OpenAI', 'JavaScript'],
    status: 'live',
    highlight: 'Construction AI automation',
    github: 'https://github.com/JRodAmazing/Estimator-AI-v5',
  },
  {
    title: 'HeavyOps',
    description: 'Heavy equipment operations management system built with Python for tracking maintenance, diagnostics, and fleet operations.',
    tech: ['Python', 'Flask', 'SQLite'],
    status: 'live',
    highlight: 'Fleet operations platform',
    github: 'https://github.com/JRodAmazing/HeavyOps',
  },
  {
    title: 'CoreFlow',
    description: 'Full-stack workflow management application with C# backend and TypeScript frontend for industrial operations tracking.',
    tech: ['C#', '.NET', 'TypeScript', 'React'],
    status: 'live',
    highlight: 'Industrial workflow system',
    github: 'https://github.com/JRodAmazing/coreflow-backend',
  },
  {
    title: 'Contract Analyzer',
    description: 'AI-powered tool for analyzing construction contracts, extracting key terms, and identifying potential issues automatically.',
    tech: ['JavaScript', 'Node.js', 'OpenAI'],
    status: 'live',
    highlight: 'Smart contract analysis',
    github: 'https://github.com/JRodAmazing/contract-analyzer',
  },
  {
    title: 'BrainSpan',
    description: 'Productivity app combining Kanban boards with Eat the Frog methodology to help prioritize and tackle the most important tasks first.',
    tech: ['React', 'TypeScript', 'Tailwind'],
    status: 'live',
    highlight: 'Smart task prioritization',
    github: 'https://github.com/JRodAmazing/BrainSpan',
  },
];

export function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      // Ensure cards are visible if animations are disabled
      const cards = document.querySelectorAll('.project-card');
      cards.forEach((card) => {
        (card as HTMLElement).style.opacity = '1';
      });
      return;
    }

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

      gsap.fromTo('.project-card',
        {
          y: 80,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: '.projects-grid',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Section ref={sectionRef} id="work" padding="lg">
      <h2
        ref={titleRef}
        className="mb-4 font-display text-display-md font-bold text-text-primary md:text-display-lg"
      >
        Featured Builds
      </h2>
      <p className="mb-12 text-body-lg text-text-secondary">
        Projects that represent how I think and build
      </p>

      <div className="projects-grid grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <a
            key={index}
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="project-card group relative block rounded-2xl border border-steel bg-tungsten p-6 transition-all duration-500 ease-thrust hover:border-plasma/50 hover:shadow-glow-plasma/10"
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="project-card-icon">
                  <svg
                    className="h-6 w-6 text-plasma"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="font-display text-body-xl font-semibold text-text-primary transition-colors group-hover:text-plasma">
                  {project.title}
                </h3>
              </div>
              <Badge variant={project.status === 'live' ? 'success' : 'warning'}>
                {project.status}
              </Badge>
            </div>

            <p className="mb-2 text-body-sm font-medium text-plasma">
              {project.highlight}
            </p>

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
          </a>
        ))}
      </div>

      <p className="mt-8 text-center text-body-lg text-text-secondary">
        More builds coming soon...
      </p>

      <div className="mt-4 text-center">
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
