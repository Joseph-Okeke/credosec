"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/app/lib/supabase";
import DashboardNav from "@/app/components/DashboardNav";

export default function LearnPage() {
  const { id } = useParams();

  const [course, setCourse] = useState<any>(null);
  const [lessons, setLessons] = useState<any[]>([]);
  const [currentLesson, setCurrentLesson] = useState<any>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    loadCourse();
    loadLessons();
    loadProgress();
  }, [id]);

  // 1. LOAD COURSE
  async function loadCourse() {
    const { data } = await supabase
      .from("courses")
      .select("*")
      .eq("id", id)
      .single();

    setCourse(data);
  }

  // 2. LOAD LESSONS
  async function loadLessons() {
    const { data } = await supabase
      .from("lessons")
      .select("*")
      .eq("course_id", id)
      .order("position", { ascending: true });

    setLessons(data || []);
    setCurrentLesson(data?.[0] || null);
  }

  // 3. LOAD PROGRESS
  async function loadProgress() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data } = await supabase
      .from("enrollments")
      .select("completed_lessons")
      .eq("student_id", user.id)
      .eq("course_id", id)
      .single();

    if (data) {
      const completed = data.completed_lessons || [];
      const percent = lessons.length
        ? Math.round((completed.length / lessons.length) * 100)
        : 0;

      setProgress(percent);
    }
  }

  // 4. COMPLETE LESSON
  async function completeLesson(lessonId: string) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    // get current enrollment
    const { data: enrollment } = await supabase
      .from("enrollments")
      .select("completed_lessons")
      .eq("student_id", user.id)
      .eq("course_id", id)
      .single();

    const completed = enrollment?.completed_lessons || [];

    if (!completed.includes(lessonId)) {
      const updated = [...completed, lessonId];

      await supabase
        .from("enrollments")
        .update({
          completed_lessons: updated,
        })
        .eq("student_id", user.id)
        .eq("course_id", id);

      setProgress(Math.round((updated.length / lessons.length) * 100));
    }
  }

  return (
    <section className="min-h-screen bg-black text-white">
      <DashboardNav />

      <div className="p-6 md:p-10 grid md:grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="md:col-span-2 bg-gray-900 p-6 rounded-xl">
          <h1 className="text-3xl font-bold">{course?.title}</h1>

          {/* VIDEO */}
          <div className="mt-6 bg-black h-64 flex items-center justify-center border border-gray-800 rounded">
            {currentLesson?.video_url ? (
              <iframe
                className="w-full h-full"
                src={currentLesson.video_url}
                allowFullScreen
              />
            ) : (
              "No video available"
            )}
          </div>

          <button
            onClick={() => completeLesson(currentLesson.id)}
            className="mt-4 bg-green-500 text-black px-4 py-2 rounded"
          >
            Mark Lesson Complete
          </button>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="bg-gray-900 p-6 rounded-xl">
          <h2 className="text-xl font-bold">Lessons</h2>

          <div className="mt-4 space-y-2">
            {lessons.map((lesson) => (
              <div
                key={lesson.id}
                onClick={() => setCurrentLesson(lesson)}
                className={`p-3 rounded cursor-pointer border ${
                  currentLesson?.id === lesson.id
                    ? "border-green-500"
                    : "border-gray-700"
                }`}
              >
                {lesson.title}
              </div>
            ))}
          </div>

          {/* PROGRESS */}
          <div className="mt-6">
            <p className="text-green-400">{progress}% Completed</p>

            <div className="w-full bg-gray-700 h-2 rounded mt-2">
              <div
                className="bg-green-500 h-2 rounded"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
