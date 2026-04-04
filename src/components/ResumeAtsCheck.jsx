import React, { useState, useRef, useCallback } from "react";
import API_BASE_URL from '../src/config/api.js';

/* ─── Styles ─────────────────────────────────────────────────────────────── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Epilogue:wght@300;400;500&display=swap');

  :root {
    --bg: #f5f2ed;
    --surface: #ffffff;
    --surface2: #f0ece5;
    --ink: #1a1714;
    --ink-muted: #7a756e;
    --accent: #e8521a;
    --accent-pale: rgba(232,82,26,0.08);
    --green: #1a7a4a;
    --green-pale: rgba(26,122,74,0.08);
    --yellow: #b87a00;
    --yellow-pale: rgba(184,122,0,0.08);
    --border: rgba(26,23,20,0.1);
    --shadow: 0 2px 24px rgba(26,23,20,0.07);
    --radius: 16px;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .ats-root {
    min-height: 100vh;
    background: var(--bg);
    font-family: 'Epilogue', sans-serif;
    color: var(--ink);
    padding: 0 20px 80px;
  }

  /* Header */
  .ats-header {
    max-width: 760px;
    margin: 0 auto;
    padding: 56px 0 40px;
    border-bottom: 1px solid var(--border);
    margin-bottom: 48px;
  }

  .ats-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 16px;
  }

  .ats-eyebrow span {
    display: inline-block;
    width: 20px; height: 1px;
    background: var(--accent);
  }

  .ats-h1 {
    font-family: 'Syne', sans-serif;
    font-size: clamp(32px, 5vw, 52px);
    font-weight: 800;
    line-height: 1.05;
    letter-spacing: -0.02em;
    color: var(--ink);
    margin-bottom: 14px;
  }

  .ats-h1 em {
    font-style: normal;
    color: var(--accent);
  }

  .ats-subtitle {
    font-size: 15px;
    color: var(--ink-muted);
    line-height: 1.65;
    max-width: 520px;
  }

  /* Main layout */
  .ats-body {
    max-width: 760px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  /* Upload zone */
  .ats-upload-zone {
    border: 2px dashed var(--border);
    border-radius: var(--radius);
    padding: 48px 32px;
    text-align: center;
    background: var(--surface);
    cursor: pointer;
    transition: all 0.25s;
    position: relative;
  }

  .ats-upload-zone.drag-over {
    border-color: var(--accent);
    background: var(--accent-pale);
  }

  .ats-upload-zone.has-file {
    border-style: solid;
    border-color: var(--green);
    background: var(--green-pale);
  }

  .ats-upload-icon {
    font-size: 40px;
    margin-bottom: 12px;
    display: block;
  }

  .ats-upload-label {
    font-family: 'Syne', sans-serif;
    font-size: 16px;
    font-weight: 700;
    color: var(--ink);
    margin-bottom: 6px;
  }

  .ats-upload-hint {
    font-size: 13px;
    color: var(--ink-muted);
  }

  .ats-upload-input {
    position: absolute;
    inset: 0;
    opacity: 0;
    cursor: pointer;
    width: 100%;
    height: 100%;
  }

  .ats-file-name {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-top: 14px;
    background: var(--surface);
    border: 1px solid rgba(26,122,74,0.3);
    border-radius: 999px;
    padding: 6px 16px;
    font-size: 13px;
    font-weight: 500;
    color: var(--green);
  }

  /* JD Input */
  .ats-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 28px 32px;
    box-shadow: var(--shadow);
  }

  .ats-card-label {
    font-family: 'Syne', sans-serif;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--ink-muted);
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .ats-textarea {
    width: 100%;
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 10px;
    color: var(--ink);
    font-family: 'Epilogue', sans-serif;
    font-size: 14px;
    padding: 14px 16px;
    resize: vertical;
    min-height: 120px;
    outline: none;
    transition: border-color 0.2s;
    line-height: 1.6;
  }

  .ats-textarea:focus { border-color: var(--accent); }
  .ats-textarea::placeholder { color: var(--ink-muted); opacity: 0.6; }

  /* CTA */
  .ats-btn {
    width: 100%;
    padding: 18px;
    background: var(--ink);
    color: #fff;
    border: none;
    border-radius: var(--radius);
    font-family: 'Syne', sans-serif;
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 0.04em;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }

  .ats-btn:hover:not(:disabled) {
    background: var(--accent);
    transform: translateY(-1px);
    box-shadow: 0 8px 24px rgba(232,82,26,0.25);
  }

  .ats-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  /* Loading */
  .ats-loading {
    text-align: center;
    padding: 48px 32px;
    background: var(--surface);
    border-radius: var(--radius);
    border: 1px solid var(--border);
  }

  .ats-pulse {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-bottom: 20px;
  }

  .ats-dot {
    width: 10px; height: 10px;
    background: var(--accent);
    border-radius: 50%;
    animation: pulse 1.2s ease-in-out infinite;
  }

  .ats-dot:nth-child(2) { animation-delay: 0.2s; }
  .ats-dot:nth-child(3) { animation-delay: 0.4s; }

  @keyframes pulse {
    0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
    40% { transform: scale(1); opacity: 1; }
  }

  .ats-loading-title {
    font-family: 'Syne', sans-serif;
    font-size: 17px;
    font-weight: 700;
    color: var(--ink);
    margin-bottom: 6px;
  }

  .ats-loading-sub {
    font-size: 13px;
    color: var(--ink-muted);
  }

  /* Results */
  .ats-result {
    animation: slideUp 0.4s ease both;
  }

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* Score card */
  .ats-score-card {
    background: var(--ink);
    border-radius: var(--radius);
    padding: 40px 36px;
    display: flex;
    align-items: center;
    gap: 36px;
    margin-bottom: 20px;
    flex-wrap: wrap;
  }

  .ats-score-ring {
    position: relative;
    width: 110px; height: 110px;
    flex-shrink: 0;
  }

  .ats-score-ring svg {
    transform: rotate(-90deg);
  }

  .ats-score-ring-track {
    fill: none;
    stroke: rgba(255,255,255,0.1);
    stroke-width: 8;
  }

  .ats-score-ring-fill {
    fill: none;
    stroke-width: 8;
    stroke-linecap: round;
    transition: stroke-dashoffset 1s ease;
  }

  .ats-score-num {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: 'Syne', sans-serif;
    font-size: 26px;
    font-weight: 800;
    color: #fff;
    line-height: 1;
  }

  .ats-score-num span {
    font-size: 11px;
    font-weight: 400;
    opacity: 0.6;
    margin-top: 2px;
  }

  .ats-score-info { flex: 1; min-width: 200px; }

  .ats-score-label {
    font-family: 'Syne', sans-serif;
    font-size: 22px;
    font-weight: 800;
    color: #fff;
    margin-bottom: 8px;
  }

  .ats-score-verdict {
    font-size: 14px;
    line-height: 1.6;
    color: rgba(255,255,255,0.6);
  }

  /* Section cards */
  .ats-section {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 28px 32px;
    margin-bottom: 16px;
    box-shadow: var(--shadow);
  }

  .ats-section-title {
    font-family: 'Syne', sans-serif;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    margin-bottom: 18px;
    display: flex;
    align-items: center;
    gap: 9px;
  }

  .ats-section-icon {
    width: 28px; height: 28px;
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    font-size: 14px;
  }

  .icon-green { background: var(--green-pale); }
  .icon-red   { background: var(--accent-pale); }
  .icon-yellow{ background: var(--yellow-pale); }

  /* Keyword tags */
  .ats-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .ats-tag {
    padding: 5px 13px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 500;
    border: 1px solid;
  }

  .tag-found   { background: var(--green-pale);  border-color: rgba(26,122,74,0.25); color: var(--green); }
  .tag-missing { background: var(--accent-pale); border-color: rgba(232,82,26,0.25); color: var(--accent); }

  /* Suggestions list */
  .ats-suggestions { list-style: none; display: flex; flex-direction: column; gap: 10px; }

  .ats-suggestion-item {
    display: flex;
    gap: 12px;
    align-items: flex-start;
    font-size: 14px;
    line-height: 1.6;
    color: var(--ink);
    padding: 14px 16px;
    background: var(--surface2);
    border-radius: 10px;
  }

  .ats-suggestion-num {
    font-family: 'Syne', sans-serif;
    font-size: 12px;
    font-weight: 800;
    color: var(--accent);
    min-width: 22px;
    padding-top: 2px;
  }

  /* Score breakdown */
  .ats-breakdown { display: flex; flex-direction: column; gap: 12px; }

  .ats-breakdown-row {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .ats-breakdown-label {
    font-size: 13px;
    color: var(--ink-muted);
    width: 140px;
    flex-shrink: 0;
  }

  .ats-progress-track {
    flex: 1;
    height: 6px;
    background: var(--surface2);
    border-radius: 999px;
    overflow: hidden;
  }

  .ats-progress-fill {
    height: 100%;
    border-radius: 999px;
    transition: width 1s ease;
  }

  .ats-breakdown-val {
    font-family: 'Syne', sans-serif;
    font-size: 13px;
    font-weight: 700;
    color: var(--ink);
    width: 36px;
    text-align: right;
  }

  /* Reset */
  .ats-reset {
    background: none;
    border: 1px solid var(--border);
    color: var(--ink-muted);
    font-family: 'Epilogue', sans-serif;
    font-size: 13px;
    padding: 10px 20px;
    border-radius: 999px;
    cursor: pointer;
    transition: all 0.2s;
    display: block;
    margin: 8px auto 0;
  }

  .ats-reset:hover { border-color: var(--accent); color: var(--accent); }

  /* Error */
  .ats-error {
    background: var(--accent-pale);
    border: 1px solid rgba(232,82,26,0.25);
    border-radius: var(--radius);
    padding: 18px 24px;
    font-size: 14px;
    color: var(--accent);
    display: flex;
    gap: 10px;
    align-items: flex-start;
  }

  @media (max-width: 520px) {
    .ats-score-card { padding: 28px 24px; gap: 24px; }
    .ats-section { padding: 22px 20px; }
    .ats-card { padding: 22px 20px; }
  }
`;

/* ─── Helpers ─────────────────────────────────────────────────────────────── */
function getScoreColor(score) {
  if (score >= 75) return "#1a7a4a";
  if (score >= 50) return "#b87a00";
  return "#e8521a";
}

function getVerdict(score) {
  if (score >= 80) return "Strong match — your resume is well-optimised for ATS filters. Minor tweaks can push it further.";
  if (score >= 60) return "Decent match — some gaps exist. Address the missing keywords and suggestions to significantly boost your chances.";
  if (score >= 40) return "Moderate match — several important keywords and sections are missing. Revisions recommended before applying.";
  return "Weak match — your resume needs significant rework to pass ATS filters for this role.";
}

function circumference(r) { return 2 * Math.PI * r; }

/* ─── Component ───────────────────────────────────────────────────────────── */
const ResumeAtsCheck = () => {
  const [file, setFile]           = useState(null);
  const [jd, setJd]               = useState("");
  const [drag, setDrag]           = useState(false);
  const [loading, setLoading]     = useState(false);
  const [result, setResult]       = useState(null);
  const [error, setError]         = useState("");
  const inputRef                  = useRef();

  /* ── File handling ── */
  const handleFile = (f) => {
    if (!f) return;
    if (f.type !== "application/pdf") { setError("Only PDF files are supported."); return; }
    if (f.size > 5 * 1024 * 1024)    { setError("File size must be under 5 MB."); return; }
    setError("");
    setFile(f);
    setResult(null);
  };

  const onDrop = useCallback((e) => {
    e.preventDefault(); setDrag(false);
    handleFile(e.dataTransfer.files[0]);
  }, []);

  /* ── toBase64 ── */
  const toBase64 = (f) => new Promise((res, rej) => {
    const r = new FileReader();
    r.onload  = () => res(r.result.split(",")[1]);
    r.onerror = () => rej(new Error("File read failed"));
    r.readAsDataURL(f);
  });

  /* ── Analyse ── */
  const analyse = async () => {
    if (!file) { setError("Please upload your resume PDF."); return; }
    setError(""); setLoading(true); setResult(null);

    try {
      const base64 = await toBase64(file);

      const systemPrompt = `You are an expert ATS (Applicant Tracking System) analyst and resume coach.
Analyse the provided resume PDF against the job description (if given).
Respond ONLY with a valid JSON object — no markdown, no backticks, no extra text.

JSON shape:
{
  "score": <integer 0-100>,
  "breakdown": {
    "keywords": <0-100>,
    "formatting": <0-100>,
    "experience": <0-100>,
    "skills": <0-100>
  },
  "keywords_found": [<string>, ...],
  "keywords_missing": [<string>, ...],
  "strengths": [<string>, ...],
  "suggestions": [<string>, ...]
}

Rules:
- score = overall ATS compatibility (weighted average of breakdown)
- keywords_found = important keywords present in resume (max 10)
- keywords_missing = important keywords absent from resume but expected for the role (max 10)
- strengths = 2-4 things done well
- suggestions = 4-6 specific, actionable improvement tips
- If no JD is given, use general best-practice ATS standards`;

      const userContent = [
        {
          type: "document",
          source: { type: "base64", media_type: "application/pdf", data: base64 }
        },
        {
          type: "text",
          text: jd.trim()
            ? `Job Description:\n${jd.trim()}\n\nAnalyse the resume against this JD and return JSON only.`
            : "Analyse this resume for general ATS compatibility and return JSON only."
        }
      ];

      const res = await fetch(`${API_BASE_URL}/api/claude`, {
        method: "POST",

        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: systemPrompt,
          messages: [{ role: "user", content: userContent }]
        })
      });

      const data = await res.json();
      const text = data.content?.map(b => b.text || "").join("").trim();
      const clean = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setResult(parsed);
    } catch (e) {
      console.error(e);
      setError("Analysis failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /* ── Score ring ── */
  const R = 46, C = circumference(R);
  const scoreColor  = result ? getScoreColor(result.score) : "#e8521a";
  const dashOffset  = result ? C - (result.score / 100) * C : C;

  const reset = () => { setFile(null); setResult(null); setError(""); setJd(""); };

  /* ── Render ── */
  return (
    <>
      <style>{styles}</style>
      <div className="ats-root">

        {/* Header */}
        <div className="ats-header">
          <div className="ats-eyebrow"><span />ATS Resume Checker</div>
          <h1 className="ats-h1">Beat the <em>Algorithm.</em><br />Land the Interview.</h1>
          <p className="ats-subtitle">
            Upload your resume PDF and optionally paste a job description.
            Our AI analyses ATS compatibility and gives you actionable fixes.
          </p>
        </div>

        <div className="ats-body">

          {/* Upload */}
          {!result && (
            <>
              <div
                className={`ats-upload-zone ${drag ? "drag-over" : ""} ${file ? "has-file" : ""}`}
                onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
                onDragLeave={() => setDrag(false)}
                onDrop={onDrop}
                onClick={() => inputRef.current?.click()}
              >
                <input
                  ref={inputRef}
                  type="file"
                  accept=".pdf"
                  className="ats-upload-input"
                  onChange={(e) => handleFile(e.target.files[0])}
                />
                <span className="ats-upload-icon">{file ? "📄" : "⬆️"}</span>
                <p className="ats-upload-label">
                  {file ? "Resume uploaded" : "Drop your resume here"}
                </p>
                <p className="ats-upload-hint">PDF only · Max 5 MB</p>
                {file && (
                  <div className="ats-file-name">✓ {file.name}</div>
                )}
              </div>

              {/* JD */}
              <div className="ats-card">
                <p className="ats-card-label">📋 Job Description <span style={{fontWeight:300,opacity:0.5}}>(optional but recommended)</span></p>
                <textarea
                  className="ats-textarea"
                  placeholder="Paste the job description here to get keyword-specific analysis…"
                  value={jd}
                  onChange={(e) => setJd(e.target.value)}
                />
              </div>

              {error && (
                <div className="ats-error">⚠ {error}</div>
              )}

              <button className="ats-btn" onClick={analyse} disabled={!file || loading}>
                Analyse My Resume →
              </button>
            </>
          )}

          {/* Loading */}
          {loading && (
            <div className="ats-loading">
              <div className="ats-pulse">
                <div className="ats-dot" />
                <div className="ats-dot" />
                <div className="ats-dot" />
              </div>
              <p className="ats-loading-title">Analysing your resume…</p>
              <p className="ats-loading-sub">Checking keywords, structure, and ATS compatibility</p>
            </div>
          )}

          {/* Results */}
          {result && !loading && (
            <div className="ats-result">

              {/* Score */}
              <div className="ats-score-card">
                <div className="ats-score-ring">
                  <svg width="110" height="110" viewBox="0 0 110 110">
                    <circle className="ats-score-ring-track" cx="55" cy="55" r={R} />
                    <circle
                      className="ats-score-ring-fill"
                      cx="55" cy="55" r={R}
                      stroke={scoreColor}
                      strokeDasharray={C}
                      strokeDashoffset={dashOffset}
                    />
                  </svg>
                  <div className="ats-score-num">
                    {result.score}
                    <span>/ 100</span>
                  </div>
                </div>

                <div className="ats-score-info">
                  <p className="ats-score-label">
                    {result.score >= 75 ? "Strong Match" : result.score >= 50 ? "Decent Match" : "Needs Work"}
                  </p>
                  <p className="ats-score-verdict">{getVerdict(result.score)}</p>
                </div>
              </div>

              {/* Breakdown */}
              <div className="ats-section">
                <p className="ats-section-title">
                  <span className="ats-section-icon icon-yellow">📊</span>
                  Score Breakdown
                </p>
                <div className="ats-breakdown">
                  {Object.entries(result.breakdown).map(([key, val]) => (
                    <div className="ats-breakdown-row" key={key}>
                      <span className="ats-breakdown-label">
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </span>
                      <div className="ats-progress-track">
                        <div
                          className="ats-progress-fill"
                          style={{ width: `${val}%`, background: getScoreColor(val) }}
                        />
                      </div>
                      <span className="ats-breakdown-val">{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Keywords */}
              <div className="ats-section">
                <p className="ats-section-title">
                  <span className="ats-section-icon icon-green">🔑</span>
                  Keyword Analysis
                </p>
                {result.keywords_found?.length > 0 && (
                  <>
                    <p style={{fontSize:12,color:"var(--ink-muted)",marginBottom:8,fontWeight:500}}>FOUND IN RESUME</p>
                    <div className="ats-tags" style={{marginBottom:16}}>
                      {result.keywords_found.map((kw) => (
                        <span className="ats-tag tag-found" key={kw}>{kw}</span>
                      ))}
                    </div>
                  </>
                )}
                {result.keywords_missing?.length > 0 && (
                  <>
                    <p style={{fontSize:12,color:"var(--ink-muted)",marginBottom:8,fontWeight:500}}>MISSING / ADD THESE</p>
                    <div className="ats-tags">
                      {result.keywords_missing.map((kw) => (
                        <span className="ats-tag tag-missing" key={kw}>{kw}</span>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Strengths */}
              {result.strengths?.length > 0 && (
                <div className="ats-section">
                  <p className="ats-section-title">
                    <span className="ats-section-icon icon-green">✅</span>
                    What's Working
                  </p>
                  <ul className="ats-suggestions">
                    {result.strengths.map((s, i) => (
                      <li className="ats-suggestion-item" key={i}>
                        <span className="ats-suggestion-num">0{i + 1}</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Suggestions */}
              {result.suggestions?.length > 0 && (
                <div className="ats-section">
                  <p className="ats-section-title">
                    <span className="ats-section-icon icon-red">🛠</span>
                    How to Improve
                  </p>
                  <ul className="ats-suggestions">
                    {result.suggestions.map((s, i) => (
                      <li className="ats-suggestion-item" key={i}>
                        <span className="ats-suggestion-num">0{i + 1}</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <button className="ats-reset" onClick={reset}>← Analyse another resume</button>
            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default ResumeAtsCheck;