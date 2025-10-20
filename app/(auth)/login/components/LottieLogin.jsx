"use client";

import Lottie from "lottie-react";
import animationData from "./login.json";


export default function LottieLogin({ className }) {
  return (
    <div className={className}>
      <Lottie animationData={animationData} loop autoplay />
    </div>
  );
}
