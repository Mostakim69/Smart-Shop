"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { CheckIcon, XMarkIcon, ArrowPathIcon, ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";

export default function AdminSupportDashboard() {
  const { user } = useAuth();
  const [supportTickets, setSupportTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchSupportTickets();
  }, []);

  const fetchSupportTickets = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/support");
      const data = await res.json();
      setSupportTickets(data);
    } catch (err) {
      console.error("Failed to fetch support tickets:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await fetch(`http://localhost:5000/support/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      setSupportTickets((prev) =>
        prev.map((t) =>
          t._id === id ? { ...t, status: newStatus } : t
        )
      );
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const filteredTickets = supportTickets.filter(ticket => {
    if (filter === "all") return true;
    return ticket.status === filter;
  });

  const getStatusCount = (status) => {
    return supportTickets.filter(ticket => ticket.status === status).length;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center mb-4 sm:mb-0">
            <div className="bg-indigo-100 p-3 rounded-lg mr-4">
              <ChatBubbleLeftRightIcon className="w-8 h-8 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Support Customer</h1>
              <p className="text-gray-600">Review customers and update your work status accordingly.</p>
            </div>
          </div>
          <button
            onClick={fetchSupportTickets}
            className="flex items-center gap-2 bg-white text-gray-700 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            <ArrowPathIcon className="w-5 h-5" />
            Refresh
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 md:mb-8">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Tickets</p>
              <p className="text-2xl font-bold text-gray-900">{supportTickets.length}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <ChatBubbleLeftRightIcon className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">{getStatusCount("Pending")}</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <div className="w-6 h-6 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-orange-600">{getStatusCount("In Progress")}</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <ArrowPathIcon className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Resolved</p>
              <p className="text-2xl font-bold text-green-600">{getStatusCount("Resolved")}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckIcon className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-xl p-1 shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-wrap gap-1">
          {["all", "Pending", "In Progress", "Resolved"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex-1 min-w-[120px] text-center ${
                filter === status
                  ? "bg-indigo-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {status === "all" ? "All Tickets" : status}
            </button>
          ))}
        </div>
      </div>

      {/* Tickets Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User Details
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Message
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTickets.map((ticket) => (
                <tr key={ticket._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{ticket.name}</p>
                      <p className="text-sm text-gray-500">{ticket.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-900 line-clamp-2">{ticket.message}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        ticket.status === "Resolved"
                          ? "bg-green-100 text-green-800"
                          : ticket.status === "In Progress"
                          ? "bg-orange-100 text-orange-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {ticket.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-2">
                      <button
                        onClick={() => updateStatus(ticket._id, "In Progress")}
                        className="inline-flex items-center gap-1 bg-orange-50 text-orange-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-orange-100 transition-colors border border-orange-200"
                      >
                        <ArrowPathIcon className="w-4 h-4" />
                        Progress
                      </button>
                      <button
                        onClick={() => updateStatus(ticket._id, "Resolved")}
                        className="inline-flex items-center gap-1 bg-green-50 text-green-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors border border-green-200"
                      >
                        <CheckIcon className="w-4 h-4" />
                        Resolve
                      </button>
                      <button
                        onClick={() => updateStatus(ticket._id, "Pending")}
                        className="inline-flex items-center gap-1 bg-yellow-50 text-yellow-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-yellow-100 transition-colors border border-yellow-200"
                      >
                        <XMarkIcon className="w-4 h-4" />
                        Pending
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden">
          {filteredTickets.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No tickets found
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredTickets.map((ticket) => (
                <div key={ticket._id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-medium text-gray-900">{ticket.name}</h3>
                      <p className="text-sm text-gray-500">{ticket.email}</p>
                    </div>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        ticket.status === "Resolved"
                          ? "bg-green-100 text-green-800"
                          : ticket.status === "In Progress"
                          ? "bg-orange-100 text-orange-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {ticket.status}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">{ticket.message}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => updateStatus(ticket._id, "In Progress")}
                      className="flex-1 min-w-[100px] inline-flex items-center justify-center gap-1 bg-orange-50 text-orange-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-orange-100 transition-colors border border-orange-200"
                    >
                      <ArrowPathIcon className="w-4 h-4" />
                      Progress
                    </button>
                    <button
                      onClick={() => updateStatus(ticket._id, "Resolved")}
                      className="flex-1 min-w-[100px] inline-flex items-center justify-center gap-1 bg-green-50 text-green-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors border border-green-200"
                    >
                      <CheckIcon className="w-4 h-4" />
                      Resolve
                    </button>
                    <button
                      onClick={() => updateStatus(ticket._id, "Pending")}
                      className="flex-1 min-w-[100px] inline-flex items-center justify-center gap-1 bg-yellow-50 text-yellow-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-yellow-100 transition-colors border border-yellow-200"
                    >
                      <XMarkIcon className="w-4 h-4" />
                      Pending
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {filteredTickets.length === 0 && supportTickets.length > 0 && (
          <div className="text-center py-8 text-gray-500">
            No tickets match the current filter
          </div>
        )}

        {supportTickets.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No support tickets found
          </div>
        )}
      </div>
    </div>
  );
}