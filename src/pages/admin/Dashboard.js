import React, { useEffect, useState } from "react";
import axios from "../../api/axios";


export default function AdminDashboard() {
  const [counts, setCounts] = useState({ agents: 0, ghadi: 0, results: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCounts = async () => {
      setLoading(true);
      setError("");
      try {
        const [agentsRes, ghadiRes, resultsRes] = await Promise.all([
          axios.get("/api/users/count"),
          axios.get("/api/ghadis/count"),
          axios.get("/api/results/count"),
        ]);
        setCounts({
          agents: agentsRes.data.count || 0,
          ghadi: ghadiRes.data.count || 0,
          results: resultsRes.data.count || 0,
        });
      } catch (err) {
        setError("Failed to load dashboard stats.");
      } finally {
        setLoading(false);
      }
    };
    fetchCounts();
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-white via-[#f3f8fa] to-[#e9f6fd] py-10 px-4 flex flex-col items-center">
      <div className="w-full max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#63B0CD] mb-10 drop-shadow-sm">
          Welcome, Admin
        </h2>
        {loading && (
          <div className="flex justify-center items-center py-16">
            <svg className="w-8 h-8 text-[#63B0CD] animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-20" cx="12" cy="12" r="10" stroke="#63B0CD" strokeWidth="4" />
              <path className="opacity-80" fill="#63B0CD" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </div>
        )}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-center font-semibold shadow mb-8">
            {error}
          </div>
        )}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <DashboardCard
              title="Total Agents"
              value={counts.agents}
              icon={
                <svg className="w-8 h-8 text-[#63B0CD]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M17 20h5v-2a4 4 0 00-3-3.87M9 20h6M3 20h5v-2a4 4 0 013-3.87M6 6a4 4 0 118 0 4 4 0 01-8 0zM17 8a4 4 0 100-8 4 4 0 000 8z"
                  />
                </svg>
              }
            />
            <DashboardCard
              title="Total Ghadi"
              value={counts.ghadi}
              icon={
                <svg className="w-8 h-8 text-[#63B0CD]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <circle cx="12" cy="12" r="10" strokeWidth={2} />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 6v6l4 2"
                  />
                </svg>
              }
            />
            <DashboardCard
              title="Total Results"
              value={counts.results}
              icon={
                <svg className="w-8 h-8 text-[#63B0CD]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <rect width="18" height="10" x="3" y="7" rx="2" strokeWidth={2} />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M8 17v2a2 2 0 002 2h4a2 2 0 002-2v-2"
                  />
                </svg>
              }
            />
          </div>
        )}
      </div>

    
    </div>
  );
}

// DashboardCard is a visual, reusable, and easy-to-expand metric card
function DashboardCard({ title, value, icon }) {
  return (
    <div className="bg-white/90 rounded-3xl shadow-lg flex flex-col items-center p-8 transition hover:scale-105 hover:shadow-2xl duration-200 border border-[#e3eef7]">
      <div className="mb-4">{icon}</div>
      <div className="text-2xl font-semibold text-gray-600 mb-1">{title}</div>
      <div className="text-4xl font-extrabold text-[#63B0CD] tracking-wide">{value}</div>
    </div>
  );
}


// import React, { useEffect, useState } from "react";
// import axios from "../../api/axios";

// export default function AdminDashboard() {
//   const [counts, setCounts] = useState({ agents: 0, ghadi: 0, results: 0 });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchCounts = async () => {
//       setLoading(true);
//       setError("");
//       try {
//         // You can call your backend APIs in parallel
//         const [agentsRes, ghadiRes, resultsRes] = await Promise.all([
//           axios.get("/api/users/count"),
//           axios.get("/api/ghadis/count"),
//           axios.get("/api/results/count"),
//         ]);
//         setCounts({
//           agents: agentsRes.data.count || 0,
//           ghadi: ghadiRes.data.count || 0,
//           results: resultsRes.data.count || 0,
//         });
//       } catch (err) {
//         setError("Failed to load dashboard stats.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchCounts();
//   }, []);

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-6 text-blue-700">Welcome, Admin!</h2>
//       {loading && <div>Loading...</div>}
//       {error && <div className="text-red-600">{error}</div>}
//       {!loading && !error && (
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div className="bg-white p-6 rounded shadow text-center">
//             <div className="text-xl font-semibold text-gray-700">Total Agents</div>
//             <div className="text-3xl font-bold text-blue-600 mt-2">{counts.agents}</div>
//           </div>
//           <div className="bg-white p-6 rounded shadow text-center">
//             <div className="text-xl font-semibold text-gray-700">Total Ghadi</div>
//             <div className="text-3xl font-bold text-blue-600 mt-2">{counts.ghadi}</div>
//           </div>
//           <div className="bg-white p-6 rounded shadow text-center">
//             <div className="text-xl font-semibold text-gray-700">Total Results</div>
//             <div className="text-3xl font-bold text-blue-600 mt-2">{counts.results}</div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

