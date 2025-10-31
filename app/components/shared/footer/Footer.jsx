import Link from "next/link";
import Image from "next/image";
import { Instagram, Twitter, Facebook, Youtube } from "lucide-react";

export default function Footer() {
  return (
    // Theme-aware background and border colors (bg-base-200)
    <footer className="bg-base-200 text-base-content border-t border-base-content/10 py-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8 text-center md:text-left">
        {/* Brand Section */}
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
            <Image
              src="/logo_3.webp"
              alt="Smart Shop Logo"
              width={40}
              height={40}
              className="rounded-lg"
            />
            {/* Theme-aware text-base-content and bold tracking */}
            <span className="text-2xl font-extrabold text-primary ">Smart Shop</span>
          </div>
          {/* Theme-aware text-base-content/80 */}
          <p className="text-base-content/80 text-sm leading-relaxed mt-4">
            Smart Shop helps businesses manage inventory, track sales, and grow
            with confidence. Your trusted partner in e-commerce success.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          {/* Theme-aware text-base-content and added border emphasis */}
          <h4 className="font-bold  text-primary text-lg mb-5 border-b border-primary/20 pb-1 inline-block">
            Quick Links
          </h4>
          {/* Theme-aware text-base-content/90 and increased spacing */}
          <ul className="space-y-3 text-sm text-base-content/90">
            <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
            <li><Link href="/best-sellers" className="hover:text-primary transition-colors">Best Sellers</Link></li>
            <li><Link href="/offers" className="hover:text-primary transition-colors">Offers & Deals</Link></li>
            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
            <li><Link href="/faqs" className="hover:text-primary transition-colors">FAQs</Link></li>
          </ul>
        </div>

        {/* Need Help */}
        <div>
          {/* Theme-aware text-base-content and added border emphasis */}
          <h4 className="font-bold text-primary text-lg mb-5 border-b border-primary/20 pb-1 inline-block">
            Need Help?
          </h4>
          {/* Theme-aware text-base-content/90 and increased spacing */}
          <ul className="space-y-3 text-sm text-base-content/90">
            <li><Link href="/privacyPolicy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            <li><Link href="/returnRefundPolicy" className="hover:text-primary transition-colors">Return & Refund Policy</Link></li>
            <li><Link href="/termAndConditions" className="hover:text-primary transition-colors">Term and Conditions</Link></li>
            <li><Link href="/payment" className="hover:text-primary transition-colors">Payment Methods</Link></li>
            <li><Link href="/track-order" className="hover:text-primary transition-colors">Track your Order</Link></li>
          </ul>
        </div>

        {/* Follow Us with Icons */}
        <div>
          {/* Theme-aware text-base-content and added border emphasis */}
          <h4 className="font-bold text-primary text-lg mb-5 border-b border-primary/20 pb-1 inline-block">
            Follow Us
          </h4>
          <div className="flex justify-center md:justify-start space-x-3 mt-4">
            
            {/* FIX: High-contrast styling (bg-primary/10 and text-primary default) */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="p-3 rounded-full bg-primary/10 text-primary hover:bg-pink-500 hover:text-white transition-all duration-200 shadow-md"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="p-3 rounded-full bg-primary/10 text-primary hover:bg-blue-400 hover:text-white transition-all duration-200 shadow-md"
            >
              <Twitter size={20} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="p-3 rounded-full bg-primary/10 text-primary hover:bg-blue-600 hover:text-white transition-all duration-200 shadow-md"
            >
              <Facebook size={20} />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="p-3 rounded-full bg-primary/10 text-primary hover:bg-red-500 hover:text-white transition-all duration-200 shadow-md"
            >
              <Youtube size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      {/* Theme-aware border and text colors */}
      <div className="border-t border-base-content/10 mt-10 pt-6 text-center text-sm text-base-content/60">
        © {new Date().getFullYear()} Smart Shop. All Rights Reserved.
      </div>
    </footer>
  );
}
