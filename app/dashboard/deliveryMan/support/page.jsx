"use client";

import React, { useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

export default function DeliverySupport() {
  // Dummy support tickets
  const [tickets, setTickets] = useState([
    {
      id: 1,
      orderId: "ORD123",
      issueType: "Delivery Delay",
      message: "Customer not at home, need reschedule",
      status: "Pending",
    },
    {
      id: 2,
      orderId: "ORD124",
      issueType: "Wrong Address",
      message: "Address incomplete, cannot deliver",
      status: "Resolved",
    },
  ]);

  const [newTicket, setNewTicket] = useState({
    orderId: "",
    issueType: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const ticket = {
      id: tickets.length + 1,
      ...newTicket,
      status: "Pending",
    };
    setTickets([ticket, ...tickets]);
    setNewTicket({ orderId: "", issueType: "", message: "" });
    alert("Support ticket submitted successfully!");
  };

  return (
    <div className="p-5">
      <h2 className="text-xl font-semibold mb-4">Support Tickets</h2>

      {/* Submit New Ticket */}
      <form
        onSubmit={handleSubmit}
        className="mb-6 border p-4 rounded-xl shadow-sm space-y-3"
      >
        <h3 className="font-semibold">Submit New Ticket</h3>
        <input
          type="text"
          placeholder="Order ID"
          value={newTicket.orderId}
          onChange={(e) =>
            setNewTicket({ ...newTicket, orderId: e.target.value })
          }
          className="w-full border px-3 py-2 rounded-lg"
          required
        />
        <input
          type="text"
          placeholder="Issue Type"
          value={newTicket.issueType}
          onChange={(e) =>
            setNewTicket({ ...newTicket, issueType: e.target.value })
          }
          className="w-full border px-3 py-2 rounded-lg"
          required
        />
        <textarea
          placeholder="Describe your issue"
          value={newTicket.message}
          onChange={(e) =>
            setNewTicket({ ...newTicket, message: e.target.value })
          }
          className="w-full border px-3 py-2 rounded-lg"
          required
        />
        <button
          type="submit"
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          <PlusCircleIcon className="h-5 w-5" /> Submit Ticket
        </button>
      </form>

      {/* Tickets List */}
      {tickets.length === 0 ? (
        <p className="text-gray-500">No support tickets yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="border p-4 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <p>
                <span className="font-semibold">Order ID:</span>{" "}
                {ticket.orderId}
              </p>
              <p>
                <span className="font-semibold">Issue Type:</span>{" "}
                {ticket.issueType}
              </p>
              <p>
                <span className="font-semibold">Message:</span>{" "}
                {ticket.message}
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
