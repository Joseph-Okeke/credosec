"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/app/lib/supabase";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await supabase.auth.signOut();
    router.replace("/login");
  }

  const links = [
    {
      href: "/dashboard",
      label: "Overview",
    },
    {
      href: "/dashboard/courses",
      label: "Courses",
    },
    {
      href: "/dashboard/payments",
      label: "Payments",
    },
    {
      href: "/dashboard/progress",
      label: "Progress",
    },
    {
      href: "/dashboard/classes",
      label: "Live Classes",
    },
    {
      href: "/dashboard/certificates",
      label: "Certificates",
    },
    {
      href: "/dashboard/chat",
      label: "Tutor Chat",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex">
      <aside className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col justify-between">
        <div>
          <div className="p-6 border-b border-gray-800">
            <h2 className="text-2xl font-bold text-green-500">
              CredoSec Academy
            </h2>
          </div>

          <nav className="p-6 space-y-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block rounded-lg px-4 py-3 transition ${
                  pathname === link.href
                    ? "bg-green-500 text-black font-semibold"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="p-6 border-t border-gray-800">
          <button
            onClick={logout}
            className="w-full rounded-lg bg-red-600 py-3 font-semibold hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  );
}
