"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardTopBar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  function handleLogout() {
    // later we will connect Supabase auth logout here
    localStorage.removeItem("supabase.auth.token");
    router.push("/login");
  }

  return (
    <div className="w-full flex items-center justify-end gap-6 py-4 px-6 bg-gray-900 border-b border-gray-800 z-50">
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
          className="text-gray-300 hover:text-green-400 transition absolute right-0 mt-2 z-9999" /*className=" bg-gray-900"*/
        >
          👤 My Profile
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-40 bg-black border border-gray-800 rounded-lg shadow-lg">
            <button
              onClick={() => router.push("/dashboard/profile")}
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
