// import React from "react";
// import { FaHome } from "react-icons/fa";

// const menu = [
//   { label: "SATTA KING 786", color: "bg-blue-600" },
//   { label: "SATTA CHART", color: "bg-blue-600" },
//   { label: "TAJ SATTA KING", color: "bg-blue-600" },
//   { label: "SATTA LEAK", color: "bg-green-600" },
// ];

// export default function Header() {
//   return (
//     <header className="border-b-2 border-red-700">
//       <nav className="flex w-full overflow-x-auto no-scrollbar" style={{ WebkitOverflowScrolling: "touch" }}>
//         {/* Home icon box - matches size to menu boxes */}
//         <div
//           className={`
//             flex items-center justify-center bg-red-600 border-r-2 border-white
//             flex-shrink-0
//             min-w-[140px] h-[44px]   /* mobile */
//             md:min-w-[160px] md:h-[54px]  /* medium */
//             lg:min-w-[220px] lg:h-[68px]  /* large */
//           `}
//         >
//           <FaHome
//             className="
//               text-white
//               text-2xl
//               md:text-3xl
//               lg:text-4xl
//             "
//           />
//         </div>
//         {/* Menu items */}
//         {menu.map((item, idx) => (
//           <div
//             key={item.label}
//             className={`
//               flex-shrink-0 flex-1 min-w-[140px] h-[44px]
//               md:min-w-[160px] md:h-[54px]
//               lg:min-w-[220px] lg:h-[68px]
//               flex items-center justify-center
//               border-l-2 border-white first:border-l-0
//               text-white font-bold ${item.color}
//               whitespace-pre-line px-2 md:px-0
//               text-xs md:text-base lg:text-lg
//             `}
//           >
//             <span className="text-white font-extrabold text-center drop-shadow-sm">
//               {item.label}
//             </span>
//           </div>
//         ))}
//       </nav>
//     </header>
//   );
// }


import React from "react";
import { FaHome } from "react-icons/fa";

const menu = [
  { label: "SATTA KING 786", color: "bg-blue-600" },
  { label: "SATTA CHART", color: "bg-blue-600" },
  { label: "TAJ SATTA KING", color: "bg-blue-600" },
  { label: "SATTA LEAK", color: "bg-green-600" },
];

export default function Header() {
  return (
    <header className="border-b-2 border-red-700">
      {/* Mobile: grid, md+: flex */}
      <nav
        className="
          grid grid-cols-5
          md:flex md:grid-cols-none md:overflow-x-auto md:no-scrollbar
        "
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {/* Home icon */}
        <div
          className="
            flex items-center justify-center bg-red-600 border-r-2 border-white
            h-[44px]
            md:min-w-[160px] md:h-[54px] md:flex-1
            lg:min-w-[220px] lg:h-[68px]
          "
        >
          <FaHome className="text-white text-2xl md:text-3xl lg:text-4xl" />
        </div>
        {/* Menu items */}
        {menu.map((item, idx) => (
          <div
            key={item.label}
            className={`
              flex items-center justify-center
              h-[44px] text-xs font-bold text-white ${item.color}
              border-l-2 border-white first:border-l-0
              text-center
              md:min-w-[160px] md:h-[54px] md:text-base md:flex-1
              lg:min-w-[220px] lg:h-[68px] lg:text-lg
              px-1
            `}
          >
            <span className="font-extrabold drop-shadow-sm w-full">
              {item.label}
            </span>
          </div>
        ))}
      </nav>
    </header>
  );
}

