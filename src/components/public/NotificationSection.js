// src/components/public/NotificationSection.js
import React from "react";

export default function NotificationSection() {
  return (
    <div className="bg-gray-800 text-white p-4 rounded-xl text-center max-w-xs mx-auto my-3 shadow">
      <div className="font-bold text-base">Good Evening!<br />10:40:50 PM</div>
      <div>Your Lucky numbers are coming!</div>
      <div className="text-green-400 font-bold text-lg mt-1">The day has arrived!<br />🍀🎲🍀</div>
    </div>
  );
}
