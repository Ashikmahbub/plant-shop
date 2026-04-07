import React, { useState } from "react";

const ChatBotWidget = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-50">

      {/* BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="bg-green-700 text-white p-4 rounded-full shadow-lg"
      >
        💬
      </button>

      {/* CHAT BOX */}
      {open && (
        <div className="w-80 h-96 bg-white shadow-xl rounded-lg mt-3 p-4">
          <div className="font-bold mb-2">Plant Assistant 🌿</div>

          <div className="text-sm text-gray-600">
            Ask about plants, orders, delivery...
          </div>

          {/* SIMPLE INPUT */}
          <input
            className="mt-4 w-full border px-3 py-2"
            placeholder="Type message..."
          />
        </div>
      )}
    </div>
  );
};

export default ChatBotWidget;