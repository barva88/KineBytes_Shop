import { type ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', fullWidth, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 cursor-pointer select-none',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
          // Variants
          variant === 'primary' &&
            'bg-emerald-500 text-black hover:bg-emerald-400 active:bg-emerald-600 shadow-lg shadow-emerald-500/20',
          variant === 'secondary' &&
            'bg-zinc-800 text-zinc-100 hover:bg-zinc-700 border border-zinc-700',
          variant === 'outline' &&
            'border border-zinc-700 text-zinc-300 hover:bg-zinc-800/60 hover:text-white hover:border-zinc-600',
          variant === 'ghost' &&
            'text-zinc-400 hover:text-white hover:bg-zinc-800/60',
          variant === 'danger' &&
            'bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20',
          // Sizes
          size === 'sm' && 'px-3 py-1.5 text-sm rounded-lg',
          size === 'md' && 'px-5 py-2.5 text-sm',
          size === 'lg' && 'px-7 py-3.5 text-base',
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export { Button };
export type { ButtonProps };
