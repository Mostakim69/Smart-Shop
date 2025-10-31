"use client";
import React from "react";

export default function TrackingSteps({ steps }) {
    return (
        <div className="flex flex-col gap-6">
            {steps.map((step, idx) => (
                <div key={idx} className="flex items-center gap-4">
                    <div className={`w-6 h-6 flex items-center justify-center rounded-full border-2
            ${step.done ? "bg-primary border-primary" : "border-gray-300 bg-white"}
          `}>
                        {step.done && <span className="text-white font-bold">&#10003;</span>}
                    </div>
                    <div>
                        <p className={`font-semibold ${step.done ? "text-primary" : "text-gray-500"}`}>{step.title}</p>
                        {step.date && <p className="text-sm text-gray-400">{new Date(step.date).toLocaleString()}</p>}
                    </div>
                </div>
            ))}
        </div>
    );
}
