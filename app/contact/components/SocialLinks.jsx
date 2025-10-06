import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function SocialLinks() {
  return (
    <div className="text-center mt-10 space-x-6">
      <a href="#" className="inline-block text-blue-600 hover:text-blue-800 text-2xl">
        <FaFacebook />
      </a>
      <a href="#" className="inline-block text-pink-500 hover:text-pink-700 text-2xl">
        <FaInstagram />
      </a>
      <a href="#" className="inline-block text-blue-700 hover:text-blue-900 text-2xl">
        <FaLinkedin />
      </a>
      <a href="#" className="inline-block text-sky-500 hover:text-sky-700 text-2xl">
        <FaTwitter />
      </a>
    </div>
  );
}
