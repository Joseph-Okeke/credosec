export default function Home() {
  return (
    <main className="container">
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo">CredoSec</div>

        <div className="nav-links">
          <a href="#">Home</a>
          <a href="#">Services</a>
          <a href="#">Solutions</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </div>

        <button className="cta">Get Audit</button>
      </nav>

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-text">
          <p className="badge">CYBERSECURITY YOU CAN TRUST</p>

          <h1>
            Secure Today.
            <br />
            <span>Confident Tomorrow.</span>
          </h1>

          <p className="subtext">
            CredoSec helps businesses identify, prevent, and respond to cyber
            threats with modern security solutions built for today’s digital
            world.
          </p>

          <div className="buttons">
            <button className="primary">Our Services</button>
            <button className="secondary">Free Audit</button>
          </div>

          <div className="stats">
            <div>🔒 24/7 Monitoring</div>
            <div>⚡ Fast Response</div>
            <div>🛡️ Threat Protection</div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="glow-box">
            <div className="shield">🛡️</div>
            <p>Global Threat Defense</p>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="services">
        <h2>What We Do</h2>

        <div className="grid">
          <div className="card">
            <h3>Security Assessment</h3>
            <p>Identify vulnerabilities in your systems.</p>
          </div>

          <div className="card">
            <h3>Penetration Testing</h3>
            <p>Simulate attacks to find weaknesses.</p>
          </div>

          <div className="card">
            <h3>Cloud Security</h3>
            <p>Secure cloud infrastructure and apps.</p>
          </div>

          <div className="card">
            <h3>Incident Response</h3>
            <p>Rapid response to cyber incidents.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
