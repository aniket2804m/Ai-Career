import { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import API_BASE_URL from '../../config/api.js';

const API = `${API_BASE_URL}/api/admin`;

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const token = localStorage.getItem("token");
  const headers = useMemo(() => ({ Authorization: `Bearer ${token}` }), [token]);



  const fetchUsers = useCallback(async () => {
    try {
      const res = await axios.get(`${API}/users`, { headers });
      setUsers(res.data);
    } catch (err) { console.error(err); }
  }, [headers]);

   useEffect(() => { fetchUsers(); }, [fetchUsers]);

  const toggleBlock = async (id, isBlocked) => {
    try {
      await axios.put(`${API}/users/${id}/block`, { blocked: !isBlocked }, { headers });
      fetchUsers();
    } catch (err) { console.error(err); }
  };

  const filtered = users.filter(u => {
    const matchSearch = u.name?.toLowerCase().includes(search.toLowerCase()) || u.email?.toLowerCase().includes(search.toLowerCase());
    const matchRole = filterRole === "all" || u.role === filterRole;
    return matchSearch && matchRole;
  });

  return (
    <div style={{ fontFamily: "system-ui, sans-serif" }}>
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#0f172a", margin: 0 }}>Manage Users</h2>
        <p style={{ color: "#64748b", fontSize: "13px", marginTop: "2px" }}>{users.length} total registered users</p>
      </div>

      {/* Stats Row */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
        {[
          { label: "Total", value: users.length, color: "#3b82f6" },
          { label: "Active", value: users.filter(u => !u.blocked).length, color: "#10b981" },
          { label: "Blocked", value: users.filter(u => u.blocked).length, color: "#ef4444" },
          { label: "Admins", value: users.filter(u => u.role === "admin").length, color: "#8b5cf6" },
        ].map(s => (
          <div key={s.label} style={{ background: "#fff", borderRadius: "10px", padding: "14px 20px", border: "1px solid #e2e8f0", minWidth: "100px" }}>
            <div style={{ fontSize: "22px", fontWeight: "800", color: s.color }}>{s.value}</div>
            <div style={{ fontSize: "12px", color: "#64748b" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 Search by name or email..."
          style={{ padding: "10px 14px", border: "1px solid #e2e8f0", borderRadius: "8px", width: "280px", fontSize: "14px", outline: "none" }} />
        <select value={filterRole} onChange={e => setFilterRole(e.target.value)}
          style={{ padding: "10px 14px", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "14px", outline: "none", background: "#fff" }}>
          <option value="all">All Roles</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {/* Users Table */}
      <div style={{ background: "#fff", borderRadius: "14px", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.06)", border: "1px solid #e2e8f0" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
              {["User", "Email", "Role", "Enrolled", "Status", "Action"].map(h => (
                <th key={h} style={{ padding: "14px 16px", textAlign: "left", fontSize: "12px", fontWeight: "700", color: "#64748b", textTransform: "uppercase" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={6} style={{ padding: "40px", textAlign: "center", color: "#94a3b8" }}>No users found</td></tr>
            ) : filtered.map(user => (
              <tr key={user._id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td style={{ padding: "14px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{
                      width: "36px", height: "36px", borderRadius: "50%",
                      background: "linear-gradient(135deg, #667eea, #764ba2)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "#fff", fontWeight: "700", fontSize: "14px",
                    }}>
                      {user.name?.[0]?.toUpperCase()}
                    </div>
                    <div style={{ fontWeight: "600", color: "#0f172a", fontSize: "14px" }}>{user.name}</div>
                  </div>
                </td>
                <td style={{ padding: "14px 16px", color: "#64748b", fontSize: "14px" }}>{user.email}</td>
                <td style={{ padding: "14px 16px" }}>
                  <span style={{
                    background: user.role === "admin" ? "#f5f3ff" : "#f0fdf4",
                    color: user.role === "admin" ? "#7c3aed" : "#16a34a",
                    padding: "3px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: "600",
                  }}>{user.role}</span>
                </td>
                <td style={{ padding: "14px 16px", color: "#374151", fontSize: "14px" }}>{user.enrolledCourses?.length || 0}</td>
                <td style={{ padding: "14px 16px" }}>
                  <span style={{
                    background: user.blocked ? "#fee2e2" : "#dcfce7",
                    color: user.blocked ? "#991b1b" : "#166534",
                    padding: "3px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: "600",
                  }}>{user.blocked ? "Blocked" : "Active"}</span>
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <button onClick={() => toggleBlock(user._id, user.blocked)}
                    style={{
                      padding: "6px 14px", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "600", fontSize: "12px",
                      background: user.blocked ? "#dcfce7" : "#fee2e2",
                      color: user.blocked ? "#166534" : "#991b1b",
                    }}>
                    {user.blocked ? "✓ Unblock" : "⊘ Block"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}