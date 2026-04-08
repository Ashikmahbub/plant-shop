import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import ChatBotWidget from "../../components/Chatbot/ChatBotWidget";

import FloatingButtons from "../../components/ui/FloatingButtons";

const Main = () => {
  const location = useLocation();
  const hideLayout =
    location.pathname.includes("login") || location.pathname.includes("signup");

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      {!hideLayout && <Navbar />}
      <div className="flex-1 w-full">
        <Outlet />
      </div>
      {!hideLayout && <Footer />}
      {!hideLayout && <FloatingButtons />} {/* ← add this */}
      <ChatBotWidget />
    </div>
  );
};

export default Main;
