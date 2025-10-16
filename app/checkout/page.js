"use client";

import React, { useEffect, useState } from "react";
import Footer from "@/app/components/shared/footer/Footer";
import Navbar from "../components/shared/Navbar";
import axios from "axios";
import Swal from "sweetalert2";

export const dynamic = "force-dynamic";

export default function CheckoutPage() {
  const [type, setType] = useState(null);
  const [productId, setProductId] = useState(null);
  const [email, setEmail] = useState(null);
  const [items, setItems] = useState([]);


  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setType(params.get("type"));
    setProductId(params.get("id"));
    setEmail(params.get("email"));
  }, []);

  useEffect(() => {
    if (!type) return;

    const fetchData = async () => {
      try {
        if (type === "single" && productId) {
          const res = await axios.get(
            `https://smart-shop-server-three.vercel.app/products/${productId}`
          );
          setItems([{ ...res.data, quantity: 1 }]);
        } else if (type === "cart" && email) {
          const res = await axios.get(
            `https://smart-shop-server-three.vercel.app/cartItems?email=${email}`
          );
          setItems(
            res.data.map((item) => ({ ...item, quantity: item.quantity || 1 }))
          );
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [type, productId, email]);

  const handleOrder = (e) => {
    e.preventDefault();
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Order placed successfully!",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const totalPrice = items.reduce((a, c) => a + c.price * (c.quantity || 1), 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 p-6 mt-10 mb-10 bg-base-200 rounded-2xl shadow-md w-full">
        {/* Left side - Delivery info */}
        <div className="flex-1 bg-base-100 p-6 rounded-xl shadow">
          <h2 className="text-2xl font-bold text-primary mb-6">
            Shipping Information
          </h2>
          <form onSubmit={handleOrder} className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="input input-bordered w-full"
            />
            <input
              type="email"
              required
              placeholder="Email Address"
              className="input input-bordered w-full"
            />
            <input
              type="text"
              placeholder="Phone Number"
              className="input input-bordered w-full"
            />
            <textarea
              placeholder="Full Address"
              className="textarea textarea-bordered w-full"
              rows="3"
            ></textarea>
            <select className="select select-bordered w-full" defaultValue="">
              <option value="" disabled>
                Select Payment Method
              </option>
              <option value="cod">Cash on Delivery</option>
              <option value="mobile">Bkash / Nagad / Rocket</option>
              <option value="card">Credit/Debit Card</option>
            </select>

            <button type="submit" className="btn btn-primary w-full mt-4">
              Place Order
            </button>
          </form>
        </div>

        {/* Right side - Order summary */}
        <div className="w-full lg:w-1/3 bg-base-100 p-6 rounded-xl shadow">
          <h3 className="text-xl font-semibold text-primary mb-4">
            Order Summary
          </h3>
          {items.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center mb-3 border-b pb-3"
            >
              <div className="flex items-center gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-neutral">
                    Quantity: {item.quantity || 1}
                  </p>
                </div>
              </div>
              <span className="font-semibold text-primary">
                ৳ {item.price * (item.quantity || 1)}
              </span>
            </div>
          ))}

          <hr className="my-3" />
          <div className="flex justify-between font-semibold text-lg">
            <span>Total:</span>
            <span className="text-primary">৳ {totalPrice}</span>
          </div>
          <p className="text-sm text-neutral mt-3">
            Delivery within 3–5 business days.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
