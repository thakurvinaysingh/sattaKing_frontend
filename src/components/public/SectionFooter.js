// src/components/public/SectionFooter.js
import React from "react";

const menuLinks = [
  { text: "ABOUT US", url: "#" },
  { text: "DISCLAIMER", url: "#" },
  { text: "PRIVACY POLICY", url: "#" },
  { text: "SITEMAP", url: "#" },
];

const yellowTags = [
  "Satta King", "Satta King darbar", "Gali Result", "Faridabad Satta Result", "Gaziyabad Satta king", "Disawer Result",
  "Satta King 2018", "Satta King 2019", "Satta King 2020", "Satta King 2021", "Satta King 2022", "Satta King 2023", "Satta King 2024",
  "Satta King 2025", "Satta King Record Chart", "Satta Leak number", "Satta King 786", "Satta King leak", "UP game Satta", "Satta Live Result",
  "VIP Satta King", "Satta Smart King", "Satta king online", "Satta king blog", "Delhi Satta king",
  "Delhi Bazar", "UP game king"
];

export default function SectionFooter() {
  return (
    <footer className="bg-black border-t-4 border-red-700 w-full pb-0">
      {/* Top site name box */}
      <div className="flex justify-center pt-2">
        <div className="bg-gray-700 text-white rounded px-2 py-0.5 text-xs font-medium">
          Faridabad Satta Result
        </div>
      </div>

      {/* Menu Links */}
      <div className="flex justify-center flex-wrap gap-1 mt-2">
        {menuLinks.map((link) => (
          <a
            key={link.text}
            href={link.url}
            className="bg-red-500 hover:bg-red-700 transition text-white text-xs font-semibold rounded px-3 py-1 mb-0.5"
          >
            {link.text}
          </a>
        ))}
      </div>

      {/* Yellow Tags */}
      <div className="flex flex-wrap justify-center gap-1 mt-4 px-1">
        {yellowTags.map((tag, idx) => (
          <div
            key={idx}
            className="bg-yellow-300 text-black text-xs font-semibold rounded px-2 py-0.5 mb-1"
            style={{ whiteSpace: "nowrap" }}
          >
            {tag}
          </div>
        ))}
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-400 mt-3 pt-2 pb-1 text-center text-white text-xs font-serif">
        Copyright © 2018-2023 - Satta King Fixed No.
      </div>
    </footer>
  );
}
