"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function SocialButton({ icon, provider, className }) {
  const { loginWithGoogle, loginWithFacebook } = useAuth();
  const router = useRouter();

  const handleClick = async () => {
    try {
      let authResult;
      if (provider === "google") authResult = await loginWithGoogle();
      else if (provider === "facebook") authResult = await loginWithFacebook();

      const user = authResult?.user;
      if (!user) return;

      const userData = {
        name: user.displayName || "Unknown User",
        email: user.email || `${user.uid}@${provider}.com`, 
        photo: user.photoURL || "https://i.ibb.co/default-user.png",
        role: "user",
        createdAt: new Date(),
      };

      const res = await fetch("https://smart-shop-server-three.vercel.app/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (res.status === 409) {
        console.log("User already exists, logging in...");
        router.push("/"); // already registered
      } else if (!res.ok) {
        console.error("Failed to save user data", await res.text());
        alert("Failed to save user data. Please try again.");
      } else {
        router.push("/");
      }
    } catch (err) {
      console.error("Social login error:", err);
      alert(err.message || "An error occurred during social login.");
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center justify-center gap-3 px-4 py-3 rounded-lg font-semibold transition-all ${className}`}
    >
      {icon}
    </button>
  );
}
