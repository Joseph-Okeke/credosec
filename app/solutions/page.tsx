import Link from "next/link";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function SolutionsPage() {
  const solutions = [
    {
      title: "🛡️ Enterprise Security",
      description:
        "Protect critical systems, sensitive data, and business operations from cyber threats.",
    },
    {
      title: "☁️ Cloud Security",
      description:
        "Secure cloud environments, applications, identities, and configurations.",
    },
    {
      title: "🔍 Vulnerability Management",
      description:
        "Continuously identify, prioritize, and remediate security weaknesses.",
    },
    {
      title: "🚨 Incident Response",
      description:
        "Rapid containment, investigation, and recovery from cyber incidents.",
    },
    {
      title: "🤖 AI Automation",
      description:
        "Automate repetitive security and business processes using intelligent workflows.",
    },
    {
      title: "🎓 Security Training",
      description:
        "Build a security-aware workforce through practical cybersecurity education.",
    },
    {
      title: "Full Stack Development",
      description:
        "End-to-end web and software development services using modern technologies to build secure, scalable, and high-performance digital solutions.",
      icon: "💻",
    },
    {
      title: "Computer & Networking Equipment Sales",
      description:
        "Supply and deployment of computers, networking devices, servers, Wi-Fi equipment, CCTV systems, and IT accessories for homes and businesses.",
      icon: "📡",
    },
  ];

  const industries = [
    "🏦 Financial Services",
    "🏥 Healthcare",
    "🎓 Education",
    "🏢 Small & Medium Businesses",
    "🛒 E-Commerce",
    "🏛️ Government & NGOs",
    "Individual Persons",
    "Churches",
  ];

  return (
    <main className="bg-[#05070d] text-white min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="px-6 md:px-20 py-20 text-center">
        <span className="inline-block text-green-400 text-sm font-semibold tracking-widest mb-4">
          SECURITY SOLUTIONS
        </span>

        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Protecting Businesses In A
          <br />
          <span className="text-green-400">Connected World</span>
        </h1>

        <p className="max-w-3xl mx-auto mt-6 text-gray-400 text-lg">
          CredoSec delivers cybersecurity, AI automation, and risk management
          solutions that help organizations stay secure, resilient, and
          compliant in today's rapidly evolving threat landscape.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <Link
            href="/contact"
            className="bg-green-400 text-black font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition"
          >
            Request Consultation
          </Link>

          <Link
            href="/scan"
            className="border border-green-400 text-green-400 px-6 py-3 rounded-lg hover:bg-green-400 hover:text-black transition"
          >
            Scan a Website
          </Link>
        </div>
      </section>

      {/* WEBSITE SCANNER */}
      <section className="px-6 md:px-20 pb-20">
        <div className="max-w-4xl mx-auto bg-[#0c111b] border border-[#1c2333] rounded-2xl p-8 md:p-10">
          <h2 className="text-3xl font-bold mb-4">Website Security Scanner</h2>

          <p className="text-gray-400 mb-6">
            Quickly analyze a website and identify potential security concerns.
          </p>

          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="url"
              placeholder="https://example.com"
              className="flex-1 bg-[#111827] border border-[#1c2333] rounded-lg px-4 py-3 focus:outline-none focus:border-green-400"
            />

            <button className="bg-green-400 text-black font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition">
              🔍 Scan URL
            </button>
          </div>

          <p className="text-sm text-gray-500 mt-4">
            Coming soon: Automated vulnerability checks and security scoring.
          </p>
        </div>
      </section>

      {/* SOLUTIONS */}
      <section className="px-6 md:px-20 pb-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Our Solutions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <div
              key={index}
              className="bg-[#0c111b] border border-[#1c2333] rounded-xl p-8 hover:border-green-400 hover:shadow-[0_0_25px_rgba(0,255,136,0.15)] transition-all duration-300"
            >
              <h3 className="text-xl font-semibold text-green-400 mb-3">
                {solution.title}
              </h3>

              <p className="text-gray-400 leading-relaxed">
                {solution.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="bg-[#070d18] border-y border-[#1b2840] py-20 px-6 md:px-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Industries We Support
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {industries.map((industry, index) => (
            <div
              key={index}
              className="bg-[#0c111b] border border-[#1c2333] rounded-xl p-6 text-center hover:border-green-400 transition"
            >
              {industry}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-20 py-24 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          Ready To Improve Your Security?
        </h2>

        <p className="max-w-2xl mx-auto text-gray-400 mb-10">
          Let's discuss your security challenges and build a solution that fits
          your business.
        </p>

        <Link
          href="/contact"
          className="inline-block bg-green-400 text-black font-semibold px-8 py-4 rounded-lg hover:opacity-90 transition"
        >
          Contact CredoSec
        </Link>
      </section>

      <Footer />
    </main>
  );
}
