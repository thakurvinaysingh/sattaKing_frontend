import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";// adjust path if needed

function AgentHeader({ onLogout }) {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-[#4E7584] flex items-center justify-between px-4 md:px-8 shadow z-20">
      <h1 className="text-xl md:text-2xl font-bold tracking-tight text-[#63B0CD]">Agent Dashboard</h1>
      <button
        onClick={onLogout}
        className="ml-auto bg-[#63B0CD] hover:bg-[#4E7584] transition text-white font-bold px-5 py-2 rounded-lg shadow"
      >
        Logout
      </button>
    </header>
  );
}

 function Footer() {
    return (
      <footer className="text-center py-4 bg-transparent text-sm text-gray-500">
        © 2025 <span className="font-semibold">dailysattaresult</span>. All rights reserved.
      </footer>
    );
  }

export default function AgentLayout() {
  const [open, setOpen] = useState(true);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();          // Clear user context/localStorage
    navigate("/login"); // Redirect to login
  };

  return (
    <div className="flex min-h-screen bg-[#4E7584]/10">
      <div className="flex flex-col flex-1 min-h-screen">
        <AgentHeader onLogout={handleLogout} />
        <main className="flex-1 px-2 sm:px-0 py-0 pt-16 bg-transparent">
          <Outlet />
        </main>
        <Footer/>

      </div>
    </div>
  );
}

