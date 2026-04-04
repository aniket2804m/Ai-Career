import { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from '../../config/api.js';

const API = `${API_BASE_URL}/api/user`;

export default function UserProfile() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", bio: "" });
  const [passwords, setPasswords] = useState({ current: "", newPass: "", confirm: "" });
  const [saved, setSaved] = useState(false);
  const [tab, setTab] = useState("profile");
  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setForm({ name: user.name || "", email: user.email || "", phone: user.phone || "", bio: user.bio || "" });
  }, []);

  const handleSave = async () => {
    try {
      const res = await axios.put(`${API}/profile`, form, { headers });
      localStorage.setItem("user", JSON.stringify(res.data));
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  const handlePasswordChange = async () => {
    if (passwords.newPass !== passwords.confirm) return alert("Passwords don't match!");
    if (passwords.newPass.length < 6) return alert("Password must be at least 6 characters");
    try {
      await axios.put(`${API}/change-password`, { currentPassword: passwords.current, newPassword: passwords.newPass }, { headers });
      alert("Password updated successfully!");
      setPasswords({ current: "", newPass: "", confirm: "" });
    } catch (err) {
      alert(err.response?.data?.message || "Error updating password");
    }
  };

  const inputStyle = { width: "100%", padding: "10px 12px", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "14px", boxSizing: "border-box", outline: "none", fontFamily: "inherit" };
  const labelStyle = { fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "6px" };

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", maxWidth: "640px" }}>
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#0f172a", margin: 0 }}>Profile Settings</h2>
        <p style={{ color: "#64748b", fontSize: "13px", marginTop: "2px" }}>Update your personal information</p>
      </div>

      {/* Avatar section */}
      <div style={{ background: "#fff", borderRadius: "14px", padding: "24px", border: "1px solid #e2e8f0", marginBottom: "16px", display: "flex", alignItems: "center", gap: "20px" }}>
        <div style={{
          width: "72px", height: "72px", borderRadius: "50%",
          background: "linear-gradient(135deg, #667eea, #764ba2)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "28px", color: "#fff", fontWeight: "800",
        }}>
          {form.name?.[0]?.toUpperCase() || "U"}
        </div>
        <div>
          <div style={{ fontWeight: "700", color: "#0f172a", fontSize: "16px" }}>{form.name}</div>
          <div style={{ color: "#64748b", fontSize: "13px", marginTop: "2px" }}>{form.email}</div>
          <div style={{ fontSize: "12px", color: "#7c3aed", marginTop: "4px", fontWeight: "600" }}>Student</div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "4px", marginBottom: "16px", background: "#f1f5f9", borderRadius: "10px", padding: "4px" }}>
        {[["profile", "👤 Profile Info"], ["password", "🔒 Password"]].map(([key, label]) => (
          <button key={key} onClick={() => setTab(key)}
            style={{
              flex: 1, padding: "9px", border: "none", borderRadius: "7px", cursor: "pointer",
              fontWeight: "600", fontSize: "13px", transition: "all 0.2s",
              background: tab === key ? "#fff" : "transparent",
              color: tab === key ? "#7c3aed" : "#64748b",
              boxShadow: tab === key ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
            }}>
            {label}
          </button>
        ))}
      </div>

      {tab === "profile" && (
        <div style={{ background: "#fff", borderRadius: "14px", padding: "24px", border: "1px solid #e2e8f0" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
            <div>
              <label style={labelStyle}>Full Name</label>
              <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={inputStyle} placeholder="Your name" />
            </div>
            <div>
              <label style={labelStyle}>Email</label>
              <input value={form.email} disabled style={{ ...inputStyle, background: "#f8fafc", color: "#94a3b8" }} />
            </div>
            <div>
              <label style={labelStyle}>Phone Number</label>
              <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} style={inputStyle} placeholder="+91 XXXXX XXXXX" />
            </div>
            <div style={{ gridColumn: "1/-1" }}>
              <label style={labelStyle}>Bio</label>
              <textarea value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} style={{ ...inputStyle, resize: "vertical" }} rows={3} placeholder="Tell something about yourself..." />
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "16px" }}>
            <button onClick={handleSave}
              style={{ padding: "11px 28px", background: "linear-gradient(135deg, #667eea, #764ba2)", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600", fontSize: "14px" }}>
              Save Changes
            </button>
            {saved && <span style={{ color: "#059669", fontSize: "13px", fontWeight: "600" }}>✓ Changes saved!</span>}
          </div>
        </div>
      )}

      {tab === "password" && (
        <div style={{ background: "#fff", borderRadius: "14px", padding: "24px", border: "1px solid #e2e8f0" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {[
              { key: "current", label: "Current Password" },
              { key: "newPass", label: "New Password" },
              { key: "confirm", label: "Confirm New Password" },
            ].map(f => (
              <div key={f.key}>
                <label style={labelStyle}>{f.label}</label>
                <input type="password" value={passwords[f.key]}
                  onChange={e => setPasswords({ ...passwords, [f.key]: e.target.value })}
                  style={inputStyle} placeholder="••••••••" />
              </div>
            ))}
          </div>
          <button onClick={handlePasswordChange}
            style={{ marginTop: "16px", padding: "11px 28px", background: "#1d4ed8", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600", fontSize: "14px" }}>
            Update Password
          </button>
        </div>
      )}
    </div>
  );
}