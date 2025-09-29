import Link from "next/link";
import PasswordInput from "./components/PasswordInput";
import SignUpButton from "./components/SignUpButton";
import ImageUpload from "./components/ImageUpload"; 
import SocialButton from "./components/SocialButton";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import Navbar from "@/app/components/shared/Navbar";

export default function SignUpPage() {
  return (
    <section className="bg-sky-100 min-h-screen">
  <Navbar />

  <div className="flex items-center justify-center py-16 px-4">
    <div className="w-full max-w-md bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden">
      <div className="p-6 flex flex-col justify-center space-y-4">

        {/* Icon */}
        <div className="flex justify-center mb-2">
          <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-sky-200 shadow-inner">
            <span className="text-3xl">📝</span>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-center text-2xl font-bold text-sky-700">Create an Account</h2>
        <p className="text-center text-gray-500 text-sm">
          Sign up to get started on your journey
        </p>

        {/* Form */}
        <form className="mt-4 space-y-3">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-black focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition duration-200 shadow-sm hover:shadow-md"
            required
          />

          {/* Image Upload */}
          <ImageUpload />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-black focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition duration-200 shadow-sm hover:shadow-md"
            required
          />

          {/* Password Input */}
          <PasswordInput name="password" />

          {/* Sign Up Button */}
          <SignUpButton className="w-full py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white font-semibold shadow-lg transition duration-300" />
        </form>

        {/* Already have account */}
        <p className="text-center text-sm text-gray-500 mt-1">
          Already have an account?{" "}
          <Link href="/login" className="text-sky-500 hover:underline font-medium">
            Sign In
          </Link>
        </p>

        {/* Divider */}
        <div className="flex items-center my-4">
          <hr className="flex-1 border-gray-300" />
          <span className="mx-3 text-sm text-gray-400">Or sign in with</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        {/* Social Buttons */}
        <div className="flex justify-center gap-4">
          <SocialButton
            icon={<FcGoogle size={22} />}
            provider="google"
            className="w-12 h-12 rounded-xl border border-gray-300 hover:bg-gray-100 transition shadow-sm"
          />
          <SocialButton
            icon={<FaFacebook size={22} className="text-blue-600" />}
            provider="facebook"
            className="w-12 h-12 rounded-xl border border-gray-300 hover:bg-gray-100 transition shadow-sm"
          />
        </div>

      </div>
    </div>
  </div>
</section>

  );
}
