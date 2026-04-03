import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API = "http://localhost:5000/api/admin";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ courses: 0, users: 0, monthRevenue: 0, monthOrders: 0 });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      const [analyticsRes, usersRes, coursesRes] = await Promise.all([
        axios.get(`${API}/analytics`, { headers }),
        axios.get(`${API}/users`, { headers }),
        axios.get(`${API}/courses`, { headers }),
      ]);
      setStats({
        courses: coursesRes.data.length,
        users: usersRes.data.length,
        monthRevenue: analyticsRes.data.monthRevenue || 0,
        monthOrders: analyticsRes.data.monthOrders || 0,
      });
    } catch (err) {
      console.error("Stats fetch error:", err);
    }
  };

  const statCards = [
    { label: "Total Courses", value: stats.courses, icon: "📚", color: "#3b82f6", bg: "#eff6ff" },
    { label: "Total Users", value: stats.users, icon: "👥", color: "#10b981", bg: "#ecfdf5" },
    { label: "Revenue (Month)", value: `₹${stats.monthRevenue.toLocaleString()}`, icon: "💰", color: "#f59e0b", bg: "#fffbeb" },
    { label: "Orders (Month)", value: stats.monthOrders, icon: "🛒", color: "#8b5cf6", bg: "#f5f3ff" },
  ];

  return (
    <div>
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{ fontSize: "26px", fontWeight: "800", color: "#0f172a", margin: 0 }}>Admin Dashboard</h1>
        <p style={{ color: "#64748b", marginTop: "4px", fontSize: "14px" }}>Welcome back! Here's your platform overview.</p>
      </div>

      {/* Stats Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "28px" }}>
        {statCards.map((stat) => (
          <div key={stat.label} style={{ background: "#fff", borderRadius: "14px", padding: "22px", boxShadow: "0 1px 3px rgba(0,0,0,0.06)", border: "1px solid #e2e8f0" }}>
            <div style={{ width: "44px", height: "44px", borderRadius: "10px", background: stat.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", marginBottom: "12px" }}>{stat.icon}</div>
            <div style={{ fontSize: "26px", fontWeight: "800", color: "#0f172a" }}>{stat.value}</div>
            <div style={{ fontSize: "13px", color: "#64748b", marginTop: "2px" }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div style={{ background: "#fff", borderRadius: "14px", padding: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.06)", border: "1px solid #e2e8f0" }}>
        <h2 style={{ fontSize: "16px", fontWeight: "700", color: "#0f172a", marginBottom: "16px" }}>Quick Actions</h2>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          {[
            { label: "Manage Courses", path: "/admin/courses", color: "#3b82f6" },
            { label: "View All Users", path: "/admin/users", color: "#10b981" },
            { label: "Revenue Report", path: "/admin/analytics", color: "#f59e0b" },
          ].map((btn) => (
            <button key={btn.label} onClick={() => navigate(btn.path)}
              style={{ padding: "10px 20px", borderRadius: "8px", border: "none", background: btn.color, color: "#fff", cursor: "pointer", fontWeight: "600", fontSize: "14px" }}>
              {btn.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}