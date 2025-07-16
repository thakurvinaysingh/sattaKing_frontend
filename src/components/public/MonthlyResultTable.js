// src/components/public/MonthlyResultTable.js
import React from "react";

const results = [
  { date: "2025-07-01", disawar: 71, gali: 25, faridabad: 48 },
  { date: "2025-07-02", disawar: 39, gali: 11, faridabad: 20 },
  { date: "2025-07-03", disawar: 88, gali: 65, faridabad: 48 },
  { date: "2025-07-04", disawar: 12, gali: 21, faridabad: 32 },
];

export default function MonthlyResultTable() {
  return (
    <div className="bg-yellow-50 rounded-xl max-w-xs mx-auto p-3 overflow-x-auto shadow mb-4">
      <div className="font-bold text-red-700 mb-2">JULY SATTA RESULT</div>
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="bg-yellow-200">
            <th className="border px-2 py-1">Date</th>
            <th className="border px-2 py-1">DISAWAR</th>
            <th className="border px-2 py-1">GALI</th>
            <th className="border px-2 py-1">FARIDABAD</th>
          </tr>
        </thead>
        <tbody>
          {results.map((row) => (
            <tr key={row.date} className="even:bg-yellow-100">
              <td className="border px-2 py-1">{row.date}</td>
              <td className="border px-2 py-1">{row.disawar}</td>
              <td className="border px-2 py-1">{row.gali}</td>
              <td className="border px-2 py-1">{row.faridabad}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
