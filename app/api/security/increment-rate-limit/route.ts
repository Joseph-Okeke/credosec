import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/app/lib/redis";

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  const key = `login:${ip}`;

  await redis.incr(key);

  await redis.expire(key, 60 * 15);

  return NextResponse.json({
    success: true,
  });
}
