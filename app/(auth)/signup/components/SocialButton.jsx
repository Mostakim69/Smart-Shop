"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function SocialButton({ icon, provider }) {
  const { loginWithGoogle, loginWithFacebook } = useAuth();
  const router = useRouter(); 

  const handleClick = async () => {
    try {
      let result;

      if (provider === "google") {
        result = await loginWithGoogle();
      } else if (provider === "facebook") {
        result = await loginWithFacebook();
      }

      //   user info
      const user = result.user;
      const userData = {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        role: "user", // default role
        createdAt: new Date().toISOString(), 
      };

      //  Send user info to backend
      const response = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      console.log("User added or existing:", data);

      router.push("/");
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
