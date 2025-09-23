import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaApple } from "react-icons/fa";
import Link from "next/link";
import SignUpButton from "../components/SignUpButton";
import SocialButton from "../components/SocialButton";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-20 pb-20 bg-gradient-to-b from-sky-200 to-white px-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden">
        {/* Form Section */}
        <div className="p-6 flex flex-col justify-center">
          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gray-100">
              <span className="text-2xl">🔑</span>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-center text-xl font-semibold">Sign In</h2>
          <p className="text-center text-gray-500 text-sm mt-1">
            Sign in to access your account
          </p>

          {/* Form */}
          <form className="mt-6 space-y-3">
            <input
              type="email"
              placeholder="Email Address"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400"
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400"
              required
              minLength={6}
            />

            {/* Sign In Button */}
            <SignUpButton>Sign In</SignUpButton>
          </form>

          {/* Forgot password / Sign up */}
          <p className="text-center text-sm mt-4 text-gray-500">
            Don't have an account?{" "}
            <Link href="/signup" className="text-sky-500 hover:underline">
              Sign Up
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
            <SocialButton icon={<FcGoogle size={22} />} />
            <SocialButton
              icon={<FaFacebook size={22} />}
              className="text-blue-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
