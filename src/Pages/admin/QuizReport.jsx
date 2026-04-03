import { useState, useEffect, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";

const API = "http://localhost:5000/api/quiz";

export default function QuizReport() {
//   const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [results, setResults] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [search, setSearch] = useState("");

  const fetchData = useCallback(async () => {
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const [resultsRes, quizzesRes] = await Promise.all([
        axios.get(`${API}/results`, { headers }),
        axios.get(`${API}/all`, { headers }),
      ]);
      setResults(resultsRes.data);
      setQuizzes(quizzesRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [token]);

   useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Filter results
  const filtered = results.filter(r => {
    const matchCourse = selectedCourse === "all" || r.course?._id === selectedCourse;
    const matchSearch = r.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
                        r.user?.email?.toLowerCase().includes(search.toLowerCase());
    return matchCourse && matchSearch;
  });

  // Stats calculate karo
  const totalAttempts = filtered.length;
  const passedCount = filtered.filter(r => r.passed).length;
  const failedCount = filtered.filter(r => !r.passed).length;
  const avgScore = filtered.length
    ? Math.round(filtered.reduce((sum, r) => sum + r.percentage, 0) / filtered.length)
    : 0;

  if (loading) return (
    <div style={{ textAlign: "center", padding: "60px", color: "#64748b", fontFamily: "system-ui" }}>
      <div style={{ fontSize: "36px" }}>⏳</div>
      <p>Report load ho rahi hai...</p>
    </div>
  );

  return (
    <div style={{ fontFamily: "system-ui, sans-serif" }}>

      {/* Header */}
      <div style={{ marginBottom: "24px" }}>
        <h2 style={{ fontSize: "22px", fontWeight: "800", color: "#0f172a", margin: 0 }}>Quiz Reports</h2>
        <p style={{ color: "#64748b", fontSize: "13px", marginTop: "4px" }}>
          Sabhi users ke quiz results dekho
        </p>
      </div>

      {/* Stats Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "14px", marginBottom: "24px" }}>
        {[
          { label: "Total Attempts", value: totalAttempts, icon: "📝", color: "#3b82f6", bg: "#eff6ff" },
          { label: "Passed", value: passedCount, icon: "✅", color: "#22c55e", bg: "#f0fdf4" },
          { label: "Failed", value: failedCount, icon: "❌", color: "#ef4444", bg: "#fef2f2" },
          { label: "Avg Score", value: `${avgScore}%`, icon: "📊", color: "#f59e0b", bg: "#fffbeb" },
        ].map(s => (
          <div key={s.label} style={{
            background: "#fff", borderRadius: "14px", padding: "18px",
            border: "1px solid #e2e8f0", boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
          }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", marginBottom: "10px" }}>
              {s.icon}
            </div>
            <div style={{ fontSize: "24px", fontWeight: "800", color: s.color }}>{s.value}</div>
            <div style={{ fontSize: "12px", color: "#64748b", marginTop: "2px" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "16px", flexWrap: "wrap" }}>

        {/* Search */}
        <input
          type="text"
          placeholder="🔍 User name ya email search karo..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ flex: 1, minWidth: "220px", padding: "10px 14px", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "14px", outline: "none" }}
        />

        {/* Course Filter */}
        <select
          value={selectedCourse}
          onChange={e => setSelectedCourse(e.target.value)}
          style={{ padding: "10px 14px", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "14px", outline: "none", background: "#fff", minWidth: "200px" }}
        >
          <option value="all">All Courses</option>
          {quizzes.map(q => (
            <option key={q.course?._id} value={q.course?._id}>
              {q.course?.title}
            </option>
          ))}
        </select>
      </div>

      {/* Pass/Fail Rate Bar */}
      {totalAttempts > 0 && (
        <div style={{ background: "#fff", borderRadius: "14px", padding: "20px", border: "1px solid #e2e8f0", marginBottom: "16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
            <span style={{ fontSize: "14px", fontWeight: "600", color: "#374151" }}>Pass Rate</span>
            <span style={{ fontSize: "14px", fontWeight: "700", color: "#22c55e" }}>
              {Math.round((passedCount / totalAttempts) * 100)}%
            </span>
          </div>
          <div style={{ background: "#fef2f2", borderRadius: "8px", height: "12px", overflow: "hidden" }}>
            <div style={{
              height: "100%", borderRadius: "8px",
              background: "linear-gradient(90deg, #22c55e, #16a34a)",
              width: `${(passedCount / totalAttempts) * 100}%`,
              transition: "width 0.5s",
            }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "6px" }}>
            <span style={{ fontSize: "12px", color: "#22c55e" }}>✅ {passedCount} Passed</span>
            <span style={{ fontSize: "12px", color: "#ef4444" }}>❌ {failedCount} Failed</span>
          </div>
        </div>
      )}

      {/* Results Table */}
      <div style={{ background: "#fff", borderRadius: "14px", overflow: "hidden", border: "1px solid #e2e8f0", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
              {["User", "Course", "Quiz", "Score", "Time", "Status", "Date"].map(h => (
                <th key={h} style={{ padding: "13px 16px", textAlign: "left", fontSize: "11px", fontWeight: "700", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ padding: "50px", textAlign: "center", color: "#94a3b8" }}>
                  <div style={{ fontSize: "36px", marginBottom: "8px" }}>📭</div>
                  Koi results nahi mila
                </td>
              </tr>
            ) : filtered.map(r => (
              <tr key={r._id} style={{ borderBottom: "1px solid #f1f5f9", transition: "background 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.background = "#f8fafc"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                {/* User */}
                <td style={{ padding: "14px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{
                      width: "34px", height: "34px", borderRadius: "50%",
                      background: "linear-gradient(135deg, #667eea, #764ba2)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "#fff", fontWeight: "700", fontSize: "13px", flexShrink: 0,
                    }}>
                      {r.user?.name?.[0]?.toUpperCase()}
                    </div>
                    <div>
                      <div style={{ fontWeight: "600", color: "#0f172a", fontSize: "13px" }}>{r.user?.name}</div>
                      <div style={{ color: "#94a3b8", fontSize: "11px" }}>{r.user?.email}</div>
                    </div>
                  </div>
                </td>

                {/* Course */}
                <td style={{ padding: "14px 16px" }}>
                  <span style={{ fontSize: "13px", color: "#374151", fontWeight: "500" }}>
                    {r.course?.title || "N/A"}
                  </span>
                </td>

                {/* Quiz */}
                <td style={{ padding: "14px 16px" }}>
                  <span style={{ fontSize: "13px", color: "#374151" }}>
                    {r.quiz?.title || "N/A"}
                  </span>
                </td>

                {/* Score */}
                <td style={{ padding: "14px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{
                      width: "38px", height: "38px", borderRadius: "50%",
                      background: r.passed
                        ? "linear-gradient(135deg, #22c55e, #16a34a)"
                        : "linear-gradient(135deg, #ef4444, #dc2626)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "#fff", fontWeight: "800", fontSize: "11px",
                    }}>
                      {r.percentage}%
                    </div>
                    <div style={{ fontSize: "12px", color: "#64748b" }}>
                      {r.score}/{r.totalQuestions}
                    </div>
                  </div>
                </td>

                {/* Time */}
                <td style={{ padding: "14px 16px", fontSize: "13px", color: "#64748b" }}>
                  {r.timeTaken
                    ? `${Math.floor(r.timeTaken / 60)}m ${r.timeTaken % 60}s`
                    : "N/A"}
                </td>

                {/* Status */}
                <td style={{ padding: "14px 16px" }}>
                  <span style={{
                    padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "700",
                    background: r.passed ? "#dcfce7" : "#fee2e2",
                    color: r.passed ? "#166534" : "#991b1b",
                  }}>
                    {r.passed ? "✅ Pass" : "❌ Fail"}
                  </span>
                </td>

                {/* Date */}
                <td style={{ padding: "14px 16px", fontSize: "12px", color: "#94a3b8" }}>
                  {new Date(r.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit", month: "short", year: "numeric",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}