"use client";
import React from "react";
import Hero from "./components/Hero";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/footer/Footer";

export default function AboutPage() {
  return (
    <div className="bg-gray-50 text-gray-800">
    <Navbar />
    <Hero />
    <Footer />
    </div>
  );
}
