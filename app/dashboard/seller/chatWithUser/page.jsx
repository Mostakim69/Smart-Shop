"use client";

import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useAuth } from "@/context/AuthContext";
import { Check, Store, User } from "lucide-react";
import Image from "next/image";

// const socket = io("http://localhost:5000"); 

export default function chatWithUser() {
  const { user } = useAuth();
  const [receiver, setReceiver] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [socket, setSocket] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const newSocket = io("http://localhost:5000");
    setSocket(newSocket);
    return () => newSocket.disconnect();
  }, []);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Listen for messages
  useEffect(() => {
    if (!socket) return;
    socket.on("adminMessage", (msg) => setMessages((prev) => [...prev, msg]));
    return () => socket.off("adminMessage");
  }, [socket]);


  useEffect(() => {
    setReceiver({
      name: "Tisha Islam",
      email: "tisaaa@gmail.com.com",
      image: "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png",
    });
  }, []);

  const sendMessage = () => {
    if (!input.trim() || !socket) return;

    const newMsg = { sender: "admin", text: input, read: false };
    socket.emit("adminReply", input);
    setMessages((prev) => [...prev, newMsg]);
    setInput("");
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 border rounded-xl shadow-sm overflow-hidden">
      {/* 🔹 Chat Header */}
      <div className="bg-white border-b px-4 py-4 flex justify-between items-center ">
        {/* User info */}
        <div className="flex items-center gap-3 py-2">
          {receiver?.image ? (
            <img
              src={receiver.image}
              alt={receiver.name}
              width={40}
              height={40}
              className="rounded-full object-cover border"
            />
          ) : (
            <div className="w-10 h-10 bg-gray-200 flex items-center justify-center rounded-full">
              <User className="text-gray-500" size={20} />
            </div>
          )}
          <div>
            <h2 className="font-semibold text-gray-900">{receiver?.name}</h2>
            <p className="text-xs text-gray-500">{receiver?.email}</p>
          </div>
        </div>

        {/* Seller info */}
        <div className="flex items-center gap-3 border-l pl-4 py-2">
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt={user.displayName || "Seller"}
              width={40}
              height={40}
              className="rounded-full object-cover border"
            />
          ) : (
            <div className="w-10 h-10 bg-gray-200 flex items-center justify-center rounded-full">
              <Store className="text-gray-500" size={20} />
            </div>
          )}
          <div>
            <h2 className="font-semibold text-gray-900">
              {user?.displayName || "Seller"}
            </h2>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* 🔹 Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.sender === "admin" ? "justify-end" : "justify-start"
              }`}
          >
            <div
              className={`p-3 rounded-2xl max-w-[70%] text-sm shadow-sm ${msg.sender === "admin"
                  ? "bg-secondary text-white rounded-br-none"
                  : "bg-gray-200 text-gray-800 rounded-bl-none"
                }`}
            >
              <p>{msg.text}</p>
              {msg.sender === "admin" && (
                <div className="flex justify-end items-center gap-1 mt-1 text-[10px] opacity-80">
                  <Check size={12} className="text-gray-200" />
                  <Check size={12} className="text-gray-200 -ml-2" />
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* 🔹 Input */}
      <div className="bg-white border-t p-3 flex items-center">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
          className="flex-1 px-3 py-2 text-sm border rounded-xl focus:ring-2 focus:ring-secondary focus:outline-none"
        />
        <button
          onClick={sendMessage}
          className="ml-2 px-5 py-2 bg-secondary text-white text-sm font-semibold rounded-xl hover:bg-secondary transition-all"
        >
          Send
        </button>
      </div>
    </div>
  );
}