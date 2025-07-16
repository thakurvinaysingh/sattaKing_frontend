// src/components/public/Header.js
import React from "react";
import BannerCarousel from "./BannerCarousel";

export default function Header() {
  return (
    <header className="border-b-2 border-red-700">
      {/* Menu Bar */}
      <div className="flex w-full h-[54px]">
        {/* Home icon */}
        <div className="flex items-center justify-center bg-red-600 w-1/5 min-w-[90px]">
        <span>+91 123 456 7890</span>
        </div>
        {/* Menu buttons */}
        <div className="flex-1 flex">
          <div className="flex-1 flex items-center justify-center bg-blue-600 border-l-2 border-white text-white text-md font-bold">
            SATTA KING 786
          </div>
          <div className="flex-1 flex items-center justify-center bg-blue-600 border-l-2 border-white text-white text-md font-bold">
            SATTA CHART
          </div>
          <div className="flex-1 flex items-center justify-center bg-blue-600 border-l-2 border-white text-white text-md font-bold">
            TAJ SATTA KING
          </div>
          <div className="flex-1 flex items-center justify-center bg-green-600 border-l-2 border-white text-white text-md font-bold">
            SATTA LEAK
          </div>
        </div>
      </div>
      {/* Banner image */}
      {/* <div className="text-center">
        
        <BannerCarousel />
      </div> */}
    </header>
  );
}

// // src/components/public/Header.js
// import React from "react";

// export default function Header() {
//   return (
//     <header className="bg-yellow-300 border-b-2 border-red-700">
//       <div className="flex justify-between items-center px-4 py-2 text-xs font-bold">
//         <span>+91 123 456 7890</span>
//         <span>Home</span>
//         <span>Blog</span>
//         {/* here same design */}
//       </div>
//       <div className="text-center">
//         <img src="/banner1.webp" alt="Banner" className="w-full h-[300px] object-cover" />
//       </div>
//     </header>
//   );
// }
