import React, { useEffect, useState } from "react";
import axios from "../../api/axios";

export default function Agents() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    UserName: "",
    DisplayName: "",
    Password: "",
    Email: "",
    UserType: "agent",
    isActive: true,
  });
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);

  const fetchAgents = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/users");
      setAgents(res.data.data || []);
      setError("");
    } catch (err) {
      setError("Failed to load agents");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAgents(); }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editId) {
        await axios.put(`/api/users/${editId}`, form);
      } else {
        await axios.post("/api/users", form);
      }
      setForm({
        UserName: "",
        DisplayName: "",
        Password: "",
        Email: "",
        UserType: "agent",
        isActive: true,
      });
      setEditId(null);
      fetchAgents();
    } catch {
      setError("Failed to save agent");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = agent => {
    setForm({
      UserName: agent.UserName,
      DisplayName: agent.DisplayName,
      Password: "",
      Email: agent.Email || "",
      UserType: agent.UserType,
      isActive: agent.isActive,
    });
    setEditId(agent._id || agent.id);
  };

  const handleDelete = async id => {
    if (!window.confirm("Are you sure you want to delete this agent?")) return;
    try {
      await axios.delete(`/api/users/${id}`);
      fetchAgents();
    } catch {
      setError("Failed to delete agent");
    }
  };

  const handleCancel = () => {
    setForm({
      UserName: "",
      DisplayName: "",
      Password: "",
      Email: "",
      UserType: "agent",
      isActive: true,
    });
    setEditId(null);
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-6 px-2">
      {/* Form Card */}
      <div className="bg-white/90 rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 mb-8 border border-[#e3eef7]">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-[#63B0CD]">
          {editId ? "Edit Agent" : "Add Agent"}
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          autoComplete="off"
        >
          <input
            name="UserName"
            className="border border-[#63B0CD] focus:ring-2 focus:ring-[#63B0CD] rounded-lg px-4 py-3 font-semibold text-[#4E7584] transition"
            placeholder="Username"
            value={form.UserName}
            onChange={handleChange}
            required
          />
          <input
            name="DisplayName"
            className="border border-[#63B0CD] focus:ring-2 focus:ring-[#63B0CD] rounded-lg px-4 py-3 font-semibold text-[#4E7584] transition"
            placeholder="Display Name"
            value={form.DisplayName}
            onChange={handleChange}
            required
          />
          <input
            name="Email"
            type="email"
            className="border border-[#63B0CD] focus:ring-2 focus:ring-[#63B0CD] rounded-lg px-4 py-3 font-semibold text-[#4E7584] transition"
            placeholder="Email"
            value={form.Email}
            onChange={handleChange}
            required
          />
          <input
            name="Password"
            className="border border-[#63B0CD] focus:ring-2 focus:ring-[#63B0CD] rounded-lg px-4 py-3 font-semibold text-[#4E7584] transition"
            placeholder={editId ? "New Password (leave blank to keep)" : "Password"}
            type="password"
            value={form.Password}
            onChange={handleChange}
            required={!editId}
          />
          <select
            name="isActive"
            className="border border-[#63B0CD] focus:ring-2 focus:ring-[#63B0CD] rounded-lg px-4 py-3 font-semibold text-[#4E7584] transition"
            value={form.isActive}
            onChange={e => setForm({ ...form, isActive: e.target.value === "true" })}
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
          <div className="col-span-full flex flex-col sm:flex-row gap-3 mt-2">
            <button
              type="submit"
              className="bg-[#63B0CD] hover:bg-[#4E7584] transition text-white px-6 py-2 rounded-lg font-bold shadow w-full sm:w-auto"
              disabled={saving}
            >
              {saving ? "Saving..." : editId ? "Update" : "Create"}
            </button>
            {editId && (
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 rounded-lg border font-semibold text-[#4E7584] border-[#63B0CD] hover:bg-[#eaf6fd] transition w-full sm:w-auto"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Agents Table */}
      <div className="bg-white/90 rounded-2xl shadow-lg p-2 sm:p-4 md:p-8 border border-[#e3eef7]">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#63B0CD]">Agent List</h2>
          {error && <div className="text-red-500 font-medium">{error}</div>}
        </div>
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <svg className="w-7 h-7 text-[#63B0CD] animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-20" cx="12" cy="12" r="10" stroke="#63B0CD" strokeWidth="4" />
              <path className="opacity-80" fill="#63B0CD" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </div>
        ) : (
          <>
            {/* Table for md+, card view for mobile */}
            <div className="hidden md:block overflow-x-auto rounded-lg">
              <table className="min-w-full text-base">
                <thead>
                  <tr className="bg-[#f3f8fa]">
                    <th className="p-3 text-left font-semibold text-[#4E7584]">Username</th>
                    <th className="p-3 text-left font-semibold text-[#4E7584]">Display Name</th>
                    <th className="p-3 text-left font-semibold text-[#4E7584]">Email</th>
                    <th className="p-3 text-left font-semibold text-[#4E7584]">Status</th>
                    <th className="p-3 text-left font-semibold text-[#4E7584]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {agents.map(agent => (
                    <tr
                      key={agent._id || agent.id}
                      className="hover:bg-[#eaf6fd] transition rounded"
                    >
                      <td className="p-3">{agent.UserName}</td>
                      <td className="p-3">{agent.DisplayName}</td>
                      <td className="p-3">{agent.Email}</td>
                      <td className="p-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold 
                          ${agent.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                          {agent.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="p-3 flex gap-2">
                        <button
                          onClick={() => handleEdit(agent)}
                          className="text-[#63B0CD] hover:underline font-bold transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(agent._id || agent.id)}
                          className="text-[#e63946] hover:underline font-bold transition"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {agents.length === 0 && (
                    <tr>
                      <td colSpan="5" className="p-4 text-center text-gray-400">
                        No agents found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {/* Mobile Card List */}
            <div className="md:hidden flex flex-col gap-4">
              {agents.length === 0 && (
                <div className="p-4 text-center text-gray-400">No agents found.</div>
              )}
              {agents.map(agent => (
                <div
                  key={agent._id || agent.id}
                  className="rounded-xl border border-[#e3eef7] bg-white shadow-sm p-4 flex flex-col gap-2"
                >
                  <div>
                    <span className="font-bold text-[#4E7584]">Username: </span>
                    <span className="text-gray-800">{agent.UserName}</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#4E7584]">Display Name: </span>
                    <span className="text-gray-800">{agent.DisplayName}</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#4E7584]">Email: </span>
                    <span className="text-gray-800">{agent.Email}</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#4E7584]">Status: </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold 
                      ${agent.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {agent.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <div className="flex gap-3 mt-2">
                    <button
                      onClick={() => handleEdit(agent)}
                      className="text-[#63B0CD] font-bold underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(agent._id || agent.id)}
                      className="text-[#e63946] font-bold underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}


// import React, { useEffect, useState } from "react";
// import axios from "../../api/axios";

// export default function Agents() {
//   const [agents, setAgents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [form, setForm] = useState({ UserName: "", DisplayName: "", Password: "", UserType: "agent", isActive: true });
//   const [editId, setEditId] = useState(null);
//   const [saving, setSaving] = useState(false);

//   const fetchAgents = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get("/api/users");
//       setAgents(res.data.data || []);
//       setError("");
//     } catch (err) {
//       setError("Failed to load agents");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => { fetchAgents(); }, []);

//   const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async e => {
//     e.preventDefault();
//     setSaving(true);
//     try {
//       if (editId) {
//         await axios.put(`/api/users/${editId}`, form);
//       } else {
//         await axios.post("/api/users", form);
//       }
//       setForm({ UserName: "", DisplayName: "", Password: "", UserType: "agent", isActive: true });
//       setEditId(null);
//       fetchAgents();
//     } catch {
//       setError("Failed to save agent");
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleEdit = agent => {
//     setForm({
//       UserName: agent.UserName,
//       DisplayName: agent.DisplayName,
//       Password: "",
//       UserType: agent.UserType,
//       isActive: agent.isActive
//     });
//     setEditId(agent._id || agent.id);
//   };

//   const handleDelete = async id => {
//     if (!window.confirm("Are you sure you want to delete this agent?")) return;
//     try {
//       await axios.delete(`/api/users/${id}`);
//       fetchAgents();
//     } catch {
//       setError("Failed to delete agent");
//     }
//   };

//   const handleCancel = () => {
//     setForm({ UserName: "", DisplayName: "", Password: "", UserType: "agent", isActive: true });
//     setEditId(null);
//   };

//   return (
//     <div className="w-full max-w-5xl mx-auto py-6 px-2">
//       {/* Form Card */}
//       <div className="bg-white/90 rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 mb-8 border border-[#e3eef7]">
//         <h2 className="text-xl sm:text-2xl font-bold mb-4 text-[#63B0CD]">
//           {editId ? "Edit Agent" : "Add Agent"}
//         </h2>
//         <form
//           onSubmit={handleSubmit}
//           className="grid grid-cols-1 md:grid-cols-2 gap-4"
//           autoComplete="off"
//         >
//           <input
//             name="UserName"
//             className="border border-[#63B0CD] focus:ring-2 focus:ring-[#63B0CD] rounded-lg px-4 py-3 font-semibold text-[#4E7584] transition"
//             placeholder="Username"
//             value={form.UserName}
//             onChange={handleChange}
//             required
//           />
//           <input
//             name="DisplayName"
//             className="border border-[#63B0CD] focus:ring-2 focus:ring-[#63B0CD] rounded-lg px-4 py-3 font-semibold text-[#4E7584] transition"
//             placeholder="Display Name"
//             value={form.DisplayName}
//             onChange={handleChange}
//             required
//           />
//           <input
//             name="Password"
//             className="border border-[#63B0CD] focus:ring-2 focus:ring-[#63B0CD] rounded-lg px-4 py-3 font-semibold text-[#4E7584] transition"
//             placeholder={editId ? "New Password (leave blank to keep)" : "Password"}
//             type="password"
//             value={form.Password}
//             onChange={handleChange}
//             required={!editId}
//           />
//           <select
//             name="isActive"
//             className="border border-[#63B0CD] focus:ring-2 focus:ring-[#63B0CD] rounded-lg px-4 py-3 font-semibold text-[#4E7584] transition"
//             value={form.isActive}
//             onChange={e => setForm({ ...form, isActive: e.target.value === "true" })}
//           >
//             <option value="true">Active</option>
//             <option value="false">Inactive</option>
//           </select>
//           <div className="col-span-full flex flex-col sm:flex-row gap-3 mt-2">
//             <button
//               type="submit"
//               className="bg-[#63B0CD] hover:bg-[#4E7584] transition text-white px-6 py-2 rounded-lg font-bold shadow w-full sm:w-auto"
//               disabled={saving}
//             >
//               {saving ? "Saving..." : editId ? "Update" : "Create"}
//             </button>
//             {editId && (
//               <button
//                 type="button"
//                 onClick={handleCancel}
//                 className="px-6 py-2 rounded-lg border font-semibold text-[#4E7584] border-[#63B0CD] hover:bg-[#eaf6fd] transition w-full sm:w-auto"
//               >
//                 Cancel
//               </button>
//             )}
//           </div>
//         </form>
//       </div>

//       {/* Agents Table */}
//       <div className="bg-white/90 rounded-2xl shadow-lg p-2 sm:p-4 md:p-8 border border-[#e3eef7]">
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
//           <h2 className="text-xl sm:text-2xl font-bold text-[#63B0CD]">Agent List</h2>
//           {error && <div className="text-red-500 font-medium">{error}</div>}
//         </div>
//         {loading ? (
//           <div className="flex justify-center items-center py-8">
//             <svg className="w-7 h-7 text-[#63B0CD] animate-spin" fill="none" viewBox="0 0 24 24">
//               <circle className="opacity-20" cx="12" cy="12" r="10" stroke="#63B0CD" strokeWidth="4" />
//               <path className="opacity-80" fill="#63B0CD" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
//             </svg>
//           </div>
//         ) : (
//           <>
//             {/* Table for md+, card view for mobile */}
//             <div className="hidden md:block overflow-x-auto rounded-lg">
//               <table className="min-w-full text-base">
//                 <thead>
//                   <tr className="bg-[#f3f8fa]">
//                     <th className="p-3 text-left font-semibold text-[#4E7584]">Username</th>
//                     <th className="p-3 text-left font-semibold text-[#4E7584]">Display Name</th>
//                     <th className="p-3 text-left font-semibold text-[#4E7584]">Status</th>
//                     <th className="p-3 text-left font-semibold text-[#4E7584]">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {agents.map(agent => (
//                     <tr
//                       key={agent._id || agent.id}
//                       className="hover:bg-[#eaf6fd] transition rounded"
//                     >
//                       <td className="p-3">{agent.UserName}</td>
//                       <td className="p-3">{agent.DisplayName}</td>
//                       <td className="p-3">
//                         <span className={`px-3 py-1 rounded-full text-xs font-bold 
//                           ${agent.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
//                           {agent.isActive ? "Active" : "Inactive"}
//                         </span>
//                       </td>
//                       <td className="p-3 flex gap-2">
//                         <button
//                           onClick={() => handleEdit(agent)}
//                           className="text-[#63B0CD] hover:underline font-bold transition"
//                         >
//                           Edit
//                         </button>
//                         <button
//                           onClick={() => handleDelete(agent._id || agent.id)}
//                           className="text-[#e63946] hover:underline font-bold transition"
//                         >
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                   {agents.length === 0 && (
//                     <tr>
//                       <td colSpan="4" className="p-4 text-center text-gray-400">
//                         No agents found.
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//             {/* Mobile Card List */}
//             <div className="md:hidden flex flex-col gap-4">
//               {agents.length === 0 && (
//                 <div className="p-4 text-center text-gray-400">No agents found.</div>
//               )}
//               {agents.map(agent => (
//                 <div
//                   key={agent._id || agent.id}
//                   className="rounded-xl border border-[#e3eef7] bg-white shadow-sm p-4 flex flex-col gap-2"
//                 >
//                   <div>
//                     <span className="font-bold text-[#4E7584]">Username: </span>
//                     <span className="text-gray-800">{agent.UserName}</span>
//                   </div>
//                   <div>
//                     <span className="font-bold text-[#4E7584]">Display Name: </span>
//                     <span className="text-gray-800">{agent.DisplayName}</span>
//                   </div>
//                   <div>
//                     <span className="font-bold text-[#4E7584]">Status: </span>
//                     <span className={`px-3 py-1 rounded-full text-xs font-bold 
//                       ${agent.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
//                       {agent.isActive ? "Active" : "Inactive"}
//                     </span>
//                   </div>
//                   <div className="flex gap-3 mt-2">
//                     <button
//                       onClick={() => handleEdit(agent)}
//                       className="text-[#63B0CD] font-bold underline"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDelete(agent._id || agent.id)}
//                       className="text-[#e63946] font-bold underline"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react";
// import axios from "../../api/axios";

// export default function Agents() {
//   const [agents, setAgents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [form, setForm] = useState({ UserName: "", DisplayName: "", Password: "", UserType: "agent", isActive: true });
//   const [editId, setEditId] = useState(null);
//   const [saving, setSaving] = useState(false);

//   // Load agents
//   const fetchAgents = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get("/api/users");
//       setAgents(res.data.data || []);
//       setError("");
//     } catch (err) {
//       setError("Failed to load agents");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => { fetchAgents(); }, []);

//   // Handle input
//   const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

//   // Create or Update agent
//   const handleSubmit = async e => {
//     e.preventDefault();
//     setSaving(true);
//     try {
//       if (editId) {
//         await axios.put(`/api/users/${editId}`, form);
//       } else {
//         await axios.post("/api/users", form);
//       }
//       setForm({ UserName: "", DisplayName: "", Password: "", UserType: "agent", isActive: true });
//       setEditId(null);
//       fetchAgents();
//     } catch {
//       setError("Failed to save agent");
//     } finally {
//       setSaving(false);
//     }
//   };

//   // Edit
//   const handleEdit = agent => {
//     setForm({
//       UserName: agent.UserName,
//       DisplayName: agent.DisplayName,
//       Password: "",
//       UserType: agent.UserType,
//       isActive: agent.isActive
//     });
//     setEditId(agent._id || agent.id);
//   };

//   // Delete
//   const handleDelete = async id => {
//     if (!window.confirm("Are you sure you want to delete this agent?")) return;
//     try {
//       await axios.delete(`/api/users/${id}`);
//       fetchAgents();
//     } catch {
//       setError("Failed to delete agent");
//     }
//   };

//   // Cancel edit
//   const handleCancel = () => {
//     setForm({ UserName: "", DisplayName: "", Password: "", UserType: "agent", isActive: true });
//     setEditId(null);
//   };

//   return (
//     <div>
//       <h2 className="text-xl font-bold mb-4 text-blue-700">{editId ? "Edit Agent" : "Add Agent"}</h2>
//       <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
//         <input
//           name="UserName"
//           className="border px-3 py-2 rounded"
//           placeholder="Username"
//           value={form.UserName}
//           onChange={handleChange}
//           required
//         />
//         <input
//           name="DisplayName"
//           className="border px-3 py-2 rounded"
//           placeholder="Display Name"
//           value={form.DisplayName}
//           onChange={handleChange}
//           required
//         />
//         <input
//           name="Password"
//           className="border px-3 py-2 rounded"
//           placeholder={editId ? "New Password (leave blank to keep)" : "Password"}
//           type="password"
//           value={form.Password}
//           onChange={handleChange}
//           required={!editId}
//         />
//         <select
//           name="isActive"
//           className="border px-3 py-2 rounded"
//           value={form.isActive}
//           onChange={e => setForm({ ...form, isActive: e.target.value === "true" })}
//         >
//           <option value="true">Active</option>
//           <option value="false">Inactive</option>
//         </select>
//         <div className="col-span-full flex gap-3 mt-2">
//           <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={saving}>
//             {saving ? "Saving..." : editId ? "Update" : "Create"}
//           </button>
//           {editId && (
//             <button type="button" onClick={handleCancel} className="px-4 py-2 rounded border">
//               Cancel
//             </button>
//           )}
//         </div>
//       </form>

//       <h2 className="text-xl font-bold mb-2 text-blue-700">Agent List</h2>
//       {error && <div className="text-red-500 mb-2">{error}</div>}
//       {loading ? (
//         <div>Loading...</div>
//       ) : (
//         <div className="bg-white rounded shadow">
//           <table className="min-w-full text-sm">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="p-2 text-left">Username</th>
//                 <th className="p-2 text-left">Display Name</th>
//                 <th className="p-2 text-left">Status</th>
//                 <th className="p-2 text-left">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {agents.map(agent => (
//                 <tr key={agent._id || agent.id}>
//                   <td className="p-2">{agent.UserName}</td>
//                   <td className="p-2">{agent.DisplayName}</td>
//                   <td className="p-2">{agent.isActive ? "Active" : "Inactive"}</td>
//                   <td className="p-2 flex gap-2">
//                     <button onClick={() => handleEdit(agent)} className="text-blue-600 underline">Edit</button>
//                     <button onClick={() => handleDelete(agent._id || agent.id)} className="text-red-600 underline">Delete</button>
//                   </td>
//                 </tr>
//               ))}
//               {agents.length === 0 && (
//                 <tr>
//                   <td colSpan="4" className="p-2 text-center text-gray-400">No agents found.</td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }



