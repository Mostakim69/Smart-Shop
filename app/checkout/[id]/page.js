"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

export default function CheckoutPage() {
    const { id } = useParams(); // URL থেকে product id ধরছে
    const [product, setProduct] = useState(null);

    useEffect(() => {
        if (id) {
            axios
                .get(`https://smart-shop-server-three.vercel.app/products/${id}`)
                .then((res) => setProduct(res.data))
                .catch((err) => console.error(err));
        }
    }, [id]);

    if (!product) return <p className="text-center py-10">Loading...</p>;

    return (
        <div className="container mx-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Product Summary */}
            <div className="bg-base-200 p-6 rounded-xl shadow">
                <h2 className="text-2xl font-bold text-primary mb-4">Order Summary</h2>
                <div className="flex items-center gap-4">
                    {/* <img
                        src={product.image}
                        alt={product.name}
                        className="w-28 h-28 object-cover rounded-lg border"
                    /> */}
                    <div>
                        <h3 className="text-lg font-semibold text-base-content">
                            {product.name}
                        </h3>
                        <p className="text-secondary">Price: {product.price} ৳</p>
                        <p className="text-sm text-gray-500 mt-1">
                            Category: {product.category}
                        </p>
                    </div>
                </div>
            </div>

            {/* Checkout Form */}
            <div className="bg-base-200 p-6 rounded-xl shadow">
                <h2 className="text-2xl font-bold text-primary mb-4">Checkout</h2>
                <form className="space-y-4">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Full Name</label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    {/* Address */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Address</label>
                        <textarea
                            placeholder="Enter your address"
                            className="textarea textarea-bordered w-full"
                            required
                        ></textarea>
                    </div>

                    {/* Payment Method */}
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Payment Method
                        </label>
                        <select className="select select-bordered w-full">
                            <option>Cash on Delivery</option>
                            <option>Bkash</option>
                            <option>Nagad</option>
                            <option>Credit/Debit Card</option>
                        </select>
                    </div>

                    {/* Confirm Button */}
                    <button className="btn btn-primary w-full mt-4">
                        Confirm Order
                    </button>
                </form>
            </div>
        </div>
    );
}
