/*import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // ✅ initialize inside handler (safe for Vercel build/runtime)
    const resend = new Resend(process.env.RESEND_API_KEY);

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );

    const { error } = await supabase.from("enrollments").insert([body]);

    if (error) {
      return NextResponse.json(
        { message: "Enrollment failed", error: error.message },
        { status: 500 },
      );
    }

    await resend.emails.send({
      from: "CredoSec <training@credosec.com>",
      to: body.email,
      subject: "Enrollment Confirmation",
      html: `
        <h1>Welcome to CredoSec Academy</h1>
        <p>Hi ${body.full_name},</p>
        <p>Your enrollment has been received.</p>
        <p>Course: ${body.course}</p>
      `,
    });

    return NextResponse.json({
      message: "Enrollment successful!",
    });
  } catch (err: any) {
    return NextResponse.json(
      { message: "Server error", error: err.message },
      { status: 500 },
    );
  }
}
*/

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const resendKey = process.env.RESEND_API_KEY;

    if (!supabaseUrl) {
      throw new Error("NEXT_PUBLIC_SUPABASE_URL is missing");
    }

    if (!serviceRoleKey) {
      throw new Error("SUPABASE_SERVICE_ROLE_KEY is missing");
    }

    if (!resendKey) {
      throw new Error("RESEND_API_KEY is missing");
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const resend = new Resend(resendKey);

    const body = await req.json();

    const { error } = await supabase.from("enrollments").insert([body]);

    if (error) {
      return NextResponse.json(
        {
          message: "Enrollment failed",
          error: error.message,
        },
        { status: 500 },
      );
    }

    await resend.emails.send({
      from: "onboarding@resend.dev", // temporarily use this
      to: body.email,
      subject: "Enrollment Confirmation",
      html: `
        <h1>Welcome to CredoSec Academy</h1>
        <p>Hi ${body.full_name},</p>
        <p>Your enrollment has been received.</p>
        <p>Course: ${body.course}</p>
      `,
    });

    return NextResponse.json({
      message: "Enrollment successful!",
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        message: err.message,
      },
      { status: 500 },
    );
  }
}
