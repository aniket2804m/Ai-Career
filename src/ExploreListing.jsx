import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import EditListing from "./components/EditListing";
import DeleteListing from "./components/DeleteListing";
import API_BASE_URL from '../config/api.js';

const ExploreListing = ({ search }) => {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [category, setCategory] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Web Dev", "AI/ML", "Data Science", "Android", "UI/UX", "DevOps"];

  const fetchListings = useCallback(async () => {
    try {
      setLoading(true);
      const params = {};
      if (search) params.search = search;
      if (minPrice) params.minPrice = minPrice;
      if (maxPrice) params.maxPrice = maxPrice;
      if (category && category !== "All") params.category = category;
      const res = await axios.get(`${API_BASE_URL}/api/listings`, { params });
      setListings(res.data);
    } catch (err) {
      console.log("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  }, [search, minPrice, maxPrice, category]);

  useEffect(() => { fetchListings(); }, [fetchListings]);

  const handleReset = () => {
    setMinPrice(""); setMaxPrice(""); setCategory(""); setActiveCategory("All");
  };

  const handleCategoryClick = (cat) => {
    setActiveCategory(cat);
    setCategory(cat === "All" ? "" : cat);
  };

  const categoryColors = {
    "Web Dev":      { bg: "#eff6ff", color: "#2563eb", dot: "#3b82f6" },
    "AI/ML":        { bg: "#fdf4ff", color: "#9333ea", dot: "#a855f7" },
    "Data Science": { bg: "#f0fdf4", color: "#16a34a", dot: "#22c55e" },
    "Android":      { bg: "#fff7ed", color: "#ea580c", dot: "#f97316" },
    "UI/UX":        { bg: "#fdf2f8", color: "#db2777", dot: "#ec4899" },
    "DevOps":       { bg: "#f0fdfa", color: "#0d9488", dot: "#14b8a6" },
  };

  const getColor = (cat) => categoryColors[cat] || { bg: "#f5f5f4", color: "#57534e", dot: "#a8a29e" };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

        .el-page { min-height: 100vh; background: #f7f5f0; font-family: 'DM Sans', sans-serif; }

        /* ── Hero ── */
        .el-hero {
          background: #0f0e0c;
          padding: 80px 24px 72px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .el-hero::before {
          content: '';
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse 60% 60% at 20% 50%, rgba(251,191,36,.12) 0%, transparent 60%),
            radial-gradient(ellipse 40% 40% at 80% 30%, rgba(59,130,246,.08) 0%, transparent 50%);
          pointer-events: none;
        }
        .el-hero-tag {
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(251,191,36,.1); border: 1px solid rgba(251,191,36,.2);
          border-radius: 100px; padding: 5px 14px;
          font-size: 11px; font-weight: 500; color: #fbbf24;
          letter-spacing: .15em; text-transform: uppercase; margin-bottom: 24px; position: relative;
        }
        .el-hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(38px,6vw,68px); font-weight: 700;
          color: #fafaf9; line-height: 1.08; margin-bottom: 16px; position: relative;
        }
        .el-hero-title em { font-style: italic; color: #fbbf24; }
        .el-hero-sub {
          font-size: 16px; color: #78716c; max-width: 500px;
          margin: 0 auto 40px; font-weight: 300; line-height: 1.7; position: relative;
        }
        .el-hero-stats { display: flex; justify-content: center; gap: 48px; position: relative; }
        .el-stat { text-align: center; }
        .el-stat-num { font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 700; color: #fafaf9; }
        .el-stat-label { font-size: 11px; color: #57534e; text-transform: uppercase; letter-spacing: .1em; margin-top: 2px; }
        .el-stat-div { width: 1px; background: rgba(255,255,255,.06); height: 36px; align-self: center; }

        /* ── Filter Card ── */
        .el-filters { max-width: 960px; margin: -24px auto 0; padding: 0 24px; position: relative; z-index: 10; }
        .el-filter-card {
          background: #fff; border-radius: 18px; padding: 20px 24px;
          box-shadow: 0 8px 32px rgba(0,0,0,.1), 0 1px 0 rgba(0,0,0,.04);
          display: flex; gap: 12px; align-items: center; flex-wrap: wrap;
        }
        .el-filter-input, .el-filter-num {
          padding: 11px 14px; border: 1.5px solid #e7e5e4; border-radius: 10px;
          font-size: 14px; font-family: 'DM Sans', sans-serif; color: #1c1917;
          outline: none; transition: border-color .2s; background: #fafaf9;
        }
        .el-filter-input { flex: 1; min-width: 140px; }
        .el-filter-num { width: 90px; }
        .el-filter-input:focus, .el-filter-num:focus { border-color: #fbbf24; background: #fff; }
        .el-filter-input::placeholder, .el-filter-num::placeholder { color: #a8a29e; }
        .el-price-wrap { display: flex; gap: 8px; align-items: center; }
        .el-price-sep { font-size: 12px; color: #a8a29e; }
        .el-reset-btn {
          padding: 11px 18px; background: #f5f5f4; border: none; border-radius: 10px;
          font-size: 13px; font-weight: 600; color: #78716c; cursor: pointer;
          font-family: 'DM Sans', sans-serif; transition: all .15s; white-space: nowrap;
        }
        .el-reset-btn:hover { background: #e7e5e4; color: #44403c; }

        /* ── Category Pills ── */
        .el-categories {
          max-width: 960px; margin: 28px auto 0; padding: 0 24px;
          display: flex; gap: 8px; flex-wrap: wrap;
        }
        .el-cat-pill {
          padding: 8px 18px; border-radius: 100px; border: 1.5px solid #e7e5e4;
          background: #fff; font-size: 13px; font-weight: 500; color: #78716c;
          cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all .15s;
        }
        .el-cat-pill:hover { border-color: #d6d3d1; color: #44403c; }
        .el-cat-pill.active { background: #0f0e0c; border-color: #0f0e0c; color: #fafaf9; }

        /* ── Meta ── */
        .el-meta { max-width: 960px; margin: 24px auto 0; padding: 0 24px; }
        .el-count { font-size: 14px; color: #78716c; font-weight: 300; }
        .el-count strong { color: #1c1917; font-weight: 600; }
        .el-count em { color: #d97706; font-style: normal; font-weight: 600; }

        /* ── Skeleton ── */
        .el-skeleton {
          max-width: 960px; margin: 24px auto 0; padding: 0 24px;
          display: grid; grid-template-columns: repeat(auto-fill, minmax(280px,1fr)); gap: 20px;
        }
        .el-skel-card {
          border-radius: 18px; height: 340px;
          background: linear-gradient(90deg,#f5f5f4 25%,#e7e5e4 50%,#f5f5f4 75%);
          background-size: 200% 100%;
          animation: shimmer 1.4s infinite;
        }
        @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }

        /* ── Cards Grid ── */
        .el-grid {
          max-width: 960px; margin: 24px auto 0; padding: 0 24px 60px;
          display: grid; grid-template-columns: repeat(auto-fill, minmax(288px,1fr)); gap: 20px;
        }

        /* ── Card ── */
        .el-card {
          background: #fff; border-radius: 20px; overflow: hidden;
          border: 1px solid #e7e5e4;
          transition: transform .25s ease, box-shadow .25s ease;
          animation: card-in .4s ease both;
          display: flex; flex-direction: column;
        }
        @keyframes card-in { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        .el-card:hover { transform: translateY(-4px); box-shadow: 0 20px 48px rgba(0,0,0,.1); }

        .el-card-img { width: 100%; height: 176px; object-fit: cover; display: block; }
        .el-card-no-img {
          height: 176px;
          background: linear-gradient(135deg,#1c1917 0%,#292524 100%);
          display: flex; align-items: center; justify-content: center; font-size: 40px;
        }
        .el-card-body { padding: 20px; flex: 1; display: flex; flex-direction: column; }
        .el-card-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 8px; margin-bottom: 10px; }
        .el-card-badge {
          display: inline-flex; align-items: center; gap: 5px;
          padding: 4px 10px; border-radius: 100px;
          font-size: 11px; font-weight: 600; letter-spacing: .04em;
        }
        .el-badge-dot { width: 5px; height: 5px; border-radius: 50%; }
        .el-card-price { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 700; color: #1c1917; white-space: nowrap; }
        .el-card-title { font-family: 'Playfair Display', serif; font-size: 17px; font-weight: 700; color: #1c1917; line-height: 1.3; margin-bottom: 8px; }
        .el-card-desc {
          font-size: 13px; color: #78716c; line-height: 1.6; font-weight: 300;
          margin-bottom: 14px; flex: 1;
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
        }
        .el-card-loc { display: flex; align-items: center; gap: 5px; font-size: 12px; color: #a8a29e; margin-bottom: 16px; }
        .el-card-actions { display: flex; gap: 8px; }
        .el-btn-primary {
          flex: 1; padding: 10px; background: #0f0e0c; color: #fafaf9;
          border: none; border-radius: 10px; font-size: 13px; font-weight: 600;
          font-family: 'DM Sans', sans-serif; cursor: pointer; transition: background .15s;
        }
        .el-btn-primary:hover { background: #292524; }
        .el-btn-secondary {
          padding: 10px 14px; background: #f5f5f4; color: #44403c;
          border: none; border-radius: 10px; font-size: 13px; font-weight: 500;
          font-family: 'DM Sans', sans-serif; cursor: pointer; transition: background .15s; white-space: nowrap;
        }
        .el-btn-secondary:hover { background: #e7e5e4; }
        .el-admin-row {
          display: flex; gap: 8px; margin-top: 10px; padding-top: 10px;
          border-top: 1px solid #f5f5f4;
        }

        /* ── Empty ── */
        .el-empty { text-align: center; padding: 80px 24px; max-width: 400px; margin: 0 auto; }
        .el-empty-icon {
          width: 72px; height: 72px; background: #f5f5f4; border-radius: 20px;
          display: flex; align-items: center; justify-content: center;
          font-size: 32px; margin: 0 auto 20px;
        }
        .el-empty-title { font-family: 'Playfair Display', serif; font-size: 22px; color: #1c1917; margin-bottom: 8px; }
        .el-empty-sub { font-size: 14px; color: #78716c; font-weight: 300; line-height: 1.6; margin-bottom: 20px; }
        .el-empty-btn {
          padding: 11px 24px; background: #0f0e0c; color: #fafaf9;
          border: none; border-radius: 10px; font-size: 14px; font-weight: 600;
          font-family: 'DM Sans', sans-serif; cursor: pointer;
        }

        /* ── Learning Model ── */
        .el-model { background: #0f0e0c; padding: 80px 24px; position: relative; overflow: hidden; }
        .el-model::before {
          content: ''; position: absolute; top: -100px; left: 50%; transform: translateX(-50%);
          width: 600px; height: 300px;
          background: radial-gradient(ellipse,rgba(251,191,36,.07) 0%,transparent 70%);
          pointer-events: none;
        }
        .el-model-title {
          font-family: 'Playfair Display', serif; font-size: clamp(28px,4vw,44px);
          font-weight: 700; color: #fafaf9; text-align: center; margin-bottom: 8px; position: relative;
        }
        .el-model-sub { text-align: center; color: #57534e; font-size: 15px; font-weight: 300; margin-bottom: 52px; position: relative; }
        .el-model-grid {
          display: grid; grid-template-columns: repeat(auto-fit,minmax(240px,1fr));
          gap: 20px; max-width: 880px; margin: 0 auto; position: relative;
        }
        .el-model-card {
          background: rgba(255,255,255,.03); border: 1px solid rgba(255,255,255,.07);
          border-radius: 20px; padding: 32px 28px; transition: background .2s, border-color .2s;
        }
        .el-model-card:hover { background: rgba(255,255,255,.05); border-color: rgba(251,191,36,.2); }
        .el-model-phase { font-size: 11px; font-weight: 600; letter-spacing: .15em; text-transform: uppercase; color: #fbbf24; margin-bottom: 12px; }
        .el-model-card-title { font-family: 'Playfair Display', serif; font-size: 22px; color: #fafaf9; margin-bottom: 12px; }
        .el-model-card-desc { font-size: 14px; color: #78716c; line-height: 1.7; font-weight: 300; }

        @media (max-width: 640px) {
          .el-hero-stats { gap: 24px; }
          .el-filter-card { flex-direction: column; align-items: stretch; }
          .el-price-wrap { justify-content: space-between; }
        }
      `}</style>

      <div className="el-page">

        {/* Hero */}
        <div className="el-hero">
          <div className="el-hero-tag">🎓 Internship Tracks</div>
          <h1 className="el-hero-title">Find Your <em>Perfect</em><br />Learning Path</h1>
          <p className="el-hero-sub">
            Curated internship tracks in AI, Web Dev, and Engineering — built for students who mean business.
          </p>
          <div className="el-hero-stats">
            <div className="el-stat">
              <div className="el-stat-num">50+</div>
              <div className="el-stat-label">Courses</div>
            </div>
            <div className="el-stat-div" />
            <div className="el-stat">
              <div className="el-stat-num">₹0</div>
              <div className="el-stat-label">Hidden Fees</div>
            </div>
            <div className="el-stat-div" />
            <div className="el-stat">
              <div className="el-stat-num">100%</div>
              <div className="el-stat-label">Transparent</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="el-filters">
          <div className="el-filter-card">
            <input className="el-filter-input" type="text" placeholder="🔍 Search by category..."
              value={category} onChange={(e) => setCategory(e.target.value)} />
            <div className="el-price-wrap">
              <input className="el-filter-num" type="number" placeholder="Min ₹"
                value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
              <span className="el-price-sep">—</span>
              <input className="el-filter-num" type="number" placeholder="Max ₹"
                value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
            </div>
            <button className="el-reset-btn" onClick={handleReset}>✕ Reset</button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="el-categories">
          {categories.map((cat) => (
            <button key={cat} className={`el-cat-pill ${activeCategory === cat ? "active" : ""}`}
              onClick={() => handleCategoryClick(cat)}>
              {cat}
            </button>
          ))}
        </div>

        {/* Meta */}
        <div className="el-meta">
          <p className="el-count">
            {loading ? "Searching..." : (
              <><strong>{listings.length}</strong> courses found{search && <> for <em>"{search}"</em></>}</>
            )}
          </p>
        </div>

        {/* Skeletons */}
        {loading && (
          <div className="el-skeleton">
            {[1, 2, 3].map((i) => <div key={i} className="el-skel-card" />)}
          </div>
        )}

        {/* Cards */}
        {!loading && listings.length > 0 && (
          <div className="el-grid">
            {listings.map((item, index) => {
              const c = getColor(item.amenities);
              return (
                <div key={item._id} className="el-card" style={{ animationDelay: `${index * 60}ms` }}>
                  {item.images?.length > 0
                    ? <img className="el-card-img" src={item.images[0].url} alt={item.title} />
                    : <div className="el-card-no-img">📚</div>
                  }
                  <div className="el-card-body">
                    <div className="el-card-top">
                      <span className="el-card-badge" style={{ background: c.bg, color: c.color }}>
                        <span className="el-badge-dot" style={{ background: c.dot }} />
                        {item.amenities || "Course"}
                      </span>
                      <span className="el-card-price">₹{item.price}</span>
                    </div>
                    <h3 className="el-card-title">{item.title}</h3>
                    <p className="el-card-desc">{item.description}</p>
                    {item.location && (
                      <div className="el-card-loc"><span>📍</span><span>{item.location}</span></div>
                    )}
                    <div className="el-card-actions">
                      <button className="el-btn-primary" onClick={() => navigate("/careers")}>Apply Now</button>
                      <button className="el-btn-secondary" onClick={() => navigate("/contact")}>Contact</button>
                      <button className="el-btn-secondary" onClick={() => navigate(`/coursedetail/${item._id}`)}>Details</button>
                    </div>
                    {role === "admin" && (
                      <div className="el-admin-row">
                        <EditListing listingId={item._id} item={item} setListings={setListings} />
                        <DeleteListing item={item} setListings={setListings} />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Empty */}
        {!loading && listings.length === 0 && (
          <div className="el-empty">
            <div className="el-empty-icon">🔍</div>
            <h3 className="el-empty-title">Koi course nahi mila</h3>
            <p className="el-empty-sub">
              {search ? `"${search}" ke liye koi result nahi. Filters reset karo ya alag keyword try karo.`
                : "Filters reset karo aur dobara try karo."}
            </p>
            <button className="el-empty-btn" onClick={handleReset}>Clear Filters</button>
          </div>
        )}

        {/* Learning Model */}
        <div className="el-model">
          <h2 className="el-model-title">Our Learning Model</h2>
          <p className="el-model-sub">Teen phases mein mastery — concepts se portfolio tak</p>
          <div className="el-model-grid">
            {[
              { phase: "Phase 01", title: "Concepts", desc: "Curated resources aur expert-led sessions se strong foundation banao.", icon: "📖" },
              { phase: "Phase 02", title: "Projects", desc: "Weekly deliverables aur capstone projects pe apni learning apply karo.", icon: "🛠️" },
              { phase: "Phase 03", title: "Portfolio", desc: "Professional portfolio polish karo aur industry ke liye ready ho jao.", icon: "🚀" },
            ].map((item) => (
              <div key={item.phase} className="el-model-card">
                <div style={{ fontSize: "28px", marginBottom: "16px" }}>{item.icon}</div>
                <div className="el-model-phase">{item.phase}</div>
                <h3 className="el-model-card-title">{item.title}</h3>
                <p className="el-model-card-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  );
};

export default ExploreListing;