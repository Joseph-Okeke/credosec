"use client";

import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#05070D] border-t border-gray-800 mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        {/* TOP */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* BRAND */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-green-500 flex items-center justify-center text-black font-bold text-xl">
                C
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white">CredoSec</h2>

                <p className="text-green-400 text-sm">Cybersecurity Academy</p>
              </div>
            </div>

            <p className="text-gray-400 mt-6 leading-7">
              Learn practical cybersecurity from industry professionals. Build
              real-world offensive and defensive security skills through
              hands-on labs, expert-led courses, and professional certification
              programs.
            </p>

            <div className="flex gap-4 mt-6">
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center hover:bg-green-500 hover:text-black transition"
              >
                X
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center hover:bg-green-500 hover:text-black transition"
              >
                in
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center hover:bg-green-500 hover:text-black transition"
              >
                ▶
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center hover:bg-green-500 hover:text-black transition"
              >
                f
              </a>
            </div>
          </div>

          {/* COMPANY */}

          <div>
            <h3 className="text-white font-bold mb-5">Company</h3>

            <div className="flex flex-col gap-3 text-gray-400">
              <Link href="/about" className="hover:text-green-400">
                About
              </Link>

              <Link href="/services" className="hover:text-green-400">
                Services
              </Link>

              <Link href="/solutions" className="hover:text-green-400">
                Solutions
              </Link>

              <Link href="/contact" className="hover:text-green-400">
                Contact
              </Link>
            </div>
          </div>

          {/* ACADEMY */}

          <div>
            <h3 className="text-white font-bold mb-5">Academy</h3>

            <div className="flex flex-col gap-3 text-gray-400">
              <Link href="/training" className="hover:text-green-400">
                Training
              </Link>

              <Link href="/dashboard/courses" className="hover:text-green-400">
                Courses
              </Link>

              <Link href="/signup" className="hover:text-green-400">
                Register
              </Link>

              <Link href="/login" className="hover:text-green-400">
                Login
              </Link>
            </div>
          </div>

          {/* SUPPORT */}

          <div>
            <h3 className="text-white font-bold mb-5">Support</h3>

            <div className="flex flex-col gap-3 text-gray-400">
              <Link href="/privacy" className="hover:text-green-400">
                Privacy Policy
              </Link>

              <Link href="/terms" className="hover:text-green-400">
                Terms of Service
              </Link>

              <Link href="/faq" className="hover:text-green-400">
                FAQ
              </Link>

              <a
                href="mailto:support@credosec.com"
                className="hover:text-green-400"
              >
                support@credosec.com
              </a>
            </div>
          </div>
        </div>

        {/* NEWSLETTER */}

        <div className="mt-16 border-t border-gray-800 pt-10">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div>
              <h3 className="text-white text-xl font-bold">Stay Updated</h3>

              <p className="text-gray-400 mt-2">
                Get cybersecurity news, new courses and exclusive offers.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white w-full sm:w-80 focus:outline-none focus:border-green-500"
              />

              <button className="bg-green-500 text-black px-6 py-3 rounded-lg font-bold hover:bg-green-400 transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* COPYRIGHT */}

        <div className="mt-12 border-t border-gray-800 pt-8 flex flex-col md:flex-row gap-4 justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {year} CredoSec. All rights reserved.
          </p>

          <div className="flex gap-6 text-sm text-gray-500">
            <Link href="/privacy" className="hover:text-green-400">
              Privacy
            </Link>

            <Link href="/terms" className="hover:text-green-400">
              Terms
            </Link>

            <Link href="/cookies" className="hover:text-green-400">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
