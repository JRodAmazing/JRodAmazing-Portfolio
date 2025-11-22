'use client';

import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 font-display font-medium transition-all duration-300 ease-thrust focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-void disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: [
          'bg-gradient-to-r from-plasma to-nebula text-white shadow-glow-plasma/50',
          'hover:shadow-glow-plasma hover:scale-[1.02]',
          'active:scale-[0.98]',
          'focus-visible:ring-plasma',
        ],
        cta: [
          'bg-gradient-to-r from-thrust to-thrust-400 text-white shadow-glow-thrust/50',
          'hover:shadow-glow-thrust hover:scale-[1.02]',
          'active:scale-[0.98]',
          'focus-visible:ring-thrust',
        ],
        secondary: [
          'bg-tungsten text-text-primary border border-steel',
          'hover:bg-steel hover:border-plasma/50',
          'focus-visible:ring-steel',
        ],
        ghost: [
          'text-text-secondary',
          'hover:text-text-primary hover:bg-tungsten',
          'focus-visible:ring-steel',
        ],
      },
      size: {
        sm: 'h-9 px-4 text-body-sm rounded-lg',
        md: 'h-11 px-6 text-body-md rounded-xl',
        lg: 'h-14 px-8 text-body-lg rounded-xl',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, children, disabled, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className="h-4 w-4 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            <span>Loading...</span>
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
