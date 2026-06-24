"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/app/lib/supabase";
import DashboardNav from "../../components/DashboardNav";

export default function PaymentsPage() {
  const [method, setMethod] = useState("card");
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("selectedCourse");

    if (saved) {
      setCourse(JSON.parse(saved));
    }
  }, []);

  async function handlePayment() {
    try {
      setLoading(true);

      // 1. GET USER
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        alert("You must be logged in.");
        return;
      }

      // 2. CHECK COURSE
      if (!course) {
        alert("No course selected.");
        return;
      }

      // 3. GENERATE TRANSACTION REF
      const transactionRef = `TXN_${Date.now()}`;

      // 4. SAVE PAYMENT
      const { error: paymentError } = await supabase.from("payments").insert([
        {
          student_id: user.id,
          course_id: course.id,
          amount: course.price,
          method,
          status: "success", // for testing (replace with Paystack later)
          transaction_ref: transactionRef,
        },
      ]);

      if (paymentError) {
        alert("Payment failed: " + paymentError.message);
        return;
      }

      // 5. CHECK IF ALREADY ENROLLED
      const { data: existing, error: checkError } = await supabase
        .from("enrollments")
        .select("id")
        .eq("student_id", user.id)
        .eq("course_id", course.id)
        .maybeSingle();

      if (checkError) {
        alert("Enrollment check failed");
        return;
      }

      // 6. AUTO ENROLL USER (ONLY IF NOT ENROLLED)
      if (!existing) {
        const { error: enrollError } = await supabase
          .from("enrollments")
          .insert([
            {
              student_id: user.id,
              course_id: course.id,
              progress: 0,
              status: "active",
            },
          ]);

        if (enrollError) {
          alert("Enrollment failed: " + enrollError.message);
          return;
        }
      }

      // 7. CLEANUP
      localStorage.removeItem("selectedCourse");

      alert("Payment successful! You are now enrolled.");
    } catch (error: any) {
      console.error(error);
      alert("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }
  /*
  async function handlePayment() {
    try {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        alert("You must be logged in.");
        return;
      }

      if (!course) {
        alert("No course selected.");
        return;
      }

      const transactionRef = `TXN_${Date.now()}`;

      // 1. CREATE PAYMENT RECORD
      const { error: paymentError } = await supabase.from("payments").insert([
        {
          student_id: user.id,
          course_id: course.id,
          amount: course.price,
          method,
          status: "success", // for testing (replace with real gateway later)
          transaction_ref: transactionRef,
        },
      ]);

      if (paymentError) {
        alert(paymentError.message);
        return;
      }

      // 2. CHECK IF USER ALREADY ENROLLED
      const { data: existing } = await supabase
        .from("enrollments")
        .select("id")
        .eq("student_id", user.id)
        .eq("course_id", course.id)
        .maybeSingle();

      // 3. AUTO ENROLL STUDENT
      if (!existing) {
        const { error: enrollError } = await supabase
          .from("enrollments")
          .insert([
            {
              student_id: user.id,
              course_id: course.id,
              progress: 0,
              status: "active",
            },
          ]);

        if (enrollError) {
          alert(enrollError.message);
          return;
        }
      }

      alert("Payment successful! You are now enrolled.");

      localStorage.removeItem("selectedCourse");
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }
*/
  return (
    <section className="min-h-screen bg-black text-white">
      <DashboardNav />

      <div className="p-6 md:p-10">
        <h1 className="text-3xl font-bold">Payments & Billing</h1>

        <p className="text-gray-400 mt-2">Manage course payments securely</p>

        {/* SELECTED COURSE */}
        {course && (
          <div className="bg-gray-900 p-6 rounded-xl mb-6 mt-6">
            <h2 className="text-xl font-bold">{course.title}</h2>
            <p className="text-green-400 mt-2">₦{course.price}</p>
          </div>
        )}

        {/* PAYMENT METHODS */}
        <div className="grid md:grid-cols-3 gap-4 mt-8">
          {["card", "bank", "paypal", "moniepoint", "opay"].map((m) => (
            <button
              key={m}
              onClick={() => setMethod(m)}
              className={`p-4 rounded-xl border ${
                method === m ? "border-green-500" : "border-gray-800"
              } bg-gray-900 capitalize`}
            >
              {m}
            </button>
          ))}
        </div>

        {/* PAYMENT ACTION */}
        <div className="mt-10 bg-gray-900 p-6 rounded-xl border border-gray-800">
          <h2 className="text-xl font-bold mb-4">Selected Method: {method}</h2>

          <button
            onClick={handlePayment}
            disabled={loading}
            className="bg-green-500 text-black px-6 py-3 rounded font-semibold"
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </div>

        {/* REFUND */}
        <div className="mt-10 bg-gray-900 p-6 rounded-xl border border-gray-800">
          <h2 className="text-xl font-bold">Refund Request</h2>

          <p className="text-gray-400 mt-2">
            Request refund within 7 days of purchase
          </p>

          <textarea
            className="w-full mt-4 p-3 bg-black border border-gray-700 rounded"
            placeholder="Reason for refund"
          />

          <button className="mt-4 bg-red-500 px-4 py-2 rounded">
            Submit Refund Request
          </button>
        </div>
      </div>
    </section>
  );
}
