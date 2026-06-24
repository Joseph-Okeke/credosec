import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabase";

export async function POST(req: Request) {
  const body = await req.json();

  const { transaction_ref, status, student_id, course_id, amount, method } =
    body;

  // 1. Save payment record
  const { error } = await supabase.from("payments").upsert([
    {
      transaction_ref,
      student_id,
      course_id,
      amount,
      method,
      status,
      provider: method,
    },
  ]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // 2. If payment successful → auto enroll student
  if (status === "success") {
    await supabase.from("enrollments").upsert([
      {
        student_id,
        course_id,
        progress: 0,
        status: "active",
      },
    ]);
  }

  return NextResponse.json({ success: true });
}
