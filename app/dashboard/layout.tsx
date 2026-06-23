import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black text-white flex">
      <aside className="w-64 bg-gray-900 p-6">
        <h2 className="text-2xl font-bold mb-8">CredoSec LMS</h2>

        <nav className="space-y-4">
          <Link href="/dashboard">Overview</Link>
          <br />
          <Link href="/dashboard/courses">Courses</Link>
          <br />
          <Link href="/dashboard/payments">Payments</Link>
          <br />
          <Link href="/dashboard/progress">Progress</Link>
          <br />
          <Link href="/dashboard/classes">Live Classes</Link>
          <br />
          <Link href="/dashboard/certificates">Certificates</Link>
          <br />
          <Link href="/dashboard/chat">Tutor Chat</Link>
        </nav>
      </aside>

      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
