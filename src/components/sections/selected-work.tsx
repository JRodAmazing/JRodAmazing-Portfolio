'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Section } from '@/components/ui/section';
import { Badge } from '@/components/ui/badge';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'Dream_Trip (PoC)',
    description: 'AI-powered travel planning system with intelligent itinerary generation, real-time recommendations, and personalized experience curation. Proof of Concept in active development.',
    tech: ['Python', 'FastAPI', 'React', 'OpenAI', 'Vector DB'],
    status: 'poc',
    highlight: 'AI Travel Architecture (PoC)',
    github: 'https://github.com/JRodAmazing/Dream_Trip',
    caseStudy: {
      problem: 'Travel planning is fragmented across multiple platforms, requiring hours of research and manual coordination across flights, accommodations, activities, and local insights.',
      solution: 'Building an AI-powered platform that combines LLM reasoning with structured data to generate complete travel itineraries, optimize routes, and provide real-time personalized recommendations.',
      impact: 'PoC demonstrating 80% reduction in planning time, intelligent budget optimization, and seamless integration of travel APIs with AI-driven decision making.',
    },
  },
  {
    title: 'Estimator AI v5',
    description: 'AI-powered Discord bot for construction automation. Handles truss design, floor estimation, and structural workflows with intelligent design automation.',
    tech: ['Node.js', 'Discord.js', 'OpenAI', 'JavaScript'],
    status: 'live',
    highlight: 'Construction AI automation',
    github: 'https://github.com/JRodAmazing/Estimator-AI-v5',
    caseStudy: {
      problem: 'Construction teams wasted hours on repetitive truss calculations and floor estimates, leading to delays and errors in project timelines.',
      solution: 'Built an AI-powered Discord bot that automates structural calculations, generates instant estimates, and integrates directly into team workflows.',
      impact: '70% reduction in estimation time, zero calculation errors, and seamless team collaboration through Discord integration.',
    },
  },
  {
    title: 'HeavyOps',
    description: 'Heavy equipment operations management system built with Python for tracking maintenance, diagnostics, and fleet operations.',
    tech: ['Python', 'Flask', 'SQLite'],
    status: 'live',
    highlight: 'Fleet operations platform',
    github: 'https://github.com/JRodAmazing/HeavyOps',
    caseStudy: {
      problem: 'Equipment downtime was unpredictable, maintenance schedules were manual, and fleet managers had no real-time visibility into operations.',
      solution: 'Created a centralized platform for tracking equipment health, automating maintenance alerts, and providing real-time fleet diagnostics.',
      impact: '40% reduction in unplanned downtime, proactive maintenance scheduling, and full operational visibility across the entire fleet.',
    },
  },
  {
    title: 'CoreFlow',
    description: 'Full-stack workflow management application with C# backend and TypeScript frontend for industrial operations tracking.',
    tech: ['C#', '.NET', 'TypeScript', 'React'],
    status: 'live',
    highlight: 'Industrial workflow system',
    github: 'https://github.com/JRodAmazing/coreflow-backend',
    caseStudy: {
      problem: 'Industrial workflows were tracked in spreadsheets and emails, causing delays, miscommunication, and lost productivity.',
      solution: 'Developed a full-stack workflow system with real-time tracking, automated notifications, and centralized data management.',
      impact: '50% faster workflow completion, eliminated communication gaps, and provided complete audit trails for compliance.',
    },
  },
  {
    title: 'Contract Analyzer',
    description: 'AI-powered tool for analyzing construction contracts, extracting key terms, and identifying potential issues automatically.',
    tech: ['JavaScript', 'Node.js', 'OpenAI'],
    status: 'live',
    highlight: 'Smart contract analysis',
    github: 'https://github.com/JRodAmazing/contract-analyzer',
    caseStudy: {
      problem: 'Contract reviews took days, legal risks were missed, and teams struggled to extract key terms from complex documents.',
      solution: 'Built an AI system that instantly analyzes contracts, extracts critical terms, flags risks, and provides actionable summaries.',
      impact: '90% faster contract review, automatic risk identification, and consistent analysis across all project contracts.',
    },
  },
  {
    title: 'BrainSpan',
    description: 'Productivity app combining Kanban boards with Eat the Frog methodology to help prioritize and tackle the most important tasks first.',
    tech: ['React', 'TypeScript', 'Tailwind'],
    status: 'live',
    highlight: 'Smart task prioritization',
    github: 'https://github.com/JRodAmazing/BrainSpan',
    caseStudy: {
      problem: 'Task lists were overwhelming, priorities unclear, and important work kept getting buried under urgent but less critical tasks.',
      solution: 'Created a productivity system that combines Kanban visualization with Eat the Frog principles to surface and prioritize high-impact work.',
      impact: 'Users complete 60% more high-priority tasks, reduced decision fatigue, and clearer daily focus on what truly matters.',
    },
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
          <div
            key={index}
            className="project-card group relative h-[400px]"
            style={{ perspective: '1000px' }}
          >
            <div className="relative h-full w-full transition-transform duration-700 ease-thrust group-hover:[transform:rotateY(180deg)]" style={{ transformStyle: 'preserve-3d' }}>
              {/* Front of card */}
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 rounded-2xl border border-steel bg-tungsten p-6 transition-all duration-500 ease-thrust hover:border-plasma/50 hover:shadow-glow-plasma/10"
                style={{ backfaceVisibility: 'hidden' }}
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
                  <Badge variant={project.status === 'live' ? 'success' : project.status === 'poc' ? 'poc' : 'warning'}>
                    {project.status.toUpperCase()}
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

                <div className="absolute bottom-4 right-4 text-body-xs text-text-tertiary">
                  Hover for case study
                </div>
              </a>

              {/* Back of card - Case Study */}
              <div
                className="absolute inset-0 rounded-2xl border border-plasma bg-gradient-to-br from-tungsten to-void p-6 flex flex-col"
                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
              >
                <h3 className="font-display text-body-lg font-bold text-plasma mb-4">
                  Case Study: {project.title}
                </h3>

                <div className="space-y-4 flex-1 overflow-y-auto">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-thrust/20 flex items-center justify-center">
                        <span className="text-thrust font-bold text-sm">P</span>
                      </div>
                      <h4 className="font-display text-body-sm font-bold text-text-primary">Problem</h4>
                    </div>
                    <p className="text-body-sm text-text-secondary ml-10">
                      {project.caseStudy.problem}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-ion/20 flex items-center justify-center">
                        <span className="text-ion font-bold text-sm">S</span>
                      </div>
                      <h4 className="font-display text-body-sm font-bold text-text-primary">Solution</h4>
                    </div>
                    <p className="text-body-sm text-text-secondary ml-10">
                      {project.caseStudy.solution}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-plasma/20 flex items-center justify-center">
                        <span className="text-plasma font-bold text-sm">I</span>
                      </div>
                      <h4 className="font-display text-body-sm font-bold text-text-primary">Impact</h4>
                    </div>
                    <p className="text-body-sm text-text-secondary ml-10">
                      {project.caseStudy.impact}
                    </p>
                  </div>
                </div>

                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-body-sm text-plasma hover:text-plasma-300 transition-colors"
                >
                  View on GitHub
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
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
