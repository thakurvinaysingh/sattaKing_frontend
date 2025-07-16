// src/components/public/MainResultSection.js
import React from "react";

export default function MainResultSection() {
  return (
    <div className="bg-emerald-950 text-white max-w-xs mx-auto rounded-xl p-4 mb-4 shadow">
      <div className="text-center mb-2">
        <div className="font-bold text-base">Today's Lucky Number</div>
        <div className="text-green-300 text-2xl tracking-widest my-2 font-mono">
          37 83 14 02 21 43 54 78 20 63
        </div>
        <div className="text-[10px] text-gray-300">
          <div>2025-07-14</div>
          <div>09:10:00</div>
        </div>
      </div>
      <div className="mt-2">
        <div className="font-bold text-yellow-200 text-sm">Payment</div>
        <ul className="text-green-200 text-xs ml-3 my-1 list-disc">
          <li>Paytm: 1234567890</li>
          <li>PhonePe: 1234567890</li>
        </ul>
        <a
          href="https://wa.me/911234567890"
          className="inline-block bg-green-300 text-gray-900 px-4 py-1 rounded-lg font-bold mt-2"
          target="_blank" rel="noopener noreferrer"
        >WHATSAPP</a>
      </div>
    </div>
  );
}
