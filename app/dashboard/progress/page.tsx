import DashboardNav from "../../components/DashboardNav";

export default function ProgressPage() {
  return (
    <>
      <DashboardNav />
      <h1 className="text-3xl font-bold">Progress Tracking</h1>

      <div className="mt-6 bg-gray-900 p-6 rounded-xl">
        Course progress will appear here.
      </div>
    </>
  );
}
