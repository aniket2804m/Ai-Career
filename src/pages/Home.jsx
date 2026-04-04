import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", overflowX: "hidden" }}>

      {/* ── Hero Section ── */}
      <section style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)",
        minHeight: "92vh", display: "flex", alignItems: "center",
        position: "relative", overflow: "hidden", padding: "60px 24px",
      }}>
        {/* Background circles */}
        <div style={{ position: "absolute", top: "-100px", right: "-100px", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", bottom: "-80px", left: "-80px", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)" }} />

        <div style={{ maxWidth: "1100px", margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center", position: "relative" }}>

          {/* Left Text */}
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.3)", borderRadius: "20px", padding: "6px 16px", marginBottom: "24px" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#6366f1", display: "inline-block" }} />
              <span style={{ color: "#a5b4fc", fontSize: "13px", fontWeight: "600" }}>India's #1 Internship Platform</span>
            </div>

            <h1 style={{ fontSize: "52px", fontWeight: "900", color: "#fff", lineHeight: "1.15", margin: "0 0 20px", letterSpacing: "-1px" }}>
              Launch Your
              <span style={{ display: "block", background: "linear-gradient(90deg, #6366f1, #3b82f6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Tech Career
              </span>
              With Us
            </h1>

            <p style={{ color: "#94a3b8", fontSize: "17px", lineHeight: "1.8", marginBottom: "36px", maxWidth: "480px" }}>
              Real-world projects, industry mentors, and recognized certificates. Join 500+ students who landed their dream jobs through Skillected.
            </p>

            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
              <button onClick={() => navigate("/")}
                style={{ padding: "15px 32px", background: "linear-gradient(135deg, #6366f1, #3b82f6)", color: "#fff", border: "none", borderRadius: "12px", cursor: "pointer", fontWeight: "700", fontSize: "16px", boxShadow: "0 8px 24px rgba(99,102,241,0.35)" }}>
                Explore Courses →
              </button>
              <button onClick={() => navigate("/register")}
                style={{ padding: "15px 32px", background: "transparent", color: "#fff", border: "2px solid rgba(255,255,255,0.2)", borderRadius: "12px", cursor: "pointer", fontWeight: "600", fontSize: "16px" }}>
                Join Free
              </button>
            </div>

            {/* Trust badges */}
            <div style={{ display: "flex", gap: "24px", marginTop: "40px", flexWrap: "wrap" }}>
              {[
                { value: "500+", label: "Students" },
                { value: "50+", label: "Courses" },
                { value: "95%", label: "Placement" },
              ].map(s => (
                <div key={s.label}>
                  <div style={{ fontSize: "22px", fontWeight: "800", color: "#fff" }}>{s.value}</div>
                  <div style={{ fontSize: "12px", color: "#64748b" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Card */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "24px", padding: "32px", backdropFilter: "blur(10px)", width: "100%", maxWidth: "380px" }}>
              <div style={{ fontSize: "13px", color: "#6366f1", fontWeight: "700", marginBottom: "20px", textTransform: "uppercase", letterSpacing: "0.1em" }}>🎓 Featured Track</div>
              {[
                { icon: "🌐", title: "Full Stack Development", level: "Beginner → Pro", color: "#3b82f6" },
                { icon: "🤖", title: "AI & Machine Learning", level: "Intermediate", color: "#8b5cf6" },
                { icon: "📊", title: "Data Science", level: "Beginner", color: "#06b6d4" },
              ].map(course => (
                <div key={course.title} style={{ display: "flex", alignItems: "center", gap: "14px", padding: "14px", background: "rgba(255,255,255,0.05)", borderRadius: "12px", marginBottom: "10px", cursor: "pointer" }}
                  onClick={() => navigate("/")}>
                  <div style={{ width: "44px", height: "44px", borderRadius: "10px", background: `${course.color}22`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", flexShrink: 0 }}>
                    {course.icon}
                  </div>
                  <div>
                    <div style={{ color: "#fff", fontWeight: "600", fontSize: "14px" }}>{course.title}</div>
                    <div style={{ color: "#64748b", fontSize: "12px", marginTop: "2px" }}>{course.level}</div>
                  </div>
                  <span style={{ marginLeft: "auto", color: course.color, fontSize: "18px" }}>→</span>
                </div>
              ))}
              <button onClick={() => navigate("/")} style={{ width: "100%", marginTop: "12px", padding: "12px", background: "linear-gradient(135deg, #6366f1, #3b82f6)", color: "#fff", border: "none", borderRadius: "10px", cursor: "pointer", fontWeight: "700", fontSize: "14px" }}>
                View All Courses
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Who We Are ── */}
      <section style={{ padding: "80px 24px", background: "#fff" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }}>

          {/* Image */}
          <div style={{ position: "relative" }}>
            <div style={{ background: "linear-gradient(135deg, #6366f1, #3b82f6)", borderRadius: "20px", padding: "4px" }}>
              <img src="../public/who we are.png" alt="Who We Are"
                style={{ width: "100%", borderRadius: "17px", display: "block", objectFit: "cover", maxHeight: "380px" }}
                onError={e => {
                  e.target.style.display = "none";
                  e.target.parentElement.style.background = "linear-gradient(135deg, #6366f1, #3b82f6)";
                  e.target.parentElement.style.height = "380px";
                  e.target.parentElement.style.display = "flex";
                  e.target.parentElement.style.alignItems = "center";
                  e.target.parentElement.style.justifyContent = "center";
                  e.target.parentElement.innerHTML = '<span style="font-size:80px">🎓</span>';
                }}
              />
            </div>
            {/* Floating badge */}
            <div style={{ position: "absolute", bottom: "-20px", right: "-20px", background: "#fff", borderRadius: "14px", padding: "14px 18px", boxShadow: "0 8px 24px rgba(0,0,0,0.12)", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: "22px", fontWeight: "800", color: "#6366f1" }}>8+</div>
              <div style={{ fontSize: "12px", color: "#64748b" }}>Years Experience</div>
            </div>
          </div>

          {/* Text */}
          <div>
            <div style={{ display: "inline-block", background: "#ede9fe", color: "#6366f1", padding: "4px 14px", borderRadius: "20px", fontSize: "12px", fontWeight: "700", marginBottom: "16px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Who We Are
            </div>
            <h2 style={{ fontSize: "36px", fontWeight: "800", color: "#0f172a", lineHeight: "1.25", margin: "0 0 20px", letterSpacing: "-0.5px" }}>
              Building India's Next Generation of Tech Leaders
            </h2>
            <p style={{ color: "#64748b", fontSize: "15px", lineHeight: "1.9", marginBottom: "28px" }}>
              Skillected is a project-based learning platform helping students gain real-world skills through hands-on internships. We bridge the gap between college education and industry requirements with mentorship-driven programs.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "32px" }}>
              {[
                "Industry-recognized certification upon completion",
                "1-on-1 mentorship with working professionals",
                "Real client projects — not just assignments",
                "Job placement support & resume building",
              ].map(point => (
                <div key={point} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                  <div style={{ width: "22px", height: "22px", borderRadius: "50%", background: "#dcfce7", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "1px" }}>
                    <span style={{ color: "#16a34a", fontSize: "12px", fontWeight: "800" }}>✓</span>
                  </div>
                  <span style={{ color: "#374151", fontSize: "14px", lineHeight: "1.6" }}>{point}</span>
                </div>
              ))}
            </div>
            <button onClick={() => navigate("/contact")}
              style={{ padding: "13px 28px", background: "linear-gradient(135deg, #6366f1, #3b82f6)", color: "#fff", border: "none", borderRadius: "10px", cursor: "pointer", fontWeight: "700", fontSize: "15px" }}>
              Get In Touch →
            </button>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section style={{ padding: "80px 24px", background: "#f8fafc" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <div style={{ display: "inline-block", background: "#ede9fe", color: "#6366f1", padding: "4px 14px", borderRadius: "20px", fontSize: "12px", fontWeight: "700", marginBottom: "14px", textTransform: "uppercase" }}>
              How It Works
            </div>
            <h2 style={{ fontSize: "36px", fontWeight: "800", color: "#0f172a", margin: 0, letterSpacing: "-0.5px" }}>
              Your Journey to Success
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "24px" }}>
            {[
              { step: "01", icon: "📝", title: "Register", desc: "Create your free account and browse available internship tracks." },
              { step: "02", icon: "📚", title: "Learn", desc: "Get curated resources, attend live sessions, and build foundations." },
              { step: "03", icon: "🛠️", title: "Build", desc: "Work on real projects assigned by industry professionals." },
              { step: "04", icon: "🏆", title: "Get Certified", desc: "Complete your track and earn an industry-recognized certificate." },
            ].map((item, i) => (
              <div key={item.step} style={{ background: "#fff", borderRadius: "16px", padding: "28px", border: "1px solid #e2e8f0", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: "16px", right: "16px", fontSize: "42px", fontWeight: "900", color: "#f1f5f9", lineHeight: 1 }}>
                  {item.step}
                </div>
                <div style={{ fontSize: "36px", marginBottom: "16px" }}>{item.icon}</div>
                <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#0f172a", marginBottom: "10px" }}>{item.title}</h3>
                <p style={{ color: "#64748b", fontSize: "14px", lineHeight: "1.7", margin: 0 }}>{item.desc}</p>
                {i < 3 && (
                  <div style={{ position: "absolute", right: "-12px", top: "50%", transform: "translateY(-50%)", fontSize: "20px", color: "#6366f1", zIndex: 1, display: "none" }}>→</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section style={{ padding: "80px 24px", background: "#fff" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <div style={{ display: "inline-block", background: "#ede9fe", color: "#6366f1", padding: "4px 14px", borderRadius: "20px", fontSize: "12px", fontWeight: "700", marginBottom: "14px", textTransform: "uppercase" }}>
              Student Reviews
            </div>
            <h2 style={{ fontSize: "36px", fontWeight: "800", color: "#0f172a", margin: 0, letterSpacing: "-0.5px" }}>
              What Our Students Say
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
            {[
              { name: "Riya Sharma", role: "Full Stack Developer @ TCS", text: "Skillected changed my life! The real projects gave me confidence to crack interviews. Got placed within 2 months!", stars: 5, avatar: "R" },
              { name: "Arjun Mehta", role: "Data Analyst @ Infosys", text: "The mentorship here is unmatched. My mentor had 8+ years of experience and guided me through every step.", stars: 5, avatar: "A" },
              { name: "Priya Desai", role: "UI/UX Designer @ Wipro", text: "Best investment I made in my career. The portfolio I built here got me my dream job. Highly recommend!", stars: 5, avatar: "P" },
            ].map(t => (
              <div key={t.name} style={{ background: "#f8fafc", borderRadius: "16px", padding: "28px", border: "1px solid #e2e8f0" }}>
                <div style={{ color: "#f59e0b", fontSize: "18px", marginBottom: "14px" }}>{"⭐".repeat(t.stars)}</div>
                <p style={{ color: "#374151", fontSize: "15px", lineHeight: "1.7", marginBottom: "20px", fontStyle: "italic" }}>"{t.text}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "linear-gradient(135deg, #6366f1, #3b82f6)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: "800", fontSize: "18px" }}>
                    {t.avatar}
                  </div>
                  <div>
                    <div style={{ fontWeight: "700", color: "#0f172a", fontSize: "14px" }}>{t.name}</div>
                    <div style={{ color: "#64748b", fontSize: "12px" }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section style={{ padding: "80px 24px", background: "linear-gradient(135deg, #0f172a, #1e3a5f)" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "40px", fontWeight: "900", color: "#fff", margin: "0 0 16px", letterSpacing: "-0.5px" }}>
            Ready to Start Your Journey?
          </h2>
          <p style={{ color: "#94a3b8", fontSize: "16px", marginBottom: "36px", lineHeight: "1.7" }}>
            Join thousands of students who are already building real skills and landing jobs. Registration is completely free!
          </p>
          <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => navigate("/register")}
              style={{ padding: "15px 36px", background: "linear-gradient(135deg, #6366f1, #3b82f6)", color: "#fff", border: "none", borderRadius: "12px", cursor: "pointer", fontWeight: "700", fontSize: "16px", boxShadow: "0 8px 24px rgba(99,102,241,0.4)" }}>
              Get Started Free →
            </button>
            <button onClick={() => navigate("/")}
              style={{ padding: "15px 36px", background: "transparent", color: "#fff", border: "2px solid rgba(255,255,255,0.2)", borderRadius: "12px", cursor: "pointer", fontWeight: "600", fontSize: "16px" }}>
              Browse Courses
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;