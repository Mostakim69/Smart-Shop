"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Hi there! Welcome to SmartShop.How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [constraints, setConstraints] = useState(null);


  // Listen for messages from admin
  useEffect(() => {
    socket.on("customerReply", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("customerReply");
    };
  }, []);

  useEffect(() => {
    setConstraints({
      top: 0,
      left: 0,
      right: window.innerWidth - 80,
      bottom: window.innerHeight - 80,
    });
  }, []);


  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);


    // Send message to server
    socket.emit("customerMessage", input);

    setInput("");
  };

  return (
    <>
      {/* Floating Button */}

      {constraints && (
        <motion.div
          drag
          dragElastic={0.2}
          dragMomentum={false}
          whileHover={{ scale: 1.1 }}
          className="fixed z-50 bg-secondary text-white p-4 rounded-full cursor-pointer shadow-lg"
          style={{ bottom: 24, right: 24 }}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
        </motion.div>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-20 right-6 w-80 bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 z-50"
          >
            <div className="bg-secondary text-white p-4 font-semibold flex items-center justify-between">
              💬 Live Chat Support
            </div>

            <div className="h-80 overflow-y-auto p-4 space-y-3 text-sm">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`p-2 rounded-lg max-w-[80%] leading-snug ${msg.sender === "user"
                    ? "bg-secondary text-white ml-auto"
                    : "bg-gray-100 text-gray-700"
                    }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            <form
              onSubmit={handleSend}
              className="flex items-center p-3 border-t border-gray-200"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 px-3 py-2 text-sm border text-gray-500 rounded-lg focus:outline-none focus:ring-1 focus:ring-secondary"
                placeholder="Type a message..."
              />
              <button
                type="submit"
                className="ml-2 px-4 py-2 bg-secondary text-white rounded-lg text-sm hover:cursor-pointer transition"
              >
                Send
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

