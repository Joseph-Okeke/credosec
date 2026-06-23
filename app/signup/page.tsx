"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/app/lib/supabase";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("student"); // ✅ NEW

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          phone: phone,
          role: role, // ✅ stored in auth metadata too
        },
      },
    });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }
    /*
    if (data.user) {
      await supabase.from("profiles").insert([
        {
          id: data.user.id,
          full_name: fullName,
          phone: phone,
          role: role, // ✅ ROLE ADDED HERE
        },
      ]);
    }
*/
    if (data.user) {
      const { error } = await supabase.from("profiles").insert([
        {
          id: data.user.id,
          full_name: fullName,
          phone: phone,
          role: role,
        },
      ]);

      if (error) {
        console.error("Profile insert error:", error.message);
        alert("Account created but profile setup failed. Contact support.");
      }
    }

    alert("Account created! Check your email.");
    router.push("/login");

    setLoading(false);
  }

  return (
    <section>
      <Navbar />

      <main className="min-h-screen flex items-center justify-center bg-black px-4">
        <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-xl p-8">
          <h1 className="text-3xl font-bold text-white text-center">
            Create Account
          </h1>

          <p className="text-gray-400 text-center mt-2">
            Join CredoSec Academy
          </p>

          <form onSubmit={handleSignup} className="mt-6 space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full p-3 bg-black border border-gray-700 rounded text-white"
              required
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-black border border-gray-700 rounded text-white"
              required
            />

            <input
              type="text"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 bg-black border border-gray-700 rounded text-white"
              required
            />

            {/* ✅ ROLE SELECT */}
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-3 bg-black border border-gray-700 rounded text-white"
            >
              <option value="student">Student</option>
              <option value="tutor">Tutor</option>
              <option value="admin">Admin</option>
            </select>

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-black border border-gray-700 rounded text-white"
              required
            />

            <button
              disabled={loading}
              className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-3 rounded"
            >
              {loading ? "Creating..." : "Sign Up"}
            </button>
          </form>

          <p className="text-gray-400 text-center mt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-green-400">
              Login
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </section>
  );
}
