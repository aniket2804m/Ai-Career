import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{
      background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
      color: "#fff",
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      marginTop: "60px",
    }}>

      {/* Top Section */}
      <div style={{
        maxWidth: "1100px", margin: "0 auto",
        padding: "56px 24px 40px",
        display: "grid",
        gridTemplateColumns: "2fr 1fr 1fr 1fr",
        gap: "40px",
      }}>

        {/* Brand Column */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
            <span style={{ fontSize: "28px" }}>🎓</span>
            <span style={{ fontSize: "22px", fontWeight: "800", letterSpacing: "-0.5px", color: "#fff" }}>
              becreatives
            </span>
          </div>
          <p style={{ color: "#94a3b8", fontSize: "14px", lineHeight: "1.8", marginBottom: "24px", maxWidth: "280px" }}>
            Empowering students with real-world skills through project-based internships and industry-recognized certifications.
          </p>

          {/* Social Links */}
          <div style={{ display: "flex", gap: "12px" }}>
            {[
              { icon: "𝕏", href: "#", label: "Twitter" },
              { icon: "in", href: "#", label: "LinkedIn" },
              { icon: "yt", href: "#", label: "YouTube" },
              { icon: "gh", href: "#", label: "GitHub" },
            ].map(s => (
              <a key={s.label} href={s.href}
                style={{
                  width: "38px", height: "38px", borderRadius: "10px",
                  background: "#1e293b", border: "1px solid #334155",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#94a3b8", textDecoration: "none", fontSize: "13px",
                  fontWeight: "700", transition: "all 0.2s",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "#3b82f6";
                  e.currentTarget.style.borderColor = "#3b82f6";
                  e.currentTarget.style.color = "#fff";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "#1e293b";
                  e.currentTarget.style.borderColor = "#334155";
                  e.currentTarget.style.color = "#94a3b8";
                }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Courses Column */}
        <div>
          <h4 style={{ fontSize: "13px", fontWeight: "700", color: "#fff", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "20px" }}>
            Internship
          </h4>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
            {["Web Development", "AI & Machine Learning", "Data Science", "Mobile Apps", "UI/UX Design"].map(item => (
              <li key={item}>
                <Link to="/" style={{
                  color: "#94a3b8", textDecoration: "none", fontSize: "14px",
                  transition: "color 0.2s", display: "flex", alignItems: "center", gap: "6px",
                }}
                  onMouseEnter={e => e.currentTarget.style.color = "#60a5fa"}
                  onMouseLeave={e => e.currentTarget.style.color = "#94a3b8"}
                >
                  <span style={{ color: "#3b82f6", fontSize: "10px" }}>▶</span>
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company Column */}
        <div>
          <h4 style={{ fontSize: "13px", fontWeight: "700", color: "#fff", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "20px" }}>
            Company
          </h4>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
            {[
              { label: "Home", path: "/home" },
              { label: "Explore", path: "/" },
              { label: "Contact Us", path: "/contact" },
              { label: "Register", path: "/register" },
              { label: "Login", path: "/login" },
            ].map(item => (
              <li key={item.label}>
                <Link to={item.path} style={{
                  color: "#94a3b8", textDecoration: "none", fontSize: "14px",
                  transition: "color 0.2s", display: "flex", alignItems: "center", gap: "6px",
                }}
                  onMouseEnter={e => e.currentTarget.style.color = "#60a5fa"}
                  onMouseLeave={e => e.currentTarget.style.color = "#94a3b8"}
                >
                  <span style={{ color: "#3b82f6", fontSize: "10px" }}>▶</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Column */}
        <div>
          <h4 style={{ fontSize: "13px", fontWeight: "700", color: "#fff", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "20px" }}>
            Contact
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {[
              { icon: "📧", text: "aniket@skillected.com" },
              { icon: "📱", text: "+91 98765 43210" },
              { icon: "📍", text: "Nagpur, Maharashtra" },
              { icon: "🕐", text: "Mon–Sat, 9AM–6PM" },
            ].map(c => (
              <div key={c.text} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                <span style={{ fontSize: "16px", marginTop: "1px" }}>{c.icon}</span>
                <span style={{ color: "#94a3b8", fontSize: "13px", lineHeight: "1.5" }}>{c.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div style={{ borderTop: "1px solid #1e293b", borderBottom: "1px solid #1e293b" }}>
        <div style={{
          maxWidth: "1100px", margin: "0 auto", padding: "24px",
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px",
        }}>
          {[
            { value: "500+", label: "Students Enrolled" },
            { value: "50+", label: "Courses Available" },
            { value: "95%", label: "Placement Rate" },
            { value: "4.8★", label: "Average Rating" },
          ].map(s => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "22px", fontWeight: "800", color: "#3b82f6" }}>{s.value}</div>
              <div style={{ fontSize: "12px", color: "#64748b", marginTop: "2px" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
        <p style={{ color: "#475569", fontSize: "13px", margin: 0 }}>
          © 2024 <span style={{ color: "#60a5fa", fontWeight: "600" }}>becreatives</span> · Made with ❤️ by Aniket
        </p>
        <div style={{ display: "flex", gap: "20px" }}>
          {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(link => (
            <a key={link} href="#" style={{ color: "#475569", textDecoration: "none", fontSize: "12px", transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = "#60a5fa"}
              onMouseLeave={e => e.currentTarget.style.color = "#475569"}
            >
              {link}
            </a>
          ))}
        </div>
      </div>

    </footer>
  );
};

export default Footer;