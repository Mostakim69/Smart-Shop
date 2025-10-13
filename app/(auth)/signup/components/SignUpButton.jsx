"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

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
    <button
      onClick={handleClick}
      // Use the className prop passed from SignUpPage for styling
      className={`flex items-center justify-center ${className}`}
    >
      {icon}
    </button>
  );
}