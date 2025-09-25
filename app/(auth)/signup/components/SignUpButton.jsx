"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUpButton() {
  const { signup, updateUserProfile } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();

    const form = e.target.closest("form");
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    try {
      setLoading(true); 
      const result = await signup(email, password);

      // update profile (name + photo)
      await updateUserProfile(name, photo);

      alert("Signup successful!");
      router.push("/");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <button
      type="submit"
      onClick={handleSignUp}
      disabled={loading}
      className={`w-full py-3 rounded-lg font-medium transition ${
        loading
          ? "bg-gray-400 text-white cursor-not-allowed"
          : "bg-black text-white hover:opacity-90"
      }`}
    >
      {loading ? "Signing up..." : "Sign Up"}
    </button>
  );
}
