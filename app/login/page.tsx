"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Turnstile from "react-turnstile";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { supabase } from "@/app/lib/supabase";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [captchaToken, setCaptchaToken] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [failedAttempts, setFailedAttempts] = useState(0);

  const [lockedUntil, setLockedUntil] = useState<number | null>(null);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (loading) return;

    if (lockedUntil && Date.now() < lockedUntil) {
      alert("Too many failed attempts. Please wait 15 minutes.");
      return;
    }

    if (!captchaToken) {
      alert("Please complete the CAPTCHA.");
      return;
    }

    const cleanEmail = email.trim().toLowerCase();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      alert("Please enter a valid email.");
      return;
    }

    try {
      setLoading(true);

      /*
       * STEP 1
       * Authenticate with Supabase.
       * This creates the browser session.
       */

      const verify = await fetch("/api/security/verify-turnstile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: captchaToken,
        }),
      });

      const verifyResult = await verify.json();

      if (!verifyResult.success) {
        alert("CAPTCHA verification failed.");
        return;
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password,
      });

      console.log("USER:", data.user);
      console.log("SESSION:", data.session);
      console.log("ERROR:", error);

      if (error || !data.user) {
        const attempts = failedAttempts + 1;

        setFailedAttempts(attempts);

        if (attempts >= 5) {
          setLockedUntil(Date.now() + 15 * 60 * 1000);
        }

        alert(error?.message ?? "Invalid email or password.");

        return;
      }

      /*
       * STEP 2
       * Notify backend.
       * Failure here should NOT stop login.
       */

      try {
        await fetch("/api/security/login", {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            userId: data.user.id,

            email: data.user.email,

            captchaToken,
          }),
        });
      } catch (err) {
        console.error("Security logging failed:", err);
      }

      setFailedAttempts(0);

      setLockedUntil(null);
      console.log("Redirecting to dashboard...");

      router.replace("/dashboard");

      router.refresh();
    } catch (err) {
      console.error(err);

      alert("Unable to login. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section>
      <Navbar />

      <main className="min-h-screen flex items-center justify-center bg-black px-4">
        <div className="w-full max-w-md bg-gray-900 p-8 rounded-xl border border-gray-800">
          <h1 className="text-3xl font-bold text-white text-center">
            Welcome Back
          </h1>

          <p className="text-gray-400 text-center mt-2">
            Login to your CredoSec account
          </p>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <input
              type="email"
              required
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded bg-black border border-gray-700 text-white"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded bg-black border border-gray-700 text-white"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-sm text-gray-400"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {failedAttempts > 0 && (
              <p className="text-yellow-400 text-sm">
                Failed Attempts: {failedAttempts}/5
              </p>
            )}

            <Turnstile
              sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
              onVerify={(token) => setCaptchaToken(token)}
              onExpire={() => setCaptchaToken("")}
              onError={() => {
                setCaptchaToken("");

                alert("CAPTCHA verification failed.");
              }}
            />

            <button
              disabled={loading}
              className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-700 text-black font-bold py-3 rounded"
            >
              {loading ? "Signing In..." : "Login"}
            </button>
          </form>

          <div className="text-center mt-5">
            <Link
              href="/forgot-password"
              className="text-green-400 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <p className="text-center text-gray-400 mt-4">
            Don't have an account?{" "}
            <Link href="/signup" className="text-green-400 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </section>
  );
}
