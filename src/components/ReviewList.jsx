import { useEffect, useState } from "react";
import axios from "axios";

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return "Aaj";
  if (days === 1) return "Kal";
  if (days < 30) return `${days} din pehle`;
  if (days < 365) return `${Math.floor(days / 30)} mahine pehle`;
  return `${Math.floor(days / 365)} saal pehle`;
}

function Stars({ value }) {
  return (
    <span style={{ letterSpacing: "1px" }}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} style={{ color: i < value ? "#fbbf24" : "#1f2937", fontSize: "14px" }}>★</span>
      ))}
    </span>
  );
}

function ReviewCard({ review, index }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = review.review?.length > 180;
  const displayText = expanded || !isLong ? review.review : review.review?.slice(0, 180) + "...";

  const placementColor = review.gotPlaced === "yes" ? "#86efac" : review.gotPlaced === "self" ? "#fcd34d" : "#fca5a5";
  const placementLabel = { yes: "✅ Placed", no: "❌ Not Placed", self: "🔍 Self Placed" }[review.gotPlaced] || "—";

  return (
    <>
      <style>{`
        .rl-card {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 16px;
          padding: 22px 24px;
          transition: border-color 0.2s, background 0.2s;
          animation: rl-in 0.3s ease both;
          animation-delay: ${index * 60}ms;
        }
        .rl-card:hover {
          border-color: rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.03);
        }
        @keyframes rl-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div className="rl-card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px", flexWrap: "wrap", gap: "8px" }}>

          {/* Left: Avatar + meta */}
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <div style={{
              width: "40px", height: "40px", borderRadius: "12px",
              background: `hsl(${(review._id?.charCodeAt(0) || 0) * 30}, 40%, 20%)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "16px", flexShrink: 0,
            }}>
              👤
            </div>
            <div>
              <div style={{ fontSize: "13px", fontWeight: "600", color: "#e5e7eb" }}>
                Anonymous Student
                {review.studentCity && (
                  <span style={{ color: "#4b5563", fontWeight: "400" }}> • {review.studentCity}</span>
                )}
              </div>
              <div style={{ fontSize: "11px", color: "#4b5563", marginTop: "2px" }}>
                {review.courseTaken && <span>{review.courseTaken} • </span>}
                {timeAgo(review.createdAt)}
              </div>
            </div>
          </div>

          {/* Right: Rating + placement */}
          <div style={{ textAlign: "right" }}>
            <Stars value={review.overallRating} />
            <div style={{ marginTop: "4px" }}>
              <span style={{ fontSize: "11px", color: placementColor, fontWeight: "500" }}>
                {placementLabel}
              </span>
            </div>
          </div>
        </div>

        {/* Salary comparison */}
        {review.gotPlaced === "yes" && review.promisedSalary && review.actualSalary && (
          <div style={{
            display: "flex", gap: "12px", marginBottom: "14px",
            background: "rgba(255,255,255,0.03)", borderRadius: "10px", padding: "10px 14px"
          }}>
            <div style={{ textAlign: "center", flex: 1 }}>
              <div style={{ fontSize: "11px", color: "#6b7280", marginBottom: "2px" }}>Promised</div>
              <div style={{ fontSize: "16px", fontWeight: "700", color: "#fcd34d" }}>₹{review.promisedSalary} LPA</div>
            </div>
            <div style={{ width: "1px", background: "rgba(255,255,255,0.06)" }} />
            <div style={{ textAlign: "center", flex: 1 }}>
              <div style={{ fontSize: "11px", color: "#6b7280", marginBottom: "2px" }}>Got</div>
              <div style={{ fontSize: "16px", fontWeight: "700", color: review.actualSalary < review.promisedSalary ? "#fca5a5" : "#86efac" }}>
                ₹{review.actualSalary} LPA
              </div>
            </div>
            <div style={{ width: "1px", background: "rgba(255,255,255,0.06)" }} />
            <div style={{ textAlign: "center", flex: 1 }}>
              <div style={{ fontSize: "11px", color: "#6b7280", marginBottom: "2px" }}>Difference</div>
              <div style={{ fontSize: "16px", fontWeight: "700", color: "#fca5a5" }}>
                {review.actualSalary < review.promisedSalary ? "-" : "+"}
                ₹{Math.abs(review.actualSalary - review.promisedSalary).toFixed(1)} LPA
              </div>
            </div>
          </div>
        )}

        {/* Fee paid */}
        {review.feePaid && (
          <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "10px" }}>
            💸 Fees di: <strong style={{ color: "#e5e7eb" }}>₹{Number(review.feePaid).toLocaleString("en-IN")}</strong>
          </div>
        )}

        {/* Review text */}
        {review.review && (
          <p style={{ fontSize: "14px", color: "#9ca3af", lineHeight: "1.7", fontWeight: "300", marginBottom: "12px" }}>
            "{displayText}"
            {isLong && (
              <span
                onClick={() => setExpanded(!expanded)}
                style={{ color: "#ef4444", cursor: "pointer", marginLeft: "6px", fontSize: "12px", fontWeight: "500" }}
              >
                {expanded ? " kam karo ↑" : " aur padho ↓"}
              </span>
            )}
          </p>
        )}

        {/* Flags */}
        {review.flags?.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {review.flags.map((flag, i) => (
              <span key={i} style={{
                background: "rgba(239,68,68,0.08)",
                border: "1px solid rgba(239,68,68,0.15)",
                borderRadius: "100px",
                padding: "3px 10px",
                fontSize: "11px",
                color: "#fca5a5",
              }}>
                🚩 {flag}
              </span>
            ))}
          </div>
        )}

        {/* Rating breakdown */}
        <div style={{ display: "flex", gap: "16px", marginTop: "14px", paddingTop: "14px", borderTop: "1px solid rgba(255,255,255,0.04)", flexWrap: "wrap" }}>
          {[
            { label: "Teaching", val: review.teachingQuality },
            { label: "Placement", val: review.placementSupport },
            { label: "Value", val: review.valueForMoney },
          ].filter(x => x.val).map(item => (
            <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ fontSize: "11px", color: "#4b5563" }}>{item.label}:</span>
              <Stars value={item.val} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default function ReviewList({ instituteId, refreshTrigger }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    if (!instituteId) return;
    fetchReviews();
  }, [instituteId, refreshTrigger]);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/reviews/${instituteId}`);
      setReviews(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const sorted = [...reviews].sort((a, b) => {
    if (sortBy === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
    if (sortBy === "worst") return a.overallRating - b.overallRating;
    if (sortBy === "best") return b.overallRating - a.overallRating;
    return 0;
  });

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Outfit:wght@300;400;500;600&display=swap');`}</style>
      <div style={{ maxWidth: "780px", margin: "0 auto", padding: "0 24px 48px", fontFamily: "'Outfit', sans-serif" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
          <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: "18px", fontWeight: "800", color: "#f9fafb" }}>
            💬 Student Reviews
            {reviews.length > 0 && (
              <span style={{ fontSize: "13px", color: "#4b5563", fontWeight: "400", marginLeft: "10px" }}>
                ({reviews.length} total)
              </span>
            )}
          </h3>

          {reviews.length > 1 && (
            <div style={{ display: "flex", gap: "6px" }}>
              {["newest", "worst", "best"].map((s) => (
                <button
                  key={s}
                  onClick={() => setSortBy(s)}
                  style={{
                    padding: "6px 14px",
                    borderRadius: "100px",
                    border: `1px solid ${sortBy === s ? "rgba(239,68,68,0.4)" : "rgba(255,255,255,0.08)"}`,
                    background: sortBy === s ? "rgba(239,68,68,0.1)" : "transparent",
                    color: sortBy === s ? "#fca5a5" : "#6b7280",
                    fontSize: "12px",
                    cursor: "pointer",
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: "500",
                    transition: "all 0.15s",
                  }}
                >
                  {s === "newest" ? "Naye Pehle" : s === "worst" ? "Sabse Bure" : "Sabse Acche"}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "40px", color: "#4b5563" }}>
            <div style={{ fontSize: "24px", marginBottom: "8px", animation: "spin 1s linear infinite", display: "inline-block" }}>⏳</div>
            <p style={{ fontSize: "14px" }}>Reviews load ho rahe hain...</p>
          </div>
        ) : sorted.length === 0 ? (
          <div style={{
            textAlign: "center", padding: "48px 24px",
            background: "rgba(255,255,255,0.02)",
            border: "1px dashed rgba(255,255,255,0.08)",
            borderRadius: "16px"
          }}>
            <div style={{ fontSize: "40px", marginBottom: "12px" }}>💭</div>
            <p style={{ color: "#4b5563", fontSize: "14px", lineHeight: "1.6" }}>
              Is institute ke abhi koi reviews nahi hain.<br />
              <strong style={{ color: "#9ca3af" }}>Pehle review dene wale bano!</strong>
            </p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {sorted.map((review, i) => (
              <ReviewCard key={review._id} review={review} index={i} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}