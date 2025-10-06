
"use client";
import React from "react";
import ContactForm from "./components/ContactForm";
import ContactInfo from "./components/ContactInfo";
import GoogleMap from "./components/GoogleMap";
import SocialLinks from "./components/SocialLinks";
import FAQSection from "./components/FAQSection";
import CTASection from "./components/CTASection";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/footer/Footer";


export default function ContactPage() {
  return (
    <>
    <Navbar/>
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-4">Get in Touch</h1>
      <p className="text-center text-gray-600 mb-10">
        We’d love to hear from you! Fill out the form below or reach us through any of the methods listed.
      </p>

      <div className="grid md:grid-cols-2 gap-10">
        <ContactForm />
        <div className="space-y-6">
          <ContactInfo />
          <GoogleMap />
        </div>
      </div>

      <SocialLinks />
      <FAQSection />
      <CTASection />
    </div>
    <Footer/>
    </>
  );
}
