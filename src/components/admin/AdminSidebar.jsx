import { NavLink, useNavigate } from "react-router-dom";

const navItems = [
  { path: "/admin", label: "Dashboard", icon: "⊞" },
  { path: "/admin/courses", label: "Manage Courses", icon: "📚" },
  { path: "/admin/users", label: "Manage Users", icon: "👥" },
  { path: "/admin/analytics", label: "Analytics", icon: "📊" },
  { path: "/admin/quiz-report", label: "Quiz Reports", icon: "📝" },  // ✅ New
];

export default function AdminSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <aside style={{
      width: "240px", minHeight: "100vh", background: "#0f172a",
      display: "flex", flexDirection: "column",
      borderRight: "1px solid #1e293b", flexShrink: 0,
    }}>
      {/* Logo */}
      <div style={{
        padding: "24px 20px", borderBottom: "1px solid #1e293b",
        background: "linear-gradient(135deg, #1e3a5f 0%, #0f172a 100%)",
      }}>
        <div style={{ fontSize: "20px", fontWeight: "800", color: "#fff", letterSpacing: "-0.5px" }}>
          🎓 CourseAdmin
        </div>
        <div style={{ fontSize: "11px", color: "#64748b", marginTop: "4px" }}>Management Panel</div>
      </div>

      {/* Nav Links */}
      <nav style={{ flex: 1, padding: "16px 12px" }}>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/admin"}
            style={({ isActive }) => ({
              display: "flex", alignItems: "center", gap: "12px",
              padding: "11px 14px", borderRadius: "10px", marginBottom: "4px",
              textDecoration: "none", fontSize: "14px", fontWeight: "500",
              transition: "all 0.2s",
              background: isActive ? "#1d4ed8" : "transparent",
              color: isActive ? "#fff" : "#94a3b8",
            })}
          >
            <span style={{ fontSize: "18px" }}>{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div style={{ padding: "16px 12px", borderTop: "1px solid #1e293b" }}>
        <button onClick={handleLogout} style={{
          width: "100%", padding: "11px 14px", borderRadius: "10px",
          background: "transparent", border: "1px solid #334155",
          color: "#ef4444", cursor: "pointer", fontSize: "14px",
          fontWeight: "500", display: "flex", alignItems: "center", gap: "10px",
        }}>
          🚪 Logout
        </button>
      </div>
    </aside>
  );
}