import React from "react";
import { Bars3Icon } from "@heroicons/react/24/solid";

export default function Header({ open, setOpen, title }) {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-[#63B0CD] flex items-center px-4 md:px-8 shadow-lg z-30">
      <button
        onClick={() => setOpen(!open)}
        className="text-white mr-4 p-2 rounded-lg hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white"
        aria-label="Open sidebar"
      >
        <Bars3Icon className="w-7 h-7" />
      </button>
      <h1 className="text-white text-2xl font-extrabold tracking-tight drop-shadow-sm flex-1">
        {title}
      </h1>
      {/* 
      // Right-side actions (add your profile/avatar/logout here if needed)
      <div></div>
      */}
    </header>
  );
}


// import React from "react";
// import { Bars3Icon } from "@heroicons/react/24/solid";

// export default function Header({ open, setOpen, title }) {
//   return (
//     <header className="fixed top-0 left-0 right-0 h-16 bg-blue-600 flex items-center px-6 z-20">
//       {/* Hamburger always visible */}
//       <button onClick={() => setOpen(!open)} className="text-white mr-4">
//         <Bars3Icon className="w-6 h-6" />
//       </button>
//       <h1 className="text-white text-xl font-bold">{title}</h1>
//     </header>
//   );
// }

