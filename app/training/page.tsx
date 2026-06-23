import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function TrainingPage() {
  return (
    <main className="bg-black text-white min-h-screen">
      <Navbar />
      {/* HERO SECTION */}
      <section className="text-center px-6 py-20 bg-gradient-to-b from-black to-gray-900">
        <h1 className="text-4xl md:text-6xl font-bold">
          Cybersecurity Training Academy
        </h1>

        <p className="text-gray-300 mt-6 max-w-2xl mx-auto text-lg">
          Learn real-world ethical hacking, penetration testing, and defensive
          security skills from industry-focused training built for Africa’s next
          generation of cybersecurity professionals.
        </p>

        <button className="mt-8 px-6 py-3 bg-green-500 hover:bg-green-600 rounded-lg font-semibold">
          Enroll Now
        </button>
      </section>

      {/* COURSES SECTION */}
      <section className="px-6 md:px-20 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Our Courses</h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
            <h3 className="text-xl font-semibold">Ethical Hacking Bootcamp</h3>
            <p className="text-gray-400 mt-3">
              Learn reconnaissance, scanning, exploitation, and reporting using
              real tools like Kali Linux.
            </p>
          </div>

          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
            <h3 className="text-xl font-semibold">
              Network Security Fundamentals
            </h3>
            <p className="text-gray-400 mt-3">
              Understand how networks work and how attackers exploit
              misconfigurations.
            </p>
          </div>

          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
            <h3 className="text-xl font-semibold">
              Cloud Security (AWS Basics)
            </h3>
            <p className="text-gray-400 mt-3">
              Secure cloud infrastructure, IAM policies, and real-world
              misconfiguration risks.
            </p>
          </div>
        </div>
      </section>

      {/* CURRICULUM SECTION */}
      <section className="px-6 md:px-20 py-20 bg-gray-950">
        <h2 className="text-3xl font-bold text-center mb-12">
          Training Curriculum
        </h2>

        <div className="max-w-4xl mx-auto space-y-6">
          {[
            "Introduction to Cybersecurity & Threat Landscape",
            "Linux Fundamentals for Hackers",
            "Networking Basics (TCP/IP, DNS, HTTP)",
            "Reconnaissance & Enumeration",
            "Web Application Security (OWASP Top 10)",
            "Penetration Testing Methodology",
            "Reporting & Documentation",
            "Final Capstone Project",
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 bg-black border border-gray-800 p-4 rounded-lg"
            >
              <span className="text-green-400 font-bold">{index + 1}</span>
              <p>{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING SECTION */}
      <section className="px-6 md:px-20 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Training Plans</h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl">
            <h3 className="text-xl font-semibold">Starter</h3>
            <p className="text-3xl font-bold mt-3">$130</p>
            <p className="text-gray-400 mt-2">
              Basic cybersecurity fundamentals
            </p>
            <button className="mt-6 w-full bg-gray-800 py-2 rounded-lg">
              Get Started
            </button>
          </div>

          <div className="bg-green-600 text-black p-6 rounded-xl scale-105">
            <h3 className="text-xl font-bold">Professional</h3>
            <p className="text-3xl font-bold mt-3">$250</p>
            <p className="mt-2">Full ethical hacking + labs</p>
            <button className="mt-6 w-full bg-black text-white py-2 rounded-lg">
              Most Popular
            </button>
          </div>

          <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl">
            <h3 className="text-xl font-semibold">Enterprise</h3>
            <p className="text-3xl font-bold mt-3">Custom</p>
            <p className="text-gray-400 mt-2">
              Team training & corporate security
            </p>
            <button className="mt-6 w-full bg-gray-800 py-2 rounded-lg">
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* ENROLLMENT CTA */}
      <section className="px-6 py-20 text-center bg-gradient-to-t from-black to-gray-900">
        <h2 className="text-3xl font-bold">
          Ready to start your cybersecurity career?
        </h2>

        <p className="text-gray-400 mt-4">
          Join CredoSec Training Academy and gain real-world security skills.
        </p>

        <button className="mt-8 px-8 py-3 bg-green-500 hover:bg-green-600 rounded-lg font-semibold">
          Apply for Enrollment
        </button>
      </section>
      <Footer />
    </main>
  );
}
