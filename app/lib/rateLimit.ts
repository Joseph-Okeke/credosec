import { redis } from "@/app/lib/redis";

const MAX_ATTEMPTS = 5;
const WINDOW_SECONDS = 60 * 15; // 15 minutes

export async function checkRateLimit(ip: string) {
  const key = `login:${ip}`;

  const attempts = Number((await redis.get(key)) ?? 0);

  if (attempts >= MAX_ATTEMPTS) {
    return {
      success: false,
      remaining: 0,
    };
  }

  await redis.set(key, attempts + 1, {
    ex: WINDOW_SECONDS,
  });

  return {
    success: true,
    remaining: MAX_ATTEMPTS - attempts - 1,
  };
}

export async function resetRateLimit(ip: string) {
  await redis.del(`login:${ip}`);
}
