"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/app/lib/supabase";
import DashboardNav from "@/app/components/DashboardNav";

export default function CourseDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCourse();
  }, []);

  async function loadCourse() {
    setLoading(true);

    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    setCourse(data);
    setLoading(false);
  }

  function addToCart() {
    if (!course) return;

    const existing = JSON.parse(localStorage.getItem("cart") || "[]");

    const alreadyAdded = existing.some((item: any) => item.id === course.id);

    if (alreadyAdded) {
      alert("This course is already in your cart.");
      router.push("/dashboard/cart");
      return;
    }

    existing.push(course);

    localStorage.setItem("cart", JSON.stringify(existing));

    alert("Course added to cart.");

    router.push("/dashboard/cart");
  }

  if (loading) {
    return (
      <section className="min-h-screen bg-black text-white">
        <DashboardNav />

        <div className="p-10">
          <h2 className="text-xl">Loading course...</h2>
        </div>
      </section>
    );
  }

  if (!course) {
    return (
      <section className="min-h-screen bg-black text-white">
        <DashboardNav />

        <div className="p-10">
          <h2 className="text-2xl font-bold">Course not found</h2>
        </div>
      </section>
    );
  }

  function enrollNow() {
    if (!course) return;

    localStorage.setItem("checkoutCourses", JSON.stringify([course]));

    router.push("/dashboard/payments");
  }

  return (
    <section className="min-h-screen bg-black text-white">
      <DashboardNav />

      <div className="max-w-6xl mx-auto p-6 md:p-10">
        <img
          src={course.thumbnail || "/images/course-placeholder.jpg"}
          alt={course.title}
          className="rounded-xl w-full h-80 object-cover"
        />

        <div className="mt-8">
          <h1 className="text-4xl font-bold">{course.title}</h1>

          <p className="text-gray-400 mt-5">{course.description}</p>

          <div className="grid md:grid-cols-3 gap-6 mt-10">
            <div className="bg-gray-900 rounded-xl p-5">
              <h3 className="font-bold text-green-400">Instructor</h3>

              <p className="mt-2">{course.instructor || "CredoSec Academy"}</p>
            </div>

            <div className="bg-gray-900 rounded-xl p-5">
              <h3 className="font-bold text-green-400">Level</h3>

              <p className="mt-2">{course.level || "Beginner"}</p>
            </div>

            <div className="bg-gray-900 rounded-xl p-5">
              <h3 className="font-bold text-green-400">Duration</h3>

              <p className="mt-2">{course.duration || "Self-paced"}</p>
            </div>
          </div>

          <div className="mt-10 bg-gray-900 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-green-400">
              ₦{course.price}
            </h2>

            <div className="flex flex-wrap gap-4 mt-6">
              <button
                onClick={addToCart}
                className="bg-yellow-500 text-black px-8 py-3 rounded-lg font-bold"
              >
                Add to Cart
              </button>

              <button
                onClick={enrollNow}
                className="bg-green-500 text-black px-8 py-3 rounded-lg font-bold"
              >
                Enroll Now
              </button>
            </div>
          </div>

          <div className="mt-12 bg-gray-900 rounded-xl p-8">
            <h2 className="text-2xl font-bold">What You'll Learn</h2>

            <ul className="mt-5 space-y-3 list-disc pl-5 text-gray-300">
              <li>Hands-on cybersecurity skills</li>
              <li>Industry best practices</li>
              <li>Real-world attack simulations</li>
              <li>Professional penetration testing</li>
              <li>Defensive security techniques</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
