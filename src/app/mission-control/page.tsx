'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'planning' | 'maintenance';
  progress: number;
  techStack: string[];
  lastUpdate: string;
}

interface LearningItem {
  id: string;
  topic: string;
  platform: string;
  progress: number;
  startDate: string;
}

interface TechSkill {
  name: string;
  category: 'frontend' | 'backend' | 'ml' | 'devops';
  proficiency: 'expert' | 'advanced' | 'intermediate';
}

const ACTIVE_PROJECTS: Project[] = [
  {
    id: 'fleetpulse',
    name: 'FleetPulse AI',
    description: 'Heavy equipment diagnostics with ML-powered predictive maintenance',
    status: 'active',
    progress: 85,
    techStack: ['Python', 'FastAPI', 'PyTorch', 'PostgreSQL'],
    lastUpdate: '2 days ago'
  },
  {
    id: 'techtranslate',
    name: 'TechTranslate',
    description: 'AI-powered technical documentation translator using LLMs and RAG',
    status: 'active',
    progress: 70,
    techStack: ['Next.js', 'OpenAI', 'Pinecone', 'TypeScript'],
    lastUpdate: '1 week ago'
  },
  {
    id: 'portfolio',
    name: 'JRod Portfolio',
    description: 'Interactive portfolio with recruiter game and mission control',
    status: 'active',
    progress: 95,
    techStack: ['Next.js', 'GSAP', 'Tailwind', 'TypeScript'],
    lastUpdate: 'Today'
  }
];

const LEARNING_ITEMS: LearningItem[] = [
  {
    id: 'rag',
    topic: 'Advanced RAG Architectures',
    platform: 'DeepLearning.AI',
    progress: 60,
    startDate: 'Nov 2024'
  },
  {
    id: 'mlops',
    topic: 'MLOps Engineering',
    platform: 'Coursera',
    progress: 40,
    startDate: 'Dec 2024'
  },
  {
    id: 'rust',
    topic: 'Rust for Systems Programming',
    platform: 'Self-Study',
    progress: 25,
    startDate: 'Dec 2024'
  }
];

const TECH_SKILLS: TechSkill[] = [
  { name: 'Python', category: 'backend', proficiency: 'expert' },
  { name: 'React/Next.js', category: 'frontend', proficiency: 'expert' },
  { name: 'PyTorch', category: 'ml', proficiency: 'advanced' },
  { name: 'FastAPI', category: 'backend', proficiency: 'expert' },
  { name: 'TypeScript', category: 'frontend', proficiency: 'advanced' },
  { name: 'Docker', category: 'devops', proficiency: 'advanced' },
  { name: 'AWS', category: 'devops', proficiency: 'advanced' },
  { name: 'PostgreSQL', category: 'backend', proficiency: 'advanced' },
  { name: 'LangChain', category: 'ml', proficiency: 'advanced' },
  { name: 'OpenAI API', category: 'ml', proficiency: 'expert' },
];

