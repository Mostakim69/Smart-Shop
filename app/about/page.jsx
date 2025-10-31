"use client";
import React from "react";
import Hero from "./components/Hero";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/footer/Footer";
import WhyChooseUse from "./components/WhyChooseUse";
import Stories from "./components/Stories";
import Team from "./components/Team";
import Count from "./components/Count";

export default function AboutPage() {
  return (
    <div className=" bg-base-100">
      <Navbar />
      <Hero />
      <Count />
      <Stories />
      <WhyChooseUse />
      <Team />
      <Footer />
    </div>
  );
}
