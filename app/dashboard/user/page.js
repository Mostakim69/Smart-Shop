import DashboardClient from "./DashboardClient";

export default function DashboardPage() {
  return (
    <div className="p-4 lg:p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-6">
        OverView
      </h1>

      {/* ✅ Client-side data handling */}
      <DashboardClient />
    </div>
  );
}
