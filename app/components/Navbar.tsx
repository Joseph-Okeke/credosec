"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/solutions", label: "Solutions" },
    { href: "/training", label: "Training" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#05070D]/95 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
          {/* LOGO */}

          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center font-bold text-black">
              C
            </div>

            <div>
              <h1 className="text-white font-bold text-xl">CredoSec</h1>

              <p className="text-xs text-green-400">Cybersecurity Academy</p>
            </div>
          </Link>

          {/* Desktop */}

          <div className="hidden lg:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition ${
                  pathname === link.href
                    ? "text-green-400"
                    : "text-gray-300 hover:text-green-400"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Buttons */}

          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/login"
              className="px-5 py-2 rounded-lg border border-gray-700 hover:border-green-500 hover:text-green-400 transition"
            >
              Login
            </Link>

            <Link
              href="/signup"
              className="px-5 py-2 rounded-lg bg-green-500 text-black font-semibold hover:bg-green-400 transition"
            >
              Register
            </Link>
          </div>

          {/* Mobile */}

          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden text-3xl text-green-400"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Menu */}

        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            open ? "max-h-[700px]" : "max-h-0"
          }`}
        >
          <div className="border-t border-gray-800 bg-[#05070D]">
            <div className="flex flex-col p-6 gap-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`px-4 py-3 rounded-lg transition ${
                    pathname === link.href
                      ? "bg-green-500 text-black font-semibold"
                      : "text-gray-300 hover:bg-gray-900 hover:text-green-400"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <div className="border-t border-gray-800 my-3" />

              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-900 hover:text-green-400 transition"
              >
                Login
              </Link>

              <Link
                href="/signup"
                onClick={() => setOpen(false)}
                className="mt-2 text-center bg-green-500 text-black py-3 rounded-lg font-bold hover:bg-green-400 transition"
              >
                Register
              </Link>

              <button className="mt-4 w-full bg-white text-black py-3 rounded-lg font-bold hover:bg-gray-200 transition">
                Get Audit
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer for fixed navbar */}

      <div className="h-20" />
    </>
  );
}
