// app/signup/page.jsx
import Navbar from "@/app/components/shared/Navbar";
import Link from "next/link";
import SignUpForm from "./components/SignUpForm";
import SocialButton from "./components/SocialButton";
import LottieSignup from "./components/LottieSignup";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

export default function SignUpPage() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navbar />

      <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 pt-20 pb-10 px-4 max-w-7xl mx-auto">
        {/* Left: Lottie Animation */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center">
          <div className="max-w-lg w-full">
            <LottieSignup />
          </div>
          <div className="text-center mt-6 max-w-md">
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              Join Thousands of Happy Users
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Start your journey with us and experience seamless productivity.{" "}
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        {/* Right: Signup Card */}
        <div className="w-full max-w-lg">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/60 p-8 lg:p-10">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 mx-auto mb-4 shadow-lg">
                <span className="text-2xl text-white">👤</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Create Account
              </h2>
              <p className="text-gray-500 text-base">Join our community today</p>
            </div>

            {/* Form */}
            <div className="mb-6">
              {/* SignUpForm is client component */}
              <SignUpForm />
            </div>

            {/* Divider */}
            <div className="flex items-center my-8">
              <hr className="flex-1 border-gray-300" />
              <span className="mx-4 text-sm font-medium text-gray-500 bg-white/80 px-3 py-1 rounded-full">
                Or continue with
              </span>
              <hr className="flex-1 border-gray-300" />
            </div>

            {/* Social Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <SocialButton
                provider="google"
                icon={
                  <>
                    <FcGoogle size={22} />
                    <span className="text-sm font-semibold text-gray-700">Google</span>
                  </>
                }
                className="flex-1 flex items-center justify-center gap-3 rounded-xl py-3.5 px-4
                           bg-white border border-gray-300 text-gray-700 font-semibold shadow-sm
                           hover:shadow-md hover:border-gray-400 hover:bg-gray-50
                           active:scale-[0.97] transition-all duration-300"
              />

              <SocialButton
                provider="facebook"
                icon={
                  <>
                    <FaFacebook size={22} className="text-white" />
                    <span className="text-sm font-semibold text-white">Facebook</span>
                  </>
                }
                className="flex-1 flex items-center justify-center gap-3 rounded-xl py-3.5 px-4
                           bg-[#1877F2] text-white font-semibold shadow-sm
                           hover:shadow-md hover:bg-[#166FE5] active:scale-[0.97]
                           transition-all duration-300"
              />
            </div>

            {/* Terms */}
            <p className="text-center text-xs text-gray-500 mt-8 leading-relaxed">
              By creating an account, you agree to our{" "}
              <Link
                href="/terms"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
