'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface IntelItem {
  id: string;
  category: 'ai' | 'aerospace' | 'tech' | 'project';
  icon: string;
  title: string;
  description: string;
  x: number;
  y: number;
  collected: boolean;
}

const INTEL_DATA: Omit<IntelItem, 'x' | 'y' | 'collected'>[] = [
  { id: 'ai-1', category: 'ai', icon: 'AI', title: 'Production LLMs', description: 'Built RAG pipelines and LLM apps shipping in production with OpenAI, Claude, and open-source models' },
  { id: 'ai-2', category: 'ai', icon: 'ML', title: 'Machine Learning', description: 'PyTorch, scikit-learn, XGBoost - predictive models for fleet optimization and maintenance' },
  { id: 'ai-3', category: 'ai', icon: 'CV', title: 'Computer Vision', description: 'Equipment diagnostics and quality inspection systems using CV and deep learning' },
  { id: 'aero-1', category: 'aerospace', icon: 'FAL', title: 'Falcon Project', description: 'Worked on SpaceX Falcon project - cutting-edge aerospace engineering and launch systems' },
  { id: 'aero-2', category: 'aerospace', icon: 'DRG', title: 'Dragon Project', description: 'SpaceX Dragon capsule project - human spaceflight and cargo delivery systems' },
  { id: 'aero-3', category: 'aerospace', icon: 'GRS', title: 'Grasshopper Project', description: 'SpaceX Grasshopper reusable rocket project - pioneering vertical takeoff and landing technology' },
  { id: 'aero-4', category: 'aerospace', icon: 'BO', title: 'Blue Origin New Shepard', description: 'Blue Origin rocket system - suborbital human spaceflight taking passengers to space and back' },
  { id: 'tech-1', category: 'tech', icon: 'PY', title: 'Python Expert', description: 'FastAPI, async patterns, production ML pipelines, data engineering with pandas/polars' },
  { id: 'tech-2', category: 'tech', icon: 'WEB', title: 'Full-Stack Web', description: 'React, Next.js, TypeScript, Tailwind - building modern production web apps' },
  { id: 'tech-3', category: 'tech', icon: 'OPS', title: 'Cloud & MLOps', description: 'AWS, Docker, CI/CD, monitoring - deploying and maintaining production AI systems' },
  { id: 'proj-1', category: 'project', icon: 'FP', title: 'FleetPulse AI', description: 'Heavy equipment diagnostics - Telematics + ML for predictive maintenance and cost optimization' },
  { id: 'proj-2', category: 'project', icon: 'TT', title: 'TechTranslate', description: 'AI documentation translator - Technical jargon to Plain English using LLMs and RAG' },
  { id: 'proj-3', category: 'project', icon: '20+', title: 'Portfolio Projects', description: 'Built 20+ AI projects: chatbots, automation, data pipelines, ML models in production' },
];

