import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/app/lib/redis";

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    await redis.del(`login:${ip}`);

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("Failed to reset login rate limit:", error);

    // Never block the user because rate-limit reset failed
    return NextResponse.json({
      success: true,
    });
  }
}
