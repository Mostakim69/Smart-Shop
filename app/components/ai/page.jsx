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
  const { user, role } = useAuth();

  const dashboardPath =
    role === "admin"
      ? "/dashboard/admin"
      : role === "seller"
      ? "/dashboard/seller"
      : "/dashboard/user";

  // Function to speak text
  function speak(message) {
    if (window.speechSynthesis.speaking) window.speechSynthesis.cancel();
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
      toast.error("Voice commands not supported in this browser");
      return;
    }

    const recog = new SpeechRecognition();
    recog.lang = "en-US";
    recog.continuous = false;
    recog.interimResults = false;

    recog.onstart = () => {
      setListening(true);
      toast.success("🎤 Listening...");
    };

    recog.onend = () => {
      setListening(false);
      toast.dismiss(); // Remove previous toast
    };

    recog.onerror = (e) => {
      setListening(false);
      console.error("Voice recognition error:", e);
      toast.error("Voice error, try again");
    };

    recog.onresult = (e) => {
      const transcript = e.results[0][0].transcript.trim().toLowerCase();
      console.log("VOICE:", transcript);

      // Command matching function
      const goTo = (path, msg) => {
        speak(msg);
        router.push(path);
      };

      // Commands
      if (transcript === "home") goTo("/", "Going to Home");
      else if (["products", "product", "shop"].includes(transcript))
        goTo("/products", "Opening Products");
      else if (transcript === "about") goTo("/about", "Opening About Page");
      else if (["contact", "support"].includes(transcript))
        goTo("/contact", "Opening Contact Page");
      else if (transcript === "cart") goTo("/cartPage", "Opening Cart");
      else if (transcript === "dashboard" && user)
        goTo(dashboardPath, "Opening Dashboard");
      else if (["login", "sign in"].includes(transcript))
        goTo("/login", "Opening Login Page");
      else if (transcript === "scroll down") {
        speak("Scrolling down");
        window.scrollBy({ top: 600, behavior: "smooth" });
      } else if (transcript === "scroll up") {
        speak("Scrolling up");
        window.scrollBy({ top: -600, behavior: "smooth" });
      } else if (transcript === "back") {
        speak("Going back");
        router.back();
      } else {
        toast.error("Command not recognized");
        speak("Sorry, I didn't understand that. Please try again.");
      }
    };

    recognitionRef.current = recog;
  }, [router, user, role]);

  // Handle click to start listening
  const handleClick = () => {
    if (!recognitionRef.current) {
      toast.error("Voice engine not ready");
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

  return (
    <div
      className="fixed lg:bottom-[20px] md:bottom-[40px] bottom-[26px] right-[8%] cursor-pointer z-50"
      onClick={handleClick}
      aria-label="Voice Assistant"
    >
      <Image
        src="/voice-control.jpg"
        alt="Voice Assistant"
        title="Tap to speak"
        width={60}
        height={60}
        className="rounded-full hover:scale-110 transition-all shadow-xl border"
      />
    </div>
  );
}
