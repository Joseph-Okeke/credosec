"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/app/lib/supabase";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    const user = data.user;

    if (user) {
      router.push("/dashboard");
    }

    setLoading(false);
  }

  return (
    <section>
      <Navbar />
      <main className="min-h-screen flex items-center justify-center bg-black px-4">
        <div className="w-full max-w-md bg-gray-900 p-8 rounded-xl border border-gray-800">
          <h1 className="text-3xl font-bold text-white text-center">
            Welcome Back
          </h1>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-black border border-gray-700 rounded text-white"
              required
            />

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
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-gray-400 text-center mt-4">
            No account?{" "}
            <Link href="/signup" className="text-green-400">
              Sign up
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </section>
  );
}
