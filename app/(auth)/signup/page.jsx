import Link from "next/link";
import Navbar from "@/app/components/shared/Navbar";

import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import SocialButton from "./components/SocialButton";
import SignUpForm from "./components/SignUpButton";

export default function SignUpPage() {
  return (
    <section className="bg-sky-100 min-h-screen">
      <Navbar />
      <div className="flex items-center justify-center py-16 px-4">
        <div className="w-full max-w-md bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden">
          <div className="p-6 flex flex-col justify-center space-y-4">
            <h2 className="text-center text-2xl font-bold text-sky-700">Create an Account</h2>
            <p className="text-center text-gray-500 text-sm">
              Sign up to get started on your journey
            </p>

            {/* ✅ Client Component handles all interactivity */}
            <SignUpForm />

            <p className="text-center text-sm text-gray-500 mt-1">
              Already have an account?{" "}
              <Link href="/login" className="text-sky-500 hover:underline font-medium">
                Sign In
              </Link>
            </p>

            <div className="flex items-center my-4">
              <hr className="flex-1 border-gray-300" />
              <span className="mx-3 text-sm text-gray-400">Or sign in with</span>
              <hr className="flex-1 border-gray-300" />
            </div>

            <div className="flex justify-center gap-4">
              <SocialButton icon={<FcGoogle size={22} />} provider="google" />
              <SocialButton icon={<FaFacebook size={22} className="text-blue-600" />} provider="facebook" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
