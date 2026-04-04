import { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import API_BASE_URL from '../../config/api.js';

const API = `${API_BASE_URL}/api/admin`;

const emptyForm = { title: "", description: "", price: "", category: "", thumbnail: "", instructor: "" };

export default function ManageCourses() {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("token");
  const headers = useMemo(() => ({ Authorization: `Bearer ${token}` }), [token]);

  // ✅ Define fetchCourses FIRST
const fetchCourses = useCallback(async () => {
  try {
    const res = await axios.get(`${API}/courses`, { headers });
    setCourses(res.data);
  } catch (err) { console.error(err); }
}, [headers]);

// ✅ Then use it in useEffect
useEffect(() => { fetchCourses(); }, [fetchCourses]);

  const handleSubmit = async () => {
    if (!form.title || !form.price) return alert("Title and Price required!");
    setLoading(true);
    try {
      if (editId) {
        await axios.put(`${API}/courses/${editId}`, form, { headers });
      } else {
        await axios.post(`${API}/courses`, form, { headers });
      }
      setForm(emptyForm); setEditId(null); setShowForm(false);
      fetchCourses();
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  const handleEdit = (course) => {
    setForm({ title: course.title, description: course.description, price: course.price, category: course.category, thumbnail: course.thumbnail, instructor: course.instructor });
    setEditId(course._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(`${API}/courses/${id}`, { headers });
      fetchCourses();
    } catch (err) { console.error(err); }
  };

  const filtered = courses.filter(c => c.title?.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ fontFamily: "system-ui, sans-serif" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <div>
          <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#0f172a", margin: 0 }}>Manage Courses</h2>
          <p style={{ color: "#64748b", fontSize: "13px", marginTop: "2px" }}>{courses.length} total courses</p>
        </div>
        <button onClick={() => { setShowForm(!showForm); setEditId(null); setForm(emptyForm); }}
          style={{ padding: "10px 20px", background: "#1d4ed8", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600" }}>
          {showForm ? "✕ Cancel" : "+ Add Course"}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div style={{ background: "#fff", borderRadius: "14px", padding: "24px", marginBottom: "20px", border: "1px solid #e2e8f0", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
          <h3 style={{ marginBottom: "16px", color: "#0f172a", fontWeight: "700" }}>{editId ? "Edit Course" : "Add New Course"}</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
            {[
              { key: "title", label: "Course Title", placeholder: "e.g. Full Stack React" },
              { key: "instructor", label: "Instructor Name", placeholder: "e.g. Rahul Sharma" },
              { key: "price", label: "Price (₹)", placeholder: "e.g. 999" },
              { key: "category", label: "Category", placeholder: "e.g. Web Development" },
              { key: "thumbnail", label: "Thumbnail URL", placeholder: "https://..." },
            ].map(field => (
              <div key={field.key}>
                <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "6px" }}>{field.label}</label>
                <input
                  value={form[field.key]}
                  onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                  placeholder={field.placeholder}
                  style={{ width: "100%", padding: "10px 12px", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "14px", boxSizing: "border-box", outline: "none" }}
                />
              </div>
            ))}
            <div style={{ gridColumn: "1/-1" }}>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "6px" }}>Description</label>
              <textarea
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                placeholder="Course description..."
                rows={3}
                style={{ width: "100%", padding: "10px 12px", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "14px", boxSizing: "border-box", resize: "vertical", outline: "none" }}
              />
            </div>
          </div>
          <button onClick={handleSubmit} disabled={loading}
            style={{ marginTop: "16px", padding: "11px 28px", background: loading ? "#94a3b8" : "#1d4ed8", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600", fontSize: "14px" }}>
            {loading ? "Saving..." : editId ? "Update Course" : "Create Course"}
          </button>
        </div>
      )}

      {/* Search */}
      <div style={{ marginBottom: "16px" }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 Search courses..."
          style={{ padding: "10px 14px", border: "1px solid #e2e8f0", borderRadius: "8px", width: "280px", fontSize: "14px", outline: "none" }} />
      </div>

      {/* Courses Table */}
      <div style={{ background: "#fff", borderRadius: "14px", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.06)", border: "1px solid #e2e8f0" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
              {["Course", "Category", "Instructor", "Price", "Actions"].map(h => (
                <th key={h} style={{ padding: "14px 16px", textAlign: "left", fontSize: "12px", fontWeight: "700", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={5} style={{ padding: "40px", textAlign: "center", color: "#94a3b8" }}>No courses found</td></tr>
            ) : filtered.map(course => (
              <tr key={course._id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td style={{ padding: "14px 16px" }}>
                  <div style={{ fontWeight: "600", color: "#0f172a", fontSize: "14px" }}>{course.title}</div>
                  <div style={{ color: "#94a3b8", fontSize: "12px", marginTop: "2px" }}>{course.description?.slice(0, 50)}...</div>
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <span style={{ background: "#eff6ff", color: "#3b82f6", padding: "3px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: "600" }}>{course.category || "General"}</span>
                </td>
                <td style={{ padding: "14px 16px", color: "#374151", fontSize: "14px" }}>{course.instructor || "N/A"}</td>
                <td style={{ padding: "14px 16px", fontWeight: "700", color: "#059669" }}>₹{course.price}</td>
                <td style={{ padding: "14px 16px" }}>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button onClick={() => handleEdit(course)}
                      style={{ padding: "6px 14px", background: "#fef9c3", color: "#92400e", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "600", fontSize: "12px" }}>
                      ✏️ Edit
                    </button>
                    <button onClick={() => handleDelete(course._id)}
                      style={{ padding: "6px 14px", background: "#fee2e2", color: "#991b1b", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "600", fontSize: "12px" }}>
                      🗑️ Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}