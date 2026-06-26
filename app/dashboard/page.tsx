"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/lib/supabase";
import DashboardNav from "../components/DashboardNav";

export default function DashboardPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [enrolled, setEnrolled] = useState<any[]>([]);
  const router = useRouter();

  /* 
  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      router.replace("/login");
    }
  }

  useEffect(() => {
    loadData();
  }, []);
*/
  useEffect(() => {
    initializeDashboard();
  }, []);

  async function initializeDashboard() {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      router.replace("/login");
      return;
    }

    await loadData(session.user.id);
  }

  async function loadData(userId: string) {
    const { data: allCourses, error: coursesError } = await supabase
      .from("courses")
      .select("*");

    if (coursesError) {
      console.error(coursesError);
    }

    const { data: myCourses, error: enrollmentError } = await supabase
      .from("enrollments")
      .select(
        `
      course_id,
      progress,
      courses (
        id,
        title,
        description
      )
    `,
      )
      .eq("student_id", userId);

    if (enrollmentError) {
      console.error(enrollmentError);
    }

    setCourses(allCourses ?? []);
    setEnrolled(myCourses ?? []);
  }

  /*
  async function loadData() {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      router.push("/login");
      return;
    }

    const user = session.user;
    /*
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    // 1. ALL COURSES (marketplace)
    const { data: allCourses } = await supabase.from("courses").select("*");

    // 2. USER ENROLLED COURSES
    const { data: myCourses } = await supabase
      .from("enrollments")
      .select(
        `
        course_id,
        progress,
        courses (
          id,
          title,
          description
        )
      `,
      )
      .eq("student_id", user.id);

    setCourses(allCourses || []);
    setEnrolled(myCourses || []);
  }
*/

  function openCourse(courseId: string) {
    router.push(`/dashboard/learn/${courseId}`);
  }

  function buyCourse(course: any) {
    try {
      localStorage.setItem("selectedCourse", JSON.stringify(course));
      router.push("/dashboard/payments");
    } catch (error) {
      console.error(error);
      alert("Unable to continue to payment.");
    }
  }
  /*
  function buyCourse(course: any) {
    localStorage.setItem("selectedCourse", JSON.stringify(course));
    router.push("/dashboard/payments");
  }
*/
  return (
    <section className="min-h-screen bg-black text-white pt-16 md:pt-24">
      <div className="p-4 md:p-4">
        {/* ENROLLED COURSES */}
        <h2 className="text-xl font-bold mt-8">Continue Learning</h2>

        <div className="grid md:grid-cols-2 gap-6 mt-4">
          {enrolled.map((item: any) => (
            <div
              key={item.course_id}
              className="bg-gray-900 p-6 rounded-xl border border-gray-800"
            >
              <h3 className="text-xl font-bold">{item.courses?.title}</h3>

              <p className="text-gray-400 mt-2">{item.courses?.description}</p>

              <p className="text-green-400 mt-3">Progress: {item.progress}%</p>

              <button
                onClick={() => openCourse(item.course_id)}
                className="mt-4 bg-green-500 text-black px-4 py-2 rounded font-semibold"
              >
                Continue
              </button>
            </div>
          ))}
        </div>

        {/* ALL COURSES */}
        <h2 className="text-xl font-bold mt-10">Available Courses</h2>

        <div className="grid md:grid-cols-3 gap-6 mt-4">
          {courses.map((course: any) => (
            <div
              key={course.id}
              className="bg-gray-900 p-6 rounded-xl border border-gray-800"
            >
              <h3 className="font-bold text-lg">{course.title}</h3>

              <p className="text-gray-400 mt-2">{course.description}</p>

              <p className="text-green-400 mt-3">₦{course.price}</p>

              <button
                onClick={() => buyCourse(course)}
                className="mt-4 bg-blue-500 text-black px-4 py-2 rounded font-semibold"
              >
                Enroll / Buy
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
