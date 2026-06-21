import Link from "next/link";
import "./solution.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function SolutionsPage() {
  return (
    <main className="solutions-page">
      <Navbar />
      {/* HERO */}
      <section className="solutions-hero">
        <span className="hero-badge">SECURITY SOLUTIONS</span>

        <h1>
          Protecting Businesses In A<span> Connected World</span>
        </h1>

        <p>
          CredoSec delivers cybersecurity, AI automation, and risk management
          solutions that help organizations stay secure, resilient, and
          compliant in today's rapidly evolving threat landscape.
        </p>

        <div className="hero-buttons">
          <Link href="/contact" className="primary-btn">
            Request Consultation
          </Link>

          <Link href="/scan" className="secondary-btn">
            Scan a Website
          </Link>
        </div>
      </section>

      {/* URL SCANNER */}
      <section className="scanner-section">
        <div className="scanner-card">
          <h2>Website Security Scanner</h2>

          <p>
            Quickly analyze a website and identify potential security concerns.
          </p>

          <div className="scanner-form">
            <input type="url" placeholder="https://example.com" />

            <button>🔍 Scan URL</button>
          </div>

          <small>
            Coming soon: Automated vulnerability checks and security scoring.
          </small>
        </div>
      </section>

      {/* SOLUTIONS GRID */}
      <section className="solutions-grid">
        <div className="solution-card">
          <h3>🛡️ Enterprise Security</h3>
          <p>
            Protect critical systems, sensitive data, and business operations
            from cyber threats.
          </p>
        </div>

        <div className="solution-card">
          <h3>☁️ Cloud Security</h3>
          <p>
            Secure cloud environments, applications, identities, and
            configurations.
          </p>
        </div>

        <div className="solution-card">
          <h3>🔍 Vulnerability Management</h3>
          <p>
            Continuously identify, prioritize, and remediate security
            weaknesses.
          </p>
        </div>

        <div className="solution-card">
          <h3>🚨 Incident Response</h3>
          <p>
            Rapid containment, investigation, and recovery from cyber incidents.
          </p>
        </div>

        <div className="solution-card">
          <h3>🤖 AI Automation</h3>
          <p>
            Automate repetitive security and business processes using
            intelligent workflows.
          </p>
        </div>

        <div className="solution-card">
          <h3>🎓 Security Training</h3>
          <p>
            Build a security-aware workforce through practical cybersecurity
            education.
          </p>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="industries-section">
        <h2>Industries We Support</h2>

        <div className="industries-grid">
          <div>🏦 Financial Services</div>
          <div>🏥 Healthcare</div>
          <div>🎓 Education</div>
          <div>🏢 Small & Medium Businesses</div>
          <div>🛒 E-Commerce</div>
          <div>🏛️ Government & NGOs</div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <h2>Ready To Improve Your Security?</h2>

        <p>
          Let's discuss your security challenges and build a solution that fits
          your business.
        </p>

        <Link href="/contact" className="cta-button">
          Contact CredoSec
        </Link>
      </section>
      <Footer />
    </main>
  );
}
