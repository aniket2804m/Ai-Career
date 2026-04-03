import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:5000/api/user";

export default function EnrolledCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const headers = useMemo(() => ({ Authorization: `Bearer ${token}` }), [token]);

  useEffect(() => {
    axios.get(`${API}/enrolled-courses`, { headers })
      .then(res => setCourses(res.data))
      .catch(() => {
        // Mock fallback
        setCourses([
          { _id: "1", title: "Full Stack React", instructor: "Rahul Sharma", progress: 72, thumbnail: "", category: "Web Dev" },
          { _id: "2", title: "Node.js Masterclass", instructor: "Priya Singh", progress: 45, thumbnail: "", category: "Backend" },
          { _id: "3", title: "Python Basics", instructor: "Amit Gupta", progress: 100, thumbnail: "", category: "Python" },
          { _id: "4", title: "MongoDB Bootcamp", instructor: "Sara Khan", progress: 30, thumbnail: "", category: "Database" },
        ]);
      })
      .finally(() => setLoading(false));
  }, [headers]);

  const getProgressColor = (p) => p === 100 ? "#059669" : p > 50 ? "#3b82f6" : "#f59e0b";

  if (loading) return <div style={{ padding: "40px", textAlign: "center", color: "#64748b" }}>Loading courses...</div>;

  return (
    <div style={{ fontFamily: "system-ui, sans-serif" }}>
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#0f172a", margin: 0 }}>My Enrolled Courses</h2>
        <p style={{ color: "#64748b", fontSize: "13px", marginTop: "2px" }}>{courses.length} courses enrolled</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
        {courses.map(course => (
          <div key={course._id} style={{
            background: "#fff", borderRadius: "14px", overflow: "hidden",
            boxShadow: "0 1px 3px rgba(0,0,0,0.06)", border: "1px solid #e2e8f0",
          }}>
            {/* Thumbnail */}
            <div style={{
              height: "130px",
              background: course.thumbnail ? `url(${course.thumbnail}) center/cover` : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              {!course.thumbnail && <span style={{ fontSize: "40px" }}>📚</span>}
              {course.progress === 100 && (
                <div style={{ position: "absolute", top: "10px", right: "10px", background: "#059669", color: "#fff", padding: "3px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: "700" }}>
                  ✓ Completed
                </div>
              )}
            </div>

            <div style={{ padding: "16px" }}>
              <span style={{ background: "#ede9fe", color: "#7c3aed", padding: "2px 8px", borderRadius: "20px", fontSize: "11px", fontWeight: "600" }}>{course.category}</span>
              <h3 style={{ fontSize: "15px", fontWeight: "700", color: "#0f172a", margin: "8px 0 4px" }}>{course.title}</h3>
              <p style={{ fontSize: "12px", color: "#64748b", margin: 0 }}>by {course.instructor}</p>

              {/* Progress */}
              <div style={{ marginTop: "14px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                  <span style={{ fontSize: "12px", color: "#64748b" }}>Progress</span>
                  <span style={{ fontSize: "12px", fontWeight: "700", color: getProgressColor(course.progress) }}>{course.progress}%</span>
                </div>
                <div style={{ background: "#f1f5f9", borderRadius: "6px", height: "8px", overflow: "hidden" }}>
                  <div style={{
                    width: `${course.progress}%`, height: "100%", borderRadius: "6px",
                    background: getProgressColor(course.progress), transition: "width 0.5s",
                  }} />
                </div>
              </div>

              <button
                onClick={() => navigate(`/course/${course._id}`)}
                style={{
                  width: "100%", marginTop: "14px", padding: "10px", border: "none", borderRadius: "8px",
                  background: course.progress === 100 ? "#ecfdf5" : "linear-gradient(135deg, #667eea, #764ba2)",
                  color: course.progress === 100 ? "#059669" : "#fff",
                  cursor: "pointer", fontWeight: "600", fontSize: "13px",
                }}>
                {course.progress === 100 ? "✓ Review Course" : course.progress > 0 ? "▶ Continue" : "▶ Start Course"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}