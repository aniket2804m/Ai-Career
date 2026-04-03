import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Careers() {

  const navigate = useNavigate();
  
  const [jobs] = useState([
    {
      id: 1,
      title: "Frontend Developer",
      location: "Remote",
      type: "Full Time",
      desc: "Work with React to build modern UI experiences.",
    },
    {
      id: 2,
      title: "Backend Developer",
      location: "Remote",
      type: "Full Time",
      desc: "Build scalable APIs using Node.js & MongoDB.",
    },
    {
      id: 3,
      title: "UI/UX Designer",
      location: "Remote",
      type: "Internship",
      desc: "Design beautiful and user-friendly interfaces.",
    },
    {
      id: 3,
      title: "UI/UX Designer",
      location: "Remote",
      type: "Internship",
      desc: "Design beautiful and user-friendly interfaces.",
    },
    {
      id: 3,
      title: "UI/UX Designer",
      location: "Remote",
      type: "Internship",
      desc: "Design beautiful and user-friendly interfaces.",
    },
    {
      id: 3,
      title: "UI/UX Designer",
      location: "Remote",
      type: "Internship",
      desc: "Design beautiful and user-friendly interfaces.",
    },
  ]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "#fff",
        padding: "40px 20px",
        fontFamily: "Segoe UI, sans-serif",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{ fontSize: "32px", marginBottom: "10px" }}>
          🚀 Join Our Team
        </h1>
        <p style={{ color: "#94a3b8" }}>
          Build your career with Becreatives
        </p>
      </div>

      {/* Jobs */}
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          display: "grid",
          gap: "20px",
        }}
      >
        {jobs.map((job) => (
          <div
            key={job.id}
            style={{
              background: "rgba(255,255,255,0.05)",
              padding: "20px",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.08)",
              transition: "0.2s",
            }}
          >
            <h2 style={{ marginBottom: "8px" }}>{job.title}</h2>

            <div
              style={{
                fontSize: "13px",
                color: "#a5b4fc",
                marginBottom: "10px",
              }}
            >
              📍 {job.location} • {job.type}
            </div>

            <p style={{ color: "#cbd5f5", marginBottom: "15px" }}>
              {job.desc}
            </p>

            <button
              style={{
                padding: "8px 16px",
                borderRadius: "8px",
                border: "none",
                background: "linear-gradient(135deg, #6366f1, #3b82f6)",
                color: "#fff",
                cursor: "pointer",
                fontWeight: "600",
              }}
              onClick={() => navigate("/apply")}
            >
              Apply Now
            </button>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{ textAlign: "center", marginTop: "50px", color: "#64748b" }}>
        © {new Date().getFullYear()} Becreatives. All rights reserved.
      </div>
    </div>
  );
}

export default Careers;