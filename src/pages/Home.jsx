import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">

      {/* ── Hero Section ── */}
      <section className="hero-section">
        <div className="hero-bg-circles">
          <div className="circle circle-1"></div>
          <div className="circle circle-2"></div>
        </div>

        <div className="hero-content">
          {/* Left Text */}
          <div className="hero-left">
            <div className="hero-badge">
              <span className="badge-dot"></span>
              <span>India's #1 Internship Platform</span>
            </div>

            <h1 className="hero-title">
              Launch Your
              <span className="hero-gradient">Tech Career</span>
              With Us
            </h1>

            <p className="hero-desc">
              Real-world projects, industry mentors, and recognized certificates. Join 500+ students who landed their dream jobs through Skillected.
            </p>

            <div className="hero-buttons">
              <button className="btn btn-primary" onClick={() => navigate("/")}>
                Explore Courses →
              </button>
              <button className="btn btn-secondary" onClick={() => navigate("/register")}>
                Join Free
              </button>
            </div>

            {/* Trust badges */}
            <div className="trust-badges">
              {[
                { value: "500+", label: "Students" },
                { value: "50+", label: "Courses" },
                { value: "95%", label: "Placement" },
              ].map(s => (
                <div key={s.label} className="badge-item">
                  <div className="badge-value">{s.value}</div>
                  <div className="badge-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Card */}
          <div className="hero-right">
            <div className="featured-card">
              <div className="featured-header">🎓 Featured Track</div>
              {[
                { icon: "🌐", title: "Full Stack Development", level: "Beginner → Pro", color: "#3b82f6" },
                { icon: "🤖", title: "AI & Machine Learning", level: "Intermediate", color: "#8b5cf6" },
                { icon: "📊", title: "Data Science", level: "Beginner", color: "#06b6d4" },
              ].map(course => (
                <div key={course.title} className="course-item" onClick={() => navigate("/")}>
                  <div className="course-icon" style={{ '--course-color': course.color }}>
                    {course.icon}
                  </div>
                  <div className="course-info">
                    <div className="course-title">{course.title}</div>
                    <div className="course-level">{course.level}</div>
                  </div>
                  <span className="course-arrow" style={{ color: course.color }}>→</span>
                </div>
              ))}
              <button className="btn btn-full" onClick={() => navigate("/")}>
                View All Courses
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Who We Are ── */}
      <section className="who-section">
        <div className="who-container">
          {/* Image */}
          <div className="who-image">
            <div className="image-wrapper">
              <img src="../public/who we are.png" alt="Who We Are"
                onError={e => {
                  e.target.style.display = "none";
                  e.target.parentElement.innerHTML = '<div class="placeholder-icon">🎓</div>';
                }}
              />
            </div>
            <div className="experience-badge">
              <div className="badge-num">8+</div>
              <div className="badge-text">Years Experience</div>
            </div>
          </div>

          {/* Text */}
          <div className="who-text">
            <div className="section-badge">Who We Are</div>
            <h2 className="section-title">
              Building India's Next Generation of Tech Leaders
            </h2>
            <p className="section-desc">
              Skillected is a project-based learning platform helping students gain real-world skills through hands-on internships. We bridge the gap between college education and industry requirements with mentorship-driven programs.
            </p>
            <div className="features-list">
              {[
                "Industry-recognized certification upon completion",
                "1-on-1 mentorship with working professionals",
                "Real client projects — not just assignments",
                "Job placement support & resume building",
              ].map(point => (
                <div key={point} className="feature-item">
                  <div className="feature-check">✓</div>
                  <span>{point}</span>
                </div>
              ))}
            </div>
            <button className="btn btn-primary" onClick={() => navigate("/contact")}>
              Get In Touch →
            </button>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="how-section">
        <div className="how-container">
          <div className="section-header">
            <div className="section-badge">How It Works</div>
            <h2 className="section-title">Your Journey to Success</h2>
          </div>

          <div className="steps-grid">
            {[
              { step: "01", icon: "📝", title: "Register", desc: "Create your free account and browse available internship tracks." },
              { step: "02", icon: "📚", title: "Learn", desc: "Get curated resources, attend live sessions, and build foundations." },
              { step: "03", icon: "🛠️", title: "Build", desc: "Work on real projects assigned by industry professionals." },
              { step: "04", icon: "🏆", title: "Get Certified", desc: "Complete your track and earn an industry-recognized certificate." },
            ].map((item) => (
              <div key={item.step} className="step-card">
                <div className="step-number">{item.step}</div>
                <div className="step-icon">{item.icon}</div>
                <h3 className="step-title">{item.title}</h3>
                <p className="step-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="testimonials-section">
        <div className="testimonials-container">
          <div className="section-header">
            <div className="section-badge">Student Reviews</div>
            <h2 className="section-title">What Our Students Say</h2>
          </div>

          <div className="testimonials-grid">
            {[
              { name: "Riya Sharma", role: "Full Stack Developer @ TCS", text: "Skillected changed my life! The real projects gave me confidence to crack interviews. Got placed within 2 months!", stars: 5, avatar: "R" },
              { name: "Arjun Mehta", role: "Data Analyst @ Infosys", text: "The mentorship here is unmatched. My mentor had 8+ years of experience and guided me through every step.", stars: 5, avatar: "A" },
              { name: "Priya Desai", role: "UI/UX Designer @ Wipro", text: "Best investment I made in my career. The portfolio I built here got me my dream job. Highly recommend!", stars: 5, avatar: "P" },
            ].map(t => (
              <div key={t.name} className="testimonial-card">
                <div className="testimonial-stars">{"⭐".repeat(t.stars)}</div>
                <p className="testimonial-text">"{t.text}"</p>
                <div className="testimonial-author">
                  <div className="author-avatar">{t.avatar}</div>
                  <div className="author-info">
                    <div className="author-name">{t.name}</div>
                    <div className="author-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="cta-section">
        <div className="cta-container">
          <h2 className="cta-title">Ready to Start Your Journey?</h2>
          <p className="cta-desc">
            Join thousands of students who are already building real skills and landing jobs. Registration is completely free!
          </p>
          <div className="cta-buttons">
            <button className="btn btn-primary" onClick={() => navigate("/register")}>
              Get Started Free →
            </button>
            <button className="btn btn-secondary" onClick={() => navigate("/")}>
              Browse Courses
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;