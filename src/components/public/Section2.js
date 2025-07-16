import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Section2() {
  const [content, setContent] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/contentblocks/slug/section-2")
      .then(res => {
        const block = res.data.data;
        setContent(block?.Content || "<div>Section not found.</div>");
      });
  }, []);

  return (
    <section className="w-full">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </section>
  );
}


// // src/components/public/Section2.js
// import React from "react";

// export default function Section2() {
//   return (
//     <section className="w-full">
//       {/* Card-1: Blue & White Live Result */}
//       <div className="w-full">
//         <div className="bg-[#1877e5] py-7 px-4 text-center">
//           <div className="text-4xl font-bold text-white tracking-wide mb-2">
//             SATTA-KING-FIXED-NO.IN
//           </div>
//           <div className="text-lg font-medium text-white tracking-wide">
//             SATTA KING | SATTA RESULT | SATTA RECORD
//           </div>
//         </div>
//         <div className="bg-white py-7 px-4 text-center border-y-[8px] border-[#1877e5]">
//           <div className="text-3xl font-bold text-pink-600 mb-2">
//             16 July 2025 12:40 AM
//           </div>
//           <div className="text-2xl font-bold text-black mb-3">
//             Satta King Live Result Today
//           </div>
//           <div className="text-5xl font-extrabold text-red-600 mb-1">
//             GALI
//           </div>
//           <div className="text-4xl font-bold text-green-700">
//             15
//           </div>
//         </div>
//         <div className="bg-[#085fc4] py-7 px-4 text-center">
//           <div className="text-3xl font-bold text-white mb-3">
//             SATTA KING RECORD CHART
//           </div>
//           <div className="flex justify-center items-center">
//             <img
//               src="/dmca-badge.png"
//               alt="DMCA Badge"
//               className="w-44 h-auto"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Card-2: Gradient Leak Jodi Dhamaka */}
//       <div className="relative w-full mt-1">
       
//         {/* Right sticky Telegram */}
//         <div className="absolute right-6 top-4 z-10">
//           <img src="/telegram-icon.png" alt="Telegram" className="w-20 h-20" />
//         </div>
//         {/* Main card */}
//         <div className="bg-gradient-to-b from-black to-[#154850] rounded-xl p-10 text-center flex flex-col items-center min-h-[370px]">
//           <div className="text-yellow-300 text-3xl font-extrabold mb-2 tracking-wide">
//             LEAK JODI DHAMAKA
//           </div>
//           <div className="text-white text-lg font-semibold mb-1 flex items-center justify-center gap-1">
//             <span role="img" aria-label="target">🎯</span>
//             FARIDABAD GAZIYABAD GALI DS
//             <span role="img" aria-label="target">🎯</span>
//           </div>
//           <div className="text-white text-lg font-semibold mb-2">
//             NO ADVANCE NO ADVANCE
//           </div>
//           <div className="text-yellow-300 text-3xl font-extrabold mb-2 flex items-center justify-center gap-2">
//             <span role="img" aria-label="crown">👑</span>
//             SATTAKING
//             <span role="img" aria-label="crown">👑</span>
//           </div>
//           <div className="text-white text-4xl font-bold mb-2">BLANK</div>
//           <button className="bg-red-600 hover:bg-red-700 transition text-white text-2xl font-bold rounded-full px-14 py-3 mt-2">
//             SATTA KING
//           </button>
//         </div>
//         {/* Left sticky (bottom, mobile) */}
//         <div className="absolute left-2 bottom-3 z-10 md:hidden">
//           <div className="bg-red-600 text-white text-xs font-semibold rounded-xl px-2 py-1 text-center leading-snug shadow-md border border-white">
//             Play Online<br />
//             Satta 100%<br />
//             Trusted Satta<br />
//             App Fast<br />
//             Withdrawal<br />
//             App<br />
//             Download<br />
//             Now
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
