import React, { useState } from "react";
import Link from "next/link";
import Swal from "sweetalert2";

export default function SellerProductsOrder({ order }) {
  const [selectedStep, setSelectedStep] = useState("");

  const handleUpdateTracking = async () => {
    if (!selectedStep) {
      Swal.fire("Select a step first!", "", "warning");
      return;
    }

    try {
      const res = await fetch(`/api/tracking/update/${order._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stepTitle: selectedStep }),
      });

      if (res.ok) {
        Swal.fire("Updated!", "Tracking updated successfully", "success");
      } else {
        Swal.fire("Error!", "Failed to update tracking", "error");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error!", "Something went wrong", "error");
    }
  };

  return (
    <div
      className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <div className="flex justify-between mb-3">
        <span className="font-semibold">Order ID:</span>
        <span>{order._id}</span>
      </div>
      <div className="flex justify-between mb-3">
        <span className="font-semibold">Customer:</span>
        <span>{order.name}</span>
      </div>
      <div className="flex justify-between mb-3">
        <span className="font-semibold">Total:</span>
        <span>৳ {order.totalAmount}</span>
      </div>
      <div className="flex justify-between mb-3">
        <span className="font-semibold">Date:</span>
        <span>{new Date(order.orderDate).toLocaleDateString()}</span>
      </div>
      <div className="flex justify-between mb-4">
        <span className="font-semibold">Status:</span>
        <span
          className={`px-2 py-1 rounded-full text-sm ${
            order.status === "pending"
              ? "bg-yellow-100 text-yellow-800"
              : order.status === "shipped"
              ? "bg-blue-100 text-blue-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {order.status || "pending"}
        </span>
      </div>

      {/* ✅ Actions */}
      <div className="flex justify-between items-center">
        <Link  href={`/seller/order/${order._id}`} className="btn btn-primary btn-sm text-white rounded-sm
        ">
          View Details
        </Link>

        <div className="flex items-center gap-2">
          <select
            value={selectedStep}
            onChange={(e) => setSelectedStep(e.target.value)}
            className="border rounded-md px-2 py-1 text-sm"
          >
            <option value="">Select Step</option>
            <option value="At Division Hub">At Division Hub</option>
            <option value="At District Hub">At District Hub</option>
            <option value="At Upazila Hub">At Upazila Hub</option>
            <option value="With Delivery Man">With Delivery Man</option>
            <option value="Delivered">Delivered</option>
          </select>

          <button
            onClick={handleUpdateTracking}
            className="btn btn-sm rounded-sm btn-primary text-white px-3 py-1 text-sm hover:bg-blue-600"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
