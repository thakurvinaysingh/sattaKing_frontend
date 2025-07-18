// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function groupByPairs(arr) {
//   const out = [];
//   for (let i = 0; i < arr.length; i += 2) {
//     out.push(arr.slice(i, i + 2));
//   }
//   return out;
// }

// export default function Section7() {
//   const [chartData, setChartData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios
//       .get("http://localhost:4000/api/results")
//       .then((res) => {
//         if (res.data && res.data.data) {
//           // Map API data to chart data directly using populated GID object
//           const cards = res.data.data.map((item) => ({
//             title: item.GID?.name || `GID ${item.GID?._id || ""}`,
//             time: item.GID?.time || "", // Use GID.time if exists
//             result: item.Result,
//             footer: item.GID?.footer || "",
//           }));
//           setChartData(groupByPairs(cards));
//         }
//       })
//       .finally(() => setLoading(false));
//   }, []);

//   return (
//     <section className="w-full">
//       {/* Top Header */}
//       <div className="w-full bg-[#be621e] text-white text-center py-3 border border-black">
//         <div className="text-lg font-extrabold tracking-wide">CHAR MINAR</div>
//         <div className="text-xs mt-0.5">( 04:00 AM )</div>
//         <div className="text-base mt-1 mb-1 font-bold">
//           &#123; 24 &#125;{" "}
//           <span className="inline-block text-green-400 text-base font-bold">➡️ [ ]</span>
//         </div>
//       </div>
//       {/* Chart Heading */}
//       <div className="w-full bg-black text-yellow-400 text-base font-extrabold text-center py-1 border-b-2 border-[#be621e]">
//         CHARMINAR SATTA CHART
//       </div>

//       {/* Card Grid */}
//       <div className="w-full">
//         {loading ? (
//           <div className="text-center text-gray-400 py-8">Loading…</div>
//         ) : chartData.length === 0 ? (
//           <div className="text-center text-gray-400 py-8">No Results</div>
//         ) : (
//           chartData.map((row, rowIndex) => (
//             <div className="flex flex-col md:flex-row border border-black" key={rowIndex}>
//               {row.map((card, colIdx) => (
//                 <div
//                   key={colIdx}
//                   className="flex-1 bg-white border-t-0 border-l-0 border-r border-b border-black"
//                 >
//                   {/* Card Title */}
//                   <div className="text-base font-bold text-blue-800 text-center pt-2 pb-0.5 uppercase">
//                     {card.title}
//                   </div>
//                   {/* Card Time */}
//                   <div className="text-red-600 text-xs font-semibold text-center mb-1">
//                     ( {card.time} )
//                   </div>
//                   {/* Card Result */}
//                   <div className="text-black text-lg font-extrabold text-center mb-1">
//                     &#123; {card.result} &#125;
//                     <span className="inline-block text-green-500 text-base font-bold ml-1">➡️ [ ]</span>
//                   </div>
//                   {/* Card Footer */}
//                   <div className="bg-[#2582e2] text-white text-xs font-bold text-center py-1 mt-2 tracking-wide">
//                     {card.footer}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ))
//         )}
//       </div>
//     </section>
//   );
// }



// // src/components/public/Section7.js
// import React from "react";

// // Chart data, add more rows as needed!
// const chartData = [
//   [
//     {
//       title: "DISAWER",
//       time: "05:10 AM",
//       result: "24",
//       footer: "DISAWER SATTA KING",
//     },
//     {
//       title: "SHRI HARI",
//       time: "11:00 AM",
//       result: "74",
//       footer: "SATTA RESULT",
//     },
//   ],
//   [
//     {
//       title: "RAJSHRI",
//       time: "01:30 PM",
//       result: "29",
//       footer: "SATTA KING LEAK",
//     },
//     {
//       title: "N C R",
//       time: "02:15 PM",
//       result: "58",
//       footer: "SATTA KING LIVE",
//     },
//   ],
//   [
//     {
//       title: "SUNDRAM",
//       time: "02:15 PM",
//       result: "31",
//       footer: "SATTA LEAK NUMBER",
//     },
//     {
//       title: "DELHI DREAM",
//       time: "02:40 PM",
//       result: "25",
//       footer: "SATTA LEAK NUMBER",
//     },
//   ],
// ];

