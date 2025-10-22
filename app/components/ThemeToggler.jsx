"use client";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggler() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light";
    setTheme(storedTheme);
    document.documentElement.setAttribute("data-theme", storedTheme);
  }, []);

  const handleThemeToggle = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <button
      onClick={handleThemeToggle}
      className="btn btn-ghost btn-circle swap swap-rotate"
    >
      <input type="checkbox" checked={theme === "dark"} readOnly />
      <Sun className="swap-off fill-current w-5 h-5 text-yellow-400" />
      <Moon className="swap-on fill-current w-5 h-5 text-yellow-400" />
    </button>
  );
}
