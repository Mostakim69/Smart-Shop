"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignInButton() {
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
      disabled={loading}
      className={`w-full py-3 rounded-lg font-medium transition ${
        loading ? "bg-gray-500 cursor-not-allowed" : "bg-black hover:opacity-90 text-white"
      }`}
    >
      {loading ? "Logging in..." : "Login"}
    </button>
  );
}
