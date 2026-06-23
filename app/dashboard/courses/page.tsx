"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";

export default function CoursesPage() {
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    getCourses();
  }, []);

  async function getCourses() {
    const { data } = await supabase.from("courses").select("*");

    setCourses(data || []);
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Available Courses</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-gray-900 p-6 rounded-xl">
            <h2 className="text-xl font-bold">{course.title}</h2>

            <p className="text-gray-400 mt-2">{course.description}</p>

            <p className="text-green-400 mt-3">₦{course.price}</p>

            <button className="mt-4 bg-green-500 text-black px-4 py-2 rounded">
              Enroll
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
