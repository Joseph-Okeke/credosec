import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function POST(req: Request) {
  const body = await req.json();

  const { error } = await supabase.from("enrollments").insert([body]);

  if (error) {
    return NextResponse.json({
      message: "Enrollment failed",
    });
  }

  await resend.emails.send({
    from: "training@credosec.com",
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
}
