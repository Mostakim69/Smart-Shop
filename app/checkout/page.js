"use client"
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Footer from "@/app/components/shared/footer/Footer";
import Navbar from "../components/shared/Navbar";
import axios from "axios";
import Swal from "sweetalert2";

export default function CheckoutPage() {
    const searchParams = useSearchParams();
    const type = searchParams.get("type");
    const productId = searchParams.get("id");
    const email = searchParams.get("email");

    const [items, setItems] = useState([]);

    useEffect(() => {
        if (type === "single" && productId) {
            // 1️⃣ Buy Now case
            axios.get(`https://smart-shop-server-three.vercel.app/products/${productId}`)
                .then(res => setItems([res.data]))
                .catch(err => console.log(err));
        }
        else if (type === "cart" && email) {
            // 2️⃣ Cart Checkout case
            axios.get(`https://smart-shop-server-three.vercel.app/cartItems?email=${email}`)
                .then(res => setItems(res.data))
                .catch(err => console.log(err));
        }
    }, [type, productId, email]);

    const handleOrder = (e) => {
        e.preventDefault();
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500
        });
    }

    const totalPrice = items.reduce((a, c) => a + c.price * (c.quantity || 1), 0)


    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 p-6 mt-10 mb-10 bg-base-200 rounded-2xl shadow-md w-full">
                {/* Left side - Delivery info */}
                <div className="flex-1 bg-base-100 p-6 rounded-xl shadow">
                    <h2 className="text-2xl font-bold text-primary mb-6">Shipping Information</h2>
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
                        <select className="select select-bordered w-full">
                            <option disabled selected>
                                Select Payment Method
                            </option>
                            <option>Cash on Delivery</option>
                            <option>Bkash / Nagad / Rocket</option>
                            <option>Credit/Debit Card</option>
                        </select>
                        <button type="submit" className="btn btn-primary w-full mt-4">
                            Place Order
                        </button>
                    </form>
                </div>

                {/* Right side - Order summary */}
                <div className="w-full lg:w-1/3 bg-base-100 p-6 rounded-xl shadow">
                    <h3 className="text-xl font-semibold text-primary mb-4">Order Summary</h3>
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
                                        Quantity: {item.quantity}
                                    </p>
                                </div>
                            </div>
                            <span className="font-semibold text-primary">৳ {item.price}</span>
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
