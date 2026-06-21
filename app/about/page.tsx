import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "./about.css";

export default function AboutPage() {
  return (
    <main className="about-page">
      <Navbar />
      <section className="about-hero">
        <h1>About CredoSec</h1>
        <p>
          CredoSec is a cybersecurity company dedicated to helping organizations
          protect their digital assets through proactive security assessments,
          penetration testing, cloud security, and incident response services.
        </p>
      </section>

      <section className="about-content">
        <div className="about-card">
          <h2>Our Mission</h2>
          <p>
            To strengthen cybersecurity resilience for businesses by delivering
            practical, reliable, and modern security solutions.
          </p>
        </div>

        <div className="about-card">
          <h2>Our Vision</h2>
          <p>
            To become a trusted cybersecurity partner for organizations across
            Africa and beyond.
          </p>
        </div>

        <div className="about-card">
          <h2>Why Choose CredoSec?</h2>
          <ul>
            <li>✓ Security-first approach</li>
            <li>✓ Industry best practices</li>
            <li>✓ Proactive threat management</li>
            <li>✓ Reliable incident response</li>
            <li>✓ Continuous security improvement</li>
          </ul>
        </div>
      </section>

      <section className="contact-section">
        <h2>Contact Information</h2>

        <div className="contact-grid">
          <div className="contact-card">
            <h3>Office Address</h3>
            <p>
              Shop 201, Pinnacle Plaza,
              <br />
              Tipper-Garage Junction,
              <br />
              Dutse, Abuja, Nigeria
            </p>
          </div>

          <div className="contact-card">
            <h3>Phone</h3>
            <p>08106755100</p>
          </div>

          <div className="contact-card">
            <h3>WhatsApp</h3>
            <p>08106755100</p>
          </div>

          <div className="contact-card">
            <h3>Email</h3>
            <p>contact@credosec.com</p>
          </div>
        </div>
      </section>

      <section className="social-section">
        <h2>Connect With Us</h2>

        <div className="social-links">
          <a
            href="https://www.linkedin.com/in/joseph-okeke3/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>

          <a href="#">X (Twitter)</a>
          <a href="#">Instagram</a>
          <a href="#">Facebook</a>
          <a href="#">WhatsApp</a>
        </div>
      </section>
      <Footer />
    </main>
  );
}
