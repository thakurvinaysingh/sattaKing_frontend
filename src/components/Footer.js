
import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t-2 border-[#63B0CD] py-4 flex flex-col items-center">
      <div className="text-[#63B0CD] font-semibold text-base tracking-tight">
        © {new Date().getFullYear()} dailysattaresult
      </div>
      <div className="text-gray-400 text-xs mt-1">
        All rights reserved.
      </div>
    </footer>
  );
}

// import React from "react";
// export default function Footer() {
//   return (
//     <footer className="bg-white border-t p-3 text-center text-gray-400 text-sm">
//       © {new Date().getFullYear()} SattaKing Admin. All rights reserved.
//     </footer>
//   );
// }
