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
    <header className="h-16 border-b border-gray-800 bg-[#0D1117] px-4 lg:px-8 flex items-center justify-between">
      <div className="flex items-center justify-between px-6 py-4">
        {/* LEFT */}

        <div>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight">
            Welcome back,
            <span className="text-green-400 text-3xl md:text-4xl">
              {" "}
              {userName}
            </span>
          </h1>

          <p className="text-sm text-gray-400 mt-1">
            Continue your cybersecurity journey.
          </p>
        </div>

        {/* RIGHT */}

        <div className="flex items-center gap-4">
          {/* SEARCH */}

          <div className="hidden md:block">
            <input
              placeholder="Search courses..."
              className="w-72 h-11 bg-[#05070D] border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-green-500"
            />
          </div>

          {/* NOTIFICATIONS */}

          <button className="relative w-11 h-11 rounded-xl bg-gray-900 hover:bg-gray-800 transition">
            🔔
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500"></span>
          </button>

          {/* PROFILE */}

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-3 bg-gray-900 px-3 py-2 rounded-xl hover:bg-gray-800 transition"
            >
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-black font-bold">
                {initials}
              </div>
              <div className="hidden md:block text-left">
                <p className="font-semibold">{userName}</p>

                <p className="text-xs text-gray-400">Student</p>
              </div>
              ▼
            </button>

            {open && (
              <div className="absolute right-0 mt-3 w-56 rounded-xl bg-[#0D1117] border border-gray-800 shadow-xl overflow-hidden">
                <button
                  onClick={() => router.push("/dashboard/profile")}
                  className="w-full text-left px-4 py-2 hover:bg-gray-800"
                >
                  👤 My Profile
                </button>

                <button
                  onClick={() => router.push("/dashboard/settings")}
                  className="w-full text-left px-4 py-2 hover:bg-gray-800"
                >
                  ⚙️ Settings
                </button>

                <button
                  onClick={() => router.push("/dashboard/payments")}
                  className="w-full text-left px-4 py-2 hover:bg-gray-800"
                >
                  💳 Payments
                </button>

                <button
                  onClick={() => router.push("/dashboard/certificates")}
                  className="w-full text-left px-4 py-2 hover:bg-gray-800"
                >
                  🏆 Certificates
                </button>

                <hr className="border-gray-800" />

                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 text-red-400 hover:bg-gray-800"
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
