"use client";

import Image from "next/image";
import toast from "react-hot-toast";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Ai() {
  const router = useRouter();
  const recognitionRef = useRef(null);
  const [listening, setListening] = useState(false);
  const { user, role, loading } = useAuth();

  const dashboardPath =
    role === "admin"
      ? "/dashboard/admin"
      : role === "seller"
        ? "/dashboard/seller"
        : "/dashboard/user";

  // Function to make the assistant speak
  function speak(message) {
    try {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
        setTimeout(() => {
          const utterance = new SpeechSynthesisUtterance(message);
          utterance.rate = 1;
          utterance.pitch = 1;
          window.speechSynthesis.speak(utterance);
        }, 150);
      } else {
        const utterance = new SpeechSynthesisUtterance(message);
        utterance.rate = 1;
        utterance.pitch = 1;
        window.speechSynthesis.speak(utterance);
      }
    } catch (err) {
      console.error("Speech error:", err);
    }
  }

  // Setup SpeechRecognition
  useEffect(() => {
    if (typeof window === "undefined") return;

    const isEdge = navigator.userAgent.includes("Edg");
    if (isEdge) {
      toast.error(
        "Voice commands may be unreliable in Microsoft Edge. Please use Chrome for best experience."
      );
      return;
    }

    // Define SpeechRecognition
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition ||
      window.mozSpeechRecognition ||
      window.msSpeechRecognition;

    if (!SpeechRecognition) {
      toast.error("Voice commands not supported in this browser");
      return;
    }

    // Create recognition instance
    const recog = new SpeechRecognition();
    recog.lang = "en-US";
    recog.continuous = false;
    recog.interimResults = false;

    // Event: start listening
    recog.onstart = () => {
      setListening(true);
      toast.success("🎤 Listening...");
    };

    // Event: stop listening
    recog.onend = () => {
      setListening(false);
      toast.dismiss();
    };

    //  Event: error handling
    recog.onerror = (e) => {
      console.error("Voice recognition error:", e);
      setListening(false);
      toast.error("Voice recognition failed. Please try again.");
    };

    // Event: process voice command
    recog.onresult = (e) => {
      const transcript = e.results[0][0].transcript.trim().toLowerCase();
      console.log("VOICE COMMAND:", transcript);

      // Helper function for navigation
      const goTo = (path, msg) => {
        speak(msg);
        router.push(path);
      };

      switch (true) {
        case transcript === "open home":
          goTo("/", "Please wait a second. Going to Home");
          break;
        case ["open products", "open product", "open shop"].includes(transcript):
          goTo("/products", "Please wait a second. Opening Products Page");
          break;
        case transcript === "open about":
          goTo("/about", "Please wait a second. Opening About Page");
          break;
        case ["open contact", "support"].includes(transcript):
          goTo("/contact", "Please wait a second. Opening Contact Page");
          break;
        case transcript === "open cart":
          goTo("/cart", "Please wait a second. Opening Cart");
          break;
        case transcript === "dashboard":
          if (loading) {
            speak("Please wait, checking login");
          } else if (user) {
            goTo(dashboardPath, "Please wait a second. Opening Dashboard");
          } else {
            speak("Please log in first");
          }
          break;

        case ["login", "sign in"].includes(transcript):
          goTo("/login", "Please wait a second. Opening Login Page");
          break;
        case transcript === "scroll down":
          speak("Scrolling down");
          window.scrollBy({ top: 600, behavior: "smooth" });
          break;
        case transcript === "scroll up":
          speak("Scrolling up");
          window.scrollBy({ top: -600, behavior: "smooth" });
          break;
        case transcript === "back":
          speak("Please wait a second. Going back");
          router.back();
          break;
        default:
          toast.error("Command not recognized");
          speak("Sorry, I didn't understand that. Please try again.");
      }
    };

    recognitionRef.current = recog;
  }, []);

  // Handle click event
  const handleClick = () => {
    if (!recognitionRef.current) {
      toast.error("Voice engine not ready yet");
      return;
    }

    if (listening) {
      toast("Already listening...");
      return;
    }

    try {
      recognitionRef.current.start();
    } catch (err) {
      console.error("Recognition start error:", err);
    }
  };

  // Floating voice button
  return (
    <div
      className="fixed bottom-[26px] right-[10px] md:right-[6%] lg:bottom-[20px] md:bottom-[40px] cursor-pointer z-50"
      onClick={handleClick}
      aria-label="Voice Assistant"
      title="Tap to speak"
    >
      <Image
        src="/voice-control.jpg"
        alt="Voice Assistant"
        width={60}
        height={60}
        className="rounded-full hover:scale-110 transition-all shadow-xl border"
      />
    </div>
  );
}
