export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold">Student Dashboard</h1>

      <div className="mt-8 grid md:grid-cols-3 gap-6">
        <div className="bg-gray-900 p-6 rounded-xl">
          <h2 className="text-xl font-semibold">My Courses</h2>

          <p className="mt-4 text-gray-400">Ethical Hacking Bootcamp</p>
        </div>

        <div className="bg-gray-900 p-6 rounded-xl">
          <h2 className="text-xl font-semibold">Progress</h2>

          <p className="mt-4 text-green-400">0%</p>
        </div>

        <div className="bg-gray-900 p-6 rounded-xl">
          <h2 className="text-xl font-semibold">Certificates</h2>

          <p className="mt-4 text-gray-400">No certificates yet</p>
        </div>
      </div>
    </main>
  );
}
