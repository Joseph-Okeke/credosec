import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function ContactPage() {
  return (
    <main className="bg-[#05070d] text-white min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="px-6 md:px-20 py-20 text-center">
        <span className="inline-block text-green-400 text-sm font-semibold tracking-widest mb-4">
          CONTACT US
        </span>

        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Let's Secure Your
          <br />
          <span className="text-green-400">Digital Future</span>
        </h1>

        <p className="max-w-3xl mx-auto mt-6 text-gray-400 text-lg">
          Have questions about cybersecurity, AI automation, penetration
          testing, or security training? Reach out to CredoSec and we'll get
          back to you promptly.
        </p>
      </section>

      {/* CONTACT SECTION */}
      <section className="px-6 md:px-20 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* CONTACT INFO */}
          <div>
            <h2 className="text-3xl font-bold mb-8">Get In Touch</h2>

            <div className="space-y-5">
              <div className="bg-[#0c111b] border border-[#1c2333] rounded-xl p-6">
                <h3 className="text-green-400 font-semibold mb-3">
                  📍 Office Address
                </h3>

                <p className="text-gray-400">
                  Shop 201, Pinnacle Plaza
                  <br />
                  Tipper-Garage Junction
                  <br />
                  Dutse, Abuja, Nigeria
                </p>
              </div>

              <div className="bg-[#0c111b] border border-[#1c2333] rounded-xl p-6">
                <h3 className="text-green-400 font-semibold mb-3">📞 Phone</h3>

                <p className="text-gray-400">08106755100</p>
              </div>

              <div className="bg-[#0c111b] border border-[#1c2333] rounded-xl p-6">
                <h3 className="text-green-400 font-semibold mb-3">
                  💬 WhatsApp
                </h3>

                <p className="text-gray-400">08106755100</p>
              </div>

              <div className="bg-[#0c111b] border border-[#1c2333] rounded-xl p-6">
                <h3 className="text-green-400 font-semibold mb-3">
                  🔗 LinkedIn
                </h3>

                <a
                  href="https://www.linkedin.com/in/joseph-okeke3/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400 hover:underline"
                >
                  View Profile
                </a>
              </div>

              <a
                href="https://wa.me/2348106755100"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-green-400 text-black font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition"
              >
                💬 Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* CONTACT FORM */}
          <div className="bg-[#0c111b] border border-[#1c2333] rounded-xl p-8">
            <h2 className="text-3xl font-bold mb-8">Send Us a Message</h2>

            <form className="space-y-5">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                className="w-full bg-[#111827] border border-[#1c2333] rounded-lg px-4 py-3 focus:outline-none focus:border-green-400"
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                className="w-full bg-[#111827] border border-[#1c2333] rounded-lg px-4 py-3 focus:outline-none focus:border-green-400"
              />

              <input
                type="text"
                name="company"
                placeholder="Company Name"
                className="w-full bg-[#111827] border border-[#1c2333] rounded-lg px-4 py-3 focus:outline-none focus:border-green-400"
              />

              <input
                type="text"
                name="subject"
                placeholder="Subject"
                required
                className="w-full bg-[#111827] border border-[#1c2333] rounded-lg px-4 py-3 focus:outline-none focus:border-green-400"
              />

              <textarea
                name="message"
                placeholder="Tell us how we can help..."
                rows={6}
                required
                className="w-full bg-[#111827] border border-[#1c2333] rounded-lg px-4 py-3 focus:outline-none focus:border-green-400 resize-none"
              ></textarea>

              <button
                type="submit"
                className="w-full bg-green-400 text-black font-semibold py-3 rounded-lg hover:opacity-90 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
