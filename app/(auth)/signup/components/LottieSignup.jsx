"use client";

import Lottie from "lottie-react";
import animationData from "./signup.json";

export default function LottieSignup() {
  return (
    <div className="w-72 sm:w-80 md:w-96 lg:w-[450px]">
      <Lottie 
        animationData={animationData} 
        loop 
        autoplay 
        className="w-full h-auto" 
      />
    </div>
  );
}
