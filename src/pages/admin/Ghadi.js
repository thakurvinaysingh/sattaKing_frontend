import React, { useEffect, useState } from "react";
import axios from "../../api/axios";

export default function Ghadi() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    GID: "",
    NameEn: "",
    NameHn: "",
    RTime: "",
    Result: "",
    OrderId: "",
    isActive: true,
  });
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);

  // Fetch Ghadi list
  const fetchList = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("/api/ghadis");
      setList(res.data.data || []);
    } catch {
      setError("Failed to load ghadi list");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchList(); }, []);

  // Form input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "GID" || name === "OrderId" ? Number(value) : value
    });
  };

  // Submit handler for add/edit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editId) {
        await axios.put(`/api/ghadis/${editId}`, form);
      } else {
        await axios.post("/api/ghadis", form);
      }
      setForm({ GID: "", NameEn: "", NameHn: "", RTime: "", Result: "", OrderId: "", isActive: true });
      setEditId(null);
      fetchList();
    } catch {
      setError("Failed to save ghadi");
    } finally {
      setSaving(false);
    }
  };

  // Start edit
  const handleEdit = (item) => {
    setForm({
      GID: item.GID,
      NameEn: item.NameEn,
      NameHn: item.NameHn,
      RTime: item.RTime,
      Result: item.Result,
      OrderId: item.OrderId,
      isActive: item.isActive,
    });
    setEditId(item._id || item.id);
  };

  // Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this entry?")) return;
    try {
      await axios.delete(`/api/ghadis/${id}`);
      fetchList();
    } catch {
      setError("Failed to delete ghadi");
    }
  };

  // Cancel edit
  const handleCancel = () => {
    setForm({ GID: "", NameEn: "", NameHn: "", RTime: "", Result: "", OrderId: "", isActive: true });
    setEditId(null);
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-6 px-2">
      {/* Form Card */}
      <div className="bg-white/90 rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 mb-8 border border-[#e3eef7]">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-[#63B0CD]">
          {editId ? "Edit Ghadi" : "Add Ghadi"}
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          autoComplete="off"
        >
          <input
            name="GID"
            type="number"
            className="border border-[#63B0CD] focus:ring-2 focus:ring-[#63B0CD] rounded-lg px-4 py-3 font-semibold text-[#4E7584] transition"
            placeholder="GID (number, e.g. 9)"
            value={form.GID}
            onChange={handleChange}
            required
          />
          <input
            name="NameEn"
            className="border border-[#63B0CD] focus:ring-2 focus:ring-[#63B0CD] rounded-lg px-4 py-3 font-semibold text-[#4E7584] transition"
            placeholder="Name (English)"
            value={form.NameEn}
            onChange={handleChange}
            required
          />
          <input
            name="NameHn"
            className="border border-[#63B0CD] focus:ring-2 focus:ring-[#63B0CD] rounded-lg px-4 py-3 font-semibold text-[#4E7584] transition"
            placeholder="Name (Hindi)"
            value={form.NameHn}
            onChange={handleChange}
            required
          />
          <input
            name="RTime"
            className="border border-[#63B0CD] focus:ring-2 focus:ring-[#63B0CD] rounded-lg px-4 py-3 font-semibold text-[#4E7584] transition"
            placeholder="Result Time (e.g. 05:15 AM)"
            value={form.RTime}
            onChange={handleChange}
            required
          />
          <input
            name="Result"
            className="border border-[#63B0CD] focus:ring-2 focus:ring-[#63B0CD] rounded-lg px-4 py-3 font-semibold text-[#4E7584] transition"
            placeholder="Result (optional)"
            value={form.Result}
            onChange={handleChange}
          />
          <input
            name="OrderId"
            type="number"
            className="border border-[#63B0CD] focus:ring-2 focus:ring-[#63B0CD] rounded-lg px-4 py-3 font-semibold text-[#4E7584] transition"
            placeholder="Order ID"
            value={form.OrderId}
            onChange={handleChange}
            required
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

      {/* Ghadi List */}
      <div className="bg-white/90 rounded-2xl shadow-lg p-2 sm:p-4 md:p-8 border border-[#e3eef7]">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#63B0CD]">Ghadi List</h2>
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
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto rounded-lg">
              <table className="min-w-full text-base">
                <thead>
                  <tr className="bg-[#f3f8fa]">
                    <th className="p-3 text-left font-semibold text-[#4E7584]">GID</th>
                    <th className="p-3 text-left font-semibold text-[#4E7584]">Name (En)</th>
                    <th className="p-3 text-left font-semibold text-[#4E7584]">Name (Hi)</th>
                    <th className="p-3 text-left font-semibold text-[#4E7584]">Result Time</th>
                    <th className="p-3 text-left font-semibold text-[#4E7584]">Result</th>
                    <th className="p-3 text-left font-semibold text-[#4E7584]">Order ID</th>
                    <th className="p-3 text-left font-semibold text-[#4E7584]">Status</th>
                    <th className="p-3 text-left font-semibold text-[#4E7584]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map(item => (
                    <tr
                      key={item._id || item.id}
                      className="hover:bg-[#eaf6fd] transition rounded"
                    >
                      <td className="p-3">{item.GID}</td>
                      <td className="p-3">{item.NameEn}</td>
                      <td className="p-3">{item.NameHn}</td>
                      <td className="p-3">{item.RTime}</td>
                      <td className="p-3">{item.Result}</td>
                      <td className="p-3">{item.OrderId}</td>
                      <td className="p-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold 
                          ${item.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                          {item.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="p-3 flex gap-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="text-[#63B0CD] hover:underline font-bold transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item._id || item.id)}
                          className="text-[#e63946] hover:underline font-bold transition"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {list.length === 0 && (
                    <tr>
                      <td colSpan="8" className="p-4 text-center text-gray-400">
                        No records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {/* Mobile Cards */}
            <div className="md:hidden flex flex-col gap-4">
              {list.length === 0 && (
                <div className="p-4 text-center text-gray-400">No records found.</div>
              )}
              {list.map(item => (
                <div
                  key={item._id || item.id}
                  className="rounded-xl border border-[#e3eef7] bg-white shadow-sm p-4 flex flex-col gap-2"
                >
                  <div>
                    <span className="font-bold text-[#4E7584]">GID: </span>
                    <span className="text-gray-800">{item.GID}</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#4E7584]">Name (En): </span>
                    <span className="text-gray-800">{item.NameEn}</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#4E7584]">Name (Hi): </span>
                    <span className="text-gray-800">{item.NameHn}</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#4E7584]">Result Time: </span>
                    <span className="text-gray-800">{item.RTime}</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#4E7584]">Result: </span>
                    <span className="text-gray-800">{item.Result}</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#4E7584]">Order ID: </span>
                    <span className="text-gray-800">{item.OrderId}</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#4E7584]">Status: </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold 
                      ${item.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {item.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <div className="flex gap-3 mt-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-[#63B0CD] font-bold underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item._id || item.id)}
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

// export default function Ghadi() {
//   const [list, setList] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [form, setForm] = useState({
//     NameEn: "",
//     NameHn: "",
//     RTime: "",
//     Result: "",
//     OrderId: "",
//     isActive: true,
//   });
//   const [editId, setEditId] = useState(null);
//   const [saving, setSaving] = useState(false);

//   // Fetch Ghadi list
//   const fetchList = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       const res = await axios.get("/api/ghadis");
//       setList(res.data.data || []);
//     } catch {
//       setError("Failed to load ghadi list");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => { fetchList(); }, []);

//   // Form input change handler
//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   // Submit handler for add/edit
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSaving(true);
//     try {
//       if (editId) {
//         await axios.put(`/api/ghadis/${editId}`, form);
//       } else {
//         await axios.post("/api/ghadis", form);
//       }
//       setForm({ NameEn: "", NameHn: "", RTime: "", Result: "", OrderId: "", isActive: true });
//       setEditId(null);
//       fetchList();
//     } catch {
//       setError("Failed to save ghadi");
//     } finally {
//       setSaving(false);
//     }
//   };

//   // Start edit
//   const handleEdit = (item) => {
//     setForm({
//       NameEn: item.NameEn,
//       NameHn: item.NameHn,
//       RTime: item.RTime,
//       Result: item.Result,
//       OrderId: item.OrderId,
//       isActive: item.isActive,
//     });
//     setEditId(item._id || item.id);
//   };

//   // Delete
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this entry?")) return;
//     try {
//       await axios.delete(`/api/ghadis/${id}`);
//       fetchList();
//     } catch {
//       setError("Failed to delete ghadi");
//     }
//   };

//   // Cancel edit
//   const handleCancel = () => {
//     setForm({ NameEn: "", NameHn: "", RTime: "", Result: "", OrderId: "", isActive: true });
//     setEditId(null);
//   };

//   return (
//     <div>
//       <h2 className="text-xl font-bold mb-4 text-blue-700">{editId ? "Edit Ghadi" : "Add Ghadi"}</h2>
//       <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
//         <input
//           name="NameEn"
//           className="border px-3 py-2 rounded"
//           placeholder="Name (English)"
//           value={form.NameEn}
//           onChange={handleChange}
//           required
//         />
//         <input
//           name="NameHn"
//           className="border px-3 py-2 rounded"
//           placeholder="Name (Hindi)"
//           value={form.NameHn}
//           onChange={handleChange}
//           required
//         />
//         <input
//           name="RTime"
//           className="border px-3 py-2 rounded"
//           placeholder="Result Time (e.g. 14:30)"
//           value={form.RTime}
//           onChange={handleChange}
//           required
//         />
//         <input
//           name="Result"
//           className="border px-3 py-2 rounded"
//           placeholder="Result (optional)"
//           value={form.Result}
//           onChange={handleChange}
//         />
//         <input
//           name="OrderId"
//           type="number"
//           className="border px-3 py-2 rounded"
//           placeholder="Order ID"
//           value={form.OrderId}
//           onChange={handleChange}
//           required
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

//       <h2 className="text-xl font-bold mb-2 text-blue-700">Ghadi List</h2>
//       {error && <div className="text-red-500 mb-2">{error}</div>}
//       {loading ? (
//         <div>Loading...</div>
//       ) : (
//         <div className="bg-white rounded shadow">
//           <table className="min-w-full text-sm">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="p-2 text-left">Name (En)</th>
//                 <th className="p-2 text-left">Name (Hi)</th>
//                 <th className="p-2 text-left">Result Time</th>
//                 <th className="p-2 text-left">Result</th>
//                 <th className="p-2 text-left">OrderId</th>
//                 <th className="p-2 text-left">Status</th>
//                 <th className="p-2 text-left">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {list.map(item => (
//                 <tr key={item._id || item.id}>
//                   <td className="p-2">{item.NameEn}</td>
//                   <td className="p-2">{item.NameHn}</td>
//                   <td className="p-2">{item.RTime}</td>
//                   <td className="p-2">{item.Result}</td>
//                   <td className="p-2">{item.OrderId}</td>
//                   <td className="p-2">{item.isActive ? "Active" : "Inactive"}</td>
//                   <td className="p-2 flex gap-2">
//                     <button onClick={() => handleEdit(item)} className="text-blue-600 underline">Edit</button>
//                     <button onClick={() => handleDelete(item._id || item.id)} className="text-red-600 underline">Delete</button>
//                   </td>
//                 </tr>
//               ))}
//               {list.length === 0 && (
//                 <tr>
//                   <td colSpan="7" className="p-2 text-center text-gray-400">No records found.</td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }


