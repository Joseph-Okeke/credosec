"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/lib/supabase";

export default function PaymentsPage() {
  const router = useRouter();

  const [courses, setCourses] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCheckout();
  }, []);

  function loadCheckout() {
    try {
      const checkout = JSON.parse(
        localStorage.getItem("checkoutCourses") || "[]",
      );

      const cart = JSON.parse(localStorage.getItem("cart") || "[]");

      const items = checkout.length ? checkout : cart;

      setCourses(items);

      const amount = items.reduce(
        (sum: number, item: any) => sum + Number(item.price),
        0,
      );

      setTotal(amount);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function proceedToPayment() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Please login again.");
      router.push("/login");
      return;
    }

    if (courses.length === 0) {
      alert("No course selected.");
      return;
    }

    // Temporary payment simulation
    for (const course of courses) {
      await supabase.from("payments").insert({
        student_id: user.id,
        course_id: course.id,
        amount: course.price,
        status: "completed",
      });

      await supabase.from("enrollments").insert({
        student_id: user.id,
        course_id: course.id,
        progress: 0,
      });
    }

    localStorage.removeItem("cart");
    localStorage.removeItem("checkoutCourses");

    alert("Payment Successful!");

    router.push("/dashboard/courses");
  }

  if (loading) {
    return (
      <section className="min-h-screen bg-black text-white">
        <div className="p-10">Loading payment...</div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-black text-white">
      <div className="max-w-5xl mx-auto p-6 md:p-10">
        <h1 className="text-4xl font-bold">Checkout</h1>

        <div className="mt-8 space-y-5">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-gray-900 rounded-xl p-6 border border-gray-800"
            >
              <h2 className="text-2xl font-bold">{course.title}</h2>

              <p className="text-gray-400 mt-2">{course.description}</p>

              <p className="text-green-400 mt-4 text-xl">₦{course.price}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-gray-900 rounded-xl p-8">
          <div className="flex justify-between text-2xl font-bold">
            <span>Total</span>

            <span className="text-green-400">₦{total}</span>
          </div>

          <button
            onClick={proceedToPayment}
            className="w-full mt-8 bg-green-500 text-black py-4 rounded-lg text-lg font-bold hover:bg-green-400 transition"
          >
            Pay Now
          </button>
        </div>
      </div>
    </section>
  );
}
