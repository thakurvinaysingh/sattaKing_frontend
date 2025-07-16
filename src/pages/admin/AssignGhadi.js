import React, { useEffect, useState } from "react";
import axios from "../../api/axios";

export default function AssignGhadi() {
  const [assignments, setAssignments] = useState([]);
  const [agents, setAgents] = useState([]);
  const [ghadis, setGhadis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ User_Id: "", GID: [] });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchAll() {
      setLoading(true);
      try {
        const [agentsRes, ghadiRes, assignRes] = await Promise.all([
          axios.get("/api/users"),
          axios.get("/api/ghadis"),
          axios.get("/api/usermaps"),
        ]);
        setAgents(agentsRes.data.data || []);
        setGhadis(ghadiRes.data.data || []);
        setAssignments(assignRes.data.data || []);
        setError("");
      } catch {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "GID") {
      const numValue = Number(value);
      setForm((prev) => {
        if (checked) {
          return { ...prev, GID: [...prev.GID, numValue] };
        } else {
          return { ...prev, GID: prev.GID.filter((gid) => gid !== numValue) };
        }
      });
    } else if (name === "User_Id") {
      setForm((prev) => ({ ...prev, User_Id: Number(value) }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const payload = {
        User_Id: form.User_Id,
        GID: form.GID.length === 1 ? form.GID[0] : form.GID
      };
      await axios.post("/api/usermaps", payload);
      setForm({ User_Id: "", GID: [] });
      const assignRes = await axios.get("/api/usermaps");
      setAssignments(assignRes.data.data || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to assign Ghadi"
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this assignment?")) return;
    try {
      await axios.delete(`/api/usermaps/${id}`);
      setAssignments(assignments.filter((a) => (a._id || a.id) !== id));
    } catch {
      setError("Failed to delete assignment");
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 w-full">
      <div className="bg-white/95 rounded-2xl shadow-lg p-6 md:p-10 mb-10 border border-[#e3eef7]">
        <h2 className="text-2xl font-bold mb-6 text-[#63B0CD]">Assign Ghadi to Agent</h2>
        {error && <div className="text-red-500 mb-4 font-medium">{error}</div>}
        {loading ? (
          <div className="flex justify-center py-8">
            <svg className="w-7 h-7 text-[#63B0CD] animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-20" cx="12" cy="12" r="10" stroke="#63B0CD" strokeWidth="4" />
              <path className="opacity-80" fill="#63B0CD" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row gap-6 md:items-end"
            autoComplete="off"
          >
            <div className="flex-1">
              <label className="block mb-2 font-semibold text-[#4E7584]">
                Select Agent
                <select
                  name="User_Id"
                  className="mt-1 w-full border border-[#63B0CD] focus:ring-2 focus:ring-[#63B0CD] rounded-lg px-4 py-3 font-semibold text-[#4E7584] transition"
                  value={form.User_Id}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Agent</option>
                  {agents.map((a) => (
                    <option key={a._id || a.id} value={a.User_Id}>
                      {a.DisplayName} ({a.UserName})
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="flex-1">
              <label className="block mb-2 font-semibold text-[#4E7584]">
                Select Ghadi(s)
              </label>
              <div className="flex flex-wrap gap-3">
                {ghadis.map((g) => (
                  <label
                    key={g._id || g.id}
                    className="flex items-center px-3 py-2 bg-[#f3f8fa] rounded-lg cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      name="GID"
                      value={g.GID}
                      checked={form.GID.includes(g.GID)}
                      onChange={handleChange}
                      className="accent-[#63B0CD]"
                    />
                    <span className="ml-2 text-[#4E7584] font-medium">
                      {g.NameEn} <span className="text-[#63B0CD] font-semibold">({g.NameHn})</span>
                    </span>
                  </label>
                ))}
              </div>
            </div>
            <button
              type="submit"
              className="h-12 px-6 bg-[#63B0CD] hover:bg-[#4E7584] transition text-white rounded-lg font-bold shadow disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={saving}
            >
              {saving ? "Saving..." : "Assign"}
            </button>
          </form>
        )}
      </div>

      <div className="bg-white/95 rounded-2xl shadow-lg p-6 md:p-10 border border-[#e3eef7]">
        <h2 className="text-2xl font-bold mb-6 text-[#63B0CD]">Current Assignments</h2>
        <div className="overflow-x-auto rounded-lg">
          <table className="min-w-full text-base">
            <thead>
              <tr className="bg-[#f3f8fa]">
                <th className="p-3 text-left font-semibold text-[#4E7584]">Agent</th>
                <th className="p-3 text-left font-semibold text-[#4E7584]">Ghadi(s)</th>
                <th className="p-3 text-left font-semibold text-[#4E7584]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((a) => (
                <tr key={a._id || a.id} className="hover:bg-[#eaf6fd] transition rounded">
                  <td className="p-3">
                    {agents.find((ag) => ag.User_Id === a.User_Id)?.DisplayName || a.User_Id}
                  </td>
                  <td className="p-3">
                    {Array.isArray(a.GID)
                      ? a.GID
                          .map(
                            (gid) =>
                              ghadis.find((g) => g.GID === gid)?.NameEn || gid
                          )
                          .join(", ")
                      : ghadis.find((g) => g.GID === a.GID)?.NameEn || a.GID}
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => handleDelete(a._id || a.id)}
                      className="text-[#e63946] font-semibold hover:underline transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {assignments.length === 0 && (
                <tr>
                  <td colSpan="3" className="p-4 text-center text-gray-400">
                    No assignments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


// import React, { useEffect, useState } from "react";
// import axios from "../../api/axios";

// export default function AssignGhadi() {
//   const [assignments, setAssignments] = useState([]);
//   const [agents, setAgents] = useState([]);
//   const [ghadis, setGhadis] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [form, setForm] = useState({ User_Id: "", GID: [] });
//   const [saving, setSaving] = useState(false);
//   const [error, setError] = useState("");

//   // Fetch everything
//   useEffect(() => {
//     async function fetchAll() {
//       setLoading(true);
//       try {
//         const [agentsRes, ghadiRes, assignRes] = await Promise.all([
//           axios.get("/api/users"),
//           axios.get("/api/ghadis"),
//           axios.get("/api/usermaps"),
//         ]);
//         setAgents(agentsRes.data.data || []);
//         setGhadis(ghadiRes.data.data || []);
//         setAssignments(assignRes.data.data || []);
//         setError("");
//       } catch {
//         setError("Failed to load data");
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchAll();
//   }, []);

//   // Form handler
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     if (name === "GID") {
//       // Multi-select for ghadi: update array
//       const numValue = Number(value);
//       setForm((prev) => {
//         if (checked) {
//           return { ...prev, GID: [...prev.GID, numValue] };
//         } else {
//           return { ...prev, GID: prev.GID.filter((gid) => gid !== numValue) };
//         }
//       });
//     } else if (name === "User_Id") {
//       setForm((prev) => ({ ...prev, User_Id: Number(value) }));
//     }
//   };

//   // Submit assignment
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSaving(true);
//     setError("");
//     try {
//       // If only one selected, send as number not array (API allows both)
//       const payload = {
//         User_Id: form.User_Id,
//         GID: form.GID.length === 1 ? form.GID[0] : form.GID
//       };
//       await axios.post("/api/usermaps", payload);
//       setForm({ User_Id: "", GID: [] });
//       // Reload assignments
//       const assignRes = await axios.get("/api/usermaps");
//       setAssignments(assignRes.data.data || []);
//     } catch (err) {
//       setError(
//         err.response?.data?.message ||
//           "Failed to assign Ghadi"
//       );
//     } finally {
//       setSaving(false);
//     }
//   };

//   // Delete assignment
//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this assignment?")) return;
//     try {
//       await axios.delete(`/api/usermaps/${id}`);
//       setAssignments(assignments.filter((a) => (a._id || a.id) !== id));
//     } catch {
//       setError("Failed to delete assignment");
//     }
//   };

//   return (
//     <div>
//       <h2 className="text-xl font-bold mb-4 text-blue-700">Assign Ghadi to Agent</h2>
//       {error && <div className="text-red-500 mb-2">{error}</div>}
//       {loading ? (
//         <div>Loading...</div>
//       ) : (
//         <>
//           <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-8 flex flex-col md:flex-row gap-4">
//             <select
//               name="User_Id"
//               className="border px-3 py-2 rounded"
//               value={form.User_Id}
//               onChange={handleChange}
//               required
//             >
//               <option value="">Select Agent</option>
//               {agents.map((a) => (
//                 <option key={a._id || a.id} value={a.User_Id}>
//                   {a.DisplayName} ({a.UserName})
//                 </option>
//               ))}
//             </select>
//             <div className="flex flex-wrap gap-3 items-center">
//               {ghadis.map((g) => (
//                 <label key={g._id || g.id} className="flex items-center">
//                   <input
//                     type="checkbox"
//                     name="GID"
//                     value={g.GID}
//                     checked={form.GID.includes(g.GID)}
//                     onChange={handleChange}
//                   />
//                   <span className="ml-2">{g.NameEn} ({g.NameHn})</span>
//                 </label>
//               ))}
//             </div>
//             <button
//               type="submit"
//               className="bg-blue-600 text-white px-4 py-2 rounded"
//               disabled={saving}
//             >
//               {saving ? "Saving..." : "Assign"}
//             </button>
//           </form>

//           <h2 className="text-xl font-bold mb-2 text-blue-700">Current Assignments</h2>
//           <div className="bg-white rounded shadow overflow-x-auto">
//             <table className="min-w-full text-sm">
//               <thead className="bg-gray-100">
//                 <tr>
//                   <th className="p-2 text-left">Agent</th>
//                   <th className="p-2 text-left">Ghadi(s)</th>
//                   <th className="p-2 text-left">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {assignments.map((a) => (
//                   <tr key={a._id || a.id}>
//                     <td className="p-2">
//                       {agents.find((ag) => ag.User_Id === a.User_Id)?.DisplayName || a.User_Id}
//                     </td>
//                     <td className="p-2">
//                       {Array.isArray(a.GID)
//                         ? a.GID
//                             .map(
//                               (gid) =>
//                                 ghadis.find((g) => g.GID === gid)?.NameEn || gid
//                             )
//                             .join(", ")
//                         : ghadis.find((g) => g.GID === a.GID)?.NameEn || a.GID}
//                     </td>
//                     <td className="p-2">
//                       <button
//                         onClick={() => handleDelete(a._id || a.id)}
//                         className="text-red-600 underline"
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//                 {assignments.length === 0 && (
//                   <tr>
//                     <td colSpan="3" className="p-2 text-center text-gray-400">
//                       No assignments found.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }


