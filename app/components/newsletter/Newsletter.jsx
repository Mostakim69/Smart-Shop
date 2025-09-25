
"use client";
import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    // Connect to backend later
    console.log("Subscribed Email:", email); 
    setEmail("");
  };

  return (
    <section className="py-12">
      <div className="max-w-3xl mx-auto text-center px-4">
        {/* Title */}
        <h2 className="text-3xl font-bold mb-2">Join the Smart Shop Updates 🛒</h2>

        {/* Subtitle */}
        <p className="text-lg mb-6">
          Stay up to date with the latest deals, new products, and exclusive offers from Smart Shop. Enter your email and never miss out!
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full sm:w-2/3 px-4 py-3 rounded-lg border  focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="px-6 py-3 cursor-pointer bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition"
          >
            Subscribe
          </button>
        </form>

        {/* Privacy Note */}
        <p className="text-sm mt-4">
          We respect your privacy. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
