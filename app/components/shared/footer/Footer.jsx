import Link from "next/link";
import Image from "next/image";
import { Instagram, Twitter, Facebook, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className=" border-t border-gray-200 py-10">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
        {/* Brand Section */}
        <div>
          <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
            <Image
              src="/logo_3.webp"
              alt="Smart Shop Logo"
              width={40}
              height={40}
            />
            <span className="text-xl font-bold text-gray-800">Smart Shop</span>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            Smart Shop helps businesses manage inventory, track sales, and grow
            with confidence. Your trusted partner in e-commerce success.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/best-sellers">Best Sellers</Link></li>
            <li><Link href="/offers">Offers & Deals</Link></li>
            <li><Link href="/contact">Contact Us</Link></li>
            <li><Link href="/faqs">FAQs</Link></li>
          </ul>
        </div>

        {/* Need Help */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-4">Need Help?</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><Link href="/privacyPolicy">Privacy Policy</Link></li>
            <li><Link href="/returnRefundPolicy">Return & Refund Policy</Link></li>
            <li><Link href="/termAndConditions">Term and Conditions</Link></li>
            <li><Link href="/payment">Payment Methods</Link></li>
            <li><Link href="/track-order">Track your Order</Link></li>
            
          </ul>
        </div>

        {/* Follow Us with Icons */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-4">Follow Us</h4>
          <div className="flex justify-center md:justify-start space-x-3">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="p-2 rounded-full bg-gray-100 hover:bg-pink-100 text-gray-600 hover:text-pink-500 transition"
            >
              <Instagram size={18} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="p-2 rounded-full bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-400 transition"
            >
              <Twitter size={18} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="p-2 rounded-full bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-600 transition"
            >
              <Facebook size={18} />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="p-2 rounded-full bg-gray-100 hover:bg-red-100 text-gray-600 hover:text-red-500 transition"
            >
              <Youtube size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-gray-200 mt-8 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Smart Shop. All Rights Reserved.
      </div>
    </footer>
  );
}
