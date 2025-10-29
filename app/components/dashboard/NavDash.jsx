"use client";
import { useState, useRef, useEffect } from "react";
import Notifications from "@/app/dashboard/Notifications";
import { useAuth } from "@/context/AuthContext";
import { 
  Menu, 
  X,
  User, 
  LogOut, 
  ChevronDown,
  Shield
} from "lucide-react";
import ThemeToggler from "../ThemeToggler";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function NavDash({ toggleSidebar, isSidebarOpen }) {
  const { user, logout } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const profileRef = useRef(null);
  const router = useRouter();

  // Fetch role
  useEffect(() => {
    const fetchRole = async () => {
      if (!user?.email) {
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(
          `https://smart-shop-server-three.vercel.app/users/${user.email}/role`
        );
        const data = await res.json();
        if (data?.role) setRole(data.role);
      } catch (err) {
        console.error("Error fetching role:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRole();
  }, [user?.email]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleLogout = async () => {
    try {
      const toastId = toast.loading('Logging out...');
      await logout();
      setIsProfileOpen(false);

      toast.success('Logged out successfully!', {
        id: toastId,
        duration: 3000,
        position: 'top-right',
      });

      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
      toast.error('Logout failed. Please try again.', {
        duration: 4000,
        position: 'top-right',
      });
    }
  };

  return (
    <section className="fixed w-full top-0 flex items-center gap-3 bg-white/80 backdrop-blur-md border-b border-gray-200 px-4 py-3 z-50">
      {/* Mobile menu button */}
      <div className="flex items-center md:hidden">
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 group"
          aria-label="Toggle sidebar"
        >
          <div className="relative w-6 h-6">
            <Menu 
              size={24} 
              className={`text-gray-600 absolute inset-0 transition-all duration-300 ${
                isSidebarOpen ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'
              }`} 
            />
            <X 
              size={24} 
              className={`text-gray-600 absolute inset-0 transition-all duration-300 ${
                isSidebarOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'
              }`} 
            />
          </div>
        </button>
      </div>

      {/* Main section */}
      <div className="flex justify-between items-center w-full md:pr-[260px]">
        <h1 className="hidden sm:block text-lg md:text-xl font-semibold text-gray-800">
          Welcome to {role || "User"} Dashboard
        </h1>

        {/* Right side */}
        <div className="flex items-center gap-4 ml-auto">
          <Notifications />

          {/* Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-gray-100 transition-all duration-200 group border border-transparent hover:border-gray-200"
              aria-label="Profile menu"
            >
              <div className="relative">
                <img
                  src={user?.photoURL || "/default-avatar.png"}
                  alt={`Avatar of ${user?.displayName || "Guest"}`}
                  className="w-8 h-8 rounded-full border border-gray-300 object-cover transition-all duration-300 group-hover:border-blue-500"
                />
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <span className="hidden sm:block text-sm font-medium text-gray-700 max-w-32 truncate">
                {user?.displayName || "Guest"}
              </span>
              <ChevronDown 
                size={16} 
                className={`text-gray-500 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} 
              />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 z-50 animate-in fade-in-0 zoom-in-95">
                
                {/* User Info */}
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <img
                      src={user?.photoURL || "/default-avatar.png"}
                      alt={`Avatar of ${user?.displayName || "Guest"}`}
                      className="w-12 h-12 rounded-full border border-gray-300 object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {user?.displayName || "Guest User"}
                      </h3>
                      <p className="text-sm text-gray-500 truncate">
                        {user?.email || "guest@example.com"}
                      </p>
                      <span className="inline-block mt-1 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                        {role}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="p-2 space-y-1">
                  <Link 
                    href="/dashboard" 
                    className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 group"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <User size={18} className="text-gray-500 group-hover:text-blue-500 transition-colors" />
                    <span>My Profile</span>
                  </Link>

                  <Link 
                    href="/privacyPolicy" 
                    className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 group"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <Shield size={18} className="text-gray-500 group-hover:text-blue-500 transition-colors" />
                    <span>Privacy & Security</span>
                  </Link>
                </div>

                {/* Dark Mode Toggle */}
                <div className="p-2 border-t border-gray-100">
                  <div className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 group">
                    <ThemeToggler />
                    
                  </div>
                </div>

                {/* Logout */}
                <div className="p-2 border-t border-gray-100">
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-red-600 rounded-lg hover:bg-red-50 transition-all duration-200 group"
                  >
                    <LogOut size={18} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                    <span className="font-medium">Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
