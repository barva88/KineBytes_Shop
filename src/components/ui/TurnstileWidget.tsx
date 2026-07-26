import { Turnstile } from '@marsidev/react-turnstile';

interface TurnstileWidgetProps {
  onSuccess: (token: string) => void;
  onExpire?: () => void;
  onError?: () => void;
}

// Cloudflare Turnstile testing site key (always passes)
const DEFAULT_SITE_KEY = '1x00000000000000000000AA';

export function TurnstileWidget({ onSuccess, onExpire, onError }: TurnstileWidgetProps) {
  const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY || DEFAULT_SITE_KEY;

  return (
    <div className="w-full flex flex-col items-center my-3 min-h-[65px]">
      <Turnstile
        siteKey={siteKey}
        options={{
          theme: 'dark',
          appearance: 'always',
        }}
        onSuccess={onSuccess}
        onExpire={onExpire}
        onError={onError}
      />
    </div>
  );
}
