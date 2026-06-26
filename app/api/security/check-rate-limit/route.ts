import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/app/lib/redis";

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  const key = `login:${ip}`;

  const attempts = Number((await redis.get(key)) || 0);

  if (attempts >= 5) {
    return NextResponse.json(
      {
        blocked: true,
      },
      {
        status: 429,
      },
    );
  }

  return NextResponse.json({
    blocked: false,
  });
}
