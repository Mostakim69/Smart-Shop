"use client";

import { useState } from "react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { Mail, Lock, Eye, EyeOff, CheckCircle, XCircle } from "lucide-react";

import SignInButton from "./components/signinButton";
import Navbar from "@/app/components/shared/Navbar";
import LottieLogin from "./components/LottieLogin";
import SocialButton from "../signup/components/SocialButton";

export default function SignInPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Validation states
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
  const isPasswordValid = formData.password.length >= 6;
  const isFormValid = isEmailValid && isPasswordValid;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navbar />

      <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-12 pt-10 pb-5 px-4 max-w-7xl mx-auto">

        {/* Left: Lottie Animation */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center">
          <div className="max-w-lg w-full h-[400px] lg:h-[450px] relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full blur-3xl opacity-30 -z-10"></div>
            <LottieLogin className="w-full h-full object-contain" />
          </div>
          <div className="text-center mt-4 max-w-md">
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              Welcome Back to Smart Shop!
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Log in to explore amazing deals and continue shopping with ease.
              New here?{" "}
              <Link
                href="/signup"
                className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
              >
                Join us today
              </Link>
            </p>
          </div>

        </div>

        {/* Right: Sign In Card */}
        <div className="w-full max-w-md">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/60 p-8 lg:p-10">

            {/* Header */}
            <div className="text-center mb-2">
              <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 mx-auto mb-4 shadow-lg">
                <span className="text-2xl text-white">🔐</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome Back
              </h2>
              <p className="text-gray-500 text-base">Sign in to your account</p>
            </div>

            {/* Form */}
            <form className="space-y-3">
              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full pl-11 pr-4 py-3.5 text-gray-900 placeholder-gray-400 
                               bg-white border rounded-xl
                               focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                               transition-all duration-200
                               shadow-sm
                               ${formData.email ? (isEmailValid ? 'border-green-500' : 'border-red-500') : 'border-gray-300'}`}
                    placeholder="your@email.com"
                    required
                  />
                  {formData.email && (isEmailValid
                    ? <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 w-5 h-5" />
                    : <XCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500 w-5 h-5" />
                  )}
                </div>
                {formData.email && !isEmailValid && (
                  <p className="text-red-500 text-xs flex items-center gap-1">
                    <XCircle className="w-3 h-3" /> Please enter a valid email
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <Link href="/login/passwordReset" className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full pl-11 pr-12 py-3.5 text-gray-900 placeholder-gray-400 
                               bg-white border rounded-xl
                               focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                               transition-all duration-200
                               shadow-sm
                               ${formData.password ? (isPasswordValid ? 'border-green-500' : 'border-red-500') : 'border-gray-300'}`}
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {formData.password && !isPasswordValid && (
                  <p className="text-red-500 text-xs flex items-center gap-1">
                    <XCircle className="w-3 h-3" /> Password must be at least 6 characters
                  </p>
                )}
              </div>

              {/* Remember Me */}
              <div className="flex items-center">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 font-medium">Remember me</span>
                </label>
              </div>

              {/* Sign In Button */}
              <div className="pt-2">
                <SignInButton disabled={!isFormValid} />
              </div>
            </form>

            {/* Divider */}
            <div className="flex items-center my-4">
              <hr className="flex-1 border-gray-300" />
              <span className="mx-4 text-sm font-medium text-gray-500 bg-white/80 px-3 py-1 rounded-full">
                Or continue with
              </span>
              <hr className="flex-1 border-gray-300" />
            </div>

            {/* Social Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
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

            {/* Sign Up Link */}
            <p className="text-center text-sm text-gray-500 mt-8 leading-relaxed">
              Don&apos;t have an account?
              <Link href="/signup" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
                Sign up now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
