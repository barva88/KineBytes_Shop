import { type ClassValue } from './types-internal';

/** Merge class names, filtering falsy values */
export function cn(...inputs: ClassValue[]): string {
  return inputs.filter(Boolean).join(' ');
}

/** Format a number as USD currency */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
}

/** Generate a short order reference */
export function generateOrderRef(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = 'KB-';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/** Truncate text to a max length */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + '…';
}

/** Debounce function */
export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

/** Get stock status label and color */
export function getStockDisplay(status: string): { label: string; color: string } {
  switch (status) {
    case 'in-stock':
      return { label: 'In Stock', color: 'text-emerald-400' };
    case 'low-stock':
      return { label: 'Low Stock', color: 'text-amber-400' };
    case 'out-of-stock':
      return { label: 'Out of Stock', color: 'text-red-400' };
    default:
      return { label: status, color: 'text-zinc-400' };
  }
}
