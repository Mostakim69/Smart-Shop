"use client";

export default function SocialButton({ icon, className }) {
  const handleSocialLogin = () => {
    alert("Social login clicked!");
    // এখানে তুমি Google / Facebook / Apple login handle করতে পারো
  };

  return (
    <button
      onClick={handleSocialLogin}
      className={`w-12 h-12 flex items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-100 ${className}`}
    >
      {icon}
    </button>
  );
}
