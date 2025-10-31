"use client";

import React, { useState, useEffect } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import axios from "axios";

export default function DeliverySupport() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTicket, setNewTicket] = useState({
    name: "",
    email: "",
    message: "",
  });

  // ✅ Fetch all support issues
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5000/issue");
        const formattedTickets = res.data.map((t) => ({
          ...t,
          _id: t._id.toString(), // ensure unique key
        }));
        setTickets(formattedTickets);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, []);

  // ✅ Submit a new support issue
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/issue", newTicket);
      const ticketWithId = { ...newTicket, _id: res.data.insertedId.toString(), status: "Pending" };
      setTickets([ticketWithId, ...tickets]);
      setNewTicket({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      alert("Failed to submit issue");
    }
  };

  // ✅ Update issue status
  const handleStatusUpdate = async (id, status) => {
    try {
      await axios.patch(`http://localhost:5000/issue/${id}`, { status });
      setTickets((prev) =>
        prev.map((t) => (t._id === id ? { ...t, status } : t))
      );
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className="p-5 text-gray-500">Loading issues...</p>;

  return (
    <div className="p-5">
      <h2 className="text-xl font-semibold mb-4">Support Issues</h2>

      {/* Submit New Issue */}
      <form
        onSubmit={handleSubmit}
        className="mb-6 border p-4 rounded-xl shadow-sm space-y-3"
      >
        <h3 className="font-semibold">Submit New Issue</h3>
        <input
          type="text"
          placeholder="Your Name"
          value={newTicket.name}
          onChange={(e) => setNewTicket({ ...newTicket, name: e.target.value })}
          className="w-full border px-3 py-2 rounded-lg"
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          value={newTicket.email}
          onChange={(e) => setNewTicket({ ...newTicket, email: e.target.value })}
          className="w-full border px-3 py-2 rounded-lg"
          required
        />
        <textarea
          placeholder="Describe your issue"
          value={newTicket.message}
          onChange={(e) => setNewTicket({ ...newTicket, message: e.target.value })}
          className="w-full border px-3 py-2 rounded-lg"
          required
        />
        <button
          type="submit"
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          <PlusCircleIcon className="h-5 w-5" /> Submit Issue
        </button>
      </form>

      {/* Issues List */}
      {tickets.length === 0 ? (
        <p className="text-gray-500">No issues reported yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tickets.map((ticket) => (
            <div
              key={ticket._id} // ✅ Unique key
              className="border p-4 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <p>
                <span className="font-semibold">Name:</span> {ticket.name}
              </p>
              <p>
                <span className="font-semibold">Email:</span> {ticket.email}
              </p>
              <p>
                <span className="font-semibold">Message:</span> {ticket.message}
              </p>
              <p>
                <span className="font-semibold">Status:</span>{" "}
                <span
                  className={`${
                    ticket.status === "Pending"
                      ? "text-yellow-600"
                      : ticket.status === "Resolved"
                      ? "text-green-600"
                      : "text-gray-600"
                  } font-semibold`}
                >
                  {ticket.status}
                </span>
              </p>
              {ticket.status === "Pending" && (
                <button
                  onClick={() => handleStatusUpdate(ticket._id, "Resolved")}
                  className="mt-2 bg-green-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-green-700"
                >
                  Mark as Resolved
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
