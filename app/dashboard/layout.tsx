"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DashboardNav from "@/app/components/DashboardNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const menu = [
    {
      name: "Overview",
      href: "/dashboard",
      icon: "🏠",
    },
    {
      name: "Marketplace",
      href: "/dashboard/course",
      icon: "🛒",
    },
    {
      name: "My Courses",
      href: "/dashboard/courses",
      icon: "📚",
    },
    {
      name: "Cart",
      href: "/dashboard/cart",
      icon: "🛍️",
    },
    {
      name: "Payments",
      href: "/dashboard/payments",
      icon: "💳",
    },
    {
      name: "Certificates",
      href: "/dashboard/certificates",
      icon: "🏆",
    },
    {
      name: "Live Classes",
      href: "/dashboard/classes",
      icon: "🎥",
    },
    {
      name: "Profile",
      href: "/dashboard/profile",
      icon: "👤",
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: "⚙️",
    },
  ];

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  function isActive(href: string) {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }

    return pathname.startsWith(href);
  }

  const Sidebar = () => (
    <>
      <div className="p-8 border-b border-gray-800">
        <h1 className="text-3xl font-bold text-green-400">CredoSec</h1>

        <p className="text-gray-500 text-sm mt-1">Cybersecurity Academy</p>
      </div>

      <nav className="flex-1 overflow-y-auto p-5 space-y-2">
        {menu.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${
              isActive(item.href)
                ? "bg-green-500 text-black font-semibold shadow-lg"
                : "text-gray-300 hover:bg-gray-800 hover:text-green-400"
            }`}
          >
            <span className="text-lg">{item.icon}</span>

            {item.name}
          </Link>
        ))}
      </nav>

      <div className="border-t border-gray-800 p-5 text-xs text-gray-500">
        CredoSec LMS v1.0
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-[#05070D] text-white">
      {/* MOBILE TOP BAR */}

      <header className="fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between border-b border-gray-800 bg-[#0D1117] px-5 lg:hidden">
        <button onClick={() => setOpen(true)} className="text-2xl">
          ☰
        </button>

        <h2 className="text-xl font-bold text-green-400">CredoSec</h2>

        <button className="text-xl">🔔</button>
      </header>

      {/* MOBILE SIDEBAR */}

      <div
        className={`fixed inset-0 z-40 bg-black/60 transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setOpen(false)}
      />

      <aside
        className={`fixed left-0 top-0 z-50 flex h-full w-72 flex-col bg-[#0D1117] shadow-2xl transition-transform duration-300 lg:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-gray-800 p-6">
          <h2 className="text-2xl font-bold text-green-400">CredoSec</h2>

          <button onClick={() => setOpen(false)} className="text-xl">
            ✕
          </button>
        </div>

        <Sidebar />
      </aside>

      <div className="flex">
        {/* DESKTOP SIDEBAR */}

        <aside className="hidden h-screen w-72 shrink-0 flex-col border-r border-gray-800 bg-[#0D1117] lg:flex">
          <Sidebar />
        </aside>

        {/* PAGE CONTENT */}

        <main className="min-h-screen flex-1 pt-16 lg:pt-0">
          <DashboardNav />

          <div className="p-4 md:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
