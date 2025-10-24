"use client";
import React, { useEffect, useState } from "react";
import { use } from "react";
import axios from "axios";
import ProgressBar from "../components/ProgressBar";
import TrackingSteps from "../components/TrackingSteps";
import Navbar from "@/app/components/shared/Navbar";

export default function OrderTracking({ params }) {
    // ✅ unwrap params using React.use()
    const { orderId } = use(params);

    const [tracking, setTracking] = useState(null);

    useEffect(() => {
        const fetchTracking = async () => {
            try {
                const res = await axios.get(`https://smart-shop-server-three.vercel.app/trackings?orderId=${orderId}`);
                setTracking(res.data);
            } catch (err) {
                console.error("Failed to fetch tracking data", err);
            }
        };

        fetchTracking();
    }, [orderId]);

    if (!tracking) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div>
            <Navbar></Navbar>
            <div className="max-w-4xl mx-auto p-6 mt-10 bg-base-200 rounded-2xl shadow-lg">
                <h1 className="text-2xl font-bold text-primary mb-4">Order Tracking</h1>
                <p className="mb-6 text-gray-600">Order ID: <span className="font-semibold">{tracking.orderId}</span></p>

                {/* Progress Bar */}
                <ProgressBar steps={tracking.steps}></ProgressBar>
                {/* Steps */}
                <TrackingSteps steps={tracking.steps} />

                {/* Current Status */}
                <div className="mt-8 p-4 bg-base-100 rounded-lg shadow">
                    <p className="font-semibold text-lg">Current Status: <span className="text-primary">{tracking.currentStatus}</span></p>
                </div>
            </div>
        </div>
    );
}
