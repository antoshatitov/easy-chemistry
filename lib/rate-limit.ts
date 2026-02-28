type RateLimitBucket = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, RateLimitBucket>();
const idempotencyKeys = new Map<string, number>();

function cleanupExpired(now: number) {
  for (const [key, value] of buckets) {
    if (value.resetAt <= now) {
      buckets.delete(key);
    }
  }

  for (const [key, expiresAt] of idempotencyKeys) {
    if (expiresAt <= now) {
      idempotencyKeys.delete(key);
    }
  }
}

export function checkRateLimit(
  key: string,
  maxRequests = 6,
  windowMs = 10 * 60 * 1000,
) {
  const now = Date.now();
  cleanupExpired(now);

  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });

    return {
      allowed: true,
      remaining: maxRequests - 1,
      resetAt: now + windowMs,
    };
  }

  if (bucket.count >= maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: bucket.resetAt,
    };
  }

  bucket.count += 1;
  buckets.set(key, bucket);

  return {
    allowed: true,
    remaining: maxRequests - bucket.count,
    resetAt: bucket.resetAt,
  };
}

export function markIdempotencyKey(
  idempotencyKey: string,
  ttlMs = 5 * 60 * 1000,
) {
  const now = Date.now();
  cleanupExpired(now);

  if (idempotencyKeys.has(idempotencyKey)) {
    return true;
  }

  idempotencyKeys.set(idempotencyKey, now + ttlMs);

  return false;
}

export function releaseIdempotencyKey(idempotencyKey: string) {
  idempotencyKeys.delete(idempotencyKey);
}
