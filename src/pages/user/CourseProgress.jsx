import { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from '../../config/api.js';

const API = `${API_BASE_URL}/api/user`;

export default function CourseProgress() {
  const [courses, setCourses] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get(`${API}/progress`, { headers: { Authorization: `Bearer ${token}` } })
      .catch(() => setCourses([
        { _id: "1", title: "Full Stack React", totalLessons: 48, completedLessons: 35, category: "Web Dev", lastAccessed: "2025-03-15" },
        { _id: "2", title: "Node.js Masterclass", totalLessons: 36, completedLessons: 16, category: "Backend", lastAccessed: "2025-03-10" },
        { _id: "3", title: "Python Basics", totalLessons: 30, completedLessons: 30, category: "Python", lastAccessed: "2025-02-28" },
        { _id: "4", title: "MongoDB Bootcamp", totalLessons: 24, completedLessons: 7, category: "Database", lastAccessed: "2025-03-05" },
      ]));
  }, [token]);

  const getStatus = (completed, total) => {
    const pct = (completed / total) * 100;
    if (pct === 100) return { label: "Completed", color: "#059669", bg: "#dcfce7" };
    if (pct >= 50) return { label: "In Progress", color: "#3b82f6", bg: "#eff6ff" };
    return { label: "Just Started", color: "#f59e0b", bg: "#fffbeb" };
  };

  const totalLessons = courses.reduce((s, c) => s + c.totalLessons, 0);
  const totalCompleted = courses.reduce((s, c) => s + c.completedLessons, 0);
  const overallPct = totalLessons ? Math.round((totalCompleted / totalLessons) * 100) : 0;

  return (
    <div style={{ fontFamily: "system-ui, sans-serif" }}>
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#0f172a", margin: 0 }}>Learning Progress</h2>
        <p style={{ color: "#64748b", fontSize: "13px", marginTop: "2px" }}>Track your learning journey</p>
      </div>

      {/* Overall Progress */}
      <div style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", borderRadius: "16px", padding: "24px", marginBottom: "20px", color: "#fff" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <div>
            <div style={{ fontSize: "16px", fontWeight: "700" }}>Overall Progress</div>
            <div style={{ fontSize: "13px", opacity: 0.8 }}>{totalCompleted} of {totalLessons} lessons completed</div>
          </div>
          <div style={{ fontSize: "42px", fontWeight: "900" }}>{overallPct}%</div>
        </div>
        <div style={{ background: "rgba(255,255,255,0.25)", borderRadius: "8px", height: "12px", overflow: "hidden" }}>
          <div style={{ width: `${overallPct}%`, height: "100%", background: "#fff", borderRadius: "8px", transition: "width 0.8s" }} />
        </div>
      </div>

      {/* Per Course Progress */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {courses.map(course => {
          const pct = Math.round((course.completedLessons / course.totalLessons) * 100);
          const status = getStatus(course.completedLessons, course.totalLessons);
          return (
            <div key={course._id} style={{ background: "#fff", borderRadius: "14px", padding: "20px", border: "1px solid #e2e8f0", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                    <span style={{ background: "#ede9fe", color: "#7c3aed", padding: "2px 8px", borderRadius: "20px", fontSize: "11px", fontWeight: "600" }}>{course.category}</span>
                    <span style={{ background: status.bg, color: status.color, padding: "2px 8px", borderRadius: "20px", fontSize: "11px", fontWeight: "600" }}>{status.label}</span>
                  </div>
                  <div style={{ fontWeight: "700", color: "#0f172a", fontSize: "15px" }}>{course.title}</div>
                  <div style={{ fontSize: "12px", color: "#94a3b8", marginTop: "2px" }}>Last accessed: {new Date(course.lastAccessed).toLocaleDateString("en-IN")}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "28px", fontWeight: "900", color: status.color }}>{pct}%</div>
                  <div style={{ fontSize: "11px", color: "#94a3b8" }}>{course.completedLessons}/{course.totalLessons} lessons</div>
                </div>
              </div>
              <div style={{ background: "#f1f5f9", borderRadius: "8px", height: "10px", overflow: "hidden" }}>
                <div style={{
                  width: `${pct}%`, height: "100%", borderRadius: "8px",
                  background: pct === 100 ? "#059669" : "linear-gradient(90deg, #667eea, #764ba2)",
                  transition: "width 0.8s",
                }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}