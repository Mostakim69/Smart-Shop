
"use client";

import { useAuth } from "@/context/AuthContext";

export default function SocialButton({ icon, provider }) {
  const { loginWithGoogle, loginWithFacebook } = useAuth();

  const handleClick = async () => {
    try {
      if (provider === "google") {
        await loginWithGoogle();
      } else if (provider === "facebook") {
        await loginWithFacebook();
      }
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="w-12 h-12 flex items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-100"
    >
      {icon}
    </button>
  );
}
