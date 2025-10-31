"use client";
import { useEffect } from "react";
import axios from "axios";
import { Gem } from "lucide-react";
import React from "react";
import { useAuth } from "@/context/AuthContext";

export default function Gems() {
  const { user, gemPoints, setGemPoints } = useAuth();

  useEffect(() => {
    if (!user?.email) return;

    axios
      .get(`https://smart-shop-server-three.vercel.app/users?email=${user.email}`)
      .then((res) => {
        setGemPoints(res.data.gemPoints);
      })
      .catch((err) => {
        console.error("Failed to load user data:", err);
      });
  }, [user?.email, setGemPoints]);
  return (
    <div className="flex items-center gap-2 border border-gray-700 p-1 rounded-lg">
      <Gem className="w-6 h-6 text-gray-700 hover:text-primary" />
      <h1 className="text-gray-700 font-semibold">
        {gemPoints || 0}
      </h1>
    </div>
  );
}
