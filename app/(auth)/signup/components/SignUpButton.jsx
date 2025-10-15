"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ImageUpload from "./ImageUpload";


export default function SignUpForm() {
  const { signup, updateUserProfile } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploadedImageURL, setUploadedImageURL] = useState(""); // ✅ store uploaded image URL from child

  const handleSignUp = async (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    // ✅ Use uploadedImageURL from ImageUpload component
    const photo = uploadedImageURL || form.photo?.value || "";

    if (!photo) {
      alert("Please upload a photo before signing up.");
      return;
    }

    try {
      setLoading(true);

      // 1 Signup with Firebase
      const result = await signup(email, password);

      // 2 Update Firebase user profile
      await updateUserProfile(name, photo);

      // 3 Prepare user data
      const userData = {
        name,
        email,
        photo,
        role: "user",
        createdAt: new Date(),
      };

      // 4 Send user data to backend
      const res = await fetch("http://localhost:5000/users", {
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

export default function SocialButton({ icon, provider, className }) {
  const { loginWithGoogle, loginWithFacebook, user } = useAuth();
  const router = useRouter(); 

  const handleClick = async () => {
    try {
      let authResult;
      
      if (provider === "google") {
        authResult = await loginWithGoogle();
      } else if (provider === "facebook") {
        authResult = await loginWithFacebook();
      }
      
      // Get the user data from the authentication result
      const user = authResult?.user;
      
      // --- START: Send user data to your backend for a database sync ---
      
      if (user) {
        const res = await fetch('http://localhost:5000/social-login', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: user.displayName,
                email: user.email,
            }),
        });

        const result = await res.json();
        
        if (res.ok) {
            console.log('User synced with backend:', result);
            // Redirect to home page after successful login and sync
            router.push("/"); 
        } else {
            console.error('Backend sync failed:', result.message);
            alert(`Login successful but user sync failed: ${result.message}`);
        }
      }
      // --- END: Send user data to your backend for a database sync ---

    } catch (err) {
      console.error("Social login error:", err);
      // Display a general error if the initial social login fails
      alert(err.message || "An error occurred during social login.");
    }
  };

  return (
    <form onSubmit={handleSignUp} className="space-y-4">
      <input
        name="name"
        placeholder="Name"
        className="input input-bordered w-full"
        required
      />

      {/*  Use your ImageUpload component */}
      <div>
        <label className="font-medium text-gray-700">Upload Photo</label>
        <ImageUpload
          onImageUpload={(url) => setUploadedImageURL(url)} 
        />
      </div>

      <input
        name="email"
        type="email"
        placeholder="Email"
        className="input input-bordered w-full"
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        className="input input-bordered w-full"
        required
      />

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 rounded-lg font-medium transition ${
          loading
            ? "bg-gray-400 text-white cursor-not-allowed"
            : "bg-black text-white hover:opacity-90"
        }`}
      >
        {loading ? "Signing up..." : "Sign Up"}
      </button>
    </form>
    <button
      onClick={handleClick}
      // Use the className prop passed from SignUpPage for styling
      className={`flex items-center justify-center ${className}`}
    >
      {icon}
    </button>
  );
}