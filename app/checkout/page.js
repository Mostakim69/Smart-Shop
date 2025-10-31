"use client";

import React, { useEffect, useState } from "react";
import Footer from "@/app/components/shared/footer/Footer";
import Navbar from "../components/shared/Navbar";
import axios from "axios";
import Swal from "sweetalert2";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export const dynamic = "force-dynamic";

export default function CheckoutPage() {
  // ✅ Added form data state to store user input
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    payment: "",
  });

  // ✅ Existing state
  const [type, setType] = useState(null);
  const [productId, setProductId] = useState(null);
  const [email, setEmail] = useState(null);
  const [items, setItems] = useState([]);
  const { user, setGemPoints, gemPoints } = useAuth();
  const router = useRouter();


  // ✅ Get query parameters (type, id, email) from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setType(params.get("type"));
    setProductId(params.get("id"));
    setEmail(params.get("email"));
  }, []);

  // ✅ Fetch product/cart data from backend based on type
  useEffect(() => {
    if (
      !type ||
      (type === "single" && !productId) ||
      (type === "cart" && !email)
    )
      return;

    const fetchData = async () => {
      try {
        if (type === "single") {
          const res = await axios.get(
            `https://smart-shop-server-three.vercel.app/products/${productId}`
          );
          setItems([{ ...res.data, quantity: 1 }]);
        } else if (type === "cart") {
          const res = await axios.get(
            `https://smart-shop-server-three.vercel.app/cartItems?email=${email}`
          );
          setItems(
            res.data.map((item) => ({ ...item, quantity: item.quantity || 1 }))
          );
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [type, productId, email]);

  // Handle "Place Order" button click
  const handleOrder = (e) => {
    e.preventDefault();


    const orderData = {
      ...formData,
      productId,
      totalAmount: items.reduce((a, c) => a + c.price * (c.quantity || 1), 0),
      orderDate: new Date(),
      items,
      orderUser: user?.email,
      status:"pending"
    };

    console.log(orderData);
    

    if (orderData.payment === 'cashOnDelivery' || orderData.payment === 'Bkash / Nagad / Rocket') {

      if (orderData.payment === 'Bkash / Nagad / Rocket') {
        alert('Payment gateway integration coming soon!')
        // ssl commerce pop up integration can be done here
        // if success then continue to place order otherwise this fuction will be break
      }
      axios.post('https://smart-shop-server-three.vercel.app/orders', orderData)
        .then(async res => {
          if (res.data.insertedId) {

            const orderId = res.data?.insertedId;
            // Tracking data তৈরি করা
            const trackingData = {
              orderId: orderId,
              email: formData.email,
              currentStatus: "Order Placed",
              steps: [
                { title: "Order Placed", date: new Date(), done: true },
                { title: "At Division Hub", date: null, done: false },
                { title: "At District Hub", date: null, done: false },
                { title: "At Upazila Hub", date: null, done: false },
                { title: "With Delivery Man", date: null, done: false },
                { title: "Delivered", date: null, done: false }
              ]
            };

            // ✅ Tracking data backend এ পাঠানো
            try {
              const res = await axios.post('https://smart-shop-server-three.vercel.app/trackings', trackingData);
              console.log("Tracking info saved successfully!");

              if (res.data.insertedId) {
                // ✅ Gem points update
                const resGem = await axios.patch('https://smart-shop-server-three.vercel.app/gemPoints', {
                  email: user.email,
                  points: 10
                });
                if (resGem.data.modifiedCount) {
                  setGemPoints(gemPoints + 10);
                  Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Order placed successfully! and get 10 points",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                  router.push(`/order-success?orderId=${orderId}`);
                }
              }

            } catch (trackingError) {
              console.error("Tracking save failed:", trackingError);
            }
          }

        })
        .catch(err => {
          alert('Data do not go to database')
        })
    }

  };

  console.log(handleOrder)

  // ✅ Calculate total order amount
  const totalPrice = items.reduce((a, c) => a + c.price * (c.quantity || 1), 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 p-6 mt-10 mb-10 bg-base-200 rounded-2xl shadow-md w-full">
        {/* Left side - Shipping form */}
        <div className="flex-1 bg-base-100 p-6 rounded-xl shadow">
          <h2 className="text-2xl font-bold text-primary mb-6">
            Shipping Information
          </h2>

          {/* ✅ Connected form to handleOrder */}
          <form onSubmit={handleOrder} className="space-y-4">
            {/* ✅ Input fields connected to formData state */}
            <input
              type="text"
              placeholder="Full Name"
              className="input input-bordered w-full"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />

            <input
              type="email"
              required
              placeholder="Email Address"
              className="input input-bordered w-full"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Phone Number"
              className="input input-bordered w-full"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />

            <textarea
              placeholder="Full Address"
              className="textarea textarea-bordered w-full"
              rows="3"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            ></textarea>

            <select
              className="select select-bordered w-full"
              value={formData.payment}
              onChange={(e) =>
                setFormData({ ...formData, payment: e.target.value })
              }
            >
              <option value="Select Payment Method">Select Payment Method</option>
              <option value={'cashOnDelivery'}>Cash on Delivery</option>
              <option value={'Bkash / Nagad / Rocket'}>Bkash / Nagad / Rocket</option>
              <option value={'Credit/Debit Card'}>Credit/Debit Card</option>
            </select>

            {/* ✅ Submit button triggers handleOrder */}
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

          {/* ✅ Show all fetched items */}
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