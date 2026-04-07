import axios from "axios";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const ChatBotWidget = () => {
  const { user } = useContext(AuthContext);

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const res = await axios.post("/api/chat", {
        message: input,
        userEmail: user?.email, // ✅ important
      });

      const botMsg = {
        role: "bot",
        text: res.data.reply,
      };

      setMessages((prev) => [...prev, botMsg]);

    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Something went wrong 🌿" },
      ]);
    }

    setInput("");
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
                <div
                  className={`px-3 py-2 rounded-lg max-w-[75%] text-sm ${
                    m.role === "user"
                      ? "bg-green-700 text-white"
                      : "bg-white border border-green-200 text-gray-700"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

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