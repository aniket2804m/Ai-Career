import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from '../../config/api.js';

const API = `${API_BASE_URL}/api/mentor`;

const SKILLS = ["Web Development", "Python", "DSA", "React.js", "Backend / Node.js", "AI / ML"];
const LEVELS = ["beginner", "intermediate", "advanced"];

export default function MentorSetup() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  const [form, setForm] = useState({
    role: "mentee",
    skill: "",
    level: "beginner",
    hoursPerWeek: 3,
    bio: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasProfile, setHasProfile] = useState(false);

  // Existing profile fetch karo
  useEffect(() => {
    axios
      .get(`${API}/profile/me`, { headers })
      .then((res) => {
        const p = res.data;
        setForm({
          role: p.role,
          skill: p.skill,
          level: p.level,
          hoursPerWeek: p.hoursPerWeek,
          bio: p.bio || "",
        });
        setHasProfile(true);
      })
      .catch(() => {}); // profile nahi hai — fresh form dikhao
  }, []);

  const handleSubmit = async () => {
    if (!form.skill) return setError("Skill select karo.");
    setError("");
    setLoading(true);
    try {
      await axios.post(`${API}/profile`, form, { headers });
      navigate("/mentor/browse");
    } catch (err) {
      setError(err.response?.data?.message || "Kuch galat hua.");
    }
    setLoading(false);
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>{hasProfile ? "Profile Update Karo" : "Mentor Profile Banao"}</h2>
        <p style={styles.sub}>
          {form.role === "mentor"
            ? "Tum doosron ko sikhao — free mein community build karo 🎓"
            : "Ek mentor dhundo jo tumhari help kare — bilkul free 🙌"}
        </p>

        {error && <div style={styles.error}>{error}</div>}

        {/* Role Toggle */}
        <div style={styles.label}>Main hoon —</div>
        <div style={styles.toggleRow}>
          {["mentee", "mentor"].map((r) => (
            <button
              key={r}
              onClick={() => setForm({ ...form, role: r })}
              style={{
                ...styles.toggleBtn,
                ...(form.role === r ? styles.toggleActive : {}),
              }}
            >
              {r === "mentor" ? "🎓 Mentor (main sikhata hoon)" : "📚 Mentee (mujhe seekhna hai)"}
            </button>
          ))}
        </div>

        {/* Skill */}
        <div style={styles.label}>Skill *</div>
        <select
          value={form.skill}
          onChange={(e) => setForm({ ...form, skill: e.target.value })}
          style={styles.input}
        >
          <option value="">-- Select Skill --</option>
          {SKILLS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        {/* Level */}
        <div style={styles.label}>Level *</div>
        <div style={styles.toggleRow}>
          {LEVELS.map((l) => (
            <button
              key={l}
              onClick={() => setForm({ ...form, level: l })}
              style={{
                ...styles.toggleBtn,
                ...(form.level === l ? styles.toggleActive : {}),
              }}
            >
              {l}
            </button>
          ))}
        </div>

        {/* Hours */}
        <div style={styles.label}>Hours per week: <strong>{form.hoursPerWeek} hrs</strong></div>
        <input
          type="range"
          min={1}
          max={20}
          value={form.hoursPerWeek}
          onChange={(e) => setForm({ ...form, hoursPerWeek: Number(e.target.value) })}
          style={{ width: "100%", marginBottom: "16px" }}
        />

        {/* Bio */}
        <div style={styles.label}>Bio (optional)</div>
        <textarea
          value={form.bio}
          onChange={(e) => setForm({ ...form, bio: e.target.value })}
          placeholder="Apne baare mein thoda batao — kya seekha, kya sikhana chahte ho..."
          rows={3}
          style={{ ...styles.input, resize: "vertical" }}
        />

        <button onClick={handleSubmit} disabled={loading} style={styles.btn}>
          {loading ? "Saving..." : hasProfile ? "Update Karo →" : "Profile Banao →"}
        </button>
      </div>
    </div>
  );
}

const styles = {
  wrapper: { minHeight: "100vh", background: "#f8fafc", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 16px" },
  card: { background: "#fff", borderRadius: "16px", border: "1px solid #e2e8f0", padding: "32px", width: "100%", maxWidth: "520px", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" },
  title: { fontSize: "22px", fontWeight: "700", color: "#0f172a", marginBottom: "6px" },
  sub: { fontSize: "13px", color: "#64748b", marginBottom: "24px", lineHeight: "1.6" },
  label: { fontSize: "12px", fontWeight: "600", color: "#374151", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.04em" },
  input: { width: "100%", padding: "10px 12px", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "14px", marginBottom: "16px", boxSizing: "border-box", outline: "none", fontFamily: "inherit" },
  toggleRow: { display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "16px" },
  toggleBtn: { padding: "8px 16px", border: "1.5px solid #e2e8f0", borderRadius: "8px", background: "#f8fafc", cursor: "pointer", fontSize: "13px", fontWeight: "500", color: "#475569", fontFamily: "inherit" },
  toggleActive: { border: "1.5px solid #6366f1", background: "#eef2ff", color: "#4338ca" },
  btn: { width: "100%", padding: "13px", background: "#6366f1", color: "#fff", border: "none", borderRadius: "10px", fontSize: "15px", fontWeight: "700", cursor: "pointer", marginTop: "8px", fontFamily: "inherit" },
  error: { background: "#fee2e2", color: "#991b1b", borderRadius: "8px", padding: "10px 14px", fontSize: "13px", marginBottom: "16px" },
};