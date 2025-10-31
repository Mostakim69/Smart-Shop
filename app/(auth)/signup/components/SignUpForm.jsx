"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import ImageUpload from "./ImageUpload";
import { Eye, EyeOff, User, Mail, Lock, CheckCircle, XCircle } from "lucide-react";

export default function SignUpForm() {
  const { signup, updateUserProfile } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploadedImageURL, setUploadedImageURL] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const isNameValid = formData.name.length >= 2;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
  const isPasswordValid = formData.password.length >= 6;
  const isFormValid = isNameValid && isEmailValid && isPasswordValid && uploadedImageURL;

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!uploadedImageURL) return alert("Please upload a profile photo.");

    try {
      setLoading(true);
      await signup(formData.email, formData.password);
      await updateUserProfile(formData.name, uploadedImageURL);

      const userData = {
        name: formData.name,
        email: formData.email,
        photo: uploadedImageURL,
        role: "user",
        gemPoints: 0,
        createdAt: new Date(),
      };

      const res = await fetch("https://smart-shop-server-three.vercel.app/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      const data = await res.json();

      if (res.ok) {
        alert("Signup successful!");
        router.push("/");
      } else {
        alert(data.message || "Something went wrong!");
      }
    } catch (err) {
      console.error(err);
      alert(err.message || "Error signing up!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignUp} className="space-y-4">
      {/* Name Input */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">Full Name</label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <User size={20} />
          </div>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full pl-10 pr-3 py-3 text-gray-900 border rounded-xl text-sm
                       ${formData.name ? (isNameValid ? "border-green-500" : "border-red-500") : "border-gray-300"}`}
            placeholder="Full Name"
            required
          />
          {formData.name &&
            (isNameValid ? (
              <CheckCircle className="absolute right-2 top-1/2 transform -translate-y-1/2 text-green-500 w-4 h-4" />
            ) : (
              <XCircle className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500 w-4 h-4" />
            ))}
        </div>
      </div>

      {/* Profile Photo */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">Profile Photo</label>
        <div className="h-[46px]">
          <ImageUpload onImageUpload={(url) => setUploadedImageURL(url)} />
        </div>
        {!uploadedImageURL && (
          <p className="text-xs text-orange-500 flex items-center gap-1">
            <XCircle className="w-3 h-3" />
            Required
          </p>
        )}
        {uploadedImageURL && (
          <p className="text-xs text-green-500 flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            Uploaded
          </p>
        )}
      </div>

      {/* Row: Email + Password */}
      <div className="flex gap-3">
        {/* Email */}
        <div className="flex-1 space-y-1">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Mail size={18} />
            </div>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full pl-9 pr-3 py-2 text-gray-900 border rounded-xl text-sm
                         ${formData.email ? (isEmailValid ? "border-green-500" : "border-red-500") : "border-gray-300"}`}
              placeholder="Email"
              required
            />
            {formData.email &&
              (isEmailValid ? (
                <CheckCircle className="absolute right-2 top-1/2 transform -translate-y-1/2 text-green-500 w-4 h-4" />
              ) : (
                <XCircle className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500 w-4 h-4" />
              ))}
          </div>
        </div>

        {/* Password */}
        <div className="flex-1 space-y-1">
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Lock size={18} />
            </div>
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              className={`w-full pl-9 pr-9 py-2 text-gray-900 border rounded-xl text-sm
                         ${formData.password ? (isPasswordValid ? "border-green-500" : "border-red-500") : "border-gray-300"}`}
              placeholder="Password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading || !isFormValid}
        className={`w-full py-3 rounded-xl font-semibold text-white shadow-md
                   ${loading || !isFormValid ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-lg"}`}
      >
        {loading ? "Creating..." : "Create Account"}
      </button>
    </form>
  );
}
