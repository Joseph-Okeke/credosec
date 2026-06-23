"use client";

import { useState } from "react";

export default function EnrollmentForm() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    course: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    const res = await fetch("/api/enroll", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    alert(data.message);

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-900 p-8 rounded-xl max-w-xl mx-auto space-y-4"
    >
      <h2 className="text-2xl font-bold text-white">Enroll Now</h2>

      <input
        type="text"
        placeholder="Full Name"
        className="w-full p-3 rounded bg-black border border-gray-700 text-white"
        onChange={(e) =>
          setForm({
            ...form,
            full_name: e.target.value,
          })
        }
      />

      <input
        type="email"
        placeholder="Email"
        className="w-full p-3 rounded bg-black border border-gray-700 text-white"
        onChange={(e) =>
          setForm({
            ...form,
            email: e.target.value,
          })
        }
      />

      <input
        type="text"
        placeholder="Phone Number"
        className="w-full p-3 rounded bg-black border border-gray-700 text-white"
        onChange={(e) =>
          setForm({
            ...form,
            phone: e.target.value,
          })
        }
      />

      <select
        className="w-full p-3 rounded bg-black border border-gray-700 text-white"
        onChange={(e) =>
          setForm({
            ...form,
            course: e.target.value,
          })
        }
      >
        <option>Select Course</option>
        <option>Ethical Hacking</option>
        <option>Network Security</option>
        <option>Cloud Security</option>
      </select>

      <button
        disabled={loading}
        className="w-full bg-green-500 hover:bg-green-600 py-3 rounded-lg font-semibold"
      >
        {loading ? "Submitting..." : "Enroll"}
      </button>
    </form>
  );
}
