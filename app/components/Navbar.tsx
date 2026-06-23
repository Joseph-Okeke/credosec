"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full flex items-center justify-between px-6 md:px-20 py-5 border-b border-[#1b2840] relative">
      {/* LOGO */}
      <div className="text-green-400 font-bold text-xl">CredoSec</div>

      {/* DESKTOP LINKS */}
      <div className="hidden md:flex gap-8 text-gray-300">
        <Link href="/" className="hover:text-green-400 transition">
          Home
        </Link>
        <Link href="/services" className="hover:text-green-400 transition">
          Services
        </Link>
        <Link href="/solutions" className="hover:text-green-400 transition">
          Solutions
        </Link>
        <Link href="/about" className="hover:text-green-400 transition">
          About
        </Link>
        <Link href="/contact" className="hover:text-green-400 transition">
          Contact
        </Link>
        <Link href="/training" className="hover:text-green-400 transition">
          Training
        </Link>
      </div>

      {/* CTA (DESKTOP) */}
      <button className="hidden md:block bg-green-400 text-black px-4 py-2 rounded-md hover:opacity-80 transition">
        Get Audit
      </button>

      {/* MOBILE MENU BUTTON */}
      <button
        className="md:hidden text-green-400 text-2xl"
        onClick={() => setOpen(!open)}
      >
        {open ? "✖" : "☰"}
      </button>

      {/* MOBILE MENU */}
      {open && (
        <div className="absolute top-full left-0 w-full bg-[#05070d] border-b border-[#1b2840] flex flex-col items-center gap-6 py-6 md:hidden z-50">
          <Link href="/" onClick={() => setOpen(false)}>
            Home
          </Link>
          <Link href="/services" onClick={() => setOpen(false)}>
            Services
          </Link>
          <Link href="/solutions" onClick={() => setOpen(false)}>
            Solutions
          </Link>
          <Link href="/about" onClick={() => setOpen(false)}>
            About
          </Link>
          <Link href="/contact" onClick={() => setOpen(false)}>
            Contact
          </Link>

          <button className="bg-green-400 text-black px-5 py-2 rounded-md">
            Get Audit
          </button>
        </div>
      )}
    </nav>
  );
}
