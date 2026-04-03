import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./style/Navbar.css";

function Navbar({ role, setRole }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    setRole(null);
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  const linkStyle = (path) => ({
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "600",
    padding: "7px 14px",
    borderRadius: "8px",
    transition: "all 0.2s",
    color: isActive(path) ? "#fff" : "#94a3b8",
    background: isActive(path) ? "rgba(99,102,241,0.2)" : "transparent",
    border: isActive(path)
      ? "1px solid rgba(99,102,241,0.4)"
      : "1px solid transparent",
  });

  return (
    <>
      <style>{`
        .nav-search:focus { border-color: #6366f1 !important; box-shadow: 0 0 0 3px rgba(99,102,241,0.15) !important; }
        .nav-link-hover:hover { color: #fff !important; background: rgba(255,255,255,0.07) !important; }
        .logout-btn:hover { background: rgba(239,68,68,0.15) !important; color: #ef4444 !important; border-color: rgba(239,68,68,0.3) !important; }
        .nav-cta:hover { opacity: 0.9; transform: translateY(-1px); }
        .avatar-btn:hover { border-color: #6366f1 !important; }
      `}</style>

      <header
        style={{
          background: "rgba(15,23,42,0.95)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          position: "sticky",
          top: 0,
          zIndex: 1000,
          fontFamily: "'Segoe UI', system-ui, sans-serif",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 24px",
            height: "64px",
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          {/* ── Logo ── */}
          <div
            onClick={() => navigate("/home")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #6366f1, #3b82f6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
              }}
            >
              🎓
            </div>
            <span
              style={{
                fontSize: "18px",
                fontWeight: "800",
                color: "#fff",
                letterSpacing: "-0.5px",
              }}
            >
              Be<span style={{ color: "#6366f1" }}>creatives</span>
            </span>
          </div>

          {/* Mobile Menu Button */}
          <div
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              display: "none",
              marginLeft: "auto",
              fontSize: "22px",
              cursor: "pointer",
              color: "#fff",
            }}
            className="menu-btn"
          >
            ☰
          </div>

          {/* ── Nav Links ── */}
          <nav
           className={`nav-menu ${menuOpen ? "open" : ""}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              marginLeft: "auto",
              flexShrink: 0,
            }}
          >
            <Link
              to="/resume-ats"
              className="nav-link-hover"
              style={linkStyle("/resume-ats")}
            >
              Resume ATS Check
            </Link>
            <Link to="/" className="nav-link-hover" style={linkStyle("/")}>
              Scam Detector
            </Link>
            <Link
              to="/roadmap"
              className="nav-link-hover"
              style={linkStyle("/roadmap")}
            >
              Roadmap Builder
            </Link>
            <Link
              to="/home"
              className="nav-link-hover"
              style={linkStyle("/home")}
            >
              Home
            </Link>
            <Link
              to="/explore"
              className="nav-link-hover"
              style={linkStyle("/explore")}
            >
              Explore
            </Link>
            <Link
              to="/contact"
              className="nav-link-hover"
              style={linkStyle("/contact")}
            >
              Contact
            </Link>
            <Link
              to="/careers"
              className="nav-link-hover"
              style={linkStyle("/careers")}
            >
              Careers
            </Link>

            {/* Not logged in */}
            {!role && (
              <>
                <Link
                  to="/register"
                  className="nav-link-hover"
                  style={linkStyle("/register")}
                >
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  style={{
                    textDecoration: "none",
                    fontSize: "14px",
                    fontWeight: "700",
                    padding: "8px 18px",
                    borderRadius: "8px",
                    background: "linear-gradient(135deg, #6366f1, #3b82f6)",
                    color: "#fff",
                    marginLeft: "4px",
                    transition: "all 0.2s",
                  }}
                  className="nav-cta"
                >
                  Login
                </Link>
              </>
            )}

            {/* Admin links */}
            {role === "admin" && (
              <>
                <Link
                  to="/create"
                  className="nav-link-hover"
                  style={linkStyle("/create")}
                >
                  Add Course
                </Link>
                <Link
                  to="/admin"
                  style={{
                    textDecoration: "none",
                    fontSize: "14px",
                    fontWeight: "700",
                    padding: "8px 16px",
                    borderRadius: "8px",
                    background: "rgba(245,158,11,0.15)",
                    border: "1px solid rgba(245,158,11,0.3)",
                    color: "#f59e0b",
                    marginLeft: "4px",
                  }}
                >
                  ⚙️ Admin
                </Link>
              </>
            )}

            {/* User dashboard */}
            {role && role !== "admin" && (
              <Link
                to="/dashboard"
                style={{
                  textDecoration: "none",
                  fontSize: "14px",
                  fontWeight: "700",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  background: "rgba(99,102,241,0.15)",
                  border: "1px solid rgba(99,102,241,0.3)",
                  color: "#a5b4fc",
                  marginLeft: "4px",
                }}
              >
                📚 Dashboard
              </Link>
            )}

            {/* User Avatar + Logout */}
            {role && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginLeft: "8px",
                  paddingLeft: "12px",
                  borderLeft: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {/* Avatar */}
                <div
                  className="avatar-btn"
                  style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #6366f1, #3b82f6)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontWeight: "800",
                    fontSize: "14px",
                    border: "2px solid rgba(99,102,241,0.3)",
                    cursor: "default",
                    flexShrink: 0,
                  }}
                >
                  {user?.name?.[0]?.toUpperCase() ||
                    (role === "admin" ? "A" : "U")}
                </div>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="logout-btn"
                  style={{
                    padding: "7px 14px",
                    borderRadius: "8px",
                    background: "transparent",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#94a3b8",
                    cursor: "pointer",
                    fontSize: "13px",
                    fontWeight: "600",
                    transition: "all 0.2s",
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </nav>
        </div>
      </header>
    </>
  );
}

export default Navbar;
