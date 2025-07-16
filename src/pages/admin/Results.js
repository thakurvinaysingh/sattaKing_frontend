import React, { useEffect, useState } from "react";
import axios from "../../api/axios";

export default function Results() {
  const [results, setResults] = useState([]);
  const [agents, setAgents] = useState([]);
  const [ghadis, setGhadis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // Pagination/search UI state
  const [search, setSearch] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [resResults, resAgents, resGhadis] = await Promise.all([
          axios.get("/api/results"),
          axios.get("/api/users"),
          axios.get("/api/ghadis"),
        ]);
        setResults(resResults.data.data || []);
        setAgents(resAgents.data.data || []);
        setGhadis(resGhadis.data.data || []);
        setError("");
      } catch {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Helper to get display names
  const getAgentName = (createdById) => {
    const match = agents.find(
      (a) =>
        a._id === createdById ||
        a.User_Id === createdById ||
        a.id === createdById
    );
    return match
      ? `${match.DisplayName} (${match.UserName})`
      : createdById || "-";
  };

  const getGhadiName = (gid) => {
    if (!gid) return "-";
    const id = gid._id || gid.GID || gid.id || gid;
    const match = ghadis.find(
      (g) => g._id === id || g.GID === id || g.id === id
    );
    return match
      ? `${match.NameEn} (${match.NameHn})`
      : gid.NameEn
      ? `${gid.NameEn} (${gid.NameHn})`
      : id;
  };

  const filtered = results.filter((r) => {
    const agent = (getAgentName(r.CreatedById || r.UserId) || "").toString().toLowerCase();
    const ghadi = (getGhadiName(r.GID) || "").toString().toLowerCase();
    const result = ((r.Result || "")).toString().toLowerCase();
    const date = r.DateTime ? new Date(r.DateTime).toLocaleString().toLowerCase() : "";
    return (
      agent.includes(search.toLowerCase()) ||
      ghadi.includes(search.toLowerCase()) ||
      result.includes(search.toLowerCase()) ||
      date.includes(search.toLowerCase())
    );
  });

  // Pagination
  const totalPages = Math.ceil(filtered.length / rowsPerPage) || 1;
  const paged = filtered.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  // When search or rowsPerPage change, reset page to 1
  useEffect(() => {
    setPage(1);
  }, [search, rowsPerPage]);

  return (
    <div className="w-full max-w-5xl mx-auto py-6 px-2">
      <div className="bg-white/90 rounded-2xl shadow-lg p-4 md:p-8 border border-[#e3eef7]">
        {/* Controls */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold text-[#63B0CD]">
            All Agents Ghadi Results
          </h2>
          <div className="flex flex-col sm:flex-row gap-2 items-center w-full md:w-auto">
            <input
              className="border border-[#63B0CD] rounded-lg px-3 py-2 text-[#4E7584] text-base focus:ring-2 focus:ring-[#63B0CD] transition w-full sm:w-auto"
              type="search"
              placeholder="Search agent, ghadi, result, date"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <select
              value={rowsPerPage}
              onChange={e => setRowsPerPage(Number(e.target.value))}
              className="border border-[#63B0CD] rounded-lg px-2 py-2 text-[#4E7584] focus:ring-2 focus:ring-[#63B0CD] transition"
            >
              {[5, 10, 15].map(num => (
                <option key={num} value={num}>{num} rows</option>
              ))}
            </select>
          </div>
        </div>
        {error && <div className="text-red-500 font-medium mb-4">{error}</div>}
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <svg className="w-7 h-7 text-[#63B0CD] animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-20" cx="12" cy="12" r="10" stroke="#63B0CD" strokeWidth="4" />
              <path className="opacity-80" fill="#63B0CD" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto rounded-lg">
              <table className="min-w-full text-base">
                <thead>
                  <tr className="bg-[#f3f8fa]">
                    <th className="p-3 text-left font-semibold text-[#4E7584]">Agent</th>
                    <th className="p-3 text-left font-semibold text-[#4E7584]">Ghadi</th>
                    <th className="p-3 text-left font-semibold text-[#4E7584]">Result</th>
                    <th className="p-3 text-left font-semibold text-[#4E7584]">Date Time</th>
                    <th className="p-3 text-left font-semibold text-[#4E7584]">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {paged.map((r) => (
                    <tr
                      key={r._id || r.id}
                      className="hover:bg-[#eaf6fd] transition rounded"
                    >
                      <td className="p-3">{getAgentName(r.CreatedById || r.UserId)}</td>
                      <td className="p-3">{getGhadiName(r.GID)}</td>
                      <td className="p-3">{r.Result}</td>
                      <td className="p-3">
                        {r.DateTime
                          ? new Date(r.DateTime).toLocaleString()
                          : ""}
                      </td>
                      <td className="p-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold 
                          ${r.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                          {r.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {paged.length === 0 && (
                    <tr>
                      <td colSpan="5" className="p-4 text-center text-gray-400">
                        No results found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden flex flex-col gap-4">
              {paged.length === 0 && (
                <div className="p-4 text-center text-gray-400">No results found.</div>
              )}
              {paged.map((r, i) => (
                <div
                  key={r._id || r.id || i}
                  className="rounded-xl border border-[#e3eef7] bg-white shadow-sm p-4 flex flex-col gap-2"
                >
                  <div>
                    <span className="font-bold text-[#4E7584]">Agent: </span>
                    <span className="text-gray-800">{getAgentName(r.CreatedById || r.UserId)}</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#4E7584]">Ghadi: </span>
                    <span className="text-gray-800">{getGhadiName(r.GID)}</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#4E7584]">Result: </span>
                    <span className="text-gray-800">{r.Result}</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#4E7584]">Date/Time: </span>
                    <span className="text-gray-800">
                      {r.DateTime
                        ? new Date(r.DateTime).toLocaleString()
                        : ""}
                    </span>
                  </div>
                  <div>
                    <span className="font-bold text-[#4E7584]">Status: </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold 
                      ${r.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {r.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-2">
              <span className="text-sm text-gray-500">
                Showing {filtered.length === 0 ? 0 : (page - 1) * rowsPerPage + 1} - {Math.min(page * rowsPerPage, filtered.length)} of {filtered.length}
              </span>
              <div className="flex gap-2">
                <button
                  className="px-4 py-2 rounded-lg border border-[#63B0CD] text-[#63B0CD] font-bold disabled:opacity-50"
                  onClick={() => setPage(page - 1)}
                  disabled={page <= 1}
                >
                  Prev
                </button>
                <button
                  className="px-4 py-2 rounded-lg border border-[#63B0CD] text-[#63B0CD] font-bold disabled:opacity-50"
                  onClick={() => setPage(page + 1)}
                  disabled={page >= totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}



// import React, { useEffect, useState } from "react";
// import axios from "../../api/axios";

// export default function Results() {
//   const [results, setResults] = useState([]);
//   const [agents, setAgents] = useState([]);
//   const [ghadis, setGhadis] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     async function fetchData() {
//       setLoading(true);
//       try {
//         // Fetch results, agents, and ghadis in parallel
//         const [resResults, resAgents, resGhadis] = await Promise.all([
//           axios.get("/api/results"),
//           axios.get("/api/users"),
//           axios.get("/api/ghadis"),
//         ]);
//         setResults(resResults.data.data || []);
//         setAgents(resAgents.data.data || []);
//         setGhadis(resGhadis.data.data || []);
//         setError("");
//       } catch {
//         setError("Failed to load data");
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchData();
//   }, []);

//   // Helper to get display names
//   const getAgentName = (createdById) => {
//     // createdById may be _id, User_Id, or agent object itself depending on API
//     const match = agents.find(
//       (a) =>
//         a._id === createdById ||
//         a.User_Id === createdById ||
//         a.id === createdById
//     );
//     return match
//       ? `${match.DisplayName} (${match.UserName})`
//       : createdById || "-";
//   };

//   const getGhadiName = (gid) => {
//     // gid may be object or ID
//     if (!gid) return "-";
//     const id = gid._id || gid.GID || gid.id || gid;
//     const match = ghadis.find(
//       (g) => g._id === id || g.GID === id || g.id === id
//     );
//     return match
//       ? `${match.NameEn} (${match.NameHn})`
//       : gid.NameEn
//       ? `${gid.NameEn} (${gid.NameHn})`
//       : id;
//   };

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-6 text-blue-700">
//         All Agents Ghadi Results
//       </h2>
//       {error && <div className="text-red-500 mb-2">{error}</div>}
//       {loading ? (
//         <div>Loading...</div>
//       ) : (
//         <div className="bg-white rounded shadow overflow-x-auto">
//           <table className="min-w-full text-sm">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="p-2 text-left">Agent</th>
//                 <th className="p-2 text-left">Ghadi</th>
//                 <th className="p-2 text-left">Result</th>
//                 <th className="p-2 text-left">Date Time</th>
//                 <th className="p-2 text-left">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {results.map((r) => (
//                 <tr key={r._id || r.id}>
//                   <td className="p-2">{getAgentName(r.CreatedById || r.UserId)}</td>
//                   <td className="p-2">{getGhadiName(r.GID)}</td>
//                   <td className="p-2">{r.Result}</td>
//                   <td className="p-2">
//                     {r.DateTime
//                       ? new Date(r.DateTime).toLocaleString()
//                       : ""}
//                   </td>
//                   <td className="p-2">{r.isActive ? "Active" : "Inactive"}</td>
//                 </tr>
//               ))}
//               {results.length === 0 && (
//                 <tr>
//                   <td colSpan="5" className="p-2 text-center text-gray-400">
//                     No results found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }


// import React from "react";
// export default function Results() {
//   return (
//     <div>
//       <h2 className="text-xl font-bold mb-4 text-blue-700">Results</h2>
//       {/* Results listing and management goes here */}
//       <div className="bg-white p-4 rounded shadow">Results management coming soon...</div>
//     </div>
//   );
// }
