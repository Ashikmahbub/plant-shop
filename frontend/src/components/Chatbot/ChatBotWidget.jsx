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

  // ✅ auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };

    // ✅ show instantly
    setMessages((prev) => [...prev, userMsg]);

    // ✅ clear input instantly
    setInput("");

    // ✅ typing indicator ON
    setIsTyping(true);

    try {
      const res = await axios.post("/api/chat", {
        message: userMsg.text,
        userEmail: user?.email,
      });

      let botMsg;

      // ✅ order card support
      if (res.data.type === "order") {
        botMsg = {
          role: "bot",
          type: "order",
          data: res.data.data,
        };
      } else {
        botMsg = {
          role: "bot",
          text: res.data.reply,
        };
      }

      setMessages((prev) => [...prev, botMsg]);

    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Something went wrong 🌿" },
      ]);
    } finally {
      // ✅ typing indicator OFF
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">

      {/* FLOAT BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="bg-green-700 hover:bg-green-800 text-white p-4 rounded-full shadow-lg transition"
      >
        💬
      </button>

      {/* CHAT BOX */}
      {open && (
        <div className="w-[90vw] sm:w-80 h-[70vh] sm:h-96 bg-white rounded-xl shadow-2xl mt-3 flex flex-col overflow-hidden border border-green-200">

          {/* HEADER */}
          <div className="bg-green-700 text-white p-3 font-semibold text-center">
            🌿 Plant Assistant
          </div>

          {/* MESSAGES */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-green-50">

            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${
                  m.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {m.type === "order" ? (
                  <div className="bg-white border border-green-200 rounded-lg p-3 text-sm w-full max-w-[85%]">

                    <div className="font-semibold text-green-700 mb-1">
                      #{m.data.displayId}
                    </div>

                    {m.data.items.map((item, idx) => (
                      <div key={idx} className="text-gray-600">
                        {item.title} × {item.quantity}
                      </div>
                    ))}

                    <div className="flex justify-between mt-2 text-xs">
                      <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                        {m.data.status}
                      </span>
                      <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">
                        {m.data.payment}
                      </span>
                    </div>

                    <div className="text-right font-semibold text-green-700 mt-2">
                      ৳ {m.data.total}
                    </div>

                    {m.data.message && (
                      <div className="text-xs text-gray-500 mt-2">
                        {m.data.message}
                      </div>
                    )}
                  </div>
                ) : (
                  <div
                    className={`px-3 py-2 rounded-lg max-w-[75%] text-sm ${
                      m.role === "user"
                        ? "bg-green-700 text-white"
                        : "bg-white border border-green-200 text-gray-700"
                    }`}
                  >
                    {m.text}
                  </div>
                )}
              </div>
            ))}

            {/* ✅ AI typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-green-200 px-3 py-2 rounded-lg text-sm text-gray-500 animate-pulse">
                  🌿 AI is typing...
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* INPUT */}
          <div className="p-2 border-t flex gap-2 bg-white">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1 border border-green-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
              placeholder="Ask about plants..."
            />
            <button
              onClick={sendMessage}
              className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded text-sm"
            >
              Send
            </button>
          </div>

        </div>
      )}
    </div>
  );
};

export default ChatBotWidget;