import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Section4() {
  const [content, setContent] = useState("");
  const baseURL = process.env.REACT_APP_BASE_URL;
  useEffect(() => {
    axios
      .get(`${baseURL}/api/contentblocks/slug/section-4`)
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


// // src/components/public/Section4.js
// import React from "react";

// export default function Section4() {
//   return (
//     <section className="w-full bg-white py-2">
//       <div className="w-full flex flex-col gap-6 px-1 md:px-5 max-w-[1800px] mx-auto">
//         {/* Card 1 */}
//         <div className="relative border-4 border-blue-700 rounded-xl p-3 md:p-7 bg-white flex flex-col min-h-[180px]">
//           <div className="w-full text-center text-[1.23rem] md:text-lg font-semibold text-blue-700 mb-2">
//             <span role="img" aria-label="">👈🏻</span>
//             <span className="font-bold underline">AFTER PASS</span>
//             <span role="img" aria-label="">👈🏻</span>
//           </div>
//           <div className="font-bold text-[1rem] md:text-base text-black text-center leading-snug mb-2">
//             FARIDABAD, GAZIYABAD GALI DISAWAR KI LEAK SINGLE JODI 100% PASS LEAK GAME LENE KE LIYE ABHI CALL YA MSG KARE SIRF IMANDAR BHAI OR MOTI GAME LAGANE WALE....
//           </div>
//           <div className="text-red-600 text-xl md:text-2xl font-bold text-center mb-1">SATTA KING</div>
//           <div className="text-green-600 text-xl md:text-2xl font-bold text-center mb-2">ADD</div>
//           <div className="flex justify-center">
//             <button className="bg-red-600 hover:bg-red-700 transition text-white text-lg md:text-xl font-bold rounded-full px-8 py-2 mt-1 mb-2">
//               GAZIYABAD LEAK
//             </button>
//           </div>
//         </div>
//         {/* Card 2 */}
//         <div className="relative border-4 border-blue-700 rounded-xl p-3 md:p-7 bg-white flex flex-col min-h-[180px]">
//           <div className="font-semibold text-[1rem] md:text-lg text-center mb-1">
//             <span role="img" aria-label="">🙏🏻</span>
//             HEAD BRANCH
//             <span role="img" aria-label="">🙏🏻</span>
//           </div>
//           <div className="font-bold text-[1rem] md:text-base text-black text-center leading-snug mb-2">
//             JO BHAI SATTA JEETNA AUR KAMANA CHAHTA HAI HUMARE SATH AAJ HI JUDE KYUKI GAME HUM PAAS KARATE HAI OR GAME LAGANA KA DAAM HO THO HE MSG YA CALL KARE🙏🏻<br />
//             <span role="img" aria-label="">💥</span>SINGLE JODI BLAST<span role="img" aria-label="">💥</span>
//           </div>
//           <div className="text-green-700 text-lg font-semibold text-center mb-1">
//             <span role="img" aria-label="check">✅</span>
//             <span className="text-red-600">No Advance No Advance</span>
//             <span role="img" aria-label="check">✅</span>
//           </div>
//           <div className="text-blue-700 text-xl md:text-2xl font-bold text-center mb-1">TAJ SATTA KING</div>
//           <div className="text-green-600 text-xl md:text-2xl font-bold text-center mb-2">ADD</div>
//           <div className="flex justify-center">
//             <button className="bg-green-700 hover:bg-green-800 transition text-white text-lg md:text-xl font-bold rounded-full px-8 py-2 mt-1 mb-2">
//               GALI LEAK
//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
