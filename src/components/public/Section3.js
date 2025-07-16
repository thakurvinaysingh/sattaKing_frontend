import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Section3() {
  const [content, setContent] = useState("");
  const baseURL = process.env.REACT_APP_BASE_URL;
  useEffect(() => {
    axios
      .get(`${baseURL}/api/contentblocks/slug/section-3`)
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
// import {  FaTelegramPlane, FaWhatsappSquare } from "react-icons/fa";

// export default function Section2() {
//   return (
//     <section className="w-full bg-white pb-2">
//       {/* Main content */}
//       <div className="relative max-w-6xl mx-auto flex flex-col items-center px-2">

       

//         {/* Left sticky info boxes */}
//         <div className="fixed left-2 top-48 z-40 hidden md:block">
//           <div className="bg-[#4699b6] text-white text-xs font-semibold rounded-xl px-2 py-1 text-center leading-snug shadow-md border border-white mb-2">
//             DEVA BHAI<br />
//             KHAIWAL<br />
//             जोड़ी रेट<br />
//             10 के 950<br />
//             खाई रेट<br />
//             100 के 950<br />
//             जल्दी से बुकिंग<br />
//             ज्वाइन करें
//           </div>
//           <div className="bg-red-600 text-white text-xs font-semibold rounded-xl px-2 py-1 text-center leading-snug shadow-md border border-white mt-2">
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

//         {/* Card-1: Big Image */}
//         <div className="w-full flex flex-col items-center pt-4">
//           <div className="relative mx-auto">
//             <img
//               src="/jamebond1.jpg"
//               alt="No Time to Die"
//               className="max-w-full w-[470px] h-[370px] object-cover mx-auto rounded"
//             />
//             {/* X Close button (static for now) */}
//             <button className="absolute right-2 top-2 bg-gray-300/70 hover:bg-gray-400/90 rounded px-1.5 text-lg font-bold">
//               ×
//             </button>
//           </div>
//           <div className="text-black font-semibold text-xl mt-3 mb-2">
//             No Time to Die: Stream online
//           </div>
//         </div>

//         {/* Card-2: Yellow "Play Online" */}
//         <div className="w-full bg-[#ffc514] rounded-t-2xl rounded-b-xl mt-6 mb-2 px-4 py-4 flex flex-col items-center border border-yellow-400 shadow">
//           <div className="text-3xl md:text-2xl font-extrabold text-red-600 text-center mb-3">
//             PLAY ONLINE GAME
//           </div>
//           <div className="text-black text-xl md:text-xl font-bold text-center mb-6">
//             Online game khelne ke liye niche diye hue link se app Ko download Karen
//           </div>
//           <button className="bg-red-600 hover:bg-red-700 transition text-white text-xl font-extrabold rounded-full px-12 py-3 mt-2 shadow-lg">
//             DOWNLOAD
//           </button>
//         </div>
//          {/* Bottom right: Telegram icon */}
//          <div className="fixed z-50 flex flex-col gap-3 right-7 bottom-6">
//         {/* Telegram Icon */}
//         <FaTelegramPlane className="w-16 h-16 text-[#229ED9] cursor-pointer drop-shadow-xl" />

//         {/* WhatsApp Icon */}
//         <FaWhatsappSquare className="w-16 h-16 text-green-500 cursor-pointer drop-shadow-xl" />
//       </div>
//       </div>
//     </section>
//   );
// }
