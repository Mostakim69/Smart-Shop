import NavDash from "../components/dashboard/NavDash";
import Sidebar from "../components/dashboard/Sidebar";


export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Section */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <NavDash />
        {/* Page Content */}
        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  );
}

