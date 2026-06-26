"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/app/lib/supabase";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Turnstile from "react-turnstile";

export default function SignupPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [captchaToken, setCaptchaToken] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("student");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [acceptTerms, setAcceptTerms] = useState(false);

  function validatePassword(password: string) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{12,}$/.test(
      password,
    );
  }

  function getPasswordStrength(password: string) {
    let score = 0;

    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[@$!%*?&]/.test(password)) score++;

    if (score <= 2) return "Weak";
    if (score <= 4) return "Medium";

    return "Strong";
  }

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();

    if (loading) return;

    if (!captchaToken) {
      alert("Please complete CAPTCHA.");
      return;
    }

    const rateLimit = await fetch("/api/security/check-rate-limit", {
      method: "POST",
    });

    if (rateLimit.status === 429) {
      alert("Too many login attempts. Try again in 15 minutes.");
      return;
    }

    const cleanName = fullName.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPhone = phone.trim();

    if (cleanName.length < 3) {
      alert("Please enter your full name.");
      return;
    }

    if (!/^[A-Za-z\s'-]+$/.test(cleanName)) {
      alert("Name contains invalid characters.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!/^\+?[0-9]{10,15}$/.test(cleanPhone)) {
      alert("Please enter a valid phone number.");
      return;
    }

    if (!validatePassword(password)) {
      alert(
        "Password must contain:\n\n" +
          "• At least 12 characters\n" +
          "• One uppercase letter\n" +
          "• One lowercase letter\n" +
          "• One number\n" +
          "• One special character",
      );
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (!acceptTerms) {
      alert("Please accept the Terms & Conditions.");
      return;
    }

    try {
      setLoading(true);

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

      const { data, error } = await supabase.auth.signUp({
        email: cleanEmail,
        password,
        options: {
          emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/login`,
          data: {
            full_name: cleanName,
            phone: cleanPhone,
            role,
          },
        },
      });

      console.log("DATA:", data);
      console.log("ERROR:", error);
      /*
      if (error) {
        alert(error.message);
        return;
      }
*/

      if (error) {
        await fetch("/api/security/increment-rate-limit", {
          method: "POST",
        });

        await fetch("/api/security/login-failed", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: cleanEmail,
          }),
        });

        alert("Invalid email or password.");

        setLoading(false);

        return;
      }

      alert(
        "Account created successfully. Check your email to verify your account.",
      );

      router.push("/login");
    } catch (err) {
      console.error(err);

      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const passwordStrength = getPasswordStrength(password);

  return (
    <section>
      <Navbar />

      <main className="min-h-screen flex items-center justify-center bg-black px-4 py-10">
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
              placeholder="Email Address"
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

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-3 bg-black border border-gray-700 rounded text-white"
            >
              <option value="student">Student</option>
            </select>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 bg-black border border-gray-700 rounded text-white"
                required
              />

              <Turnstile
                sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                onVerify={(token) => setCaptchaToken(token)}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-sm text-gray-400"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <div className="text-xs text-gray-400 bg-black p-3 rounded border border-gray-800">
              Password Requirements:
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Minimum 12 characters</li>
                <li>At least 1 uppercase letter</li>
                <li>At least 1 lowercase letter</li>
                <li>At least 1 number</li>
                <li>At least 1 special character</li>
              </ul>
              <div className="mt-2">
                Strength:
                <span
                  className={`ml-2 font-bold ${
                    passwordStrength === "Strong"
                      ? "text-green-400"
                      : passwordStrength === "Medium"
                        ? "text-yellow-400"
                        : "text-red-400"
                  }`}
                >
                  {passwordStrength}
                </span>
              </div>
            </div>

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 bg-black border border-gray-700 rounded text-white"
                required
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 text-sm text-gray-400"
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>

            <label className="flex items-center gap-2 text-sm text-gray-300">
              <input
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
              />
              I agree to the Terms & Conditions
            </label>

            <button
              disabled={loading}
              className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-700 disabled:text-gray-400 text-black font-bold py-3 rounded transition"
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          <p className="text-gray-400 text-center mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-green-400 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </section>
  );
}
