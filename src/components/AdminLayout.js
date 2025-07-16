import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

export default function AdminLayout() {
  const [open, setOpen] = useState(true);
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar open={open} setOpen={setOpen} />
      <div className="flex flex-col flex-1 min-h-screen">
        <Header open={open} setOpen={setOpen} title="Admin Panel" />
        <main className="flex-1 p-6 pt-20">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}