export default function MissionControlPage() {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setCurrentTime(new Date());
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const statusColors = {
    active: 'bg-plasma',
    planning: 'bg-ion',
    maintenance: 'bg-nebula'
  };

  const categoryColors = {
    frontend: 'bg-ion',
    backend: 'bg-plasma',
    ml: 'bg-thrust',
    devops: 'bg-nebula'
  };

  return (
    <div className="min-h-screen bg-void pt-20">
      <div className="container-custom py-8">
        <div className="mb-8">
          <Link href="/" className="text-body-sm text-text-tertiary hover:text-plasma mb-4 inline-block">
            Back to Portfolio
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-display-xl font-bold text-text-primary mb-2">
                Mission <span className="text-gradient">Control</span>
              </h1>
              <p className="text-body-lg text-text-secondary">
                Real-time project status and development activity
              </p>
            </div>
            <div className="text-right">
              <div className="text-body-sm text-text-tertiary">
                {mounted && currentTime ? new Intl.DateTimeFormat('en-US', { weekday: 'short', month: 'short', day: 'numeric' }).format(currentTime) : '--'}
              </div>
              <div className="font-mono text-body-lg text-text-primary">
                {mounted && currentTime ? new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).format(currentTime) : '--:--:--'}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8 bg-gradient-to-r from-plasma/10 to-thrust/10 border border-plasma/30 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-4 h-4 bg-plasma rounded-full animate-pulse"></div>
                <div className="absolute inset-0 w-4 h-4 bg-plasma rounded-full animate-ping"></div>
              </div>
              <div>
                <div className="font-display text-body-lg font-bold text-text-primary">
                  Status: Available for Hire
                </div>
                <div className="text-body-sm text-text-secondary">
                  Open to full-time opportunities and contract work
                </div>
              </div>
            </div>
            <Button variant="cta" size="lg">
              <a href="/#contact">Get in Touch</a>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="font-display text-display-md font-bold text-text-primary mb-4">
                Active Projects
              </h2>
              <div className="space-y-4">
                {ACTIVE_PROJECTS.map((project) => (
                  <div key={project.id} className="bg-tungsten/30 border border-steel rounded-xl p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-display text-body-lg font-bold text-text-primary">
                            {project.name}
                          </h3>
                          <span className={`px-2 py-1 rounded text-xs font-bold ${statusColors[project.status]} text-white`}>
                            {project.status.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-body-sm text-text-secondary mb-3">
                          {project.description}
                        </p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-body-xs text-text-tertiary">Progress</span>
                        <span className="text-body-xs font-bold text-plasma">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-steel rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-plasma to-thrust h-2 rounded-full transition-all duration-500"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech) => (
                          <span key={tech} className="px-2 py-1 bg-void/50 border border-steel rounded text-xs text-text-secondary">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <span className="text-body-xs text-text-tertiary">
                        Updated {project.lastUpdate}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-display text-display-md font-bold text-text-primary mb-4">
                GitHub Activity
              </h2>
              <div className="bg-tungsten/30 border border-steel rounded-xl p-6">
                <div className="flex items-center justify-center h-40 text-text-tertiary">
                  <div className="text-center">
                    <div className="text-4xl mb-2">CHART</div>
                    <p className="text-body-sm">GitHub contribution graph coming soon</p>
                    <p className="text-body-xs mt-2">Will integrate with GitHub API</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="font-display text-display-md font-bold text-text-primary mb-4">
                Learning Tracker
              </h2>
              <div className="space-y-3">
                {LEARNING_ITEMS.map((item) => (
                  <div key={item.id} className="bg-tungsten/30 border border-steel rounded-xl p-4">
                    <h3 className="font-display text-body-sm font-bold text-text-primary mb-1">
                      {item.topic}
                    </h3>
                    <p className="text-body-xs text-text-tertiary mb-3">
                      {item.platform} - Started {item.startDate}
                    </p>
                    <div className="w-full bg-steel rounded-full h-1.5">
                      <div
                        className="bg-ion h-1.5 rounded-full transition-all duration-500"
                        style={{ width: `${item.progress}%` }}
                      ></div>
                    </div>
                    <div className="text-right text-body-xs text-ion font-bold mt-1">
                      {item.progress}%
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-display text-display-md font-bold text-text-primary mb-4">
                Tech Stack
              </h2>
              <div className="bg-tungsten/30 border border-steel rounded-xl p-4">
                <div className="space-y-2">
                  {TECH_SKILLS.map((skill) => {
                    const proficiencyColors = {
                      expert: 'bg-plasma text-white',
                      advanced: 'bg-ion text-white',
                      intermediate: 'bg-steel text-text-primary'
                    };

                    const proficiencyLabels = {
                      expert: 'Expert',
                      advanced: 'Advanced',
                      intermediate: 'Intermediate'
                    };

                    return (
                      <div key={skill.name} className="flex items-center justify-between py-2 border-b border-steel/30 last:border-0">
                        <span className="text-body-sm text-text-primary font-medium">{skill.name}</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${proficiencyColors[skill.proficiency]}`}>
                          {proficiencyLabels[skill.proficiency]}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}