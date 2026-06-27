"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/lib/supabase";

export default function CoursesPage() {
  const router = useRouter();

  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCourses();
  }, []);

  async function loadCourses() {
    setLoading(true);

    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .order("title");

    if (error) {
      console.error(error);
    }

    setCourses(data ?? []);
    setLoading(false);
  }

  return (
    <section className="min-h-screen bg-black text-white">
      <div className="p-6 md:p-10">
        <h1 className="text-3xl font-bold">Available Courses</h1>

        <p className="text-gray-400 mt-2">Browse all cybersecurity courses.</p>

        {loading && <p className="mt-8 text-gray-400">Loading courses...</p>}

        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800"
            >
              <img
                src={course.thumbnail ?? "/images/course-placeholder.jpg"}
                className="h-48 w-full object-cover"
                alt={course.title}
              />

              <div className="p-5">
                <h2 className="text-xl font-bold">{course.title}</h2>

                <p className="text-gray-400 mt-3">{course.description}</p>

                <p className="text-green-400 mt-4 text-lg font-bold">
                  ₦{course.price}
                </p>

                <button
                  onClick={() =>
                    router.push(`/dashboard/marketplace/${course.id}`)
                  }
                  className="mt-5 w-full bg-green-500 text-black py-3 rounded-lg font-semibold"
                >
                  View Course
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
