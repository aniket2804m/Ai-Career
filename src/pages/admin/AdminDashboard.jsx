import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../../config/api.js";
import "../style/AdminDashboard.css";

const API = `${API_BASE_URL}/api/admin`;

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ courses: 0, users: 0, monthRevenue: 0, monthOrders: 0 });
  // const [loading, setLoading] = useState(true);

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
    } finally {
      // setLoading(false);
    }
  };

  const statCards = [
    { label: "Total Courses", value: stats.courses, icon: "📚", color: "#3b82f6", bg: "#eff6ff" },
    { label: "Total Users", value: stats.users, icon: "👥", color: "#10b981", bg: "#ecfdf5" },
    { label: "Revenue (Month)", value: `₹${stats.monthRevenue.toLocaleString()}`, icon: "💰", color: "#f59e0b", bg: "#fffbeb" },
    { label: "Orders (Month)", value: stats.monthOrders, icon: "🛒", color: "#8b5cf6", bg: "#f5f3ff" },
  ];

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Admin Dashboard</h1>
          <p className="dashboard-subtitle">Welcome back! Here's your platform overview.</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        {statCards.map((stat) => (
          <div key={stat.label} className="stat-card">
            <div className="stat-icon" style={{ background: stat.bg }}>
              {stat.icon}
            </div>
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="quick-actions-container">
        <h2 className="quick-actions-title">Quick Actions</h2>
        <div className="quick-actions-grid">
          {[
            { label: "Manage Courses", path: "/admin/courses", color: "#3b82f6", icon: "📚" },
            { label: "View All Users", path: "/admin/users", color: "#10b981", icon: "👥" },
            { label: "Revenue Report", path: "/admin/analytics", color: "#f59e0b", icon: "📊" },
          ].map((btn) => (
            <button 
              key={btn.label} 
              className="action-btn"
              onClick={() => navigate(btn.path)}
              style={{ "--btn-color": btn.color }}
            >
              <span className="action-icon">{btn.icon}</span>
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Info Cards */}
      <div className="info-cards-grid">
        <div className="info-card">
          <h3>📈 Platform Growth</h3>
          <p>Your platform is growing steadily with new courses and users every week.</p>
        </div>
        <div className="info-card">
          <h3>🎯 Goals</h3>
          <p>Keep track of your monthly goals and performance metrics.</p>
        </div>
        <div className="info-card">
          <h3>⚙️ Settings</h3>
          <p>Configure your admin preferences and manage platform settings.</p>
        </div>
      </div>
    </div>
  );
}