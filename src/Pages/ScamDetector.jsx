// ScamDetector.jsx
import { useState } from 'react'
import axios from 'axios'

export default function ScamDetector() {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const verdictConfig = {
    legitimate: { 
      color: '#16a34a', bg: '#f0fdf4', 
      emoji: '✅', label: 'Legitimate' 
    },
    suspicious: { 
      color: '#d97706', bg: '#fffbeb', 
      emoji: '⚠️', label: 'Suspicious' 
    },
    scam: { 
      color: '#dc2626', bg: '#fef2f2', 
      emoji: '🚨', label: 'Likely Scam' 
    },
  }

  const handleSearch = async () => {
  if (!query.trim()) return;
  setLoading(true);
  try {
    const res = await axios.post("/api/search", { query });
    setResult(res.data);
  } catch (err) {
    // ✅ Error details dikhao
    const msg = err.response?.data?.error || "Server se connection nahi ho raha";
    alert("Error: " + msg);
    console.error("Full error:", err.response?.data);
  }
  setLoading(false);
};

  const verdict = result ? verdictConfig[result.finalVerdict] : null

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '32px 16px' }}>
      
      {/* Search */}
      <h1 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '8px' }}>
        🔍 Institute Scam Detector
      </h1>
      <p style={{ color: '#64748b', marginBottom: '24px' }}>
        Koi bhi coding institute ka naam daalo — sach jaano
      </p>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '32px' }}>
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSearch()}
          placeholder="e.g. Pune Tech Academy, NIIT Pune..."
          style={{ flex: 1, padding: '14px 16px', borderRadius: '10px',
            border: '2px solid #e2e8f0', fontSize: '15px', outline: 'none' }}
        />
        <button onClick={handleSearch} disabled={loading}
          style={{ padding: '14px 24px', background: '#1d4ed8', color: '#fff',
            border: 'none', borderRadius: '10px', fontWeight: '700',
            cursor: 'pointer', fontSize: '15px' }}>
          {loading ? '...' : 'Check'}
        </button>
      </div>

      {/* Result Card */}
      {result && verdict && (
        <div style={{ background: verdict.bg, border: `2px solid ${verdict.color}`,
          borderRadius: '16px', padding: '24px', marginBottom: '24px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <span style={{ fontSize: '36px' }}>{verdict.emoji}</span>
            <div>
              <h2 style={{ fontSize: '22px', fontWeight: '800', color: verdict.color }}>
                {verdict.label}
              </h2>
              <p style={{ color: '#64748b', fontSize: '13px' }}>
                AI Confidence: {result.aiAnalysis.confidence}%
              </p>
            </div>
          </div>

          {/* AI Advice */}
          <div style={{ background: 'white', borderRadius: '10px', 
            padding: '16px', marginBottom: '16px' }}>
            <p style={{ fontWeight: '700', marginBottom: '6px' }}>💬 AI ki Advice:</p>
            <p style={{ color: '#374151', lineHeight: '1.6' }}>
              {result.aiAnalysis.advice}
            </p>
          </div>

          {/* Red Flags */}
          {result.aiAnalysis.redFlags?.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <p style={{ fontWeight: '700', marginBottom: '8px' }}>🚩 Red Flags:</p>
              {result.aiAnalysis.redFlags.map((flag, i) => (
                <div key={i} style={{ display: 'flex', gap: '8px', 
                  marginBottom: '6px', color: '#dc2626' }}>
                  <span>•</span><span>{flag}</span>
                </div>
              ))}
            </div>
          )}

          {/* Questions to Ask */}
          <div>
            <p style={{ fontWeight: '700', marginBottom: '8px' }}>
              ❓ Ye Questions pucho institute se:
            </p>
            {result.aiAnalysis.questionsToAsk?.map((q, i) => (
              <div key={i} style={{ background: 'white', borderRadius: '8px',
                padding: '10px 14px', marginBottom: '8px', fontSize: '14px' }}>
                {i + 1}. {q}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* DB Reviews Summary */}
      {result?.dbData && (
        <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '20px' }}>
          <p style={{ fontWeight: '700', marginBottom: '4px' }}>
            ⭐ {result.dbData.avgRating}/5 
            ({result.dbData.totalReviews} student reviews)
          </p>
        </div>
      )}

    </div>
  )
}
// ```

// ---

// ### 🗺️ Build Karne Ka Order
// ```
// Week 1  →  MongoDB setup + Institute model + seed data (Pune institutes)
// Week 2  →  Search API + AI integration
// Week 3  →  Frontend Search + Result Card
// Week 4  →  Review submit form + Anonymous reviews
// Week 5  →  Admin panel to verify reviews
// Week 6  →  Deploy (Vercel + Render)