import axios from "axios";
import { useState, useContext, useRef, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

const ChatBotWidget = () => {
  const { user } = useContext(AuthContext);

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // ✅ Auto-popup greeting once per session
  useEffect(() => {
    if (sessionStorage.getItem("greeted")) return;
    const timer = setTimeout(() => {
      setOpen(true);
      setMessages([
        { role: "bot", text: "👋 Hi! I'm your Plant Assistant. How can I help you today? 🌿" },
      ]);
      sessionStorage.setItem("greeted", "true");
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    try {
      const res = await axios.post("/api/chat", {
        message: userMsg.text,
        userEmail: user?.email,
      });
      let botMsg;
      if (res.data.type === "order") {
        botMsg = { role: "bot", type: "order", data: res.data.data };
      } else {
        botMsg = { role: "bot", text: res.data.reply };
      }
      setMessages((prev) => [...prev, botMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Something went wrong 🌿" },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    // ✅ Pushed up to bottom-36 so it sits above cart button
    <div className="fixed bottom-36 right-4 z-50 flex flex-col items-end gap-2">

      {/* CHAT BOX */}
      {open && (
        <div className="
          w-[88vw] sm:w-80
          h-[55vh] sm:h-96
          bg-white rounded-2xl shadow-2xl
          flex flex-col overflow-hidden
          border border-green-200
        ">
          {/* HEADER with close button */}
          <div className="bg-green-700 text-white px-4 py-3 flex items-center justify-between">
            <span className="font-semibold text-sm">🌿 Plant Assistant</span>
            <button
              onClick={() => setOpen(false)}
              className="text-white hover:text-green-200 text-lg leading-none font-bold transition"
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          {/* MESSAGES */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-green-50 text-sm">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                {m.type === "order" ? (
                  <div className="bg-white border border-green-200 rounded-xl p-3 text-sm w-full max-w-[85%]">
                    <div className="font-semibold text-green-700 mb-1">#{m.data.displayId}</div>
                    {m.data.items.map((item, idx) => (
                      <div key={idx} className="text-gray-600">{item.title} × {item.quantity}</div>
                    ))}
                    <div className="flex justify-between mt-2 text-xs">
                      <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">{m.data.status}</span>
                      <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full">{m.data.payment}</span>
                    </div>
                    <div className="text-right font-semibold text-green-700 mt-2">৳ {m.data.total}</div>
                    {m.data.message && (
                      <div className="text-xs text-gray-500 mt-2">{m.data.message}</div>
                    )}
                  </div>
                ) : (
                  <div className={`px-3 py-2 rounded-2xl max-w-[78%] text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-green-700 text-white rounded-br-sm"
                      : "bg-white border border-green-200 text-gray-700 rounded-bl-sm"
                  }`}>
                    {m.text}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-green-200 px-4 py-2 rounded-2xl rounded-bl-sm text-sm text-gray-400 animate-pulse">
                  🌿 typing...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* ✅ Modern rounded input */}
          <div className="p-2 border-t border-green-100 bg-white">
            <div className="flex items-center gap-2 bg-gray-50 border border-green-200 rounded-full px-4 py-1.5 focus-within:ring-2 focus-within:ring-green-400 transition">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                className="flex-1 bg-transparent text-sm focus:outline-none text-gray-700 placeholder-gray-400"
                placeholder="Ask about plants..."
              />
              <button
                onClick={sendMessage}
                className="bg-green-700 hover:bg-green-800 text-white w-7 h-7 rounded-full flex items-center justify-center transition flex-shrink-0"
                aria-label="Send"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                  <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FLOAT BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="bg-green-700 hover:bg-green-800 text-white w-13 h-13 p-3.5 rounded-full shadow-lg transition"
        aria-label="Toggle chat"
      >
        {open ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
          </svg>
        ) : (
          <span className="text-xl">💬</span>
        )}
      </button>
    </div>
  );
};

export default ChatBotWidget;