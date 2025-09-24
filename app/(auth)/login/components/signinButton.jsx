"use client";

export default function SigninButton() {
  const handleSignUp = (e) => {
    e.preventDefault();
    alert("Sign Up Clicked!");
    // এখানে তুমি Firebase Auth / NextAuth / Custom API call লিখতে পারো
  };

  return (
    <button
      type="submit"
      onClick={handleSignUp}
      className="w-full py-3 rounded-lg bg-black text-white font-medium hover:opacity-90 transition"
    >
      Sign Up
    </button>
  );
}
