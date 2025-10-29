// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import { io } from "socket.io-client";

// const socket = io("http://localhost:5000"); // replace with your backend URL in production

// export default function ChatWithUser() {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const messagesEndRef = useRef(null);

//   // Scroll to bottom on new message
//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(scrollToBottom, [messages]);

//   useEffect(() => {
//     // Listen for messages from customer
//     socket.on("adminMessage", (msg) => {
//       setMessages((prev) => [...prev, msg]);
//     });

//     return () => {
//       socket.off("adminMessage");
//     };
//   }, []);

//   const sendMessage = () => {
//     if (!input.trim()) return;
//     // Send to customer
//     socket.emit("adminReply", input);
//     // Show in seller chat
//     setMessages((prev) => [...prev, { sender: "admin", text: input }]);
//     setInput("");
//   };

//   return (
//     <div className="p-4 h-screen flex flex-col">
//       <h2 className="text-2xl font-bold mb-4">Chat With Users</h2>
//       <div className="flex-1 overflow-y-auto border rounded p-2 space-y-2">
//         {messages.map((msg, i) => (
//           <div
//             key={i}
//             className={`p-2 rounded max-w-[70%] ${
//               msg.sender === "admin"
//                 ? "bg-blue-500 text-white ml-auto"
//                 : "bg-gray-200 text-black"
//             }`}
//           >
//             {msg.text}
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>

//       <div className="flex mt-2">
//         <input
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           className="flex-1 px-3 py-2 border rounded"
//           placeholder="Type a reply..."
//           onKeyDown={(e) => {
//             if (e.key === "Enter") sendMessage();
//           }}
//         />
//         <button
//           onClick={sendMessage}
//           className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }


"use client";

import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { Send } from "lucide-react";

const socket = io("http://localhost:5000"); // replace with your backend URL

export default function chatWithUser() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages]);

  // Listen for customer messages
  useEffect(() => {
    socket.on("adminMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socket.off("adminMessage");
  }, []);

  // Send admin message
  const sendMessage = () => {
    if (!input.trim()) return;
    const newMsg = { sender: "admin", text: input };
    socket.emit("adminReply", input);
    setMessages((prev) => [...prev, newMsg]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-4 mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">💬 Chat With Users</h2>
        <span className="text-sm text-gray-500">Active Conversation</span>
      </div>

      {/* Chat Area */}
      <div className="flex-1 bg-white border border-gray-200 rounded-lg shadow-inner overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && (
          <p className="text-gray-400 text-center text-sm mt-20">
            No messages yet. Start chatting with your customer!
          </p>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.sender === "admin" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-2xl max-w-[70%] text-sm leading-snug shadow-sm ${
                msg.sender === "admin"
                  ? "bg-blue-600 text-white rounded-br-none"
                  : "bg-gray-100 text-gray-800 rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="mt-4 flex items-center bg-white border border-gray-200 rounded-lg shadow-sm px-3 py-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a reply..."
          className="flex-1 border-none outline-none text-gray-700 placeholder-gray-400 text-sm px-2"
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Send size={18} className="mr-1" />
          Send
        </button>
      </div>
    </div>
  );
}
