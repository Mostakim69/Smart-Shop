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
    
    <section>
      <Navbar/>
      <div className="min-h-screen flex items-center justify-center pt-20 pb-20 bg-gradient-to-b from-sky-200 to-white px-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden">
        <div className="p-6 flex flex-col justify-center">
          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gray-100">
              <span className="text-2xl">📝</span>
            </div>
          </div>

          <h2 className="text-center text-xl font-semibold text-primary">Create an account</h2>
          <p className="text-center text-gray-500 text-sm mt-1">
            Sign up to get started with your journey
          </p>

          {/* Form */}
          <form className="mt-6 space-y-3">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400"
              required
            />

            {/* Image Upload */}
            <ImageUpload />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400"
              required
            />

            {/* Password Input */}
            <PasswordInput name="password" />

            {/* Sign Up Button */}
            <SignUpButton />
          </form>

          <p className="text-center text-sm mt-6 text-gray-500">
            Already have an account?
            <Link href="/login" className="text-sky-500 hover:underline">
              Sign In
            </Link>
          </p>
           {/* Divider */}
                    <div className="flex items-center my-6">
                      <hr className="flex-1 border-gray-300" />
                      <span className="mx-3 text-sm text-gray-400">Or sign in with</span>
                      <hr className="flex-1 border-gray-300" />
                    </div>
          
                    {/* Social Buttons */}
                    <div className="flex justify-center gap-4">
                      <SocialButton icon={<FcGoogle size={22} />} provider="google" />
                      <SocialButton
                        icon={<FaFacebook size={22} className="text-blue-600" />}
                        provider="facebook"
                      />
                    </div>
        </div>
      </div>
    </div>
    </section>
  );
}
