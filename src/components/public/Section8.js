// src/components/public/Section8Table.js
import React from "react";

// Demo static data
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const days = Array.from({ length: 31 }, (_, i) => i + 1);
const data = [
  // Only a few demo rows for brevity, add more as needed
  [1, "00", "13", "43", "09", "45", "##", "--", "--", "--", "--", "--", "--"],
  [2, "04", "90", "50", "71", "01", "42", "--", "--", "--", "--", "--", "--"],
  [3, "54", "79", "88", "87", "61", "73", "--", "--", "--", "--", "--", "--"],
  // ... add more rows up to 31
];

export default function Section8Table() {
  return (
    <div className="w-full bg-white py-1 px-0">
      {/* Table Title Bar */}
      <div className="w-full bg-yellow-400 text-center text-xs md:text-sm font-bold py-1 tracking-wide">
        DESAWAR SATTA KING RECORD CHART 2025
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-[700px] w-full border-collapse text-[11px] md:text-xs">
          <thead>
            <tr>
              <th className="bg-blue-600 text-white font-bold px-2 py-1 border border-white">2025</th>
              {months.map((m) => (
                <th
                  key={m}
                  className="bg-blue-600 text-white font-bold px-2 py-1 border border-white"
                >
                  {m}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {days.map((day, i) => (
              <tr key={day}>
                <td className="text-center border px-2 py-1">{day}</td>
                {months.map((_, mIdx) => (
                  <td
                    key={mIdx}
                    className="text-center border px-2 py-1"
                  >
                    {(data[i] && data[i][mIdx + 1]) || "--"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
