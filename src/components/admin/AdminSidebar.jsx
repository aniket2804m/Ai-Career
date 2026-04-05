import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./AdminSidebar.css";

const navItems = [
  { path: "/admin", label: "Dashboard", icon: "⊞" },
  { path: "/admin/courses", label: "Manage Courses", icon: "📚" },
  { path: "/admin/users", label: "Manage Users", icon: "👥" },
  { path: "/admin/analytics", label: "Analytics", icon: "📊" },
  { path: "/admin/quiz-report", label: "Quiz Reports", icon: "📝" },
];

export default function AdminSidebar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    setIsOpen(false);
    navigate("/login");
  };

  const handleNavClick = () => {
    // Close sidebar on mobile after clicking nav item
    if (window.innerWidth <= 768) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button className="sidebar-toggle" onClick={() => setIsOpen(!isOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Overlay for mobile */}
      {isOpen && <div className="sidebar-overlay" onClick={() => setIsOpen(false)}></div>}

      {/* Sidebar */}
      <aside className={`admin-sidebar ${isOpen ? "active" : ""}`}>
        {/* Logo */}
        <div className="sidebar-logo">
          <div className="logo-title">🎓 CourseAdmin</div>
          <div className="logo-subtitle">Management Panel</div>
        </div>

        {/* Nav Links */}
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/admin"}
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
              onClick={handleNavClick}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            <span className="logout-icon">🚪</span>
            <span className="logout-label">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}