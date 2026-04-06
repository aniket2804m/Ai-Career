import { NavLink, useNavigate } from "react-router-dom";

const navItems = [
  { path: "/dashboard",            label: "My Dashboard",    icon: "🏠" },
  { path: "/dashboard/courses",    label: "My Courses",      icon: "📖" },
  { path: "/dashboard/progress",   label: "Progress",        icon: "📈" },
  { path: "/dashboard/purchases",  label: "Purchase History", icon: "🧾" },
  { path: "/dashboard/profile",    label: "Profile",         icon: "👤" },
  { path: "/dashboard/mentor/browse", label: "Peer Mentorship", icon: "🤝" }, // ✅ New
];

export default function UserSidebar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || '{"name":"User"}');

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      <style>{`
        .user-sidebar {
          width: 240px;
          min-height: 100vh;
          background: #fafafa;
          display: flex;
          flex-direction: column;
          border-right: 1px solid #e2e8f0;
          flex-shrink: 0;
        }

        @media (max-width: 768px) {
          .user-sidebar {
            width: 100%;
            min-height: auto;
            border-right: none;
            border-bottom: 1px solid #e2e8f0;
          }

          .user-sidebar-nav {
            display: flex;
            gap: 8px;
            overflow-x: auto;
            padding: 12px;
          }

          .user-sidebar-nav::-webkit-scrollbar { height: 6px; }
          .user-sidebar-nav::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 99px;
          }

          .user-sidebar-link {
            margin-bottom: 0 !important;
            white-space: nowrap;
          }
        }
      `}</style>

      <aside className="user-sidebar">
      {/* User Info */}
      <div style={{
        padding: "24px 20px", borderBottom: "1px solid #e2e8f0",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}>
        <div style={{
          width: "48px", height: "48px", borderRadius: "50%",
          background: "rgba(255,255,255,0.3)", display: "flex",
          alignItems: "center", justifyContent: "center",
          fontSize: "22px", marginBottom: "10px",
        }}>
          {user.name?.[0]?.toUpperCase() || "U"}
        </div>
        <div style={{ color: "#fff", fontWeight: "700", fontSize: "15px" }}>{user.name}</div>
        <div style={{ color: "rgba(255,255,255,0.75)", fontSize: "12px", marginTop: "2px" }}>Student</div>
      </div>

      {/* Nav Links */}
      <nav className="user-sidebar-nav" style={{ flex: 1, padding: "16px 12px" }}>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/dashboard"}
            className="user-sidebar-link"
            style={({ isActive }) => ({
              display: "flex", alignItems: "center", gap: "12px",
              padding: "11px 14px", borderRadius: "10px", marginBottom: "4px",
              textDecoration: "none", fontSize: "14px", fontWeight: "500",
              transition: "all 0.2s",
              background: isActive ? "#ede9fe" : "transparent",
              color: isActive ? "#7c3aed" : "#64748b",
            })}
          >
            <span style={{ fontSize: "18px" }}>{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div style={{ padding: "16px 12px", borderTop: "1px solid #e2e8f0" }}>
        <button onClick={handleLogout} style={{
          width: "100%", padding: "11px 14px", borderRadius: "10px",
          background: "transparent", border: "1px solid #fecaca",
          color: "#ef4444", cursor: "pointer", fontSize: "14px",
          fontWeight: "500", display: "flex", alignItems: "center", gap: "10px",
        }}>
          🚪 Logout
        </button>
      </div>
      </aside>
    </>
  );
}