import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  id?: string;
  variant?: 'default' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  container?: boolean;
}

const Section = forwardRef<HTMLElement, SectionProps>(
  (
    {
      className,
      children,
      variant = 'default',
      padding = 'lg',
      container = true,
      ...props
    },
    ref
  ) => {
    const variantStyles = {
      default: 'bg-void',
      elevated: 'bg-tungsten',
    };

    const paddingStyles = {
      none: '',
      sm: 'py-12 lg:py-16',
      md: 'py-16 lg:py-24',
      lg: 'py-section lg:py-section-lg',
    };

    return (
      <section
        ref={ref}
        className={cn(
          'relative overflow-hidden',
          variantStyles[variant],
          paddingStyles[padding],
          className
        )}
        {...props}
      >
        {container ? (
          <div className="container-custom">{children}</div>
        ) : (
          children
        )}
      </section>
    );
  }
);

Section.displayName = 'Section';

export { Section };
