import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Link from "next/link";

export default function ServicesPage() {
  const services = [
    {
      title: "Web Application Security Assessment",
      description:
        "Comprehensive security testing of web applications to identify vulnerabilities, misconfigurations, and security weaknesses before attackers do.",
      icon: "🌐",
    },
    {
      title: "Vulnerability Assessment",
      description:
        "Systematic identification and evaluation of security vulnerabilities across networks, systems, and applications.",
      icon: "🔍",
    },
    {
      title: "Penetration Testing",
      description:
        "Simulated real-world cyberattacks designed to uncover exploitable weaknesses and validate security controls.",
      icon: "🛡️",
    },
    {
      title: "Cloud Security Review",
      description:
        "Assessment of cloud infrastructure, configurations, access controls, and security best practices across modern cloud environments.",
      icon: "☁️",
    },
    {
      title: "Security Awareness Training",
      description:
        "Employee-focused cybersecurity education programs that reduce human risk and strengthen organizational security culture.",
      icon: "🎓",
    },
    {
      title: "Cybersecurity Training",
      description:
        "Hands-on technical cybersecurity training for individuals, students, IT professionals, and organizations.",
      icon: "💻",
    },
    {
      title: "Incident Response Retainers",
      description:
        "Rapid-response cybersecurity support and expert guidance to help organizations contain and recover from security incidents.",
      icon: "🚨",
    },
    {
      title: "AI Automation Solutions",
      description:
        "Custom AI-powered automation solutions that improve operational efficiency, security monitoring, reporting, and workflow management.",
      icon: "🤖",
    },
    {
      title: "Home & Office Security Setup",
      description:
        "Secure deployment of networks, Wi-Fi, surveillance systems, endpoint protection, and cybersecurity best practices for homes and businesses.",
      icon: "🏢",
    },
    {
      title: "IT Support Services",
      description:
        "Reliable IT support for businesses and individuals, including troubleshooting, system maintenance, network support, hardware setup, and technical assistance.",
      icon: "🖥️",
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

  return (
    <main className="bg-[#05070d] text-white min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="px-6 md:px-20 py-20 text-center">
        <span className="inline-block text-green-400 text-sm tracking-widest font-semibold mb-4">
          OUR SERVICES
        </span>

        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Cybersecurity & Technology
          <br />
          <span className="text-green-400">Solutions You Can Trust</span>
        </h1>

        <p className="max-w-3xl mx-auto mt-6 text-gray-400 text-lg">
          CredoSec provides cybersecurity consulting, security assessments,
          penetration testing, AI automation, and security training services
          designed to protect organizations against modern cyber threats.
        </p>
      </section>

      {/* SERVICES GRID */}
      <section className="px-6 md:px-20 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-[#0c111b] border border-[#1c2333] rounded-xl p-8 hover:border-green-400 hover:shadow-[0_0_25px_rgba(0,255,136,0.2)] transition-all duration-300"
            >
              <div className="text-4xl mb-5">{service.icon}</div>

              <h3 className="text-xl font-semibold text-green-400 mb-3">
                {service.title}
              </h3>

              <p className="text-gray-400 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="px-6 md:px-20 py-20 bg-[#070d18] border-y border-[#1b2840]">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-14">
          Why Choose CredoSec?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#0c111b] p-8 rounded-xl border border-[#1c2333]">
            <h3 className="text-green-400 text-xl font-semibold mb-3">
              Industry Expertise
            </h3>

            <p className="text-gray-400">
              Practical cybersecurity experience focused on modern threats and
              evolving attack techniques.
            </p>
          </div>

          <div className="bg-[#0c111b] p-8 rounded-xl border border-[#1c2333]">
            <h3 className="text-green-400 text-xl font-semibold mb-3">
              Tailored Solutions
            </h3>

            <p className="text-gray-400">
              Security recommendations customized to your business needs,
              infrastructure, and risk profile.
            </p>
          </div>

          <div className="bg-[#0c111b] p-8 rounded-xl border border-[#1c2333]">
            <h3 className="text-green-400 text-xl font-semibold mb-3">
              Proactive Security
            </h3>

            <p className="text-gray-400">
              We identify and mitigate risks before they become costly security
              incidents.
            </p>
          </div>
          <div className="bg-[#0c111b] p-8 rounded-xl border border-[#1c2333]">
            <h3 className="text-green-400 text-xl font-semibold mb-3">
              Proactive Security
            </h3>

            <p className="text-gray-400">
              We identify and mitigate risks before they become costly security
              incidents.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-20 py-24 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          Ready to Strengthen Your Security?
        </h2>

        <p className="text-gray-400 max-w-2xl mx-auto mb-10">
          Contact CredoSec today to discuss your cybersecurity requirements and
          receive professional guidance from our team.
        </p>

        <Link
          href="/contact"
          className="inline-block bg-green-400 text-black font-semibold px-8 py-4 rounded-lg hover:opacity-90 transition"
        >
          Request a Consultation
        </Link>
      </section>

      <Footer />
    </main>
  );
}
