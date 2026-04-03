import { useState } from "react";

export default function SearchBar({ onSearch, loading }) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim()) onSearch(query.trim());
  };

  const examples = ["NIIT Pune", "Jetking", "Aptech", "TechnoMaster Institute"];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Outfit:wght@300;400;500;600&display=swap');

        .sb-hero {
          background: #0a0a0f;
          min-height: 42vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px 24px 48px;
          position: relative;
          overflow: hidden;
          font-family: 'Outfit', sans-serif;
        }

        .sb-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 80% 50% at 50% -10%, rgba(239,68,68,0.18) 0%, transparent 60%),
            radial-gradient(ellipse 40% 40% at 80% 80%, rgba(234,179,8,0.08) 0%, transparent 50%);
          pointer-events: none;
        }

        .sb-grid-bg {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
        }

        .sb-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(239,68,68,0.12);
          border: 1px solid rgba(239,68,68,0.3);
          border-radius: 100px;
          padding: 5px 14px;
          font-size: 11px;
          font-weight: 600;
          color: #f87171;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 20px;
          position: relative;
        }

        .sb-badge-dot {
          width: 6px;
          height: 6px;
          background: #ef4444;
          border-radius: 50%;
          animation: pulse-dot 1.5s ease-in-out infinite;
        }

        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.7); }
        }

        .sb-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(32px, 6vw, 58px);
          font-weight: 800;
          color: #fff;
          text-align: center;
          line-height: 1.05;
          margin-bottom: 14px;
          position: relative;
        }

        .sb-title span {
          color: #ef4444;
          position: relative;
        }

        .sb-title span::after {
          content: '';
          position: absolute;
          bottom: 2px;
          left: 0;
          right: 0;
          height: 3px;
          background: #ef4444;
          border-radius: 2px;
          opacity: 0.5;
        }

        .sb-subtitle {
          font-size: 15px;
          color: #6b7280;
          text-align: center;
          margin-bottom: 36px;
          font-weight: 300;
          max-width: 460px;
          line-height: 1.6;
          position: relative;
        }

        .sb-input-wrap {
          display: flex;
          gap: 0;
          width: 100%;
          max-width: 620px;
          background: rgba(255,255,255,0.05);
          border: 1.5px solid rgba(255,255,255,0.12);
          border-radius: 14px;
          overflow: hidden;
          transition: border-color 0.2s, box-shadow 0.2s;
          position: relative;
        }

        .sb-input-wrap:focus-within {
          border-color: rgba(239,68,68,0.5);
          box-shadow: 0 0 0 4px rgba(239,68,68,0.08);
        }

        .sb-icon {
          display: flex;
          align-items: center;
          padding: 0 16px;
          color: #4b5563;
          font-size: 18px;
          flex-shrink: 0;
        }

        .sb-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          padding: 16px 0;
          font-size: 15px;
          color: #f9fafb;
          font-family: 'Outfit', sans-serif;
          font-weight: 400;
        }

        .sb-input::placeholder { color: #4b5563; }

        .sb-btn {
          background: #ef4444;
          color: #fff;
          border: none;
          padding: 0 28px;
          font-size: 14px;
          font-weight: 600;
          font-family: 'Outfit', sans-serif;
          cursor: pointer;
          letter-spacing: 0.03em;
          transition: background 0.2s;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .sb-btn:hover:not(:disabled) { background: #dc2626; }
        .sb-btn:disabled { background: #374151; cursor: not-allowed; }

        .sb-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        .sb-examples {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          justify-content: center;
          margin-top: 20px;
          position: relative;
        }

        .sb-example-label {
          font-size: 11px;
          color: #4b5563;
          width: 100%;
          text-align: center;
          margin-bottom: 4px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .sb-chip {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 100px;
          padding: 6px 14px;
          font-size: 12px;
          color: #9ca3af;
          cursor: pointer;
          transition: all 0.15s;
          font-family: 'Outfit', sans-serif;
        }

        .sb-chip:hover {
          background: rgba(239,68,68,0.1);
          border-color: rgba(239,68,68,0.3);
          color: #fca5a5;
        }

        .sb-stats {
          display: flex;
          gap: 32px;
          margin-top: 36px;
          position: relative;
        }

        .sb-stat {
          text-align: center;
        }

        .sb-stat-num {
          font-family: 'Syne', sans-serif;
          font-size: 22px;
          font-weight: 800;
          color: #fff;
        }

        .sb-stat-label {
          font-size: 11px;
          color: #4b5563;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-top: 2px;
        }

        .sb-divider {
          width: 1px;
          background: rgba(255,255,255,0.06);
          height: 40px;
          align-self: center;
        }
      `}</style>

      <div className="sb-hero">
        <div className="sb-grid-bg" />

        <div className="sb-badge">
          <span className="sb-badge-dot" />
          Protecting Students from Fraud
        </div>

        <h1 className="sb-title">
          Is Your Institute a <span>Scam?</span>
        </h1>

        <p className="sb-subtitle">
          Pune aur Maharashtra ke coding institutes ka sach jaano — students ke real reviews ke saath
        </p>

        <div className="sb-input-wrap">
          <span className="sb-icon">🔍</span>
          <input
            className="sb-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Institute ya course name type karo..."
          />
          <button className="sb-btn" onClick={handleSearch} disabled={loading}>
            {loading ? <span className="sb-spinner" /> : "Check Now →"}
          </button>
        </div>

        <div className="sb-examples">
          <span className="sb-example-label">Try karo:</span>
          {examples.map((ex) => (
            <span key={ex} className="sb-chip" onClick={() => { setQuery(ex); onSearch(ex); }}>
              {ex}
            </span>
          ))}
        </div>

        <div className="sb-stats">
          <div className="sb-stat">
            <div className="sb-stat-num">2,400+</div>
            <div className="sb-stat-label">Students Helped</div>
          </div>
          <div className="sb-divider" />
          <div className="sb-stat">
            <div className="sb-stat-num">140+</div>
            <div className="sb-stat-label">Institutes Tracked</div>
          </div>
          <div className="sb-divider" />
          <div className="sb-stat">
            <div className="sb-stat-num">₹3.2Cr</div>
            <div className="sb-stat-label">Fraud Prevented</div>
          </div>
        </div>
      </div>
    </>
  );
}