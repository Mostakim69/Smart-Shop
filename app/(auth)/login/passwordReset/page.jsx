"use client";
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebaseClient"; 
import Link from "next/link";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("✅ Password reset email sent! Please check your inbox.");
    } catch (err) {
      setError(err.message);
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

        <h2 className="text-center text-xl font-semibold">Reset Password</h2>
        <p className="text-center text-gray-500 text-sm mt-1">
          Enter your email to receive a reset link
        </p>

        <form onSubmit={handleReset} className="mt-6 space-y-3">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400"
            required
          />

          <button
            type="submit"
            className="w-full py-3 bg-sky-500 text-white rounded-lg font-semibold hover:bg-sky-600 transition"
          >
            Send Reset Link
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
          <Link href="/signin" className="text-sky-500 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
