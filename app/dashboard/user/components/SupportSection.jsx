"use client";
import { useState } from "react";
import { LifebuoyIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function SupportSection() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-10 bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-xl flex flex-col lg:flex-row justify-between items-center relative">
      <div>
        <h2 className="text-xl font-bold">Need Help?</h2>
        <p className="text-indigo-100 mt-1">
          Contact our support team for order, refund, or account assistance.
        </p>
      </div>

      <button
        onClick={() => setOpen(true)}
        className="mt-3 lg:mt-0 bg-white text-indigo-600 px-5 py-2 rounded-lg shadow hover:bg-gray-100 transition flex items-center gap-2"
      >
        <LifebuoyIcon className="w-5 h-5" />
        Contact Support
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white text-gray-800 p-6 rounded-xl shadow-xl w-11/12 md:w-1/3 relative">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-semibold mb-3 text-indigo-600">
              Contact Support
            </h3>

            <p className="text-sm text-gray-600 mb-4">
              Please describe your issue below, and our support team will get back to you soon.
            </p>

            <form className="space-y-3">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200"
              />
              <textarea
                placeholder="Write your message..."
                rows="4"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200"
              ></textarea>
              <button
                type="submit"
                className="bg-indigo-600 text-white w-full py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
