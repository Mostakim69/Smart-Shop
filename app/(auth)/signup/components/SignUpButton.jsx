"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ImageUpload from "./ImageUpload";

export default function SignUpForm() {
  const { signup, updateUserProfile } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploadedImageURL, setUploadedImageURL] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const photo = uploadedImageURL || form.photo?.value || "";

    if (!photo) {
      alert("Please upload a photo before signing up.");
      return;
    }

    try {
      setLoading(true);
      const result = await signup(email, password);
      await updateUserProfile(name, photo);

      const userData = { name, email, photo, role: "user", createdAt: new Date() };
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
      <input name="name" placeholder="Name" className="input input-bordered w-full" required />

      <div>
        <label className="font-medium text-gray-700">Upload Photo</label>
        <ImageUpload onImageUpload={(url) => setUploadedImageURL(url)} />
      </div>

      <input name="email" type="email" placeholder="Email" className="input input-bordered w-full" required />
      <input name="password" type="password" placeholder="Password" className="input input-bordered w-full" required />

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 rounded-lg font-medium transition ${
          loading ? "bg-gray-400 text-white cursor-not-allowed" : "bg-black text-white hover:opacity-90"
        }`}
      >
        {loading ? "Signing up..." : "Sign Up"}
      </button>
    </form>
  );
}
