import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Section6() {
  const [content, setContent] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/contentblocks/slug/section-6")
      .then(res => {
        const block = res.data.data;
        setContent(block?.Content || "<div>Section not found.</div>");
      });
  }, []);

  return (
    <section className="w-full min-h-screen">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </section>
  );
}


// // src/components/public/Section6.js
// import React from "react";
// import { FaDownload } from "react-icons/fa";

// export default function Section6() {
//   return (
//     <section className="w-full min-h-screen">
//       {/* Gradient Header and Download Button */}
//       <div className="w-full py-7 px-2 flex flex-col items-center justify-center"
//         style={{
//           background: "linear-gradient(180deg, #e03285 0%, #fd8324 100%)",
//         }}
//       >
//         <h2 className="text-white text-lg md:text-2xl font-extrabold text-center tracking-wide mb-4 uppercase">
//           ONLINE GAME KHELNE KE LIYE NICHE DIYE HUE LINK SE APP DOWNLOAD KAREN
//         </h2>
//         <button
//           className="bg-green-600 hover:bg-green-700 text-white text-xl font-bold rounded shadow px-12 py-3 flex items-center gap-2 transition mb-1"
//         >
//           <FaDownload className="inline-block mb-[2px]" />
//           DOWNLOAD
//         </button>
//       </div>

//       {/* Main Image Card */}
//       <div className="flex flex-col items-center justify-center mt-8 mb-4">
//         <div className="relative mx-auto">
//           <img
//             src="/money1.jpg"
//             alt="Best Online Roulette"
//             className="w-[450px] h-[370px] object-cover rounded shadow-md"
//           />
//           {/* X close button (static, non-functional) */}
//           <button
//             className="absolute top-2 right-2 bg-white/80 text-gray-600 hover:bg-gray-300 rounded px-2 text-xl font-bold"
//             tabIndex={-1}
//           >
//             ×
//           </button>
//         </div>
//         <div className="text-black font-extrabold text-lg mt-4 text-center">
//           Best Online Roulette
//         </div>
//       </div>
//     </section>
//   );
// }
