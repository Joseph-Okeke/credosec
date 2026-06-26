import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

const AuditAction = {
  SIGNUP_SUCCESS: "SIGNUP_SUCCESS",
  SIGNUP_FAILED: "SIGNUP_FAILED",
} as const;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { userId, email } = body;

    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "unknown";

    const userAgent = request.headers.get("user-agent") || "unknown";

    if (!userId) {
      return NextResponse.json({
        success: true,
      });
    }

    try {
      await supabase.from("audit_logs").insert({
        user_id: userId,
        action: AuditAction.SIGNUP_SUCCESS,
        ip_address: ip,
        user_agent: userAgent,
      });
    } catch (err) {
      console.error("Audit log failed:", err);
    }

    try {
      await supabase.from("user_devices").insert({
        user_id: userId,
        ip_address: ip,
        user_agent: userAgent,
        last_seen: new Date().toISOString(),
      });
    } catch (err) {
      console.error("Device insert failed:", err);
    }

    return NextResponse.json({
      success: true,
    });
  } catch (err) {
    console.error("Signup security error:", err);

    return NextResponse.json({
      success: true,
    });
  }
}
