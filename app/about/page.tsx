import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function AboutPage() {
  return (
    <main className="bg-[#05070d] text-white min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="px-6 md:px-20 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          About <span className="text-green-400">CredoSec</span>
        </h1>

        <p className="max-w-4xl mx-auto text-gray-400 text-lg leading-relaxed">
          CredoSec is a cybersecurity company founded by Joseph Okeke in 2020,
          dedicated to helping organizations, governments, and individuals
          protect their digital assets through proactive security assessments,
          penetration testing, cloud security, and incident response services.
          CredoSec also empowers African youths through cybersecurity and IT
          skills training, building the next generation of security
          professionals.
        </p>
      </section>

      {/* MISSION / VISION / WHY US */}
      <section className="px-6 md:px-20 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-[#0c111b] border border-[#1c2333] rounded-xl p-8">
            <h2 className="text-2xl font-bold text-green-400 mb-4">
              Our Mission
            </h2>

            <p className="text-gray-400 leading-relaxed">
              To strengthen cybersecurity resilience for businesses by
              delivering practical, reliable, and modern security solutions.
            </p>
          </div>

          <div className="bg-[#0c111b] border border-[#1c2333] rounded-xl p-8">
            <h2 className="text-2xl font-bold text-green-400 mb-4">
              Our Vision
            </h2>

            <p className="text-gray-400 leading-relaxed">
              To become a trusted cybersecurity partner for organizations across
              Africa and beyond.
            </p>
          </div>

          <div className="bg-[#0c111b] border border-[#1c2333] rounded-xl p-8">
            <h2 className="text-2xl font-bold text-green-400 mb-4">
              Why Choose CredoSec?
            </h2>

            <ul className="space-y-3 text-gray-400">
              <li>✓ Security-first approach</li>
              <li>✓ Industry best practices</li>
              <li>✓ Proactive threat management</li>
              <li>✓ Reliable incident response</li>
              <li>✓ Continuous security improvement</li>
            </ul>
          </div>
          <div className="bg-[#0c111b] border border-[#1c2333] rounded-xl p-8">
            <h2 className="text-2xl font-bold text-green-400 mb-4">
              Our Vision
            </h2>

            <p className="text-gray-400 leading-relaxed">
              To become a trusted cybersecurity partner for organizations across
              Africa and beyond.
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT INFORMATION */}
      <section className="bg-[#070d18] border-y border-[#1b2840] py-20 px-6 md:px-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Contact Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          <div className="bg-[#0c111b] border border-[#1c2333] rounded-xl p-6">
            <h3 className="text-green-400 font-semibold mb-3">
              Office Address
            </h3>

            <p className="text-gray-400">
              Shop 201, Pinnacle Plaza,
              <br />
              Tipper-Garage Junction,
              <br />
              Dutse, Abuja, Nigeria
            </p>
          </div>

          <div className="bg-[#0c111b] border border-[#1c2333] rounded-xl p-6">
            <h3 className="text-green-400 font-semibold mb-3">Phone</h3>

            <p className="text-gray-400">08106755100</p>
          </div>

          <div className="bg-[#0c111b] border border-[#1c2333] rounded-xl p-6">
            <h3 className="text-green-400 font-semibold mb-3">WhatsApp</h3>

            <p className="text-gray-400">08106755100</p>
          </div>

          <div className="bg-[#0c111b] border border-[#1c2333] rounded-xl p-6">
            <h3 className="text-green-400 font-semibold mb-3">Email</h3>

            <p className="text-gray-400">contact@credosec.com</p>
          </div>
        </div>
      </section>

      {/* SOCIALS */}
      <section className="py-20 px-6 md:px-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-10">
          Connect With Us
        </h2>

        <div className="flex flex-wrap justify-center gap-5">
          <a
            href="https://www.linkedin.com/in/joseph-okeke3/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-lg border border-[#1c2333] bg-[#0c111b] hover:border-green-400 hover:text-green-400 transition"
          >
            LinkedIn
          </a>

          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-lg border border-[#1c2333] bg-[#0c111b] hover:border-green-400 hover:text-green-400 transition"
          >
            X (Twitter)
          </a>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-lg border border-[#1c2333] bg-[#0c111b] hover:border-green-400 hover:text-green-400 transition"
          >
            Instagram
          </a>

          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-lg border border-[#1c2333] bg-[#0c111b] hover:border-green-400 hover:text-green-400 transition"
          >
            Facebook
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
