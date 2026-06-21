import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "./services.css";

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
  ];

  return (
    <main className="services-page">
      <Navbar />
      <section className="services-hero">
        <span className="services-badge">OUR SERVICES</span>

        <h1>
          Cybersecurity & Technology
          <span> Solutions You Can Trust</span>
        </h1>

        <p>
          CredoSec provides cybersecurity consulting, security assessments,
          penetration testing, AI automation, and security training services
          designed to protect organizations against modern cyber threats.
        </p>
      </section>

      <section className="services-grid">
        {services.map((service, index) => (
          <div key={index} className="service-card">
            <div className="service-icon">{service.icon}</div>

            <h3>{service.title}</h3>

            <p>{service.description}</p>
          </div>
        ))}
      </section>

      <section className="why-choose-us">
        <h2>Why Choose CredoSec?</h2>

        <div className="reasons">
          <div className="reason">
            <h3>Industry Expertise</h3>
            <p>
              Practical cybersecurity experience focused on modern threats and
              evolving attack techniques.
            </p>
          </div>

          <div className="reason">
            <h3>Tailored Solutions</h3>
            <p>
              Security recommendations customized to your business needs,
              infrastructure, and risk profile.
            </p>
          </div>

          <div className="reason">
            <h3>Proactive Security</h3>
            <p>
              We identify and mitigate risks before they become costly security
              incidents.
            </p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to Strengthen Your Security?</h2>

        <p>
          Contact CredoSec today to discuss your cybersecurity requirements and
          receive professional guidance.
        </p>

        <a href="/contact" className="cta-button">
          Request a Consultation
        </a>
      </section>
      <Footer />
    </main>
  );
}
