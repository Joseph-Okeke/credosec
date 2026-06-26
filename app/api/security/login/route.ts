import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { getClientIp, getUserAgent } from "@/app/lib/security";

const AuditAction = {
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAILED: "LOGIN_FAILED",
} as const;

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export async function POST(request: NextRequest) {
  try {
    const { userId, email } = await request.json();

    if (typeof userId !== "string") {
      return NextResponse.json(
        { success: false, error: "Invalid request" },
        { status: 400 },
      );
    }

    // Never break login if data is missing
    if (!userId) {
      console.warn("Security logging skipped: missing userId");

      return NextResponse.json({
        success: true,
      });
    }
    /*
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "unknown";

    const userAgent = request.headers.get("user-agent") || "unknown";
*/

    const ip = getClientIp(request.headers);
    const userAgent = getUserAgent(request.headers);
    // Audit logging should never stop login
    try {
      await supabase.from("audit_logs").insert({
        user_id: userId,
        action: AuditAction.LOGIN_SUCCESS,
        ip_address: ip,
        user_agent: userAgent,
      });
    } catch (auditError) {
      console.error("Audit log failed:", auditError);
    }

    let knownDevice = null;

    try {
      const { data } = await supabase
        .from("user_devices")
        .select("*")
        .eq("ip_address", ip)
        .eq("user_agent", userAgent)
        .maybeSingle();

      knownDevice = data;
    } catch (deviceError) {
      console.error("Device lookup failed:", deviceError);
    }

    if (!knownDevice) {
      // Send email alert only if email exists
      if (email && resend) {
        try {
          const { error } = await resend.emails.send({
            from: "CredoSec Security <security@credosec.com>",
            to: email,
            subject: "New Login Detected",
            html: `
                <h2>Security Alert</h2>

                <p>A new device has logged into your CredoSec account.</p>

                <p><strong>IP Address:</strong> ${ip}</p>

                <p><strong>Device:</strong> ${userAgent}</p>

                <p><strong>Time:</strong> ${new Date().toUTCString()}</p>

                <p>If this was you, you can safely ignore this email.</p>

                <p>If this wasn't you, please reset your password immediately.</p>
              `,
          });

          if (error) {
            console.error("Resend Error:", error);
          }
        } catch (err) {
          console.error("Email alert failed:", err);
        }
      }

      try {
        await supabase.from("user_devices").insert({
          user_id: userId,
          ip_address: ip,
          user_agent: userAgent,
          last_seen: new Date().toISOString(),
        });
      } catch (insertError) {
        console.error("Device insert failed:", insertError);
      }
    } else {
      try {
        await supabase
          .from("user_devices")
          .update({
            ip_address: ip,
            last_seen: new Date().toISOString(),
          })
          .eq("id", knownDevice.id);
      } catch (updateError) {
        console.error("Device update failed:", updateError);
      }
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("Security logging error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      {
        status: 500,
      },
    );
  }
}