// export default function Section7() {
//   return (
//     <section className="w-full">
//       {/* Top Header */}
//       <div className="w-full bg-[#be621e] text-white text-center py-3 border border-black">
//         <div className="text-lg font-extrabold tracking-wide">CHAR MINAR</div>
//         <div className="text-xs mt-0.5">( 04:00 AM )</div>
//         <div className="text-base mt-1 mb-1 font-bold">
//           &#123; 24 &#125;{" "}
//           <span className="inline-block text-green-400 text-base font-bold">➡️ [ ]</span>
//         </div>
//       </div>
//       {/* Chart Heading */}
//       <div className="w-full bg-black text-yellow-400 text-base font-extrabold text-center py-1 border-b-2 border-[#be621e]">
//         CHARMINAR SATTA CHART
//       </div>

//       {/* Card Grid */}
//       <div className="w-full">
//         {chartData.map((row, rowIndex) => (
//           <div className="flex flex-col md:flex-row border border-black" key={rowIndex}>
//             {row.map((card, colIdx) => (
//               <div
//                 key={colIdx}
//                 className="flex-1 bg-white border-t-0 border-l-0 border-r border-b border-black"
//               >
//                 {/* Card Title */}
//                 <div className="text-base font-bold text-blue-800 text-center pt-2 pb-0.5 uppercase">
//                   {card.title}
//                 </div>
//                 {/* Card Time */}
//                 <div className="text-red-600 text-xs font-semibold text-center mb-1">
//                   ( {card.time} )
//                 </div>
//                 {/* Card Result */}
//                 <div className="text-black text-lg font-extrabold text-center mb-1">
//                   &#123; {card.result} &#125;
//                   <span className="inline-block text-green-500 text-base font-bold ml-1">➡️ [ ]</span>
//                 </div>
//                 {/* Card Footer */}
//                 <div className="bg-[#2582e2] text-white text-xs font-bold text-center py-1 mt-2 tracking-wide">
//                   {card.footer}
//                 </div>
//               </div>
//             ))}
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }


// src/components/public/Section7.js
import React from "react";

const chartData = [
  [
    {
      title: "DISAWER",
      time: "05:10 AM",
      result: "24",
      footer: "DISAWER SATTA KING",
    },
    {
      title: "SHRI HARI",
      time: "11:00 AM",
      result: "74",
      footer: "SATTA RESULT",
    },
  ],
  [
    {
      title: "RAJSHRI",
      time: "01:30 PM",
      result: "29",
      footer: "SATTA KING LEAK",
    },
    {
      title: "N C R",
      time: "02:15 PM",
      result: "58",
      footer: "SATTA KING LIVE",
    },
  ],
  [
    {
      title: "SUNDRAM",
      time: "02:15 PM",
      result: "31",
      footer: "SATTA LEAK NUMBER",
    },
    {
      title: "DELHI DREAM",
      time: "02:40 PM",
      result: "25",
      footer: "SATTA LEAK NUMBER",
    },
  ],
];

export default function Section7() {
  return (
    <section className="w-full">
      {/* Top Header */}
      <div className="w-full bg-[#be621e] text-white text-center py-3 border border-black">
        <div className="text-lg font-extrabold tracking-wide">CHAR MINAR</div>
        <div className="text-xs mt-0.5">( 04:00 AM )</div>
        <div className="text-base mt-1 mb-1 font-bold">
          &#123; 24 &#125;{" "}
          <span className="inline-block text-green-400 text-base font-bold">➡️ [ ]</span>
        </div>
      </div>
      {/* Chart Heading */}
      <div className="w-full bg-black text-yellow-400 text-base font-extrabold text-center py-1 border-b-2 border-[#be621e]">
        CHARMINAR SATTA CHART
      </div>

      {/* Card Grid */}
      <div className="w-full">
        {chartData.map((row, rowIndex) => (
          <div
            className="flex flex-row flex-wrap border border-black"
            key={rowIndex}
          >
            {row.map((card, colIdx) => (
              <div
                key={colIdx}
                className="w-1/2 bg-white border-t-0 border-l-0 border-r border-b border-black"
              >
                {/* Card Title */}
                <div className="text-base font-bold text-blue-800 text-center pt-2 pb-0.5 uppercase">
                  {card.title}
                </div>
                {/* Card Time */}
                <div className="text-red-600 text-xs font-semibold text-center mb-1">
                  ( {card.time} )
                </div>
                {/* Card Result */}
                <div className="text-black text-lg font-extrabold text-center mb-1">
                  &#123; {card.result} &#125;
                  <span className="inline-block text-green-500 text-base font-bold ml-1">➡️ [ ]</span>
                </div>
                {/* Card Footer */}
                <div className="bg-[#2582e2] text-white text-xs font-bold text-center py-1 mt-2 tracking-wide">
                  {card.footer}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
