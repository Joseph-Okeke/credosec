import { redis } from "@/app/lib/redis";

export async function GET() {
  await redis.set("test", "CredoSec");

  const value = await redis.get("test");

  return Response.json({
    success: true,
    value,
  });
}
