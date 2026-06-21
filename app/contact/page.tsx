import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "./contact.css";

export default function ContactPage() {
  return (
    <main className="contact-page">
      <Navbar />
      <section className="contact-hero">
        <span className="contact-badge">CONTACT US</span>

        <h1>
          Let's Secure Your
          <span> Digital Future</span>
        </h1>

        <p>
          Have questions about cybersecurity, AI automation, penetration
          testing, or security training? Reach out to CredoSec and we'll get
          back to you promptly.
        </p>
      </section>

      <section className="contact-container">
        <div className="contact-info">
          <h2>Get In Touch</h2>

          <div className="info-card">
            <h3>📍 Office Address</h3>
            <p>
              Shop 201, Pinnacle Plaza
              <br />
              Tipper-Garage Junction
              <br />
              Dutse, Abuja, Nigeria
            </p>
          </div>

          <div className="info-card">
            <h3>📞 Phone</h3>
            <p>08106755100</p>
          </div>

          <div className="info-card">
            <h3>💬 WhatsApp</h3>
            <p>08106755100</p>
          </div>

          <div className="info-card">
            <h3>🔗 LinkedIn</h3>
            <a
              href="https://www.linkedin.com/in/joseph-okeke3/"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Profile
            </a>
          </div>

          <a
            href="https://wa.me/2348106755100"
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-btn"
          >
            💬 Chat on WhatsApp
          </a>
        </div>

        <div className="contact-form-card">
          <h2>Send Us a Message</h2>

          <form className="contact-form">
            <input type="text" name="name" placeholder="Full Name" required />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
            />

            <input type="text" name="company" placeholder="Company Name" />

            <input type="text" name="subject" placeholder="Subject" required />

            <textarea
              name="message"
              placeholder="Tell us how we can help..."
              rows={6}
              required
            ></textarea>

            <button type="submit">Send Message</button>
          </form>
        </div>
      </section>
      <Footer />
    </main>
  );
}
