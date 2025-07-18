import React, { useEffect, useState } from "react";
import axios from "../../api/axios";

const defaultForm = {
  Title: "",
  Slug: "",
  Content: "",
  isActive: true,
};

export default function ContentBlockPage() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(defaultForm);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Load all blocks
  const fetchAll = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("/api/contentblocks");
      setItems(res.data.data || []);
    } catch (e) {
      setError("Failed to load content blocks.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  // Handle field changes
  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({
      ...f,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Submit (add/update)
  const handleSubmit = async e => {
    e.preventDefault();
    setSaving(true);
    setError(""); setSuccess("");
    try {
      if (editId) {
        await axios.put(`/api/contentblocks/${editId}`, form);
        setSuccess("Content updated successfully.");
      } else {
        await axios.post("/api/contentblocks", form);
        setSuccess("Content added successfully.");
      }
      setForm(defaultForm);
      setEditId(null);
      fetchAll();
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Failed to save content block."
      );
    } finally {
      setSaving(false);
    }
  };

  // Edit
  const handleEdit = item => {
    setEditId(item._id || item.id);
    setForm({
      Title: item.Title || "",
      Slug: item.Slug || "",
      Content: item.Content || "",
      isActive: item.isActive !== false,
    });
    setError(""); setSuccess("");
  };

  // Delete (soft)
  const handleDelete = async id => {
    if (!window.confirm("Delete this content block?")) return;
    setError(""); setSuccess("");
    try {
      await axios.delete(`/api/contentblocks/${id}`);
      fetchAll();
      setSuccess("Deleted successfully.");
    } catch {
      setError("Delete failed.");
    }
  };

  const handleCancel = () => {
    setForm(defaultForm);
    setEditId(null);
    setError("");
    setSuccess("");
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-[#63B0CD]">Content Blocks (Pages / Static Content)</h1>

      {/* Form */}
      <div className="bg-white rounded-xl shadow-md border p-6 mb-8">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="font-semibold text-gray-700">Title</label>
            <input
              name="Title"
              value={form.Title}
              onChange={handleChange}
              className="block w-full border rounded py-2 px-3 mt-1"
              required
              autoFocus
            />
          </div>
          <div>
            <label className="font-semibold text-gray-700">Slug</label>
            <input
              name="Slug"
              value={form.Slug}
              onChange={handleChange}
              className="block w-full border rounded py-2 px-3 mt-1"
              required
              placeholder="Unique identifier (e.g. about-us)"
            />
          </div>
          <div className="col-span-full">
            <label className="font-semibold text-gray-700">Content</label>
            <textarea
              name="Content"
              value={form.Content}
              onChange={handleChange}
              rows={6}
              className="block w-full border rounded py-2 px-3 mt-1"
              required
            />
          </div>
          <div>
            <label className="font-semibold text-gray-700">Active</label>
            <input
              name="isActive"
              type="checkbox"
              checked={form.isActive}
              onChange={handleChange}
              className="ml-2"
            />
          </div>
          <div className="flex gap-2 col-span-full mt-3">
            <button
              type="submit"
              disabled={saving}
              className="bg-[#63B0CD] hover:bg-[#4E7584] text-white font-bold px-6 py-2 rounded shadow"
            >
              {saving ? "Saving..." : editId ? "Update" : "Add"}
            </button>
            {editId && (
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 rounded border font-semibold text-[#4E7584] border-[#63B0CD] hover:bg-[#eaf6fd] transition"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
        {error && <div className="mt-2 text-red-500 font-semibold">{error}</div>}
        {success && <div className="mt-2 text-green-600 font-semibold">{success}</div>}
      </div>

      {/* List/Table */}
      <div className="bg-white rounded-xl shadow border p-4">
        <h2 className="text-xl font-bold mb-3 text-[#4E7584]">All Content Blocks</h2>
        {loading ? (
          <div className="py-8 text-center">Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr>
                  <th className="p-2 text-left font-bold">Title</th>
                  <th className="p-2 text-left font-bold">Slug</th>
                  <th className="p-2 text-left font-bold">Active</th>
                  <th className="p-2 text-left font-bold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map(item => (
                  <tr key={item._id || item.id} className="border-t">
                    <td className="p-2">{item.Title}</td>
                    <td className="p-2">{item.Slug}</td>
                    <td className="p-2">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${item.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                        {item.isActive ? "Yes" : "No"}
                      </span>
                    </td>
                    <td className="p-2 flex gap-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-blue-700 underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item._id || item.id)}
                        className="text-red-600 underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {items.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-6 text-center text-gray-400">
                      No content blocks found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
