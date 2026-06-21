import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>CredoSec</h3>
          <p>
            Professional cybersecurity solutions helping businesses identify,
            prevent, and respond to modern cyber threats.
          </p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>

          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/services">Services</Link>
          <Link href="/solutions">Solutions</Link>
          <Link href="/contact">Contact</Link>
        </div>

        <div className="footer-section">
          <h3>Contact</h3>

          <p>📍 Shop 201, Pinnacle Plaza</p>
          <p>Tipper-Garage Junction</p>
          <p>Dutse, Abuja</p>

          <p>📞 08106755100</p>
          <p>💬 WhatsApp: 08106755100</p>
        </div>

        <div className="footer-section">
          <h3>Connect</h3>

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
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} CredoSec. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
