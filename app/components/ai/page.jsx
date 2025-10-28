"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function Ai() {
  const router = useRouter();
  const [recognition, setRecognition] = useState(null);

  function speak(message) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.rate = 1; 
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  }

  useEffect(() => {
    if (typeof window === "undefined") return;

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      toast.error("Your browser does not support voice commands.");
      return;
    }

    const recog = new SpeechRecognition();
    recog.lang = "en-US";
    recog.continuous = false;

    recog.onstart = () => toast.success("🎤 Listening...");
    recog.onend = () => toast("🛑 Stopped listening");
    recog.onerror = () => toast.error("Something went wrong. Try again!");

    recog.onresult = (e) => {
      const transcript = e.results[0][0].transcript.trim().toLowerCase();
      console.log("Voice Command:", transcript);

      if (transcript.includes("home")) {
        speak("Navigating to Home Page");
        router.push("/");
      } else if (transcript.includes("about")) {
        speak("Navigating to About Page");
        router.push("/about");
      } else if (
        transcript.includes("collection") ||
        transcript.includes("product") ||
        transcript.includes("products")
      ) {
        speak("Navigating to Product Collection");
        router.push("/collection");
      } else if (transcript.includes("cart")) {
        speak("Navigating to Cart Page");
        router.push("/cart");
      } else if (transcript.includes("contact")) {
        speak("Navigating to Contact Page");
        router.push("/contact");
      } else if (
        transcript.includes("order") ||
        transcript.includes("orders") ||
        transcript.includes("my order")
      ) {
        speak("Navigating to Orders Page");
        router.push("/orders");
      } else {
        toast.error("Command not recognized. Please try again.");
        speak("Sorry, I didn't understand that.");
      }
    };

    setRecognition(recog);
  }, [router]);

  // 🎯 Render button
  return (
    <div
      className="fixed lg:bottom-[20px] md:bottom-[40px] bottom-[80px] left-[2%] cursor-pointer z-50"
      onClick={() => {
        if (recognition) recognition.start();
        else toast.error("Voice recognition not ready yet!");
      }}
    >
      <Link href="/">
        <Image
          src="/logo_3.webp"
          alt="AI Voice Assistant Button"
          title="Click to talk with AI Assistant"
          width={60}
          height={60}
          className="rounded-xl hover:scale-110 transition-transform shadow-xl"
        />
      </Link>
    </div>
  );
}

export default Ai;
