"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();
  const [courses, setCourses] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    void initializeAdmin();
  }, []);

  /*
  async function loadData() {
    const { data: coursesData } = await supabase.from("courses").select("*");

    const { data: studentsData } = await supabase.from("profiles").select("*");

    const { data: paymentsData } = await supabase.from("payments").select("*");

    setCourses(coursesData || []);
    setStudents(studentsData || []);
    setPayments(paymentsData || []);
  }
*/

  async function initializeAdmin() {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      router.replace("/login");
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("user_id", session.user.id)
      .single();

    if (!profile || profile.role !== "admin") {
      router.replace("/dashboard");
      return;
    }

    await loadData();
  }

  async function loadData() {
    const { data: coursesData, error: coursesError } = await supabase
      .from("courses")
      .select("*");

    const { data: studentsData, error: studentsError } = await supabase
      .from("profiles")
      .select("*");

    const { data: paymentsData, error: paymentsError } = await supabase
      .from("payments")
      .select("*");

    if (coursesError || studentsError || paymentsError) {
      console.error(coursesError || studentsError || paymentsError);
      return;
    }

    setCourses(coursesData ?? []);
    setStudents(studentsData ?? []);
    setPayments(paymentsData ?? []);
  }

  async function addCourse() {
    if (!title || !description || !price) return;

    const { error } = await supabase.from("courses").insert([
      {
        title,
        description,
        price: Number(price),
      },
    ]);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Course added!");
    setTitle("");
    setDescription("");
    setPrice("");

    await loadData();
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-6 mt-6">
        <div className="bg-gray-900 p-6 rounded-xl">
          <h2>Total Courses</h2>
          <p className="text-2xl text-green-400">{courses.length}</p>
        </div>

        <div className="bg-gray-900 p-6 rounded-xl">
          <h2>Total Students</h2>
          <p className="text-2xl text-green-400">{students.length}</p>
        </div>

        <div className="bg-gray-900 p-6 rounded-xl">
          <h2>Total Payments</h2>
          <p className="text-2xl text-green-400">{payments.length}</p>
        </div>
      </div>

      {/* ADD COURSE */}
      <div className="mt-10 bg-gray-900 p-6 rounded-xl">
        <h2 className="text-xl font-bold mb-4">Add New Course</h2>

        <input
          className="w-full p-3 mb-3 bg-black border border-gray-700 rounded"
          placeholder="Course Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full p-3 mb-3 bg-black border border-gray-700 rounded"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          className="w-full p-3 mb-3 bg-black border border-gray-700 rounded"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <button
          onClick={addCourse}
          className="bg-green-500 text-black px-4 py-2 rounded"
        >
          Add Course
        </button>
      </div>

      {/* COURSES LIST */}
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">All Courses</h2>

        <div className="grid md:grid-cols-2 gap-4">
          {courses.map((c) => (
            <div key={c.id} className="bg-gray-900 p-4 rounded-xl">
              <h3 className="font-bold">{c.title}</h3>
              <p className="text-gray-400">{c.description}</p>
              <p className="text-green-400">₦{c.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* PAYMENTS */}
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">Payments</h2>

        <div className="bg-gray-900 p-6 rounded-xl">
          {payments.map((p) => (
            <div key={p.id} className="border-b border-gray-800 py-2">
              <p>Student: {p.student_id}</p>
              <p>Amount: ₦{p.amount}</p>
              <p>Status: {p.status}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
