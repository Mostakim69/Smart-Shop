"use client";
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebaseClient"; 
import Link from "next/link";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true); 

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("✅ Password reset email sent! Please check your inbox.");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-200 to-white px-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gray-100">
            <span className="text-2xl">🔑</span>
          </div>
        </div>

        <h2 className="text-center text-xl font-semibold text-primary">Reset Password</h2>
        <p className="text-center text-gray-500 text-sm mt-1">
          Enter your email to receive a reset link
        </p>

        <form onSubmit={handleReset} className="mt-6 space-y-3">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full text-black px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400"
            required
          />

          <button
            type="submit"
            disabled={loading} 
            className={`w-full py-3 text-white rounded-lg font-semibold transition ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-sky-500 hover:bg-sky-600"
            }`}
          >
            {loading ? "Sending..." : "Send Reset Link"} 
          </button>
        </form>

        {/* Success / Error messages */}
        {message && (
          <p className="text-green-600 text-sm mt-3 text-center">{message}</p>
        )}
        {error && (
          <p className="text-red-600 text-sm mt-3 text-center">{error}</p>
        )}

        {/* Back to Sign In */}
        <p className="text-center text-sm mt-6 text-gray-500">
          Remembered your password?{" "}
          <Link href="/login" className="text-sky-500 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
