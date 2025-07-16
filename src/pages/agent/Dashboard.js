import React, { useEffect, useState, useMemo } from "react";
import axios from "../../api/axios";
import { useAuth } from "../../contexts/AuthContext";

function getTodayLocalDateTime() {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  return now.toISOString().slice(0, 16);
}

export default function AgentDashboard() {
  const { user } = useAuth();
  const [assignedGhadi, setAssignedGhadi] = useState([]);
  const [selectedGID, setSelectedGID] = useState("");
  const [ghadiResults, setGhadiResults] = useState([]);
  const [resultInput, setResultInput] = useState("");
  const [dateInput, setDateInput] = useState(getTodayLocalDateTime());
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  // Table controls
  const [search, setSearch] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch assigned ghadi on mount
  useEffect(() => {
    async function fetchAssigned() {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get("/api/agent/my-ghadi");
        setAssignedGhadi(res.data.data || []);
        if (res.data.data && res.data.data.length > 0) {
          setSelectedGID(res.data.data[0].GID);
        }
      } catch {
        setError("Failed to load assigned ghadi");
      } finally {
        setLoading(false);
      }
    }
    fetchAssigned();
  }, []);

  // Fetch history when selectedGID changes
  useEffect(() => {
    async function fetchHistory() {
      if (!selectedGID) {
        setGhadiResults([]);
        return;
      }
      setLoading(true);
      setError("");
      try {
        const res = await axios.get(`/api/agent/my-ghadi/results?ghadiId=${selectedGID}`);
        setGhadiResults(res.data.data || []);
      } catch {
        setError("Failed to load result history");
      } finally {
        setLoading(false);
      }
    }
    fetchHistory();
    // Reset controls on Ghadi switch
    setResultInput("");
    setDateInput(getTodayLocalDateTime());
    setCurrentPage(1);
    setSearch("");
  }, [selectedGID]);

  // Handle result update
  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");
    try {
      await axios.post("/api/agent/my-ghadi/update-result", {
        ghadiId: selectedGID,
        result: resultInput,
        dateTime: dateInput || new Date(),
      });
      setMessage("Result updated!");
      setResultInput("");
      setDateInput(getTodayLocalDateTime());
      // Refresh results history
      const res = await axios.get(`/api/agent/my-ghadi/results?ghadiId=${selectedGID}`);
      setGhadiResults(res.data.data || []);
      const ghadiRes = await axios.get("/api/agent/my-ghadi");
      setAssignedGhadi(ghadiRes.data.data || []);
      setCurrentPage(1);
      setSearch("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update result");
    } finally {
      setSaving(false);
    }
  };

  const selectedGhadiObj = assignedGhadi.find((g) => g.GID === selectedGID);

  // Table filtering
  const filteredResults = useMemo(() => {
    if (!search) return ghadiResults;
    return ghadiResults.filter((r) => {
      const dateStr = r.DateTime ? new Date(r.DateTime).toLocaleDateString() : "";
      return (
        r.Result?.toString().toLowerCase().includes(search.toLowerCase()) ||
        dateStr.toLowerCase().includes(search.toLowerCase())
      );
    });
  }, [search, ghadiResults]);

  // Pagination logic
  const totalRows = filteredResults.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const pageResults = filteredResults.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="min-h-screen w-full bg-[#4E7584] py-8 px-2 flex flex-col items-center">
      <div className="w-full max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-[#63B0CD] tracking-tight drop-shadow">
          Ghadi & Results
        </h2>
        {error && (
          <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded-xl mb-4 text-center font-semibold shadow">
            {error}
          </div>
        )}

        <div className="bg-white/90 rounded-2xl shadow-xl p-6 mb-8">
          {assignedGhadi.length === 0 ? (
            <div className="text-center text-gray-500 py-8">No ghadi assigned to your account.</div>
          ) : (
            <>
              {/* Ghadi Selector */}
              <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                <label className="font-semibold text-[#4E7584]">Select Ghadi:</label>
                <select
                  className="border border-[#63B0CD] focus:ring-2 focus:ring-[#63B0CD] px-4 py-2 rounded-lg bg-white text-[#4E7584] font-semibold"
                  value={selectedGID}
                  onChange={(e) => setSelectedGID(Number(e.target.value))}
                >
                  {assignedGhadi.map((g) => (
                    <option key={g.GID} value={g.GID}>
                      {g.NameEn} ({g.NameHn})
                    </option>
                  ))}
                </select>
              </div>
              {selectedGhadiObj && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                  <div>
                    <span className="font-semibold text-[#4E7584]">Current Result:</span>{" "}
                    <span className="text-[#63B0CD] font-bold">{selectedGhadiObj.Result || "N/A"}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-[#4E7584]">Time:</span>{" "}
                    <span className="text-gray-800">{selectedGhadiObj.RTime}</span>
                  </div>
                </div>
              )}
              {/* Update Result Form */}
              <form
                onSubmit={handleUpdate}
                className="flex flex-col md:flex-row md:items-end gap-4 mt-2"
              >
                <div className="flex flex-col w-full md:w-1/3">
                  <label className="text-[#4E7584] font-medium mb-1">Result</label>
                  <input
                    type="text"
                    className="border border-[#63B0CD] px-3 py-2 rounded-lg focus:ring-2 focus:ring-[#63B0CD] bg-white"
                    placeholder="Enter result"
                    value={resultInput}
                    onChange={(e) => setResultInput(e.target.value)}
                    required
                  />
                </div>
                <div className="flex flex-col w-full md:w-1/3">
                  <label className="text-[#4E7584] font-medium mb-1">Date</label>
                  <input
                    type="date"
                    className="border border-[#63B0CD] px-3 py-2 rounded-lg focus:ring-2 focus:ring-[#63B0CD] bg-white"
                    value={dateInput.slice(0, 10)}
                    onChange={(e) => setDateInput(e.target.value + dateInput.slice(10))}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full md:w-auto bg-[#63B0CD] hover:bg-[#4E7584] transition text-white font-bold px-6 py-2 rounded-lg shadow-md mt-4 md:mt-0"
                  disabled={saving || !resultInput}
                >
                  {saving ? "Updating..." : "Update"}
                </button>
              </form>
              {message && (
                <div className="text-green-600 mt-3 font-medium">{message}</div>
              )}
            </>
          )}
        </div>
        {/* Result History Table with Pagination and Search */}
        <div className="bg-white/95 rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 mb-4">
            <h3 className="font-bold text-[#4E7584] text-lg flex-1">Result History</h3>
            <div className="flex items-center gap-2">
              <label className="text-[#4E7584] font-medium mr-2">Show</label>
              <select
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="border border-[#63B0CD] rounded-lg px-2 py-1 text-[#4E7584] bg-white"
              >
                {[5, 10, 25, 50].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
              <label className="text-[#4E7584] font-medium ml-2">entries</label>
            </div>
            <input
              type="search"
              placeholder="Search result or date..."
              className="border border-[#63B0CD] rounded-lg px-3 py-2 text-[#4E7584] bg-white"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              style={{ minWidth: 200 }}
            />
          </div>
          <div className="overflow-x-auto rounded-xl">
            <table className="min-w-full text-sm md:text-base border-separate border-spacing-y-2">
              <thead>
                <tr className="bg-[#63B0CD]/30">
                  <th className="p-3 text-left rounded-l-xl">Ghadi Name</th>
                  <th className="p-3 text-left">Result</th>
                  <th className="p-3 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={3} className="text-center text-gray-400 p-4">
                      Loading...
                    </td>
                  </tr>
                ) : pageResults.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="p-3 text-center text-gray-400">
                      No results found.
                    </td>
                  </tr>
                ) : (
                  pageResults.map((r, i) => (
                    <tr key={r._id || r.id || i} className="hover:bg-[#63B0CD]/10 transition rounded-xl">
                      <td className="p-3 font-semibold text-[#4E7584]">
                        {selectedGhadiObj ? `${selectedGhadiObj.NameEn} (${selectedGhadiObj.NameHn})` : "-"}
                      </td>
                      <td className="p-3 font-semibold text-[#4E7584]">{r.Result}</td>
                      <td className="p-3">{r.DateTime ? new Date(r.DateTime).toLocaleDateString() : ""}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {/* Pagination Controls */}
          <div className="flex flex-col md:flex-row md:justify-between items-center mt-5 gap-3">
            <span className="text-[#4E7584]">
              Showing {Math.min((currentPage - 1) * rowsPerPage + 1, totalRows)} to{" "}
              {Math.min(currentPage * rowsPerPage, totalRows)} of {totalRows} entries
            </span>
            <div className="flex gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                className={`px-3 py-1 rounded-lg font-semibold border ${
                  currentPage === 1
                    ? "bg-gray-200 text-gray-400 border-gray-200 cursor-not-allowed"
                    : "bg-[#63B0CD] hover:bg-[#4E7584] text-white border-[#63B0CD] cursor-pointer"
                }`}
              >
                Prev
              </button>
              <button
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                className={`px-3 py-1 rounded-lg font-semibold border ${
                  currentPage === totalPages || totalPages === 0
                    ? "bg-gray-200 text-gray-400 border-gray-200 cursor-not-allowed"
                    : "bg-[#63B0CD] hover:bg-[#4E7584] text-white border-[#63B0CD] cursor-pointer"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}




// import React, { useEffect, useState } from "react";
// import axios from "../../api/axios";
// import { useAuth } from "../../contexts/AuthContext";

// export default function AgentDashboard() {
//   const { user } = useAuth();
//   const [assignedGhadi, setAssignedGhadi] = useState([]);
//   const [selectedGID, setSelectedGID] = useState(""); // GID (number)
//   const [ghadiResults, setGhadiResults] = useState([]);
//   const [resultInput, setResultInput] = useState("");
//   const [dateInput, setDateInput] = useState(""); // for custom date if needed
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   // Fetch assigned ghadi on mount
//   useEffect(() => {
//     async function fetchAssigned() {
//       setLoading(true);
//       setError("");
//       try {
//         const res = await axios.get("/api/agent/my-ghadi"); // Your backend agent router
//         setAssignedGhadi(res.data.data || []);
//         // Auto-select first ghadi if available
//         if (res.data.data && res.data.data.length > 0) {
//           setSelectedGID(res.data.data[0].GID);
//         }
//       } catch {
//         setError("Failed to load assigned ghadi");
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchAssigned();
//   }, []);

//   // Fetch history when selectedGID changes
//   useEffect(() => {
//     async function fetchHistory() {
//       if (!selectedGID) {
//         setGhadiResults([]);
//         return;
//       }
//       setLoading(true);
//       setError("");
//       try {
//         const res = await axios.get(`/api/agent/my-ghadi/results?ghadiId=${selectedGID}`);
//         setGhadiResults(res.data.data || []);
//       } catch {
//         setError("Failed to load result history");
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchHistory();
//   }, [selectedGID]);

//   // Handle result update
//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     setSaving(true);
//     setError("");
//     setMessage("");
//     try {
//       await axios.post("/api/agent/my-ghadi/update-result", {
//         ghadiId: selectedGID,
//         result: resultInput,
//         dateTime: dateInput || new Date(),
//       });
//       setMessage("Result updated!");
//       setResultInput("");
//       setDateInput("");
//       // Refresh results history
//       const res = await axios.get(`/api/agent/my-ghadi/results?ghadiId=${selectedGID}`);
//       setGhadiResults(res.data.data || []);
//       // Optionally, refresh assignedGhadi to get the latest live result
//       const ghadiRes = await axios.get("/api/agent/my-ghadi");
//       setAssignedGhadi(ghadiRes.data.data || []);
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to update result");
//     } finally {
//       setSaving(false);
//     }
//   };

//   const selectedGhadiObj = assignedGhadi.find(g => g.GID === selectedGID);

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-4 text-blue-700">Assigned Ghadi & Results</h2>
//       {error && <div className="text-red-500 mb-3">{error}</div>}
//       {assignedGhadi.length === 0 ? (
//         <div className="bg-white p-6 rounded shadow text-center text-gray-500">
//           No ghadi assigned to your account.
//         </div>
//       ) : (
//         <>
//           {/* Assigned Ghadi Details */}
//           <div className="bg-white p-4 rounded shadow mb-6">
//             <label className="block font-semibold mb-2 text-blue-700">
//               Select Ghadi:
//               <select
//                 className="border ml-3 px-2 py-1 rounded"
//                 value={selectedGID}
//                 onChange={e => {
//                   setSelectedGID(Number(e.target.value));
//                   setMessage("");
//                   setResultInput("");
//                   setDateInput("");
//                 }}
//               >
//                 {assignedGhadi.map(g => (
//                   <option key={g.GID} value={g.GID}>
//                     {g.NameEn} ({g.NameHn})
//                   </option>
//                 ))}
//               </select>
//             </label>
//             {selectedGhadiObj && (
//               <div className="mt-3">
//                 <div>
//                   <span className="font-semibold">Current Result:</span>{" "}
//                   <span className="text-blue-700">{selectedGhadiObj.Result || "N/A"}</span>
//                 </div>
//                 <div>
//                   <span className="font-semibold">Time:</span> {selectedGhadiObj.RTime}
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Update Result Form */}
//           <div className="bg-white p-4 rounded shadow mb-6">
//             <h3 className="font-semibold mb-2 text-blue-700">Update Result</h3>
//             <form onSubmit={handleUpdate} className="flex flex-col md:flex-row items-center gap-3">
//               <input
//                 type="text"
//                 className="border px-3 py-2 rounded"
//                 placeholder="New Result"
//                 value={resultInput}
//                 onChange={e => setResultInput(e.target.value)}
//                 required
//                 style={{ minWidth: 120 }}
//               />
//               <input
//                 type="datetime-local"
//                 className="border px-3 py-2 rounded"
//                 value={dateInput}
//                 onChange={e => setDateInput(e.target.value)}
//                 style={{ minWidth: 200 }}
//               />
//               <button
//                 type="submit"
//                 className="bg-blue-600 text-white px-4 py-2 rounded"
//                 disabled={saving || !resultInput}
//               >
//                 {saving ? "Updating..." : "Update"}
//               </button>
//             </form>
//             {message && <div className="text-green-600 mt-2">{message}</div>}
//           </div>

//           {/* Result History */}
//           <div className="bg-white p-4 rounded shadow">
//             <h3 className="font-semibold mb-2 text-blue-700">Result History</h3>
//             <table className="min-w-full text-sm">
//               <thead className="bg-gray-100">
//                 <tr>
//                   <th className="p-2 text-left">Result</th>
//                   <th className="p-2 text-left">Date Time</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {ghadiResults.length === 0 ? (
//                   <tr>
//                     <td colSpan={2} className="p-2 text-center text-gray-400">
//                       No results yet for this ghadi.
//                     </td>
//                   </tr>
//                 ) : (
//                   ghadiResults.map(r => (
//                     <tr key={r._id || r.id}>
//                       <td className="p-2">{r.Result}</td>
//                       <td className="p-2">
//                         {r.DateTime ? new Date(r.DateTime).toLocaleString() : ""}
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }


// import React from "react";
// export default function AgentDashboard() {
//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-6 text-blue-700">Agent Dashboard</h2>
//       <div className="bg-white p-6 rounded shadow text-center">
//         {/* Add agent-specific quick stats or summary here */}
//         Welcome! You can view and update your assigned Ghadi results agent.
//       </div>
//     </div>
//   );
// }
