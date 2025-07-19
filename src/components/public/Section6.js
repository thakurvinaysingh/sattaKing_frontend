// import React, { useEffect, useState } from "react";
// import axios from "axios";

// export default function Section6() {
//   const [content, setContent] = useState("");
//   const baseURL = process.env.REACT_APP_BASE_URL;
//   useEffect(() => {
//     axios
//       .get(`${baseURL}/api/contentblocks/slug/section-6`)
//       .then(res => {
//         const block = res.data.data;
//         setContent(block?.Content || "<div>Section not found.</div>");
//       });
//   }, []);

//   return (
//     <section className="w-full min-h-screen">
//       <div dangerouslySetInnerHTML={{ __html: content }} />
//     </section>
//   );
// }


// src/components/public/Section6.js
import React from "react";
import { FaDownload } from "react-icons/fa";

export default function Section6() {
  return (
    <section className="w-full min-h-screen">
    
      <div className="w-full py-7 px-2 flex flex-col items-center justify-center"
        style={{
          background: "linear-gradient(180deg, #e03285 0%, #fd8324 100%)",
        }}
      >
        <h2 className="text-white text-lg md:text-2xl font-extrabold text-center tracking-wide mb-4 uppercase">
          ONLINE GAME KHELNE KE LIYE NICHE DIYE HUE LINK SE APP DOWNLOAD KAREN
        </h2>
        <button
          className="bg-green-600 hover:bg-green-700 text-white text-xl font-bold rounded shadow px-12 py-3 flex items-center gap-2 transition mb-1"
        >
          <FaDownload className="inline-block mb-[2px]" />
          DOWNLOAD
        </button>
      </div>

    
      <div className="flex flex-col items-center justify-center mt-8 mb-4">
        <div className="relative mx-auto">
          <img
            src="/money1.png"
            alt="Images"
            className="w-[450px] h-[400px] object-cover rounded shadow-md"
          />
       
        </div>
                <a
          href="https://chat.whatsapp.com/KrrDKOC3H91EKgDochF5L4?mode=ac_t"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-700 hover:bg-green-800 text-white font-bold rounded-full px-9 py-2 text-lg shadow transition mt-3"
        >
          JOIN WHATSAPP GROUP
        </a>

      </div>
    </section>
  );
}
