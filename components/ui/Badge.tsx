import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'outline';
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const base = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors";
  const variants = {
    default: "bg-zinc-800 text-zinc-100",
    success: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    warning: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
    error: "bg-red-500/10 text-red-400 border border-red-500/20",
    outline: "text-zinc-300 border border-zinc-700",
  };

  return <div className={cn(base, variants[variant], className)} {...props} />;
}
