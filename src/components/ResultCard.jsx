export default function ResultCard({ result }) {
  if (!result) return null;

  const { dbData, aiAnalysis, finalVerdict } = result;

  const verdictMap = {
    legitimate: {
      emoji: "✅",
      label: "Legitimate",
      tagline: "Ye institute genuine lagta hai",
      color: "#16a34a",
      bg: "linear-gradient(135deg, #052e16 0%, #0a0a0f 100%)",
      border: "rgba(34,197,94,0.25)",
      glow: "rgba(34,197,94,0.08)",
      badge: "#14532d",
      badgeText: "#86efac",
    },
    suspicious: {
      emoji: "⚠️",
      label: "Suspicious",
      tagline: "Saavdhaan! Kuch cheezein theek nahi lagti",
      color: "#d97706",
      bg: "linear-gradient(135deg, #1c1108 0%, #0a0a0f 100%)",
      border: "rgba(234,179,8,0.25)",
      glow: "rgba(234,179,8,0.08)",
      badge: "#451a03",
      badgeText: "#fcd34d",
    },
    scam: {
      emoji: "🚨",
      label: "SCAM ALERT",
      tagline: "Khabardar! Ye institute fraud ho sakta hai",
      color: "#ef4444",
      bg: "linear-gradient(135deg, #1c0505 0%, #0a0a0f 100%)",
      border: "rgba(239,68,68,0.3)",
      glow: "rgba(239,68,68,0.1)",
      badge: "#450a0a",
      badgeText: "#fca5a5",
    },
  };

  const v = verdictMap[finalVerdict] || verdictMap.suspicious;

  const stars = (rating) =>
    Array.from({ length: 5 }, (_, i) => (
      <span key={i} style={{ color: i < Math.round(rating) ? "#fbbf24" : "#374151", fontSize: "16px" }}>★</span>
    ));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Outfit:wght@300;400;500;600&display=swap');

        .rc-wrap {
          font-family: 'Outfit', sans-serif;
          max-width: 780px;
          margin: 0 auto;
          padding: 0 24px 48px;
          animation: rc-fadein 0.4s ease;
        }

        @keyframes rc-fadein {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .rc-verdict {
          border-radius: 20px;
          padding: 32px;
          margin-bottom: 20px;
          border: 1.5px solid;
          position: relative;
          overflow: hidden;
        }

        .rc-verdict::before {
          content: '';
          position: absolute;
          top: -60px;
          right: -60px;
          width: 200px;
          height: 200px;
          border-radius: 50%;
          opacity: 0.6;
          pointer-events: none;
        }

        .rc-top-row {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 16px;
        }

        .rc-emoji {
          font-size: 48px;
          line-height: 1;
          flex-shrink: 0;
        }

        .rc-verdict-label {
          font-family: 'Syne', sans-serif;
          font-size: 30px;
          font-weight: 800;
          line-height: 1;
          margin-bottom: 6px;
        }

        .rc-verdict-tagline {
          font-size: 14px;
          font-weight: 300;
          opacity: 0.7;
        }

        .rc-confidence-bar {
          height: 6px;
          background: rgba(255,255,255,0.08);
          border-radius: 100px;
          overflow: hidden;
          margin-top: 16px;
        }

        .rc-confidence-fill {
          height: 100%;
          border-radius: 100px;
          transition: width 1s ease;
        }

        .rc-confidence-label {
          font-size: 12px;
          opacity: 0.5;
          margin-top: 6px;
          font-weight: 300;
        }

        .rc-section {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          padding: 24px;
          margin-bottom: 16px;
        }

        .rc-section-title {
          font-family: 'Syne', sans-serif;
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #6b7280;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .rc-advice-text {
          font-size: 15px;
          color: #e5e7eb;
          line-height: 1.7;
          font-weight: 300;
        }

        .rc-flags {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .rc-flag-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 12px 16px;
          border-radius: 10px;
          font-size: 14px;
          line-height: 1.5;
          font-weight: 400;
        }

        .rc-flag-red {
          background: rgba(239,68,68,0.08);
          border: 1px solid rgba(239,68,68,0.15);
          color: #fca5a5;
        }

        .rc-flag-green {
          background: rgba(34,197,94,0.08);
          border: 1px solid rgba(34,197,94,0.15);
          color: #86efac;
        }

        .rc-questions {
          display: flex;
          flex-direction: column;
          gap: 10px;
          counter-reset: q;
        }

        .rc-question {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 14px 16px;
          background: rgba(59,130,246,0.06);
          border: 1px solid rgba(59,130,246,0.12);
          border-radius: 10px;
          font-size: 14px;
          color: #93c5fd;
          line-height: 1.5;
        }

        .rc-q-num {
          background: rgba(59,130,246,0.15);
          color: #60a5fa;
          width: 22px;
          height: 22px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 700;
          flex-shrink: 0;
          margin-top: 1px;
        }

        .rc-db-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }

        .rc-rating-big {
          font-family: 'Syne', sans-serif;
          font-size: 40px;
          font-weight: 800;
          color: #fbbf24;
          line-height: 1;
        }

        .rc-rating-meta {
          font-size: 12px;
          color: #6b7280;
          margin-top: 4px;
        }

        .rc-no-data {
          text-align: center;
          padding: 20px;
          color: #4b5563;
          font-size: 14px;
        }

        .rc-share-btn {
          width: 100%;
          padding: 14px;
          background: transparent;
          border: 1.5px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          color: #9ca3af;
          font-family: 'Outfit', sans-serif;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          margin-top: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .rc-share-btn:hover {
          border-color: rgba(255,255,255,0.2);
          color: #e5e7eb;
          background: rgba(255,255,255,0.04);
        }
      `}</style>

      <div className="rc-wrap">

        {/* Main Verdict Card */}
        <div
          className="rc-verdict"
          style={{
            background: v.bg,
            borderColor: v.border,
            boxShadow: `0 0 40px ${v.glow}`,
          }}
        >
          <div className="rc-top-row">
            <span className="rc-emoji">{v.emoji}</span>
            <div>
              <div className="rc-verdict-label" style={{ color: v.color }}>
                {v.label}
              </div>
              <div className="rc-verdict-tagline" style={{ color: "#d1d5db" }}>
                {v.tagline}
              </div>
            </div>
          </div>

          <div className="rc-confidence-bar">
            <div
              className="rc-confidence-fill"
              style={{
                width: `${aiAnalysis?.confidence || 70}%`,
                background: v.color,
              }}
            />
          </div>
          <div className="rc-confidence-label">
            AI Confidence: {aiAnalysis?.confidence || 70}%
          </div>
        </div>

        {/* AI Advice */}
        {aiAnalysis?.advice && (
          <div className="rc-section">
            <div className="rc-section-title">💬 AI ki Advice</div>
            <p className="rc-advice-text">{aiAnalysis.advice}</p>
          </div>
        )}

        {/* Red + Green Flags */}
        {(aiAnalysis?.redFlags?.length > 0 || aiAnalysis?.greenFlags?.length > 0) && (
          <div className="rc-section">
            <div className="rc-section-title">🚩 Flags</div>
            <div className="rc-flags">
              {aiAnalysis.redFlags?.map((flag, i) => (
                <div key={i} className="rc-flag-item rc-flag-red">
                  <span>🔴</span><span>{flag}</span>
                </div>
              ))}
              {aiAnalysis.greenFlags?.map((flag, i) => (
                <div key={i} className="rc-flag-item rc-flag-green">
                  <span>🟢</span><span>{flag}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Questions to Ask */}
        {aiAnalysis?.questionsToAsk?.length > 0 && (
          <div className="rc-section">
            <div className="rc-section-title">❓ Institute se ye Questions Pucho</div>
            <div className="rc-questions">
              {aiAnalysis.questionsToAsk.map((q, i) => (
                <div key={i} className="rc-question">
                  <span className="rc-q-num">{i + 1}</span>
                  <span>{q}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* DB Rating */}
        <div className="rc-section">
          <div className="rc-section-title">⭐ Student Reviews</div>
          {dbData ? (
            <div className="rc-db-row">
              <div>
                <div className="rc-rating-big">{dbData.avgRating || "N/A"}</div>
                <div style={{ display: "flex", gap: "2px", margin: "6px 0" }}>
                  {stars(dbData.avgRating || 0)}
                </div>
                <div className="rc-rating-meta">{dbData.totalReviews || 0} verified reviews</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", flex: 1, maxWidth: "300px", marginLeft: "24px" }}>
                {[
                  { label: "Teaching Quality", val: dbData.teachingQuality || 3 },
                  { label: "Placement Support", val: dbData.placementSupport || 2 },
                  { label: "Value for Money", val: dbData.valueForMoney || 2.5 },
                ].map((item) => (
                  <div key={item.label}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#6b7280", marginBottom: "4px" }}>
                      <span>{item.label}</span><span>{item.val}/5</span>
                    </div>
                    <div style={{ height: "4px", background: "rgba(255,255,255,0.06)", borderRadius: "100px", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${(item.val / 5) * 100}%`, background: "#fbbf24", borderRadius: "100px" }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="rc-no-data">
              Is institute ke abhi koi reviews nahi hain database mein.<br />
              Neeche apna review submit karo! 👇
            </div>
          )}
        </div>

        {/* Share */}
        <button
          className="rc-share-btn"
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            alert("Link copied! Dosto ke saath share karo 🔗");
          }}
        >
          🔗 Apne dosto ke saath share karo — unhe bhi bachao!
        </button>
      </div>
    </>
  );
}