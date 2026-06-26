"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/lib/supabase";

export default function DashboardNav() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function handleLogout() {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("Logout failed:", error);
        alert("Unable to log out. Please try again.");
        return;
      }

      router.replace("/login");
      router.refresh();
    } catch (err) {
      console.error("Logout error:", err);
      alert("Something went wrong while logging out.");
    }
  }

  return (
    <div className="w-full flex items-center justify-end gap-6 py-4 px-6 bg-gray-900 border-b border-gray-800">
      {/* Notifications */}
      <button className="text-gray-300 hover:text-green-400 transition">
        🔔 Notifications
      </button>

      {/* Settings */}
      <button
        onClick={() => router.push("/dashboard/settings")}
        className="text-gray-300 hover:text-green-400 transition"
      >
        ⚙️ Settings
      </button>

      {/* Profile Dropdown */}
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="text-gray-300 hover:text-green-400 transition"
        >
          👤 My Profile
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-40 bg-black border border-gray-800 rounded-lg shadow-lg">
            <button
              onClick={() => {
                setOpen(false);
                router.push("/dashboard/profile");
              }}
              className="block w-full text-left px-4 py-2 hover:bg-gray-800"
            >
              View Profile
            </button>

            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 hover:bg-gray-800 text-red-400"
            >
              🚪 Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
