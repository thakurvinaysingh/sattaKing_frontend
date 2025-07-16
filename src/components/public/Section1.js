import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Section1() {
  const [content, setContent] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/contentblocks/slug/section-1")
      .then(res => {
        // Use capital "Content" to match your backend data!
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



// // src/components/public/Section1.js
// import React from "react";

// export default function Section1() {
//   return (
//     <section className="w-full">
//       {/* Top dark/gradient box */}
//       <div className="bg-gradient-to-b from-[#10151a] to-[#16322c] p-6 rounded-b-xl text-center">
//         <div className="text-yellow-400 text-xl font-bold mb-2">
//           आज की लीक जोड़ी यहाँ मिलेगी
//         </div>
//         <div className="text-white text-base mb-1">
//           <span className="tracking-wider">✯FARIDABAD GAZIYABAD GALI DS✯</span>
//         </div>
//         <div className="text-yellow-300 text-3xl font-bold mb-1 leading-tight">
//           SATTA KING LEAK
//         </div>
//         <div className="text-yellow-300 text-2xl font-bold mb-2 leading-tight">
//           MUMBAI HEAD BRANCH MANAGER (CEO)
//         </div>
//         <div className="text-white text-xl font-bold mb-2">ADD</div>
//         <button className="bg-red-600 hover:bg-red-700 transition text-white text-xl font-bold rounded-full px-10 py-2 mb-3">SATTA KING</button>
//       </div>

//       {/* Yellow bar heading */}
//       <div className="bg-yellow-400 py-2 text-center">
//         <div className="text-3xl font-black text-black">DELHI SATTA KING</div>
//       </div>

//       {/* Info cards */}
//       <div className="p-4 flex flex-col gap-8">
//         {/* First card */}
//         <div className="relative border-4 border-blue-700 rounded-xl p-6 bg-white flex flex-col min-h-[300px]">
         
//           {/* Main content */}
//           <div className="flex flex-col items-center">
//             <div className="text-lg font-bold text-black mb-2 text-center">
//               FARIDABAD | GAZIYABAD | GALI | DS <br/>
//               <span className="text-orange-600 font-bold">
//                 🔥 DIRECT COMPANY SE LEAK JODI 🔥
//               </span>
//             </div>
//             <div className="font-bold text-base text-center mb-2">
//               JO BHAI APNA LOSS COVER KARNA CHAHTE HO ,GAME SINGAL JODI MAI HI MILEGA ,GAME KISI KA BAAP NAHI KAAT SAKTA ,APNI BOOKING KARANE K LIYE ABHI WHATSAPP YA CALL KARE !
//             </div>
//             <div className="text-red-600 text-xl font-bold mb-1">SATTA KING</div>
//             <div className="text-green-600 text-xl font-bold mb-3">ADD</div>
//             <button className="bg-red-600 hover:bg-red-700 transition text-white text-lg font-bold rounded-full px-7 py-2">DELHI SATTA BAZAR</button>
//           </div>
         
//         </div>

//         {/* Second card */}
//         <div className="relative border-4 border-blue-700 rounded-xl p-6 bg-white flex flex-col min-h-[300px]">
         
//           {/* Main content */}
//           <div className="flex flex-col items-center">
//             <div className="text-lg font-bold text-black mb-2 text-center">
//               FARIDABAD | GAZIYABAD | GALI | DS <br />
//               <span className="text-orange-600 font-bold">
//                 🔥DIRECT COMPANY SE LEAK JODI🔥
//               </span>
//             </div>
//             <div className="font-bold text-base text-center mb-2">
//               JO BHAI APNA LOSS COVER KARNA CHAHTE HO ,GAME SINGAL JODI MAI HI MILEGA ,GAME KISI KA BAAP NAHI KAAT SAKTA ,APNI BOOKING KARANE K LIYE ABHI WHATSAPP YA CALL KARE
//             </div>
//             <div className="text-blue-700 text-xl font-bold mb-1">SATTA KING</div>
//             <div className="text-green-600 text-xl font-bold mb-3">ADD</div>
//             <button className="bg-red-600 hover:bg-red-700 transition text-white text-lg font-bold rounded-full px-7 py-2">DELHI SATTA BAZAR</button>
//           </div>
         
//         </div>
//       </div>

//       {/* add new  */}
//       <div className="bg-gradient-to-b from-black to-[#14484e] rounded-xl p-8 text-center flex flex-col items-center">
//           <div className="text-yellow-300 text-3xl font-extrabold mb-2 flex items-center justify-center gap-2">
//             <span role="img" aria-label="fire">🔥</span>
//             FEES GAME PASS KE BAD
//           </div>
//           <div className="text-white text-lg font-semibold mb-1 flex items-center justify-center gap-1">
//             <span role="img" aria-label="target">🎯</span>
//             FARIDABAD GAZIYABAD GALI DS
//             <span role="img" aria-label="target">🎯</span>
//           </div>
//           <div className="text-red-500 text-xl font-bold mb-1 flex items-center justify-center gap-1">
//             <span role="img" aria-label="100">💯</span>
//             <span className="underline">LEAK SINGLE JODI GAME</span>
//             <span role="img" aria-label="100">💯</span>
//           </div>
//           <div className="text-white text-lg font-semibold mb-1">MUMBAI HEAD BRANCH</div>
//           <div className="text-yellow-300 text-3xl font-extrabold mb-2 flex items-center justify-center gap-2">
//             <span role="img" aria-label="crown">👑</span>
//             SATTA KING
//             <span role="img" aria-label="crown">👑</span>
//           </div>
//           <div className="text-white text-2xl font-bold mb-4">ADD</div>
//           <button className="bg-red-600 hover:bg-red-700 transition text-white text-2xl font-bold rounded-full px-12 py-3 mt-2">
//             SATTA KING
//           </button>
//         </div>

//     </section>
//   );
// }
