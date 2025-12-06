'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.from(introRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        delay: 0.2,
      })
      .from(valueRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
      }, '-=0.5')
      .from('.value-item', {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
      }, '-=0.4')
      .from(ctaRef.current, {
        y: 30,
        opacity: 0,
        scale: 0.9,
        duration: 0.6,
      }, '-=0.3');
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-void pt-20"
    >
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-plasma/10 blur-[120px]" />
        <div className="absolute left-1/4 top-1/3 h-[400px] w-[400px] rounded-full bg-nebula/10 blur-[100px]" />
      </div>

      <div className="container-custom relative z-10">
        {/* Introduction */}
        <div ref={introRef} className="mb-8">
          <h1 className="font-display text-display-lg font-bold tracking-tight text-text-primary md:text-display-xl lg:text-display-2xl">
            Hey, I&apos;m Justin{' '}
            <span className="text-gradient">&quot;JRod&quot;</span> Roden
          </h1>
          <p className="mt-4 font-display text-display-sm font-semibold text-plasma md:text-display-md">
            AI Solutions Architect | AI Engineering Lead
          </p>
          <p className="mt-2 text-body-lg text-text-secondary md:text-body-xl">
            Solutions Architecture • Production ML Engineering • Industrial AI Systems
          </p>
        </div>

        {/* Value Snapshot */}
        <div ref={valueRef} className="mb-10 max-w-4xl">
          <p className="mb-8 text-body-lg text-text-secondary md:text-body-xl">
            I architect AI solutions that work in the real world—not just in notebooks.
            From ML pipelines to LLM integrations, I design systems that scale.
            17+ years in aerospace and heavy equipment taught me that architecture can&apos;t just work,
            it must work <span className="font-semibold text-text-primary">perfectly</span>.
            I bring that precision to AI engineering and solutions architecture.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="value-item rounded-xl border border-steel bg-tungsten/50 p-4">
              <div className="mb-2 flex items-center gap-2">
                <span className="text-plasma">🏗️</span>
                <span className="font-display text-body-md font-semibold text-text-primary">Solutions Architecture</span>
              </div>
              <p className="text-body-sm text-text-secondary">
                End-to-end AI system design, microservices, API gateways, observability patterns
              </p>
            </div>

            <div className="value-item rounded-xl border border-steel bg-tungsten/50 p-4">
              <div className="mb-2 flex items-center gap-2">
                <span className="text-thrust">🚀</span>
                <span className="font-display text-body-md font-semibold text-text-primary">AI Engineering</span>
              </div>
              <p className="text-body-sm text-text-secondary">
                LLM pipelines, RAG systems, vector databases, ML deployment, real-time inference
              </p>
            </div>

            <div className="value-item rounded-xl border border-steel bg-tungsten/50 p-4">
              <div className="mb-2 flex items-center gap-2">
                <span className="text-ion">🤖</span>
                <span className="font-display text-body-md font-semibold text-text-primary">Industrial AI Systems</span>
              </div>
              <p className="text-body-sm text-text-secondary">
                17+ years building mission-critical systems for aerospace and $485M+ portfolios
              </p>
            </div>

            <div className="value-item rounded-xl border border-steel bg-tungsten/50 p-4">
              <div className="mb-2 flex items-center gap-2">
                <span className="text-nebula">🔄</span>
                <span className="font-display text-body-md font-semibold text-text-primary">Full-Stack Engineering</span>
              </div>
              <p className="text-body-sm text-text-secondary">
                Python/PyTorch → FastAPI/Node.js → React/Next.js → AWS/Azure → MLOps
              </p>
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-col items-start gap-4 sm:flex-row">
          <Button variant="cta" size="lg">
            <a href="#work">View Featured Builds</a>
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => {
              const link = document.createElement('a');
              link.href = '/Justin_Roden_Resume.pdf';
              link.download = 'Justin_Roden_Resume.pdf';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
          >
            📄 Download Resume
          </Button>
          <Button variant="secondary" size="lg">
            <a href="#contact">Get in Touch</a>
          </Button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center gap-2 text-text-tertiary">
            <span className="text-body-xs uppercase tracking-wider">Scroll</span>
            <svg
              className="h-6 w-6 animate-bounce"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
