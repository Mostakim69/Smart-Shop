"use client";

import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useAuth } from "@/context/AuthContext";
import { Check, Store, User } from "lucide-react";
import Image from "next/image";

const socket = io("http://localhost:5000"); // Update for production

export default function chatWithUser() {
  const { user } = useAuth(); // 👈 This includes both seller/user info
  const [receiver, setReceiver] = useState(null); // for the person you're chatting with
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Listen for messages
  useEffect(() => {
    socket.on("adminMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socket.off("adminMessage");
  }, []);

  // You can later setReceiver() when user clicks a conversation
  useEffect(() => {
    // Example mock (you’ll replace it with real selected chat user)
    setReceiver({
      name: "John Doe",
      email: "john@example.com",
      image: "/default-user.png",
    });
  }, []);

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMsg = { sender: "admin", text: input, read: false };
    socket.emit("adminReply", input);
    setMessages((prev) => [...prev, newMsg]);
    setInput("");
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 border rounded-xl shadow-sm overflow-hidden">
      {/* 🔹 Chat Header */}
      <div className="bg-white border-b px-4 py-3 flex justify-between items-center">
        {/* User info */}
        <div className="flex items-center gap-3">
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
        <div className="flex items-center gap-3 border-l pl-4">
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
            className={`flex ${
              msg.sender === "admin" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-3 rounded-2xl max-w-[70%] text-sm shadow-sm ${
                msg.sender === "admin"
                  ? "bg-blue-600 text-white rounded-br-none"
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
          className="flex-1 px-3 py-2 text-sm border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <button
          onClick={sendMessage}
          className="ml-2 px-5 py-2 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-all"
        >
          Send
        </button>
      </div>
    </div>
  );
}







// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import { io } from "socket.io-client";
// import { useAuth } from "@/context/AuthContext"; // same AuthContext you use in sidebar
// import { FaRegUserCircle } from "react-icons/fa";

// const socket = io("http://localhost:5000");

// export default function ChatWithUser() {
//   const { user } = useAuth(); // your logged-in user info (photoURL, displayName, role, etc.)
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const messagesEndRef = useRef(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(scrollToBottom, [messages]);

//   useEffect(() => {
//     socket.on("adminMessage", (msg) => {
//       setMessages((prev) => [...prev, msg]);
//     });
//     return () => socket.off("adminMessage");
//   }, []);

//   const sendMessage = () => {
//     if (!input.trim()) return;
//     socket.emit("adminReply", input);
//     setMessages((prev) => [...prev, { sender: user?.role, text: input }]);
//     setInput("");
//   };

//   return (
//     <div className="p-6 h-screen flex flex-col bg-gray-50">
//       {/* ==== Chat Header ==== */}
//       <div className="flex items-center justify-between bg-white shadow-md rounded-xl p-4 mb-4">
//         {/* Left side: Customer Info */}
//         <div className="flex items-center gap-3">
//           {user?.role === "user" ? (
//             <>
//               {user?.photoURL ? (
//                 <img
//                   src={user.photoURL}
//                   alt={user.displayName || "User"}
//                   className="w-10 h-10 rounded-full object-cover"
//                 />
//               ) : (
//                 <FaRegUserCircle className="w-10 h-10 text-gray-400" />
//               )}
//               <div>
//                 <h2 className="font-semibold text-gray-800">
//                   {user?.displayName || "Seller"}
//                 </h2>
//                 <p className="text-sm text-gray-500">Role: {user?.role}</p>
//               </div>
//             </>
//           ) : (
//             <>
//               {user?.photoURL ? (
//                 <img
//                   src={user.photoURL}
//                   alt={user.displayName || "User"}
//                   className="w-10 h-10 rounded-full object-cover"
//                 />
//               ) : (
//                 <FaRegUserCircle className="w-10 h-10 text-gray-400" />
//               )}
//               <div>
//                 <h2 className="font-semibold text-gray-800">
//                   {user?.displayName || "User"}
//                 </h2>
//                 <p className="text-sm text-gray-500">Role: {user?.role}</p>
//               </div>
//             </>
//           )}
//         </div>

//         {/* Right side: The opposite party info (e.g., seller ↔ user) */}
//         <div className="flex items-center gap-3 border-l pl-4">
//           <FaRegUserCircle className="w-10 h-10 text-gray-400" />
//           <div>
//             <h2 className="font-semibold text-gray-800">
//               {user?.role === "seller"}
//             </h2>
//             <p className="text-sm text-gray-500">
//               Chat Partner
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* ==== Chat Body ==== */}
//       <div className="flex-1 overflow-y-auto border bg-white rounded-lg p-4 space-y-2 shadow-sm">
//         {messages.map((msg, i) => (
//           <div
//             key={i}
//             className={`p-3 rounded-lg max-w-[70%] ${
//               msg.sender === user?.role
//                 ? "bg-blue-600 text-white ml-auto"
//                 : "bg-gray-200 text-gray-800"
//             }`}
//           >
//             {msg.text}
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>

//       {/* ==== Chat Input ==== */}
//       <div className="flex mt-4">
//         <input
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           className="flex-1 px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//           placeholder="Type a message..."
//           onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//         />
//         <button
//           onClick={sendMessage}
//           className="px-5 py-2 bg-blue-600 text-white font-medium rounded-r-lg hover:bg-blue-700 transition"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }




// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import { io } from "socket.io-client";
// import { useAuth } from "@/context/AuthContext";
// import { FaRegUserCircle } from "react-icons/fa";

// // ✅ Connect Socket.IO server
// const socket = io("http://localhost:5000", { transports: ["websocket"] });

// export default function ChatWithUser() {
//   const { user } = useAuth();
//   const [chatPartner, setChatPartner] = useState(null); // opposite person (user or seller)
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const messagesEndRef = useRef(null);

//   // ✅ Scroll chat to bottom when messages update
//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };
//   useEffect(scrollToBottom, [messages]);

//   // ✅ Fetch chat partner info dynamically
//   useEffect(() => {
//     const fetchPartner = async () => {
//       if (!user?.role) return;
//       try {
//         // if current user is "user" → get "seller" info, else get "user" info
//         const targetRole = user.role === "user" ? "seller" : "user";
//         const res = await fetch(
//           `https://smart-shop-server-three.vercel.app/users/role/${targetRole}`
//         );

//         if (!res.ok) throw new Error(`HTTP ${res.status}`);
//         const data = await res.json();
//         setChatPartner(data); // backend should return a user object
//       } catch (err) {
//         console.error("Error fetching chat partner:", err);
//       }
//     };
//     fetchPartner();
//   }, [user?.role]);

//   // ✅ Socket listeners
//   useEffect(() => {
//     socket.on("adminMessage", (msg) => {
//       setMessages((prev) => [...prev, msg]);
//     });
//     return () => socket.off("adminMessage");
//   }, []);

//   // ✅ Send message
//   const sendMessage = () => {
//     if (!input.trim()) return;
//     const newMsg = { sender: user?.role, text: input };
//     socket.emit("chatMessage", newMsg);
//     setMessages((prev) => [...prev, newMsg]);
//     setInput("");
//   };

//   return (
//     <div className="p-6 h-screen flex flex-col bg-gray-50">
//       {/* ==== Chat Header ==== */}
//       <div className="flex items-center justify-between bg-white shadow-md rounded-xl p-4 mb-4">
//         {/* Logged-in user info */}
//         <div className="flex items-center gap-3">
//           {user?.photoURL ? (
//             <img
//               src={user.photoURL}
//               alt={user.displayName || "User"}
//               className="w-10 h-10 rounded-full object-cover"
//             />
//           ) : (
//             <FaRegUserCircle className="w-10 h-10 text-gray-400" />
//           )}
//           <div>
//             <h2 className="font-semibold text-gray-800">
//               {user?.displayName || "You"}
//             </h2>
//             <p className="text-sm text-gray-500 capitalize">
//               Role: {user?.role}
//             </p>
//           </div>
//         </div>

//         {/* Chat partner info */}
//         <div className="flex items-center gap-3 border-l pl-4">
//           {chatPartner?.photoURL ? (
//             <img
//               src={chatPartner.photoURL}
//               alt={chatPartner.displayName || "Partner"}
//               className="w-10 h-10 rounded-full object-cover"
//             />
//           ) : (
//             <FaRegUserCircle className="w-10 h-10 text-gray-400" />
//           )}
//           <div>
//             <h2 className="font-semibold text-gray-800">
//               {chatPartner?.displayName ||
//                 (user?.role === "seller" ? "User" : "Seller")}
//             </h2>
//             <p className="text-sm text-gray-500">
//               {chatPartner?.email || "N/A"}
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* ==== Chat Body ==== */}
//       <div className="flex-1 overflow-y-auto border bg-white rounded-lg p-4 space-y-2 shadow-sm">
//         {messages.map((msg, i) => (
//           <div
//             key={i}
//             className={`p-3 rounded-lg max-w-[70%] ${
//               msg.sender === user?.role
//                 ? "bg-blue-600 text-white ml-auto"
//                 : "bg-gray-200 text-gray-800"
//             }`}
//           >
//             {msg.text}
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>

//       {/* ==== Chat Input ==== */}
//       <div className="flex mt-4">
//         <input
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           className="flex-1 px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//           placeholder="Type a message..."
//           onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//         />
//         <button
//           onClick={sendMessage}
//           className="px-5 py-2 bg-blue-600 text-white font-medium rounded-r-lg hover:bg-blue-700 transition"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }

