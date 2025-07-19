import React, { useEffect, useState } from "react";
import axios from "axios";

// Helper: format date to dd-mm, and extract month
function formatDate(dateStr) {
  const d = new Date(dateStr);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  return `${dd}-${mm}`;
}
function getMonth(dateStr) {
  // Returns 'mm' (01-12)
  return String(new Date(dateStr).getMonth() + 1).padStart(2, "0");
}

export default function Section8Table() {
  const [tableData, setTableData] = useState({});
  const [dates, setDates] = useState([]);
  const [games, setGames] = useState([]); // Unique game names in order of appearance
  const [loading, setLoading] = useState(true);

  // Pagination state
  const rowsPerPage = 25; // Change as you like
  const [page, setPage] = useState(1);
  const baseURL = process.env.REACT_APP_BASE_URL;
  useEffect(() => {
    axios.get(`${baseURL}/api/results`)
      .then(res => {
        if (res.data && res.data.data) {
          const raw = res.data.data;
          // --- Auto-filter for current month ---
          const now = new Date();
          const currentMonth = String(now.getMonth() + 1).padStart(2, "0");
          const currentYear = now.getFullYear();
          // Filter data for current month and year
          const filteredRaw = raw.filter(row => {
            const rowDate = new Date(row.DateTime);
            return (
              String(rowDate.getMonth() + 1).padStart(2, "0") === currentMonth &&
              rowDate.getFullYear() === currentYear
            );
          });

          // Get all unique game names and their order of appearance
          const gameOrder = [];
          const seenGames = new Set();
          filteredRaw.forEach(row => {
            if (!seenGames.has(row.Name)) {
              seenGames.add(row.Name);
              gameOrder.push(row.Name);
            }
          });

          // Get all unique dates
          const dateSet = new Set();
          filteredRaw.forEach(row => {
            dateSet.add(formatDate(row.DateTime));
          });
          // Sort dates by actual date
          const sortedDates = Array.from(dateSet).sort((a, b) => {
            const [ad, am] = a.split("-").map(Number);
            const [bd, bm] = b.split("-").map(Number);
            return new Date(currentYear, am - 1, ad) - new Date(currentYear, bm - 1, bd);
          });

          // Build lookup table: { [date]: { [gameName]: result } }
          const table = {};
          filteredRaw.forEach(row => {
            const date = formatDate(row.DateTime);
            if (!table[date]) table[date] = {};
            table[date][row.Name] = row.Result;
          });

          setGames(gameOrder);
          setDates(sortedDates);
          setTableData(table);
          setPage(1); // Reset to first page on new data
        }
      })
      .finally(() => setLoading(false));
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(dates.length / rowsPerPage);
  const pagedDates = dates.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <div className="w-full bg-white py-1 px-0">
      <div className="w-full bg-yellow-400 text-center text-xs md:text-sm font-bold py-1 tracking-wide">
        SATTA KING RECORD CHART {new Date().toLocaleString("default", { month: "long" }).toUpperCase()} {new Date().getFullYear()}
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-[700px] w-full border-collapse text-[13px] md:text-xs">
          <thead>
            <tr>
              <th className="bg-[#b8a8a0] text-black font-bold px-2 py-1 border border-white text-center">DATE</th>
              {games.map((g) => (
                <th
                  key={g}
                  className="bg-[#693100] text-white font-bold px-2 py-1 border border-white uppercase text-center"
                >
                  {g}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={1 + games.length} className="text-center py-3">Loading...</td>
              </tr>
            )}
            {!loading && pagedDates.map(date => (
              <tr key={date}>
                <td className="bg-[#d8d0f8] text-black text-center border px-2 py-1 font-bold whitespace-nowrap">{date}</td>
                {games.map(g => (
                  <td key={g} className="text-center border px-2 py-1">
                    {(tableData[date] && tableData[date][g]) ? tableData[date][g] : "XX"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination controls */}
      {!loading && totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 my-2">
          <button
            className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
          >Prev</button>
          <span className="text-xs font-semibold">
            Page {page} / {totalPages}
          </span>
          <button
            className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >Next</button>
        </div>
      )}
    </div>
  );
}


// // src/components/public/Section8Table.js
// import React from "react";

// // Demo static data
// const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
// const days = Array.from({ length: 31 }, (_, i) => i + 1);
// const data = [
//   // Only a few demo rows for brevity, add more as needed
//   [1, "00", "13", "43", "09", "45", "##", "--", "--", "--", "--", "--", "--"],
//   [2, "04", "90", "50", "71", "01", "42", "--", "--", "--", "--", "--", "--"],
//   [3, "54", "79", "88", "87", "61", "73", "--", "--", "--", "--", "--", "--"],
//   // ... add more rows up to 31
// ];

// export default function Section8Table() {
//   return (
//     <div className="w-full bg-white py-1 px-0">
//       {/* Table Title Bar */}
//       <div className="w-full bg-yellow-400 text-center text-xs md:text-sm font-bold py-1 tracking-wide">
//         DESAWAR SATTA KING RECORD CHART 2025
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto">
//         <table className="min-w-[700px] w-full border-collapse text-[11px] md:text-xs">
//           <thead>
//             <tr>
//               <th className="bg-blue-600 text-white font-bold px-2 py-1 border border-white">2025</th>
//               {months.map((m) => (
//                 <th
//                   key={m}
//                   className="bg-blue-600 text-white font-bold px-2 py-1 border border-white"
//                 >
//                   {m}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {days.map((day, i) => (
//               <tr key={day}>
//                 <td className="text-center border px-2 py-1">{day}</td>
//                 {months.map((_, mIdx) => (
//                   <td
//                     key={mIdx}
//                     className="text-center border px-2 py-1"
//                   >
//                     {(data[i] && data[i][mIdx + 1]) || "--"}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// this code show all data last .. in single pages. 

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// // Helper: format date to dd-mm
// function formatDate(dateStr) {
//   const d = new Date(dateStr);
//   const dd = String(d.getDate()).padStart(2, "0");
//   const mm = String(d.getMonth() + 1).padStart(2, "0");
//   return `${dd}-${mm}`;
// }

// export default function Section8Table() {
//   const [tableData, setTableData] = useState({});
//   const [dates, setDates] = useState([]);
//   const [games, setGames] = useState([]); // Unique game names in order of appearance
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios.get("http://localhost:4000/api/results")
//       .then(res => {
//         if (res.data && res.data.data) {
//           const raw = res.data.data;

//           // Get all unique game names and their order of appearance
//           const gameOrder = [];
//           const seenGames = new Set();
//           raw.forEach(row => {
//             if (!seenGames.has(row.Name)) {
//               seenGames.add(row.Name);
//               gameOrder.push(row.Name);
//             }
//           });

//           // Get all unique dates
//           const dateSet = new Set();
//           raw.forEach(row => {
//             dateSet.add(formatDate(row.DateTime));
//           });
//           // Sort dates by actual date
//           const sortedDates = Array.from(dateSet).sort((a, b) => {
//             const [ad, am] = a.split("-").map(Number);
//             const [bd, bm] = b.split("-").map(Number);
//             return new Date(2025, am - 1, ad) - new Date(2025, bm - 1, bd);
//           });

//           // Build lookup table: { [date]: { [gameName]: result } }
//           const table = {};
//           raw.forEach(row => {
//             const date = formatDate(row.DateTime);
//             if (!table[date]) table[date] = {};
//             table[date][row.Name] = row.Result;
//           });

//           setGames(gameOrder);
//           setDates(sortedDates);
//           setTableData(table);
//         }
//       })
//       .finally(() => setLoading(false));
//   }, []);

//   return (
//     <div className="w-full bg-white py-1 px-0">
//       <div className="w-full bg-yellow-400 text-center text-xs md:text-sm font-bold py-1 tracking-wide">
//         SATTA  RECORD CHART  2025
//       </div>

//       <div className="overflow-x-auto">
//         <table className="min-w-[700px] w-full border-collapse text-[13px] md:text-xs">
//           <thead>
//             <tr>
//               <th className="bg-[#b8a8a0] text-black font-bold px-2 py-1 border border-white">DATE</th>
//               {games.map((g) => (
//                 <th
//                   key={g}
//                   className="bg-[#693100] text-white font-bold px-2 py-1 border border-white uppercase"
//                 >
//                   {g}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {loading && (
//               <tr>
//                 <td colSpan={1 + games.length} className="text-center py-3">Loading...</td>
//               </tr>
//             )}
//             {!loading && dates.map(date => (
//               <tr key={date}>
//                 <td className="bg-[#d8d0f8] text-black text-center border px-2 py-1 font-bold">{date}</td>
//                 {games.map(g => (
//                   <td key={g} className="text-center border px-2 py-1">
//                     {(tableData[date] && tableData[date][g]) || ""}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }


// this code with filter all ..

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// // Helper: format date to dd-mm, and to yyyy-mm-dd for filters
// function formatDate(dateStr) {
//   const d = new Date(dateStr);
//   const dd = String(d.getDate()).padStart(2, "0");
//   const mm = String(d.getMonth() + 1).padStart(2, "0");
//   return `${dd}-${mm}`;
// }
// function formatISO(dateStr) {
//   // From dd-mm to yyyy-mm-dd (for input[type=date])
//   const [dd, mm] = dateStr.split("-");
//   return `2025-${mm}-${dd}`;
// }
// function parseISO(isoStr) {
//   // From yyyy-mm-dd to dd-mm
//   const [yyyy, mm, dd] = isoStr.split("-");
//   return `${dd}-${mm}`;
// }

// export default function Section8Table() {
//   const [tableData, setTableData] = useState({});
//   const [dates, setDates] = useState([]);
//   const [games, setGames] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Filters and pagination
//   const [monthFilter, setMonthFilter] = useState(""); // e.g., "01" for January
//   const [dateStart, setDateStart] = useState(""); // e.g., "01-01"
//   const [dateEnd, setDateEnd] = useState("");     // e.g., "31-01"
//   const [page, setPage] = useState(1);
//   const rowsPerPage = 20;

//   // For months dropdown
//   const monthNames = [
//     "January", "February", "March", "April", "May", "June", 
//     "July", "August", "September", "October", "November", "December"
//   ];

//   useEffect(() => {
//     axios.get("http://localhost:4000/api/results")
//       .then(res => {
//         if (res.data && res.data.data) {
//           const raw = res.data.data;

//           // Dynamic game names, order of appearance
//           const gameOrder = [];
//           const seenGames = new Set();
//           raw.forEach(row => {
//             if (!seenGames.has(row.Name)) {
//               seenGames.add(row.Name);
//               gameOrder.push(row.Name);
//             }
//           });

//           // Unique dates
//           const dateSet = new Set();
//           raw.forEach(row => {
//             dateSet.add(formatDate(row.DateTime));
//           });
//           // Sort dates
//           const sortedDates = Array.from(dateSet).sort((a, b) => {
//             const [ad, am] = a.split("-").map(Number);
//             const [bd, bm] = b.split("-").map(Number);
//             return new Date(2025, am - 1, ad) - new Date(2025, bm - 1, bd);
//           });

//           // Lookup table
//           const table = {};
//           raw.forEach(row => {
//             const date = formatDate(row.DateTime);
//             if (!table[date]) table[date] = {};
//             table[date][row.Name] = row.Result;
//           });

//           setGames(gameOrder);
//           setDates(sortedDates);
//           setTableData(table);
//         }
//       })
//       .finally(() => setLoading(false));
//   }, []);

//   // Filter logic
//   let filteredDates = dates;
//   // Month filter
//   if (monthFilter) {
//     filteredDates = filteredDates.filter(date => date.endsWith(`-${monthFilter}`));
//   }
//   // Date range filter
//   if (dateStart) {
//     filteredDates = filteredDates.filter(date => {
//       const [d, m] = date.split("-").map(Number);
//       const [sd, sm] = dateStart.split("-").map(Number);
//       return (new Date(2025, m-1, d) >= new Date(2025, sm-1, sd));
//     });
//   }
//   if (dateEnd) {
//     filteredDates = filteredDates.filter(date => {
//       const [d, m] = date.split("-").map(Number);
//       const [ed, em] = dateEnd.split("-").map(Number);
//       return (new Date(2025, m-1, d) <= new Date(2025, em-1, ed));
//     });
//   }

//   // Pagination logic
//   const totalPages = Math.ceil(filteredDates.length / rowsPerPage);
//   const pagedDates = filteredDates.slice((page - 1) * rowsPerPage, page * rowsPerPage);

//   // Utility: Reset pagination on filter change
//   useEffect(() => { setPage(1); }, [monthFilter, dateStart, dateEnd]);

//   // For default filter: show current month on load
//   useEffect(() => {
//     if (dates.length && !monthFilter) {
//       // Set default to current month if present in data
//       const nowMonth = String(new Date().getMonth() + 1).padStart(2, "0");
//       if (dates.some(date => date.endsWith(`-${nowMonth}`))) {
//         setMonthFilter(nowMonth);
//       }
//     }
//   }, [dates, monthFilter]);

//   return (
//     <div className="w-full bg-white py-1 px-0">
//       <div className="w-full bg-yellow-400 text-center text-xs md:text-sm font-bold py-1 tracking-wide">
//         SATTA RECORD CHART 2025
//       </div>
//       {/* Filter controls */}
//       <div className="flex flex-wrap items-center gap-2 px-2 my-2">
//         {/* Month filter */}
//         <label className="text-xs font-semibold">
//           Month:{" "}
//           <select
//             value={monthFilter}
//             onChange={e => setMonthFilter(e.target.value)}
//             className="border px-2 py-1 rounded text-xs"
//           >
//             <option value="">All</option>
//             {monthNames.map((m, i) => (
//               <option key={m} value={String(i + 1).padStart(2, "0")}>
//                 {m}
//               </option>
//             ))}
//           </select>
//         </label>
//         {/* Date filters */}
//         <label className="text-xs font-semibold">
//           From:{" "}
//           <input
//             type="date"
//             value={dateStart ? `2025-${dateStart.split("-")[1]}-${dateStart.split("-")[0]}` : ""}
//             onChange={e => setDateStart(e.target.value ? parseISO(e.target.value) : "")}
//             className="border px-2 py-1 rounded text-xs"
//             min="2025-01-01"
//             max="2025-12-31"
//           />
//         </label>
//         <label className="text-xs font-semibold">
//           To:{" "}
//           <input
//             type="date"
//             value={dateEnd ? `2025-${dateEnd.split("-")[1]}-${dateEnd.split("-")[0]}` : ""}
//             onChange={e => setDateEnd(e.target.value ? parseISO(e.target.value) : "")}
//             className="border px-2 py-1 rounded text-xs"
//             min="2025-01-01"
//             max="2025-12-31"
//           />
//         </label>
//         {/* Clear filters */}
//         <button
//           onClick={() => { setMonthFilter(""); setDateStart(""); setDateEnd(""); }}
//           className="border border-red-400 text-red-600 text-xs rounded px-2 py-1 ml-2"
//         >
//           Clear
//         </button>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="min-w-[700px] w-full border-collapse text-[13px] md:text-xs">
//           <thead>
//             <tr>
//               <th className="bg-[#b8a8a0] text-black font-bold px-2 py-1 border border-white">DATE</th>
//               {games.map((g) => (
//                 <th
//                   key={g}
//                   className="bg-[#693100] text-white font-bold px-2 py-1 border border-white uppercase"
//                 >
//                   {g}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {loading && (
//               <tr>
//                 <td colSpan={1 + games.length} className="text-center py-3">Loading...</td>
//               </tr>
//             )}
//             {!loading && pagedDates.map(date => (
//               <tr key={date}>
//                 <td className="bg-[#d8d0f8] text-black text-center border px-2 py-1 font-bold whitespace-nowrap">{date}</td>
//                 {games.map(g => (
//                   <td key={g} className="text-center border px-2 py-1">
//                     {(tableData[date] && tableData[date][g]) ? tableData[date][g] : "XX"}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//             {!loading && !pagedDates.length && (
//               <tr>
//                 <td colSpan={1 + games.length} className="text-center py-3">No data found for this filter.</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination controls */}
//       <div className="flex items-center justify-center gap-2 mt-3">
//         <button
//           className="px-2 py-1 border rounded text-xs"
//           disabled={page === 1}
//           onClick={() => setPage(p => Math.max(1, p - 1))}
//         >
//           Prev
//         </button>
//         <span className="text-xs">
//           Page {page} / {totalPages || 1}
//         </span>
//         <button
//           className="px-2 py-1 border rounded text-xs"
//           disabled={page === totalPages || totalPages === 0}
//           onClick={() => setPage(p => Math.min(totalPages, p + 1))}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }


