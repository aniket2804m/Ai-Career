import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:5000/api/mentor";

export default function GroupDashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
//   const user = JSON.parse(localStorage.getItem("user") || "{}");
  const headers = { Authorization: `Bearer ${token}` };

  const [group, setGroup] = useState(null);
  const [myProfile, setMyProfile] = useState(null);
  const [goal, setGoal] = useState("");
  const [editGoal, setEditGoal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, groupRes] = await Promise.all([
          axios.get(`${API}/profile/me`, { headers }),
          axios.get(`${API}/group`, { headers }),
        ]);
        setMyProfile(profileRes.data);
        setGroup(groupRes.data);
        setGoal(groupRes.data.weeklyGoal || "");
      } catch{
        // Group nahi mila — browse pe bhejo
        navigate("/dashboard/mentor/browse");
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleGoalSave = async () => {
    try {
      await axios.patch(`${API}/group/goal`, { weeklyGoal: goal }, { headers });
      setMsg("✅ Goal set ho gaya!");
      setEditGoal(false);
      setTimeout(() => setMsg(""), 2000);
    } catch (err) {
      setMsg("❌ " + (err.response?.data?.message || "Error."));
    }
  };

  if (loading) return <div style={styles.center}>Loading group...</div>;
  if (!group) return null;

  const isMentor = myProfile?.role === "mentor";
  const allMembers = [group.mentor, ...group.mentees];

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>

        {/* Header */}
        <div style={styles.topBar}>
          <div>
            <div style={styles.groupBadge}>Group — {group.skill}</div>
            <h2 style={styles.title}>Tumhara Study Group 🎓</h2>
          </div>
          <button onClick={() => navigate("/mentor/browse")} style={styles.outlineBtn}>
            ← Browse
          </button>
        </div>

        {msg && (
          <div style={{ ...styles.msgBox, background: msg.startsWith("✅") ? "#dcfce7" : "#fee2e2", color: msg.startsWith("✅") ? "#166534" : "#991b1b" }}>
            {msg}
          </div>
        )}

        {/* Weekly Goal */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <span style={styles.cardTitle}>📌 Is Week Ka Goal</span>
            {isMentor && (
              <button onClick={() => setEditGoal(!editGoal)} style={styles.editBtn}>
                {editGoal ? "Cancel" : "✏️ Edit"}
              </button>
            )}
          </div>
          {editGoal ? (
            <div>
              <input
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="e.g. Flexbox complete karo aur ek landing page banao"
                style={styles.input}
              />
              <button onClick={handleGoalSave} style={styles.saveBtn}>Save Goal</button>
            </div>
          ) : (
            <p style={styles.goalText}>
              {group.weeklyGoal || (isMentor ? "Koi goal nahi set hua — Edit karo." : "Mentor ne abhi goal set nahi kiya.")}
            </p>
          )}
        </div>

        {/* Members */}
        <div style={styles.card}>
          <div style={styles.cardTitle}>👥 Group Members ({allMembers.length}/5)</div>
          <div style={styles.membersGrid}>

            {/* Mentor */}
            <div style={{ ...styles.memberCard, borderColor: "#6366f1" }}>
              <div style={{ ...styles.avatar, background: "#eef2ff", color: "#4338ca" }}>
                {group.mentor?.name?.charAt(0).toUpperCase()}
              </div>
              <div style={styles.memberName}>{group.mentor?.name}</div>
              <div style={styles.memberEmail}>{group.mentor?.email}</div>
              <span style={styles.mentorBadge}>🎓 Mentor</span>
            </div>

            {/* Mentees */}
            {group.mentees.map((mentee) => (
              <div key={mentee._id} style={styles.memberCard}>
                <div style={styles.avatar}>
                  {mentee?.name?.charAt(0).toUpperCase()}
                </div>
                <div style={styles.memberName}>{mentee?.name}</div>
                <div style={styles.memberEmail}>{mentee?.email}</div>
                <span style={styles.menteeBadge}>📚 Mentee</span>
              </div>
            ))}

            {/* Empty slots */}
            {Array.from({ length: 4 - group.mentees.length }).map((_, i) => (
              <div key={`empty-${i}`} style={{ ...styles.memberCard, opacity: 0.4 }}>
                <div style={{ ...styles.avatar, background: "#f1f5f9", color: "#94a3b8" }}>?</div>
                <div style={styles.memberName}>Empty Slot</div>
                <div style={styles.memberEmail}>Waiting for mentee...</div>
              </div>
            ))}
          </div>
        </div>

        {/* Group Status */}
        <div style={styles.card}>
          <div style={styles.cardTitle}>📊 Group Info</div>
          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>Skill</span>
            <span style={styles.infoValue}>{group.skill}</span>
          </div>
          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>Status</span>
            <span style={{ ...styles.infoValue, color: group.isOpen ? "#059669" : "#dc2626", fontWeight: "600" }}>
              {group.isOpen ? "✅ Open (aur log join kar sakte hain)" : "🔒 Full (5/5)"}
            </span>
          </div>
          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>Tumhara Role</span>
            <span style={styles.infoValue}>{isMentor ? "🎓 Mentor" : "📚 Mentee"}</span>
          </div>
          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>Group Bana</span>
            <span style={styles.infoValue}>{new Date(group.createdAt).toLocaleDateString("en-IN")}</span>
          </div>
        </div>

        {/* Tips */}
        <div style={{ ...styles.card, background: "#eff6ff", border: "1px solid #bfdbfe" }}>
          <div style={{ ...styles.cardTitle, color: "#1e40af" }}>
            💡 {isMentor ? "Mentor Tips" : "Mentee Tips"}
          </div>
          {isMentor ? (
            <ul style={styles.tipList}>
              <li>Har week ek clear goal set karo group ke liye</li>
              <li>Mentees ke doubts pehle solve karo</li>
              <li>Ek chhota project assign karo har week</li>
              <li>Patient raho — sab apni speed se seekhte hain</li>
            </ul>
          ) : (
            <ul style={styles.tipList}>
              <li>Mentor se sawal poochne mein sharm mat karo</li>
              <li>Weekly goal zaroor complete karo</li>
              <li>Group mein doosron ki bhi help karo</li>
              <li>Progress regularly share karo</li>
            </ul>
          )}
        </div>

      </div>
    </div>
  );
}

