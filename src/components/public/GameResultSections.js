// src/components/public/GameResultSections.js
import React from "react";

const games = [
  { name: "DISAWAR", time: "05:21 AM", result: "231", color: "border-red-700 text-red-700" },
  { name: "GALI", time: "11:15 PM", result: "421", color: "border-blue-700 text-blue-700" },
  { name: "FARIDABAD", time: "06:15 PM", result: "314", color: "border-green-700 text-green-700" },
  { name: "GAZIABAD", time: "08:40 PM", result: "684", color: "border-yellow-400 text-yellow-600" },
];

export default function GameResultSections() {
  return (
    <div className="flex flex-wrap gap-3 justify-center max-w-xs mx-auto mb-2">
      {games.map((game) => (
        <div key={game.name}
          className={`bg-white ${game.color.split(" ")[0]} border-2 rounded-xl w-36 text-center py-4 shadow`}
        >
          <div className={`${game.color.split(" ")[1]} font-bold text-xs`}>{game.name}</div>
          <div className="text-gray-700 text-[10px]">{game.time}</div>
          <div className={`${game.color.split(" ")[1]} font-bold text-xl`}>{game.result}</div>
        </div>
      ))}
    </div>
  );
}
