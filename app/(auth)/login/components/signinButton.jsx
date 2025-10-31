// app/signin/components/signinButton.jsx
"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignInButton({ disabled = false }) {
  const { login } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target.closest("form");
    const email = form.email.value;
    const password = form.password.value;

    try {
      setLoading(true);
      await login(email, password);
      alert("Login successful!");
      router.push("/");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="submit"
      onClick={handleLogin}
      disabled={loading || disabled}
      className={`w-full py-4 px-4 rounded-xl font-semibold shadow-lg
                 transition-all duration-200 transform
                 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                 ${
                   loading || disabled
                     ? "bg-gray-400 cursor-not-allowed transform-none"
                     : "bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:shadow-xl hover:-translate-y-0.5"
                 }`}
    >
      {loading ? (
        <div className="flex items-center justify-center gap-2">
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          Signing In...
        </div>
      ) : (
        "Sign In"
      )}
    </button>
  );
}