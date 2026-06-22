import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#070d18] border-t border-[#1b2840] mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company */}
          <div>
            <h3 className="text-xl font-bold text-green-400 mb-4">CredoSec</h3>

            <p className="text-gray-400 leading-relaxed">
              Professional cybersecurity solutions helping businesses identify,
              prevent, and respond to modern cyber threats.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-green-400 mb-4">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3">
              <Link
                href="/"
                className="text-gray-400 hover:text-green-400 transition"
              >
                Home
              </Link>

              <Link
                href="/about"
                className="text-gray-400 hover:text-green-400 transition"
              >
                About
              </Link>

              <Link
                href="/services"
                className="text-gray-400 hover:text-green-400 transition"
              >
                Services
              </Link>

              <Link
                href="/solutions"
                className="text-gray-400 hover:text-green-400 transition"
              >
                Solutions
              </Link>

              <Link
                href="/contact"
                className="text-gray-400 hover:text-green-400 transition"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold text-green-400 mb-4">Contact</h3>

            <div className="space-y-2 text-gray-400">
              <p>📍 Shop 201, Pinnacle Plaza</p>
              <p>Tipper-Garage Junction</p>
              <p>Dutse, Abuja</p>

              <div className="pt-3">
                <p>📞 08106755100</p>
                <p>💬 WhatsApp: 08106755100</p>
              </div>
            </div>
          </div>

          {/* Socials */}
          <div>
            <h3 className="text-xl font-bold text-green-400 mb-4">Connect</h3>

            <div className="flex flex-col gap-3">
              <a
                href="https://www.linkedin.com/in/joseph-okeke3/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-green-400 transition"
              >
                LinkedIn
              </a>

              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-green-400 transition"
              >
                X (Twitter)
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-green-400 transition"
              >
                Instagram
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-green-400 transition"
              >
                Facebook
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#1b2840] py-6 text-center">
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} CredoSec. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
