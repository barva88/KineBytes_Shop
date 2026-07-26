import { type InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-zinc-300">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'w-full rounded-xl border bg-zinc-900/80 px-4 py-3 text-sm text-white placeholder-zinc-500',
            'transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500/50',
            'hover:border-zinc-600',
            error
              ? 'border-red-500/50 focus:ring-red-500/40 focus:border-red-500/50'
              : 'border-zinc-800',
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-red-400">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
export { Input };
