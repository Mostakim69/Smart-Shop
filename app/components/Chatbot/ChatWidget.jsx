"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";

const faqData = [
  {
    keywords: ["refund", "return"],
    answer:
      "Yes, we do offer refunds. 🛍️ If your product is damaged, defective, or not as described, you can request a refund. Please provide clear proof (photos or videos) showing the issue. Once verified, the seller will process your refund within 3–5 business days.",
  },
  {
    keywords: ["track", "tracking", "order id"],
    answer:
      "To track your order, go to **My Account → Orders → Track Order**. Enter your **Order ID**, and you’ll see the current delivery status 📦.",
  },
  {
    keywords: ["account", "create", "signup", "register"],
    answer:
      "To create an account, click on **Login/Register**, fill in your information (name, email, password), and click **Sign Up**. Your SmartShop account will be created instantly ✨.",
  },
  {
    keywords: ["order", "buy", "checkout"],
    answer:
      "To place an order, simply click **Buy Now** on a product, or add it to your **Cart** and proceed to **Checkout**. Then complete your payment securely 💳.",
  },
  {
    keywords: ["delivery", "shipping"],
    answer:
      "Our delivery time is usually **5–7 business days** depending on your location 🚚. You’ll receive a tracking link once your order is shipped.",
  },
];

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Hi there! Welcome to SmartShop." },
    { sender: "bot", text: "How can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    // Find best match by checking keywords
    const found = faqData.find((f) =>
      f.keywords.some((word) => input.toLowerCase().includes(word))
    );

    const botReply = found
      ? found.answer
      : "Sorry 😅 I didn’t quite catch that. Please try asking about refunds, tracking, or how to order.";

    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
    }, 600);

    setInput("");
  };

  return (
    <>
      {/* Floating Button */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        className="fixed bottom-6 right-6 z-50 bg-secondary text-white p-4 rounded-full cursor-pointer shadow-lg"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.div>

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
            {/* Header */}
            <div className="bg-secondary text-white p-4 font-semibold flex items-center justify-between">
              💬 SmartShop Assistant
            </div>

            {/* Chat Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-3 text-sm">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`p-2 rounded-lg max-w-[80%] leading-snug ${
                    msg.sender === "user"
                      ? "bg-secondary text-white ml-auto"
                      : "bg-gray-100 text-gray-700"
                  }`}
                  dangerouslySetInnerHTML={{ __html: msg.text }} // supports **bold** text
                />
              ))}
            </div>

            {/* Input Area */}
            <form
              onSubmit={handleSend}
              className="flex items-center p-3 border-t border-gray-200"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 px-3 py-2 text-sm border text-gray-500 rounded-lg focus:outline-none focus:ring-1 focus:ring-secondary"
                placeholder="Type your question..."
              />
              <button
                type="submit"
                className="ml-2 px-4 py-2 bg-secondary text-white rounded-lg text-sm hover:bg-primary transition"
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

