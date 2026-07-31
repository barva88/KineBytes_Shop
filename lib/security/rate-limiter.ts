import { getSupabaseAdminClient } from '@/lib/supabase/client';

export interface LockoutStatus {
  isLocked: boolean;
  isBanned: boolean;
  remainingSeconds: number;
  attempts: number;
  message?: string;
  requireCaptcha?: boolean;
}

// In-memory fallback cache for serverless execution
interface AttemptRecord {
  attempts: number;
  lastAttemptAt: number;
  banned: boolean;
}

const memoryStore = new Map<string, AttemptRecord>();

/**
  * Lockout Thresholds:
  * 3 failed attempts  => 1 minute lockout
  * 5 failed attempts  => 5 minutes lockout
  * 10 failed attempts => 24 hours lockout
  * >15 failed attempts => Permanent ban (Admin unban required)
  */
export function getLockoutDuration(attempts: number): number {
  if (attempts >= 16) return -1; // Permanent ban
  if (attempts >= 10) return 24 * 60 * 60; // 24 hours
  if (attempts >= 5) return 5 * 60; // 5 minutes
  if (attempts >= 3) return 1 * 60; // 1 minute
  return 0; // No lockout
}

export function checkLockout(identifier: string): LockoutStatus {
  const cleanId = identifier.trim().toLowerCase();
  const record = memoryStore.get(cleanId);

  if (!record) {
    return { isLocked: false, isBanned: false, remainingSeconds: 0, attempts: 0, requireCaptcha: false };
  }

  if (record.banned || record.attempts >= 16) {
    return {
      isLocked: true,
      isBanned: true,
      remainingSeconds: -1,
      attempts: record.attempts,
      message: 'Número bloqueado permanentemente por exceso de intentos fallidos. Contacta al soporte para desbloquear.',
      requireCaptcha: true,
    };
  }

  const durationSeconds = getLockoutDuration(record.attempts);
  if (durationSeconds <= 0) {
    return {
      isLocked: false,
      isBanned: false,
      remainingSeconds: 0,
      attempts: record.attempts,
      requireCaptcha: record.attempts >= 2,
    };
  }

  const elapsedSeconds = Math.floor((Date.now() - record.lastAttemptAt) / 1000);
  const remaining = durationSeconds - elapsedSeconds;

  if (remaining > 0) {
    const formattedTime = formatRemainingTime(remaining);
    return {
      isLocked: true,
      isBanned: false,
      remainingSeconds: remaining,
      attempts: record.attempts,
      message: `Has superado el límite de intentos fallidos (${record.attempts}). Bloqueado durante ${formattedTime}.`,
      requireCaptcha: true,
    };
  }

  return {
    isLocked: false,
    isBanned: false,
    remainingSeconds: 0,
    attempts: record.attempts,
    requireCaptcha: record.attempts >= 2,
  };
}

export function recordFailedAttempt(identifier: string, forceMaxAttempts = false): LockoutStatus {
  const cleanId = identifier.trim().toLowerCase();
  const existing = memoryStore.get(cleanId) || { attempts: 0, lastAttemptAt: Date.now(), banned: false };

  const newAttempts = forceMaxAttempts ? Math.max(existing.attempts + 1, 5) : existing.attempts + 1;
  const isBanned = newAttempts >= 16;

  const updated: AttemptRecord = {
    attempts: newAttempts,
    lastAttemptAt: Date.now(),
    banned: isBanned,
  };

  memoryStore.set(cleanId, updated);
  return checkLockout(cleanId);
}

export function resetAttempts(identifier: string) {
  const cleanId = identifier.trim().toLowerCase();
  memoryStore.delete(cleanId);
}

export function unbanIdentifier(identifier: string) {
  const cleanId = identifier.trim().toLowerCase();
  memoryStore.delete(cleanId);
}

function formatRemainingTime(seconds: number): string {
  if (seconds >= 3600) {
    const hours = Math.ceil(seconds / 3600);
    return `${hours} hora(s)`;
  }
  if (seconds >= 60) {
    const mins = Math.ceil(seconds / 60);
    return `${mins} minuto(s)`;
  }
  return `${seconds} segundo(s)`;
}
