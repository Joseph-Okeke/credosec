"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/lib/supabase";
import DashboardNav from "../../components/DashboardNav";

export default function MyCoursesPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    loadCourses();
  }, []);

  async function loadCourses() {
    try {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setCourses([]);
        return;
      }

      const { data, error } = await supabase
        .from("enrollments")
        .select(
          `
          course_id,
          progress,
          courses (
            id,
            title,
            description,
            price
          )
        `,
        )
        .eq("student_id", user.id);

      if (error) {
        console.error(error.message);
        setCourses([]);
        return;
      }

      setCourses(data || []);
    } catch (err) {
      console.error(err);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  }

  function continueCourse(courseId: string) {
    router.push(`/dashboard/learn/${courseId}`);
  }

  return (
    <section className="min-h-screen bg-black text-white">
      <DashboardNav />

      <div className="p-6 md:p-10">
        <h1 className="text-3xl font-bold">My Courses</h1>

        {/* LOADING */}
        {loading && (
          <p className="text-gray-400 mt-6">Loading your courses...</p>
        )}

        {/* EMPTY STATE */}
        {!loading && courses.length === 0 && (
          <div className="mt-10 bg-gray-900 p-6 rounded-xl">
            <h2 className="text-xl font-bold">No courses yet</h2>
            <p className="text-gray-400 mt-2">
              Go to courses page and enroll in a course.
            </p>
          </div>
        )}

        {/* COURSES */}
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {courses.map((item: any) => (
            <div
              key={item.course_id}
              className="bg-gray-900 p-6 rounded-xl border border-gray-800"
            >
              <h2 className="text-xl font-bold">{item.courses?.title}</h2>

              <p className="text-gray-400 mt-2">{item.courses?.description}</p>

              <p className="text-green-400 mt-3">Progress: {item.progress}%</p>

              {/* PROGRESS BAR */}
              <div className="w-full bg-gray-700 h-2 rounded mt-3">
                <div
                  className="bg-green-500 h-2 rounded"
                  style={{ width: `${item.progress || 0}%` }}
                />
              </div>

              <button
                onClick={() => continueCourse(item.course_id)}
                className="mt-4 bg-green-500 text-black px-4 py-2 rounded font-semibold"
              >
                Continue Learning
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