export default function GamePage() {
  const [intelItems, setIntelItems] = useState<IntelItem[]>([]);
  const [playerPos, setPlayerPos] = useState({ x: 400, y: 500 });
  const [selectedIntel, setSelectedIntel] = useState<IntelItem | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [launchTriggered, setLaunchTriggered] = useState(false);
  const [launchOutcome, setLaunchOutcome] = useState<'success' | 'orbit' | 'fuel' | 'explode' | 'fail' | null>(null);

  const gameAreaRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const rocketRef = useRef<HTMLDivElement>(null);
  const keysPressed = useRef<Set<string>>(new Set());

  useEffect(() => {
    const items = INTEL_DATA.map((item, index) => ({
      ...item,
      x: 120 + (index % 4) * 180 + Math.random() * 80,
      y: 120 + Math.floor(index / 4) * 140 + Math.random() * 60,
      collected: false,
    }));
    setIntelItems(items);
  }, []);

  useEffect(() => {
    if (!gameStarted || launchTriggered) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current.add(e.key.toLowerCase());
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current.delete(e.key.toLowerCase());
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameStarted, launchTriggered]);

  useEffect(() => {
    if (!gameStarted || launchTriggered) return;

    const gameLoop = setInterval(() => {
      setPlayerPos((prev) => {
        let newX = prev.x;
        let newY = prev.y;
        const speed = 5;

        if (keysPressed.current.has('arrowleft') || keysPressed.current.has('a')) newX -= speed;
        if (keysPressed.current.has('arrowright') || keysPressed.current.has('d')) newX += speed;
        if (keysPressed.current.has('arrowup') || keysPressed.current.has('w')) newY -= speed;
        if (keysPressed.current.has('arrowdown') || keysPressed.current.has('s')) newY += speed;

        newX = Math.max(20, Math.min(newX, 780));
        newY = Math.max(20, Math.min(newY, 580));

        intelItems.forEach((item) => {
          if (!item.collected) {
            const distance = Math.sqrt(Math.pow(newX - item.x, 2) + Math.pow(newY - item.y, 2));
            if (distance < 40) {
              collectIntel(item.id);
            }
          }
        });

        return { x: newX, y: newY };
      });
    }, 1000 / 60);

    return () => clearInterval(gameLoop);
  }, [gameStarted, launchTriggered, intelItems]);

  const collectIntel = (id: string) => {
    setIntelItems((prev) =>
      prev.map((item) => {
        if (item.id === id && !item.collected) {
          setSelectedIntel(item);
          gsap.to(`#intel-${id}`, {
            scale: 0,
            duration: 0.3,
            ease: 'back.in',
          });
          return { ...item, collected: true };
        }
        return item;
      })
    );
  };

  const handleLaunch = () => {
    setLaunchTriggered(true);
    const collectedCount = intelItems.filter((item) => item.collected).length;
    const percentage = (collectedCount / INTEL_DATA.length) * 100;

    let outcome: 'success' | 'orbit' | 'fuel' | 'explode' | 'fail';
    if (percentage === 100) outcome = 'success';
    else if (percentage >= 75) outcome = 'orbit';
    else if (percentage >= 50) outcome = 'fuel';
    else if (percentage >= 25) outcome = 'explode';
    else outcome = 'fail';

    setLaunchOutcome(outcome);
    animateLaunch(outcome);
  };

  const animateLaunch = (outcome: 'success' | 'orbit' | 'fuel' | 'explode' | 'fail') => {
    const tl = gsap.timeline();

    if (outcome === 'fail') {
      tl.to(rocketRef.current, { x: -5, repeat: 5, yoyo: true, duration: 0.1 });
      return;
    }

    tl.to(rocketRef.current, { y: -100, duration: 1, ease: 'power2.in' });

    if (outcome === 'explode') {
      tl.to(rocketRef.current, { scale: 1.5, opacity: 0, duration: 0.3 });
      return;
    }

    const targetY = outcome === 'success' ? -600 : outcome === 'orbit' ? -400 : -250;
    tl.to(rocketRef.current, { y: targetY, duration: 2, ease: 'power1.out' });

    if (outcome === 'fuel') {
      tl.to(rocketRef.current, { y: 0, duration: 1.5, ease: 'power2.in' });
    }
  };

  const collectedCount = intelItems.filter((item) => item.collected).length;
  const categoryColors = { ai: 'bg-plasma', aerospace: 'bg-thrust', tech: 'bg-ion', project: 'bg-nebula' };

  return (
    <div className="min-h-screen bg-void pt-20">
      <div className="container-custom py-8">
        {!gameStarted ? (
          <div className="flex min-h-[calc(100vh-12rem)] flex-col items-center justify-center text-center">
            <h1 className="font-display text-display-xl font-bold text-text-primary mb-4">
              Mission: <span className="text-gradient">Recruit JRod</span>
            </h1>
            <p className="text-body-lg text-text-secondary max-w-2xl mb-8">
              Your mission: Gather intel on Justin Roden before launching your recruitment rocket. The more intel you collect, the further your rocket will fly. Collect all 12 intel items to reach the moon!
            </p>
            <div className="space-y-4 text-body-md text-text-secondary mb-8">
              <p><strong>Controls:</strong> Arrow Keys or WASD to move</p>
              <p><strong>Objective:</strong> Collect intel items to learn about skills, experience, and projects</p>
              <p><strong>Launch:</strong> Hit the launch button when ready - but more intel = better outcome!</p>
            </div>
            <Button variant="cta" size="lg" onClick={() => setGameStarted(true)}>Start Mission</Button>
            <Link href="/" className="mt-4 text-body-sm text-text-tertiary hover:text-plasma">Back to Portfolio</Link>
          </div>
        ) : !launchTriggered ? (
          <div className="flex gap-6 items-start">
            {/* Game Canvas */}
            <div className="flex-shrink-0">
              <div className="mb-4 flex items-center justify-between">
                <div className="text-body-lg">
                  <span className="text-text-secondary">Intel Collected: </span>
                  <span className="font-bold text-plasma">{collectedCount}/{INTEL_DATA.length}</span>
                </div>
                <Button variant="cta" size="lg" onClick={handleLaunch} disabled={collectedCount === 0}>LAUNCH MISSION</Button>
              </div>
              <div ref={gameAreaRef} className="relative bg-tungsten/30 border border-steel rounded-xl overflow-hidden" style={{ width: '800px', height: '600px' }}>
                <div className="absolute top-4 left-1/2 -translate-x-1/2 text-4xl font-bold text-text-primary">MOON</div>
                {intelItems.map((item) => (
                  <div key={item.id} id={`intel-${item.id}`} className={`absolute w-12 h-12 rounded-full ${categoryColors[item.category]} flex items-center justify-center text-xs font-bold shadow-lg transition-opacity ${item.collected ? 'opacity-0' : 'opacity-100'}`} style={{ left: `${item.x}px`, top: `${item.y}px`, transform: 'translate(-50%, -50%)' }}>
                    {item.icon}
                  </div>
                ))}
                <div ref={playerRef} className="absolute w-10 h-10 bg-white rounded-full flex items-center justify-center text-xs font-bold transition-transform" style={{ left: `${playerPos.x}px`, top: `${playerPos.y}px`, transform: 'translate(-50%, -50%)' }}>YOU</div>
                <div ref={rocketRef} className="absolute bottom-8 left-1/2 -translate-x-1/2 text-3xl font-bold">ROCKET</div>
              </div>
            </div>

            {/* Intel Dashboard */}
            <div className="flex-1 bg-tungsten/30 border border-steel rounded-xl p-4 h-[680px] overflow-y-auto">
              <h3 className="font-display text-body-lg font-bold text-text-primary mb-4 sticky top-0 bg-tungsten/30 pb-2">
                Intel Dashboard
              </h3>

              {collectedCount === 0 ? (
                <p className="text-body-sm text-text-tertiary text-center py-8">
                  Collect intel items to see them here...
                </p>
              ) : (
                <div className="space-y-3">
                  {intelItems
                    .filter((item) => item.collected)
                    .map((item) => (
                      <div
                        key={item.id}
                        className="bg-void/50 border border-steel rounded-lg p-3 flex items-start gap-3"
                      >
                        <div className={`flex-shrink-0 w-10 h-10 rounded-full ${categoryColors[item.category]} flex items-center justify-center text-xs font-bold`}>
                          {item.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-display text-body-sm font-bold text-text-primary mb-1">
                            {item.title}
                          </h4>
                          <p className="text-body-xs text-text-secondary">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex min-h-[calc(100vh-12rem)] flex-col items-center justify-center text-center">
            {launchOutcome === 'success' && (
              <>
                <div className="text-8xl mb-4 font-bold text-plasma">SUCCESS</div>
                <h2 className="font-display text-display-lg font-bold text-plasma mb-4">MISSION SUCCESS!</h2>
                <p className="text-body-xl text-text-secondary max-w-2xl mb-8">Outstanding! You collected all intel and reached the moon. You now have the full picture of what Justin brings to the table. Ready to launch this collaboration?</p>
              </>
            )}
            {launchOutcome === 'orbit' && (
              <>
                <div className="text-8xl mb-4 font-bold text-ion">ORBIT</div>
                <h2 className="font-display text-display-lg font-bold text-ion mb-4">Orbital Achievement!</h2>
                <p className="text-body-xl text-text-secondary max-w-2xl mb-8">Great work! You gathered most of the intel and reached orbit. You missed a few key details though - consider exploring more before the final decision.</p>
              </>
            )}
            {launchOutcome === 'fuel' && (
              <>
                <div className="text-8xl mb-4 font-bold text-text-primary">NO FUEL</div>
                <h2 className="font-display text-display-lg font-bold text-text-primary mb-4">Out of Fuel!</h2>
                <p className="text-body-xl text-text-secondary max-w-2xl mb-8">You launched but ran out of fuel mid-flight. You need more intel about Justin to make an informed decision. Try again and collect more items!</p>
              </>
            )}
            {launchOutcome === 'explode' && (
              <>
                <div className="text-8xl mb-4 font-bold text-thrust">BOOM</div>
                <h2 className="font-display text-display-lg font-bold text-thrust mb-4">Premature Launch!</h2>
                <p className="text-body-xl text-text-secondary max-w-2xl mb-8">Boom! You launched with insufficient intel and the mission failed. Successful recruitment requires thorough research. Give it another shot!</p>
              </>
            )}
            {launchOutcome === 'fail' && (
              <>
                <div className="text-8xl mb-4 font-bold text-text-primary">FAIL</div>
                <h2 className="font-display text-display-lg font-bold text-text-primary mb-4">Insufficient Intel</h2>
                <p className="text-body-xl text-text-secondary max-w-2xl mb-8">The rocket will not even launch! You need to gather intel before making any moves. Get out there and learn about what Justin can do!</p>
              </>
            )}
            <div className="text-body-md text-text-secondary mb-8">
              <p>You collected <strong className="text-plasma">{collectedCount}/{INTEL_DATA.length}</strong> intel items</p>
            </div>
            <div className="flex gap-4">
              {launchOutcome === 'success' ? (
                <>
                  <Button variant="cta" size="lg"><a href="/#contact">Get in Touch</a></Button>
                  <Button variant="secondary" size="lg"><Link href="/">View Full Portfolio</Link></Button>
                </>
              ) : (
                <>
                  <Button variant="cta" size="lg" onClick={() => window.location.reload()}>Try Again</Button>
                  <Button variant="secondary" size="lg"><Link href="/">Skip to Portfolio</Link></Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}