import NavDash from "../components/dashboard/NavDash";
import Sidebar from "../components/dashboard/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Section */}
        <div className="flex-1 p-4 mt-16 md:mt-16 ml-0 md:ml-54">
        {/* Navbar */}
          <div className="fixed top-0 left-0 right-0 z-40">
          <NavDash />
        </div>
        {/* Page Content */}
        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  );
}
