import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from '../../config/api.js';

const API = `${API_BASE_URL}/api/mentor`;

const SKILLS = ["All", "Web Development", "Python", "DSA", "React.js", "Backend / Node.js", "AI / ML"];

const LEVEL_COLOR = {
  beginner:     { bg: "#dcfce7", color: "#166534" },
  intermediate: { bg: "#fef9c3", color: "#854d0e" },
  advanced:     { bg: "#fee2e2", color: "#991b1b" },
};

function BrowseMentors() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  const [mentors, setMentors] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(null);
  const [message, setMessage] = useState("");
  const [myProfile, setMyProfile] = useState(null);

  useEffect(() => {
    // Pehle apna profile check karo
    axios.get(`${API}/profile/me`, { headers })
      .then((res) => setMyProfile(res.data))
      .catch(() => navigate("/dashboard/mentor/setup")); // profile nahi bana toh setup pe bhejo

    fetchMentors();
  }, []);

  const fetchMentors = async (skill) => {
    setLoading(true);
    try {
      const url = skill && skill !== "All"
        ? `${API}/browse?skill=${encodeURIComponent(skill)}`
        : `${API}/browse`;
      const res = await axios.get(url, { headers });
      setMentors(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleFilter = (skill) => {
    setFilter(skill);
    fetchMentors(skill);
  };

  const handleJoin = async (mentorUserId) => {
    setJoining(mentorUserId);
    setMessage("");
    try {
      const res = await axios.post(`${API}/join/${mentorUserId}`, {}, { headers });
      setMessage("✅ " + res.data.message);
      setTimeout(() => navigate("/mentor/group"), 1500);
    } catch (err) {
      setMessage("❌ " + (err.response?.data?.message || "Kuch galat hua."));
    }
    setJoining(null);
  };

  // Agar already group mein hai toh group pe redirect karo
  if (myProfile?.group) {
    navigate("/mentor/group");
    return null;
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.header}>
        <h2 style={styles.title}>Mentors Browse Karo</h2>
        <p style={styles.sub}>Apne skill ke mentor se free mein sikho — koi fees nahi 🙌</p>
        <button onClick={() => navigate("/mentor/setup")} style={styles.outlineBtn}>
          ✏️ Mera Profile
        </button>
      </div>

      {message && (
        <div style={{ ...styles.msgBox, background: message.startsWith("✅") ? "#dcfce7" : "#fee2e2", color: message.startsWith("✅") ? "#166534" : "#991b1b" }}>
          {message}
        </div>
      )}

      {/* Skill Filter */}
      <div style={styles.filterRow}>
        {SKILLS.map((s) => (
          <button
            key={s}
            onClick={() => handleFilter(s)}
            style={{ ...styles.filterBtn, ...(filter === s ? styles.filterActive : {}) }}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Mentors Grid */}
      {loading ? (
        <div style={styles.center}>Loading mentors...</div>
      ) : mentors.length === 0 ? (
        <div style={styles.empty}>
          <div style={{ fontSize: "40px", marginBottom: "12px" }}>🔍</div>
          <p>Is skill mein abhi koi mentor available nahi hai.</p>
          <p style={{ fontSize: "13px", color: "#94a3b8", marginTop: "6px" }}>
            Tum mentor ban sakte ho aur doosron ki help kar sakte ho!
          </p>
          <button onClick={() => navigate("/mentor/setup")} style={{ ...styles.joinBtn, marginTop: "16px", width: "auto", padding: "10px 20px" }}>
            Mentor Bano →
          </button>
        </div>
      ) : (
        <div style={styles.grid}>
          {mentors.map((mentor) => {
            const lvl = LEVEL_COLOR[mentor.level] || LEVEL_COLOR.beginner;
            return (
              <div key={mentor._id} style={styles.card}>
                {/* Avatar */}
                <div style={styles.avatar}>
                  {mentor.user?.name?.charAt(0).toUpperCase() || "?"}
                </div>
                <div style={styles.name}>{mentor.user?.name}</div>
                <div style={styles.skill}>{mentor.skill}</div>

                <div style={styles.badgeRow}>
                  <span style={{ ...styles.badge, background: lvl.bg, color: lvl.color }}>
                    {mentor.level}
                  </span>
                  <span style={styles.badge2}>
                    ⏰ {mentor.hoursPerWeek} hrs/week
                  </span>
                </div>

                {mentor.bio && (
                  <p style={styles.bio}>{mentor.bio}</p>
                )}

                <button
                  onClick={() => handleJoin(mentor.user._id)}
                  disabled={joining === mentor.user._id}
                  style={styles.joinBtn}
                >
                  {joining === mentor.user._id ? "Joining..." : "Group Join Karo →"}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

const styles = {
  wrapper: { minHeight: "100vh", background: "#f8fafc", padding: "32px 16px", fontFamily: "system-ui, sans-serif" },
  header: { maxWidth: "900px", margin: "0 auto 24px", display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" },
  title: { fontSize: "22px", fontWeight: "700", color: "#0f172a", margin: 0 },
  sub: { fontSize: "13px", color: "#64748b", margin: "4px 0 0" },
  outlineBtn: { padding: "8px 16px", border: "1px solid #e2e8f0", borderRadius: "8px", background: "#fff", cursor: "pointer", fontSize: "13px", fontWeight: "600", color: "#475569" },
  msgBox: { maxWidth: "900px", margin: "0 auto 16px", padding: "12px 16px", borderRadius: "10px", fontSize: "14px", fontWeight: "500" },
  filterRow: { maxWidth: "900px", margin: "0 auto 20px", display: "flex", gap: "8px", flexWrap: "wrap" },
  filterBtn: { padding: "6px 14px", border: "1px solid #e2e8f0", borderRadius: "20px", background: "#fff", cursor: "pointer", fontSize: "12px", fontWeight: "500", color: "#64748b" },
  filterActive: { background: "#6366f1", border: "1px solid #6366f1", color: "#fff" },
  grid: { maxWidth: "900px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "16px" },
  card: { background: "#fff", border: "1px solid #e2e8f0", borderRadius: "16px", padding: "24px", textAlign: "center", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" },
  avatar: { width: "56px", height: "56px", borderRadius: "50%", background: "#eef2ff", color: "#4338ca", fontSize: "22px", fontWeight: "700", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" },
  name: { fontSize: "16px", fontWeight: "700", color: "#0f172a", marginBottom: "4px" },
  skill: { fontSize: "13px", color: "#6366f1", fontWeight: "600", marginBottom: "10px" },
  badgeRow: { display: "flex", gap: "8px", justifyContent: "center", marginBottom: "12px", flexWrap: "wrap" },
  badge: { fontSize: "11px", fontWeight: "600", padding: "3px 10px", borderRadius: "20px" },
  badge2: { fontSize: "11px", fontWeight: "500", padding: "3px 10px", borderRadius: "20px", background: "#f1f5f9", color: "#64748b" },
  bio: { fontSize: "12px", color: "#64748b", lineHeight: "1.6", marginBottom: "16px", textAlign: "left" },
  joinBtn: { width: "100%", padding: "10px", background: "#6366f1", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontWeight: "700" },
  center: { textAlign: "center", color: "#94a3b8", padding: "60px 0" },
  empty: { textAlign: "center", color: "#64748b", padding: "60px 0", maxWidth: "400px", margin: "0 auto" },
};

export default BrowseMentors;