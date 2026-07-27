'use client';
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile';
import { useRef, useEffect } from 'react';

interface TurnstileWidgetProps {
  onVerify: (token: string) => void;
  onError?: () => void;
  onExpire?: () => void;
}

export function TurnstileWidget({ onVerify, onError, onExpire }: TurnstileWidgetProps) {
  const ref = useRef<TurnstileInstance | null>(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  useEffect(() => {
    // Reset on mount
    if (ref.current) ref.current.reset();
  }, []);

  if (!siteKey) {
    console.warn('Turnstile Site Key missing');
    return null;
  }

  return (
    <div className="flex justify-center w-full my-4">
      <Turnstile
        ref={ref}
        siteKey={siteKey}
        onSuccess={onVerify}
        onError={onError}
        onExpire={onExpire}
        options={{ theme: 'dark', size: 'flexible' }}
      />
    </div>
  );
}
