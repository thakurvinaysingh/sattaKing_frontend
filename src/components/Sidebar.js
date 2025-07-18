import React from "react";
import { Link, useLocation } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useAuth } from "../contexts/AuthContext";

const menu = [
  { text: "Dashboard", path: "/admin/dashboard" },
  { text: "Agents", path: "/admin/agents" },
  { text: "Ghadi", path: "/admin/ghadi" },
  { text: "Results", path: "/admin/results" },
  { text: "Assign Ghadi", path: "/admin/assign-ghadi" },
  { text: "Content Blocks", path: "/admin/content-blocks" },
];

export default function Sidebar({ open, setOpen }) {
  const location = useLocation();
  const { logout } = useAuth();

  return (
    <aside
      className={`fixed top-0 left-0 h-full bg-white shadow-xl z-40 transition-transform duration-300 ${
        open ? "translate-x-0" : "-translate-x-full"
      } w-64 flex flex-col`}
      aria-label="Sidebar"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b border-[#e0eaf4]">
        <span className="font-extrabold text-[#63B0CD] text-2xl tracking-tight">
          Admin Panel
        </span>
        <button
          onClick={() => setOpen(false)}
          className="text-[#63B0CD] hover:bg-[#eaf6fd] rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-[#63B0CD]"
          aria-label="Close sidebar"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 py-4 px-2 flex flex-col gap-1">
        {menu.map((item) => (
          <Link
            to={item.path}
            key={item.text}
            onClick={() => setOpen(false)}
            className={`flex items-center gap-2 py-3 px-4 rounded-xl font-semibold transition
              ${
                location.pathname === item.path
                  ? "bg-[#63B0CD] text-white shadow"
                  : "text-[#4E7584] hover:bg-[#eaf6fd] hover:text-[#63B0CD]"
              }
            `}
          >
            {item.text}
          </Link>
        ))}

        {/* Divider */}
        <div className="my-4 border-t border-[#e0eaf4]" />

        <button
          onClick={logout}
          className="flex items-center gap-2 py-3 px-4 text-left text-[#e63946] hover:bg-[#ffeaea] rounded-xl font-bold transition"
        >
          Logout
        </button>
      </nav>
    </aside>
  );
}


// import React from "react";
// import { Link, useLocation } from "react-router-dom";
// import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
// import { useAuth } from "../contexts/AuthContext";

// const menu = [
//   { text: "Dashboard", path: "/admin/dashboard" },
//   { text: "Agents", path: "/admin/agents" },
//   { text: "Ghadi", path: "/admin/ghadi" },
//   { text: "Results", path: "/admin/results" },
//   { text: "Assign Ghadi", path: "/admin/assign-ghadi" },
// ];

// export default function Sidebar({ open, setOpen }) {
//   const location = useLocation();
//   const { logout } = useAuth();

//   return (
//     <aside
//       className={`fixed top-0 left-0 h-full bg-white shadow-md z-30 transition-transform ${
//         open ? "translate-x-0" : "-translate-x-full"
//       } w-60`}
//     >
//       <div className="flex items-center justify-between p-4 border-b">
//         <span className="font-bold text-blue-600 text-lg">SattaKing Admin</span>
//         {/* Always show close button when open */}
//         <button onClick={() => setOpen(false)} className="text-gray-600">
//           <XMarkIcon className="w-6 h-6" />
//         </button>
//       </div>

//       <nav className="flex flex-col gap-1 p-2">
//         {menu.map((item) => (
//           <Link
//             to={item.path}
//             key={item.text}
//             className={`block py-2 px-4 rounded ${
//               location.pathname === item.path
//                 ? "bg-blue-500 text-white"
//                 : "hover:bg-blue-100"
//             }`}
//           >
//             {item.text}
//           </Link>
//         ))}

//         <button
//           onClick={logout}
//           className="block w-full mt-4 text-left py-2 px-4 text-red-600 hover:bg-red-50 rounded"
//         >
//           Logout
//         </button>
//       </nav>
//     </aside>
//   );
// }



// import React from "react";
// import { Link, useLocation } from "react-router-dom";
// import { Bars3Icon } from "@heroicons/react/24/solid";
// import { useAuth } from "../contexts/AuthContext";

// const menu = [
//   { text: "Dashboard", path: "/admin/dashboard" },
//   { text: "Agents", path: "/admin/agents" },
//   { text: "Ghadi", path: "/admin/ghadi" },
//   { text: "Results", path: "/admin/results" },
//   { text: "Assign Ghadi", path: "/admin/assign-ghadi" },
// ];

// export default function Sidebar({ open, setOpen }) {
//   const location = useLocation();
//   const { logout } = useAuth();

//   return (
//     <aside
//       className={`fixed top-0 left-0 h-full bg-white shadow-md z-30 transition-transform ${
//         open ? "translate-x-0" : "-translate-x-full"
//       } w-60`}
//     >
//       <div className="flex items-center justify-between p-4 border-b">
//         <span className="font-bold text-blue-600 text-lg">SattaKing Admin</span>
//         <button className="md:hidden" onClick={() => setOpen(false)}>
//           <Bars3Icon className="w-6 h-6" />
//         </button>
//       </div>

//       <nav className="flex flex-col gap-1 p-2">
//         {menu.map((item) => (
//           <Link
//             to={item.path}
//             key={item.text}
//             className={`block py-2 px-4 rounded ${
//               location.pathname === item.path
//                 ? "bg-blue-500 text-white"
//                 : "hover:bg-blue-100"
//             }`}
//           >
//             {item.text}
//           </Link>
//         ))}

//         <button
//           onClick={logout}
//           className="block w-full mt-4 text-left py-2 px-4 text-red-600 hover:bg-red-50 rounded"
//         >
//           Logout
//         </button>
//       </nav>
//     </aside>
//   );
// }


// import React from "react";
// import { Link, useLocation } from "react-router-dom";
// import { Bars3Icon } from "@heroicons/react/24/solid";
// import { useAuth } from "../contexts/AuthContext";

// const menu = [
//   { text: "Dashboard", path: "/admin/dashboard" },
//   { text: "Agents", path: "/admin/agents" },
//   { text: "Ghadi", path: "/admin/ghadi" },
//   { text: "Results", path: "/admin/results" },
//   { text: "Assign Ghadi", path: "/admin/assign-ghadi" },
// ];

// export default function Sidebar({ open, setOpen }) {
//   const location = useLocation();
//   const { logout } = useAuth();
//   return (
//     <aside className={`fixed top-0 left-0 h-full bg-white shadow-md z-30 transition-transform ${open ? "translate-x-0" : "-translate-x-full"} w-60`}>
//       <div className="flex items-center justify-between p-4 border-b">
//         <span className="font-bold text-blue-600 text-lg">SattaKing Admin</span>
//         <button className="md:hidden" onClick={() => setOpen(false)}>
//           <Bars3Icon className="w-6 h-6" />
//         </button>
//       </div>
//       <nav className="flex flex-col gap-1 p-2">
//         {menu.map(item => (
//           <Link
//             to={item.path}
//             key={item.text}
//             className={`block py-2 px-4 rounded ${location.pathname === item.path ? "bg-blue-500 text-white" : "hover:bg-blue-100"}`}
//           >
//             {item.text}
//           </Link>
          
//         ))}
//       </nav>
//     </aside>
//   );
// }
