"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/lib/supabase";

export default function DashboardNav() {
  const router = useRouter();

  const [userName, setUserName] = useState("Student");
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadUser();

    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function loadUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    setUserName(user.user_metadata.full_name || "Student");
  }

  async function logout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      alert(error.message);
      return;
    }

    router.replace("/login");
    router.refresh();
  }

  const initials = userName
    .split(" ")
    .map((x) => x[0])
    .join("")
    .toUpperCase();

  return (
    <header className="sticky top-0 z-30 h-20 border-b border-gray-800 bg-[#0D1117]/95 backdrop-blur-md">
      <div className="h-full px-5 lg:px-8 flex items-center justify-between">
        {/* LEFT */}
        <div>
          <p className="text-xl md:text-2xl font-bold text-white">
            Welcome back,
            <span className="text-green-400 ml-2">{userName}</span>
          </p>

          <p className="text-sm text-gray-400 mt-1">
            Continue your cybersecurity journey.
          </p>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="hidden lg:block">
            <input
              type="text"
              placeholder="Search courses..."
              className="w-72 xl:w-96 h-11 rounded-xl bg-[#05070D] border border-gray-700 px-4 text-sm placeholder:text-gray-500 focus:outline-none focus:border-green-500"
            />
          </div>

          {/* Notification */}
          <button className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-[#161B22] hover:bg-gray-800 transition">
            🔔
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500"></span>
          </button>

          {/* Profile */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-3 rounded-xl bg-[#161B22] px-3 py-2 hover:bg-gray-800 transition"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-500 text-black font-bold">
                {initials}
              </div>

              <div className="hidden md:block text-left">
                <p className="text-sm font-semibold text-white">{userName}</p>

                <p className="text-xs text-gray-400">Student</p>
              </div>

              <span className="text-gray-400">▼</span>
            </button>

            {open && (
              <div className="absolute right-0 mt-3 w-56 rounded-xl bg-[#111827] border border-gray-800 shadow-2xl overflow-hidden">
                <button
                  onClick={() => router.push("/dashboard/profile")}
                  className="w-full px-4 py-3 text-left hover:bg-gray-800 transition"
                >
                  👤 My Profile
                </button>

                <button
                  onClick={() => router.push("/dashboard/settings")}
                  className="w-full px-4 py-3 text-left hover:bg-gray-800 transition"
                >
                  ⚙️ Settings
                </button>

                <button
                  onClick={() => router.push("/dashboard/marketplace")}
                  className="w-full px-4 py-3 text-left hover:bg-gray-800 transition"
                >
                  Marketplace
                </button>

                <button
                  onClick={() => router.push("/dashboard/payments")}
                  className="w-full px-4 py-3 text-left hover:bg-gray-800 transition"
                >
                  💳 Payments
                </button>

                <button
                  onClick={() => router.push("/dashboard/certificates")}
                  className="w-full px-4 py-3 text-left hover:bg-gray-800 transition"
                >
                  🏆 Certificates
                </button>

                <div className="border-t border-gray-800" />

                <button
                  onClick={logout}
                  className="w-full px-4 py-3 text-left text-red-400 hover:bg-gray-800 transition"
                >
                  🚪 Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
