import { useNavigate } from "react-router-dom";

export default function UserDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || '{"name":"Student"}');

  const quickStats = [
    { label: "Courses Enrolled", value: "0", icon: "📚", color: "#7c3aed" },
    { label: "Completed", value: "0", icon: "✅", color: "#059669" },
    { label: "In Progress", value: "0", icon: "⏳", color: "#f59e0b" },
    { label: "Certificates", value: "0", icon: "🏆", color: "#3b82f6" },
  ];

  return (
    <div>
      {/* Welcome Banner */}
      <div style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", borderRadius: "16px", padding: "28px", marginBottom: "24px", color: "#fff" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "800", margin: 0 }}>Welcome back, {user.name}! 👋</h1>
        <p style={{ marginTop: "6px", opacity: 0.85, fontSize: "14px" }}>Continue your learning journey. You're doing great!</p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "14px", marginBottom: "24px" }}>
        {quickStats.map(stat => (
          <div key={stat.label} style={{ background: "#fff", borderRadius: "14px", padding: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.06)", border: "1px solid #e2e8f0", textAlign: "center" }}>
            <div style={{ fontSize: "28px", marginBottom: "8px" }}>{stat.icon}</div>
            <div style={{ fontSize: "26px", fontWeight: "800", color: stat.color }}>{stat.value}</div>
            <div style={{ fontSize: "12px", color: "#64748b", marginTop: "2px" }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Quick Links */}
      <div style={{ background: "#fff", borderRadius: "14px", padding: "22px", border: "1px solid #e2e8f0" }}>
        <h3 style={{ fontWeight: "700", color: "#0f172a", marginBottom: "14px", fontSize: "15px" }}>Quick Actions</h3>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {[
            { label: "My Courses", path: "/dashboard/courses", color: "#7c3aed" },
            { label: "View Progress", path: "/dashboard/progress", color: "#059669" },
            { label: "My Purchases", path: "/dashboard/purchases", color: "#f59e0b" },
            { label: "Edit Profile", path: "/dashboard/profile", color: "#3b82f6" },
          ].map(btn => (
            <button key={btn.label} onClick={() => navigate(btn.path)}
              style={{ padding: "10px 18px", borderRadius: "8px", border: `1px solid ${btn.color}`, background: "#fff", color: btn.color, cursor: "pointer", fontWeight: "600", fontSize: "13px" }}>
              {btn.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}