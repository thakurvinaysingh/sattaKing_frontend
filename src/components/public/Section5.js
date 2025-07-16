import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Section5() {
  const [content, setContent] = useState("");
  const baseURL = process.env.REACT_APP_BASE_URL;
  useEffect(() => {
    axios
      .get(`${baseURL}/api/contentblocks/slug/section-5`)
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


// // src/components/public/Section5.js
// import React from "react";

// export default function Section5() {
//   return (
//     <section className="w-full bg-gradient-to-b from-black to-[#266188] py-8 md:py-14">
//       <div className="max-w-xl mx-auto flex flex-col items-center text-center px-2">
//         {/* Top title */}
//         <div className="text-yellow-300 text-base md:text-lg font-bold mb-2">
//           👑राजकोट हेड ब्रांच 👑<br />
//           दीपक शर्मा खाइवाल<br />
//           <span className="text-white text-sm font-medium">एक दम ट्रस्टेड ईमानदार खाइवाल है भाइयो</span>
//         </div>

//         <hr className="w-40 border-t border-white opacity-60 my-2" />

//         {/* Rate */}
//         <div className="text-white text-sm md:text-base font-semibold mb-1">
//           <span role="img" aria-label="fire">🔥</span> ▶️ &#123;&#123;RATE&#125;&#125; रेट ➡️<span role="img" aria-label="fire">🔥</span>
//         </div>
//         <div className="text-white text-sm md:text-base mb-1">
//           👉जोड़ी रेट : <span className="font-bold">10 k 950</span>👈
//         </div>
//         <div className="text-white text-sm md:text-base mb-3">
//           👉खाई रेट : <span className="font-bold">100 k 950</span>👈
//         </div>

//         <hr className="w-40 border-t border-white opacity-60 my-2" />

//         {/* Time Table */}
//         <div className="text-yellow-300 text-base md:text-lg font-bold mb-3">
//           👑TIME TABLE👇
//         </div>
//         <div className="text-white text-xs md:text-sm font-semibold leading-relaxed mb-3 whitespace-pre-line">
//           {/* Each time entry as per screenshot */}
//           {/* Use emojis as in your screenshot */}
//           {/* Replace with map for dynamic data */}
//           ☺ RAJSHREE  ••••••••••••➭ 01:30{'\n'}
//           ☺ SUNDARAM  ••••••••••••➭ 02:45{'\n'}
//           ☺ DELHI BAJAR  •••••••••➭ 03:00{'\n'}
//           ☺ SHRI GANESH  ••••••••➭ 04:30{'\n'}
//           ☺ FARIDABAD  ••••••••••••➭ 06:00{'\n'}
//           ☺ SHALIMAR  ••••••••••••➭ 07:25{'\n'}
//           ☺ GAZIYABAD  ••••••••••••➭ 09:25{'\n'}
//           ☺ LUCKY----7  •••••••••••➭ 07:25{'\n'}
//           ☺ GALI  •••••••••••••••••➭ 01:25{'\n'}
//           ☺ DESAWAR  •••••••••••••➭ 04:50
//         </div>

//         <hr className="w-40 border-t border-white opacity-60 my-2" />

//         {/* Payment Info */}
//         <div className="text-white text-[1rem] md:text-base font-bold mb-1">PAYTM | PHONE PAY | G PAY</div>
//         <div className="text-white text-xs md:text-sm font-medium mb-1">
//           * गारंटी के साथ आपकी पेमेंट होगी 5 मिनट के अंदर⚡
//         </div>

//         {/* Whatsapp Number */}
//         <div className="bg-white px-3 py-2 rounded mt-2 mb-2 inline-block">
//           <div className="text-black text-xs md:text-base font-extrabold mb-0">WHATSAPP NUMBER</div>
//           <div className="text-black text-base md:text-lg font-bold">7302799320</div>
//         </div>
//         <a
//           href="https://wa.me/7302799320"
//           target="_blank"
//           rel="noopener noreferrer"
//           className="bg-green-600 hover:bg-green-700 text-white font-bold rounded-full px-9 py-2 text-lg shadow transition"
//         >
//           WHATSAPP
//         </a>
//       </div>
//     </section>
//   );
// }
