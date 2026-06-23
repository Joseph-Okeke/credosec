import { createClient } from "@supabase/supabase-js";

export default async function AdminPage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  const { data } = await supabase
    .from("enrollments")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl font-bold mb-8">Student Enrollments</h1>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-700">
          <thead>
            <tr className="bg-gray-900">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Course</th>
              <th className="p-3">Date</th>
            </tr>
          </thead>

          <tbody>
            {data?.map((student) => (
              <tr key={student.id} className="border-t border-gray-700">
                <td className="p-3">{student.full_name}</td>

                <td className="p-3">{student.email}</td>

                <td className="p-3">{student.phone}</td>

                <td className="p-3">{student.course}</td>

                <td className="p-3">
                  {new Date(student.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
