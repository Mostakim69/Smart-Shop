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

      // Prepare full user data
      const userData = {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL || "https://i.ibb.co/default-user.png", 
        role: "user",
        createdAt: new Date(),
      };

      // Send to backend
      const res = await fetch("https://smart-shop-server-three.vercel.app/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const result = await res.json();

      if (res.ok) {
        console.log("User saved:", result);
        router.push("/"); // redirect home
      } else {
        
         router.push("/");
      }

    } catch (err) {
      console.error("Social login error:", err);
      alert(err.message || "An error occurred during social login.");
    }
  };

  return (
    <button onClick={handleClick} className={`flex items-center justify-center ${className}`}>
      {icon}
    </button>
  );
}
