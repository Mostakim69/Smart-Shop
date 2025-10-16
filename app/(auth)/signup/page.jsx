// app/signup/page.jsx
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import SignUpForm from "./components/SignUpButton";
import SocialButton from "./components/SocialButton";
import Navbar from "@/app/components/shared/Navbar";

export default function SignUpPage() {
  return (
    <section>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center pt-20 pb-20 bg-gradient-to-b  px-4">
        <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden">
          <div className="p-6 flex flex-col justify-center">
            
            {/* Icon */}
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gray-100">
                <span className="text-2xl">📝</span>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-center text-xl font-semibold text-primary">
              Create an Account
            </h2>
            <p className="text-center text-gray-500 text-sm mt-1">
              Sign up to get started
            </p>

            {/* Sign Up Form */}
            <div className="mt-6">
              <SignUpForm />
            </div>

            {/* Sign In Link */}
            <p className="text-center text-sm mt-4 text-gray-500">
              Already have an account?{" "}
              <Link href="/login" className="text-sky-500 hover:underline">
                Login
              </Link>
            </p>

            {/* Divider */}
            <div className="flex items-center my-6">
              <hr className="flex-1 border-gray-300" />
              <span className="mx-3 text-sm text-gray-400">Or sign up with</span>
              <hr className="flex-1 border-gray-300" />
            </div>

            {/* Social Buttons (Side by side with icon + name) */}
            <div className="flex justify-between gap-3">
              <SocialButton
                provider="google"
                className="flex-1 flex items-center cursor-pointer justify-center gap-2 border border-gray-300 rounded-lg py-2 hover:border-sky-400 hover:shadow-md transition bg-white"
                icon={<FcGoogle size={20} />}
              >
                <span className="text-gray-700 font-medium text-sm">Google</span>
              </SocialButton>

              <SocialButton
                provider="facebook"
                className="flex-1 flex items-center cursor-pointer justify-center gap-2 border border-gray-300 rounded-lg py-2 hover:border-blue-400 hover:shadow-md transition bg-white"
                icon={<FaFacebook size={20} className="text-blue-600" />}
              >
                <span className="text-gray-700 font-medium text-sm">Facebook</span>
              </SocialButton>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
