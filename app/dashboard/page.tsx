import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function DashboardPage() {
  return (
    <section>
      <Navbar />
      <main className="min-h-screen bg-black text-white p-6 md:p-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold">Welcome Back 👋</h1>
            <p className="text-gray-400 mt-2">
              Manage your learning journey from one place.
            </p>
          </div>

          <button className="mt-4 md:mt-0 bg-green-500 hover:bg-green-600 text-black px-5 py-3 rounded-lg font-semibold">
            Browse Courses
          </button>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mt-10">
          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
            <h3 className="text-gray-400">Enrolled Courses</h3>
            <p className="text-3xl font-bold mt-2">3</p>
          </div>

          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
            <h3 className="text-gray-400">Completed</h3>
            <p className="text-3xl font-bold mt-2">1</p>
          </div>

          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
            <h3 className="text-gray-400">Certificates</h3>
            <p className="text-3xl font-bold mt-2">1</p>
          </div>

          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
            <h3 className="text-gray-400">Upcoming Classes</h3>
            <p className="text-3xl font-bold mt-2">2</p>
          </div>
        </div>

        {/* Courses */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">My Courses</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <h3 className="text-xl font-semibold">
                Ethical Hacking Bootcamp
              </h3>

              <p className="text-gray-400 mt-2">
                Learn reconnaissance, scanning, exploitation, privilege
                escalation and reporting.
              </p>

              <div className="mt-4">
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-green-500 h-3 rounded-full"
                    style={{ width: "65%" }}
                  />
                </div>

                <p className="mt-2 text-green-400">65% Completed</p>
              </div>

              <button className="mt-4 bg-green-500 text-black px-4 py-2 rounded-lg font-semibold">
                Continue Learning
              </button>
            </div>

            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <h3 className="text-xl font-semibold">SOC Analyst Training</h3>

              <p className="text-gray-400 mt-2">
                Incident response, SIEM, threat hunting and detection.
              </p>

              <div className="mt-4">
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-green-500 h-3 rounded-full"
                    style={{ width: "20%" }}
                  />
                </div>

                <p className="mt-2 text-green-400">20% Completed</p>
              </div>

              <button className="mt-4 bg-green-500 text-black px-4 py-2 rounded-lg font-semibold">
                Continue Learning
              </button>
            </div>
          </div>
        </div>

        {/* Live Classes */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Upcoming Live Classes</h2>

          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
            <h3 className="font-semibold">Web Application Security</h3>

            <p className="text-gray-400 mt-2">July 1, 2026 • 6:00 PM</p>

            <button className="mt-4 bg-blue-600 px-4 py-2 rounded-lg">
              Join Class
            </button>
          </div>
        </div>

        {/* Payments */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Payments</h2>

          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
            <p>Ethical Hacking Bootcamp</p>

            <p className="text-green-400 mt-2">Paid ✅</p>
          </div>
        </div>

        {/* Certificates */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Certificates</h2>

          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
            <p>Ethical Hacking Bootcamp Certificate</p>

            <button className="mt-4 bg-green-500 text-black px-4 py-2 rounded-lg font-semibold">
              Download Certificate
            </button>
          </div>
        </div>

        {/* Tutor Chat */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Tutor Support</h2>

          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
            <p className="text-gray-400">Need help with your course?</p>

            <button className="mt-4 bg-green-500 text-black px-4 py-2 rounded-lg font-semibold">
              Chat With Tutor
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </section>
  );
}
