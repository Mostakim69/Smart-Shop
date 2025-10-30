"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import axios from "axios";

export default function SellerProductsOrder({ order }) {
  const [stepTitle, setStepTitle] = useState("");
  const [tracking, setTracking] = useState(null);

  console.log(tracking?.steps);


  useEffect(() => {
    const fetchTracking = async () => {
      try {
        const res = await axios.get(`https://smart-shop-server-three.vercel.app/trackings?orderId=${order._id}`);
        setTracking(res.data);
      } catch (err) {
        console.error("Failed to fetch tracking data", err);
      }
    };

    fetchTracking();
  }, [order._id]);

  const handleUpdateTracking = async () => {
    if (!stepTitle) {
      Swal.fire("Select a step first!", "", "warning");
      return;
    }

    const resUpdate = await axios.patch(`http://localhost:5000/tracking/update/${order._id}`, { stepTitle });
    if (resUpdate.data.modifiedCount) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your Tracking Updated successfully",
        showConfirmButton: false,
        timer: 1500,
      });

      setTracking(prev => ({
        ...prev,
        steps: prev.steps.map(step =>      
          step.title === stepTitle
            ? { ...step, done: true, date: new Date().toISOString() }
            : step
        ),
        currentStatus: stepTitle,
      }));

    } else {
      alert("no updated")
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
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Order Status</h3>

        <div className="flex flex-wrap gap-3">
          {tracking?.steps
            ?.filter(step => step.done)
            .map((step, index) => (
              <span
                key={index}
                className="flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium shadow-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {step.title}
              </span>
            ))}
        </div>
      </div>


      {/* ✅ Actions */}
      <div className="flex justify-between items-center">
        <Link href={`/seller/order/${order._id}`} className="btn btn-primary btn-sm text-white rounded-sm
        ">
          View Details
        </Link>

        <div className="flex items-center gap-2">
          <select
            value={stepTitle}
            onChange={(e) => setStepTitle(e.target.value)}
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
