import Footer from "../components/shared/footer/Footer";
import Navbar from "../components/shared/Navbar";
import ContactForm from "./components/ContactForm";
import ContactInfo from "./components/ContactInfo";
import CTASection from "./components/CTASection";
import FAQSection from "./components/FAQSection";
import GoogleMap from "./components/GoogleMap";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 md:px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Get in Touch
          </h1>
          <p className="mt-4 text-gray-600 text-base md:text-lg">
            We’d love to hear from you! Fill the form or contact us directly.
          </p>
        </div>

        {/* Form + Info + Map */}
        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Left: Form */}
          <div className="w-full">
            <ContactForm/>
          </div>

          {/* Right: ContactInfo + Map */}
          <div className="flex flex-col gap-6 w-full">
            <ContactInfo />
            <GoogleMap />
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <FAQSection />
        </div>
           <div className="mt-16">
          <CTASection />
        </div>
      </main>

      <Footer />
    </>
  );
}