const styles = {
  wrapper: { minHeight: "100vh", background: "#f8fafc", padding: "32px 16px", fontFamily: "system-ui, sans-serif" },
  container: { maxWidth: "800px", margin: "0 auto" },
  topBar: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px", flexWrap: "wrap", gap: "12px" },
  groupBadge: { display: "inline-block", background: "#eef2ff", color: "#4338ca", borderRadius: "20px", padding: "3px 12px", fontSize: "12px", fontWeight: "600", marginBottom: "6px" },
  title: { fontSize: "22px", fontWeight: "700", color: "#0f172a", margin: 0 },
  outlineBtn: { padding: "8px 16px", border: "1px solid #e2e8f0", borderRadius: "8px", background: "#fff", cursor: "pointer", fontSize: "13px", fontWeight: "600", color: "#475569" },
  msgBox: { padding: "12px 16px", borderRadius: "10px", fontSize: "14px", fontWeight: "500", marginBottom: "16px" },
  card: { background: "#fff", border: "1px solid #e2e8f0", borderRadius: "16px", padding: "20px", marginBottom: "16px" },
  cardHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" },
  cardTitle: { fontSize: "15px", fontWeight: "700", color: "#0f172a", marginBottom: "12px" },
  editBtn: { padding: "5px 12px", border: "1px solid #e2e8f0", borderRadius: "6px", background: "transparent", cursor: "pointer", fontSize: "12px", color: "#64748b" },
  input: { width: "100%", padding: "10px 12px", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "14px", boxSizing: "border-box", outline: "none", marginBottom: "10px", fontFamily: "inherit" },
  saveBtn: { padding: "9px 20px", background: "#6366f1", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontWeight: "600" },
  goalText: { fontSize: "14px", color: "#374151", lineHeight: "1.6" },
  membersGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: "12px" },
  memberCard: { border: "1px solid #e2e8f0", borderRadius: "12px", padding: "16px 12px", textAlign: "center" },
  avatar: { width: "44px", height: "44px", borderRadius: "50%", background: "#f1f5f9", color: "#64748b", fontSize: "18px", fontWeight: "700", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 8px" },
  memberName: { fontSize: "13px", fontWeight: "600", color: "#0f172a", marginBottom: "2px" },
  memberEmail: { fontSize: "11px", color: "#94a3b8", marginBottom: "8px", wordBreak: "break-all" },
  mentorBadge: { fontSize: "11px", background: "#eef2ff", color: "#4338ca", padding: "2px 8px", borderRadius: "20px", fontWeight: "600" },
  menteeBadge: { fontSize: "11px", background: "#f0fdf4", color: "#166534", padding: "2px 8px", borderRadius: "20px", fontWeight: "600" },
  infoRow: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid #f1f5f9" },
  infoLabel: { fontSize: "13px", color: "#64748b" },
  infoValue: { fontSize: "13px", color: "#0f172a" },
  tipList: { paddingLeft: "18px", fontSize: "13px", color: "#1e40af", lineHeight: "2" },
  center: { display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", color: "#94a3b8" },
};