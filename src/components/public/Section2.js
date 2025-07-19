// import React, { useEffect, useState } from "react";
// import axios from "axios";

// export default function Section2() {
//   const [content, setContent] = useState("");
//   const baseURL = process.env.REACT_APP_BASE_URL;
//   useEffect(() => {
//     axios
//       .get(`${baseURL}/api/contentblocks/slug/section-2`)
//       .then(res => {
//         const block = res.data.data;
//         setContent(block?.Content || "<div>Section not found.</div>");
//       });
//   }, []);

//   return (
//     <section className="w-full">
//       <div dangerouslySetInnerHTML={{ __html: content }} />
//     </section>
//   );
// }


// src/components/public/Section2.js
import React from "react";

export default function Section2() {
  return (
    <section className="w-full">
      {/* Card-1: Blue & White Live Result */}
      <div className="w-full">
        <div className="bg-[#1877e5] py-7 px-4 text-center">
          <div className="text-4xl font-bold text-white tracking-wide mb-2">
          matka sattaresults.com
          </div>
          <div className="text-lg font-medium text-white tracking-wide">
            SATTA KING | SATTA RESULT | SATTA RECORD
          </div>
        </div>
       
      </div>

      {/* Card-2: Gradient Leak Jodi Dhamaka */}
      <div className="relative w-full ">
       

        {/* Main card */}
        <div className="bg-gradient-to-b from-black to-[#154850] p-10 text-center flex flex-col items-center min-h-[370px]">
          <div className="text-yellow-300 text-3xl font-extrabold mb-2 tracking-wide">
            LEAK JODI DHAMAKA
          </div>
          <div className="text-white text-lg font-semibold mb-1 flex items-center justify-center gap-1">
            <span role="img" aria-label="target">🎯</span>
            FARIDABAD GAZIYABAD GALI DS
            <span role="img" aria-label="target">🎯</span>
          </div>
          <div className="text-white text-lg font-semibold mb-2">
            NO ADVANCE NO ADVANCE
          </div>
          <div className="text-yellow-300 text-3xl font-extrabold mb-2 flex items-center justify-center gap-2">
            <span role="img" aria-label="crown">👑</span>
            SATTAKING
            <span role="img" aria-label="crown">👑</span>
          </div>
          <div className="text-white text-4xl font-bold mb-2">BLANK</div>
          <button className="bg-red-600 hover:bg-red-700 transition text-white text-2xl font-bold rounded-full px-14 py-3 mt-2">
            SATTA KING
          </button>
        </div>
       
      </div>
    </section>
  );
}
