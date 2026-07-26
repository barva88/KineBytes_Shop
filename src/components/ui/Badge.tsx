import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'outline';
  className?: string;
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-semibold tracking-wide',
        variant === 'default' && 'bg-zinc-800 text-zinc-300 border border-zinc-700',
        variant === 'success' && 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
        variant === 'warning' && 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
        variant === 'error' && 'bg-red-500/10 text-red-400 border border-red-500/20',
        variant === 'info' && 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
        variant === 'outline' && 'border border-zinc-700 text-zinc-400',
        className
      )}
    >
      {children}
    </span>
  );
}
