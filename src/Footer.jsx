import React from 'react';
import { Link } from 'react-router-dom';
import "./style/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      {/* Top Section */}
      <div className="footer-top">

        {/* Brand Column */}
        <div className="footer-brand">
          <div className="brand-header">
            <span className="brand-icon">🎓</span>
            <span className="brand-name">becreatives</span>
          </div>
          <p className="brand-desc">
            Empowering students with real-world skills through project-based internships and industry-recognized certifications.
          </p>

          {/* Social Links */}
          <div className="social-links">
            {[
              { icon: "𝕏", href: "#", label: "Twitter" },
              { icon: "in", href: "#", label: "LinkedIn" },
              { icon: "yt", href: "#", label: "YouTube" },
              { icon: "gh", href: "#", label: "GitHub" },
            ].map(s => (
              <a key={s.label} href={s.href} className="social-link" title={s.label}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Internship Column */}
        <div className="footer-column footer-internship">
          <h4 className="column-header">Internship</h4>
          <ul className="column-list">
            {["Web Development", "AI & Machine Learning", "Data Science", "Mobile Apps", "UI/UX Design"].map(item => (
              <li key={item}>
                <Link to="/" className="column-link">
                  <span className="link-arrow">▶</span>
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company Column */}
        <div className="footer-column footer-company">
          <h4 className="column-header">Company</h4>
          <ul className="column-list">
            {[
              { label: "Home", path: "/home" },
              { label: "Explore", path: "/" },
              { label: "Contact Us", path: "/contact" },
              { label: "Register", path: "/register" },
              { label: "Login", path: "/login" },
            ].map(item => (
              <li key={item.label}>
                <Link to={item.path} className="column-link">
                  <span className="link-arrow">▶</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Column */}
        <div className="footer-column footer-contact">
          <h4 className="column-header">Contact</h4>
          <div className="contact-section">
            {[
              { icon: "📧", text: "aniket@skillected.com" },
              { icon: "📱", text: "+91 98765 43210" },
              { icon: "📍", text: "Nagpur, Maharashtra" },
              { icon: "🕐", text: "Mon–Sat, 9AM–6PM" },
            ].map(c => (
              <div key={c.text} className="contact-item">
                <span className="contact-icon">{c.icon}</span>
                <span className="contact-text">{c.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="footer-stats-bar">
        <div className="footer-stats">
          {[
            { value: "500+", label: "Students Enrolled" },
            { value: "50+", label: "Courses Available" },
            { value: "95%", label: "Placement Rate" },
            { value: "4.8★", label: "Average Rating" },
          ].map(s => (
            <div key={s.label} className="stat-item">
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p className="copyright">
          © 2024 <span className="brand-highlight">becreatives</span> · Made with ❤️ by Aniket
        </p>
        <div className="policy-links">
          {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(link => (
            <a key={link} href="#" className="policy-link">
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;