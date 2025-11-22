'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils/cn';
import { Button } from '@/components/ui/button';

const navLinks = [
  { href: '#work', label: 'Work' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-void/80 backdrop-blur-lg border-b border-steel'
          : 'bg-transparent'
      )}
    >
      <div className="container-custom">
        <nav className="flex h-16 items-center justify-between lg:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="font-display text-body-lg font-bold text-text-primary transition-colors hover:text-plasma"
          >
            JR<span className="text-plasma">.</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-body text-body-sm text-text-secondary transition-colors hover:text-text-primary"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-4">
            <Button variant="cta" size="sm" className="hidden sm:inline-flex">
              <a href="#contact">Let&apos;s Talk</a>
            </Button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-lg text-text-primary transition-colors hover:bg-tungsten md:hidden"
              aria-label="Toggle menu"
            >
              <div className="relative h-5 w-6">
                <span
                  className={cn(
                    'absolute left-0 top-0 h-0.5 w-6 bg-current transition-all duration-300',
                    isMobileMenuOpen && 'top-2 rotate-45'
                  )}
                />
                <span
                  className={cn(
                    'absolute left-0 top-2 h-0.5 w-6 bg-current transition-all duration-300',
                    isMobileMenuOpen && 'opacity-0'
                  )}
                />
                <span
                  className={cn(
                    'absolute left-0 top-4 h-0.5 w-6 bg-current transition-all duration-300',
                    isMobileMenuOpen && 'top-2 -rotate-45'
                  )}
                />
              </div>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="border-b border-steel bg-void/95 backdrop-blur-lg md:hidden">
          <div className="container-custom">
            <div className="flex flex-col gap-4 py-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2 font-display text-body-lg text-text-secondary"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4">
                <Button variant="cta" size="lg" className="w-full">
                  <a href="#contact">Let&apos;s Talk</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
