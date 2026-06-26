import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing CAPTCHA token",
        },
        {
          status: 400,
        },
      );
    }

    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "";

    const formData = new FormData();

    formData.append("secret", process.env.TURNSTILE_SECRET_KEY!);

    formData.append("response", token);

    if (ip) {
      formData.append("remoteip", ip);
    }

    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        body: formData,
      },
    );

    const result = await response.json();

    return NextResponse.json({
      success: result.success,
      errors: result["error-codes"] ?? [],
    });
  } catch (error) {
    console.error("Turnstile verification failed:", error);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      },
    );
  }
}
