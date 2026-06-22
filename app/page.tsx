import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default function Home() {
  return (
    <main className="bg-[#05070d] text-white min-h-screen">
      {/* NAVBAR */}
      <Navbar />

      {/* HERO SECTION */}
      <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-16">
        {/* TEXT */}
        <div className="w-full md:w-1/2">
          <p className="text-green-400 text-xs tracking-widest mb-3">
            CYBERSECURITY YOU CAN TRUST
          </p>

          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            Secure Today.
            <br />
            <span className="text-green-400">Confident Tomorrow.</span>
          </h1>

          <p className="text-gray-400 mt-5 max-w-xl">
            CredoSec helps businesses identify, prevent, and respond to cyber
            threats with modern security solutions built for today’s digital
            world.
          </p>

          {/* BUTTONS */}
          <div className="flex flex-wrap gap-4 mt-6">
            <button className="bg-green-400 text-black px-5 py-3 rounded-md hover:opacity-80 transition">
              Our Services
            </button>

            <button className="border border-green-400 text-green-400 px-5 py-3 rounded-md hover:bg-green-400 hover:text-black transition">
              Free Audit
            </button>
          </div>

          {/* STATS */}
          <div className="flex flex-wrap gap-4 mt-8 text-sm text-gray-300">
            <div className="bg-[#0c111b] px-3 py-2 rounded-md border border-[#1c2333]">
              🔒 24/7 Monitoring
            </div>

            <div className="bg-[#0c111b] px-3 py-2 rounded-md border border-[#1c2333]">
              ⚡ Fast Response
            </div>

            <div className="bg-[#0c111b] px-3 py-2 rounded-md border border-[#1c2333]">
              🛡️ Threat Protection
            </div>
          </div>
        </div>

        {/* VISUAL */}
        <div className="w-full md:w-1/2 mt-12 md:mt-0 flex justify-center">
          <div className="w-[280px] h-[280px] rounded-xl border border-green-400 bg-green-400/10 shadow-[0_0_40px_#00ff8850] flex flex-col items-center justify-center">
            <div className="text-5xl">🛡️</div>

            <p className="mt-4 text-green-400 font-medium">
              Global Threat Defense
            </p>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="px-6 md:px-20 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
          What We Do
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#0c111b] border border-[#1c2333] p-6 rounded-lg hover:border-green-400 transition">
            <h3 className="text-green-400 font-semibold mb-2">
              Security Assessment
            </h3>
            <p className="text-gray-400 text-sm">
              Identify vulnerabilities in your systems.
            </p>
          </div>

          <div className="bg-[#0c111b] border border-[#1c2333] p-6 rounded-lg hover:border-green-400 transition">
            <h3 className="text-green-400 font-semibold mb-2">
              Penetration Testing
            </h3>
            <p className="text-gray-400 text-sm">
              Simulate attacks to find weaknesses.
            </p>
          </div>

          <div className="bg-[#0c111b] border border-[#1c2333] p-6 rounded-lg hover:border-green-400 transition">
            <h3 className="text-green-400 font-semibold mb-2">
              Cloud Security
            </h3>
            <p className="text-gray-400 text-sm">
              Secure cloud infrastructure and apps.
            </p>
          </div>

          <div className="bg-[#0c111b] border border-[#1c2333] p-6 rounded-lg hover:border-green-400 transition">
            <h3 className="text-green-400 font-semibold mb-2">
              Incident Response
            </h3>
            <p className="text-gray-400 text-sm">
              Rapid response to cyber incidents.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </main>
  );
}
