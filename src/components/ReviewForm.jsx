import { useState } from "react";
import axios from "axios";

const emptyForm = {
  studentCity: "",
  courseTaken: "",
  feePaid: "",
  overallRating: 0,
  teachingQuality: 0,
  placementSupport: 0,
  valueForMoney: 0,
  review: "",
  gotPlaced: "",
  actualSalary: "",
  promisedSalary: "",
  flags: [],
};

const FLAG_OPTIONS = [
  "Fake placement data",
  "Hidden fees baad mein",
  "Pressure sales tactics",
  "Fake student reviews",
  "Poor teaching quality",
  "No actual job support",
  "Outdated curriculum",
  "Refund nahi diya",
];

const CITIES = ["Pune", "Mumbai", "Nagpur", "Nashik", "Aurangabad", "Kolhapur", "Solapur", "Other"];
const COURSES = ["Web Development", "Data Science", "Android Dev", "Python", "Java", "Full Stack", "UI/UX", "Digital Marketing", "Other"];

function StarPicker({ value, onChange, label }) {
  const [hover, setHover] = useState(0);
  return (
    <div style={{ marginBottom: "16px" }}>
      <label style={{ fontSize: "12px", color: "#6b7280", display: "block", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: "500" }}>
        {label}
      </label>
      <div style={{ display: "flex", gap: "6px" }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            onClick={() => onChange(star)}
            style={{
              fontSize: "28px",
              cursor: "pointer",
              color: star <= (hover || value) ? "#fbbf24" : "#1f2937",
              transition: "color 0.1s, transform 0.1s",
              transform: star <= (hover || value) ? "scale(1.15)" : "scale(1)",
              display: "inline-block",
            }}
          >★</span>
        ))}
        {value > 0 && (
          <span style={{ fontSize: "13px", color: "#6b7280", alignSelf: "center", marginLeft: "6px" }}>
            {["", "Bahut Bura", "Bura", "Theek", "Accha", "Bahut Accha"][value]}
          </span>
        )}
      </div>
    </div>
  );
}

export default function ReviewForm({ instituteId, instituteName, onReviewSubmitted }) {
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState(1);

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const toggleFlag = (flag) => {
    setForm((f) => ({
      ...f,
      flags: f.flags.includes(flag) ? f.flags.filter((x) => x !== flag) : [...f.flags, flag],
    }));
  };

  const handleSubmit = async () => {
    if (!form.overallRating) return alert("Please overall rating do!");
    if (!form.review.trim()) return alert("Please apna experience likho!");
    setLoading(true);
    try {
      await axios.post("/api/reviews", { ...form, instituteId });
      setSubmitted(true);
      onReviewSubmitted?.();
    } catch {
      alert("Error submitting review. Try again.");
    }
    setLoading(false);
  };

  if (submitted) {
    return (
      <div style={styles.successBox}>
        <div style={{ fontSize: "48px", marginBottom: "12px" }}>🙏</div>
        <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: "22px", color: "#f9fafb", marginBottom: "8px" }}>
          Shukriya, Bhai!
        </h3>
        <p style={{ color: "#6b7280", fontSize: "14px", lineHeight: "1.6" }}>
          Tera review submit ho gaya. Teri wajah se koi aur student fraud se bachega! 🛡️
        </p>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Outfit:wght@300;400;500;600&display=swap');
        .rf-input, .rf-select, .rf-textarea {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          padding: 12px 14px;
          font-size: 14px;
          color: #f9fafb;
          font-family: 'Outfit', sans-serif;
          font-weight: 300;
          outline: none;
          box-sizing: border-box;
          transition: border-color 0.2s;
        }
        .rf-input:focus, .rf-select:focus, .rf-textarea:focus {
          border-color: rgba(239,68,68,0.4);
        }
        .rf-select option { background: #1a1a2e; color: #f9fafb; }
        .rf-textarea { resize: vertical; min-height: 100px; line-height: 1.6; }
        .rf-label {
          font-size: 12px;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-weight: 500;
          display: block;
          margin-bottom: 8px;
        }
        .rf-field { margin-bottom: 18px; }
        .rf-flag-chip {
          padding: 7px 14px;
          border-radius: 100px;
          font-size: 12px;
          cursor: pointer;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.03);
          color: #9ca3af;
          font-family: 'Outfit', sans-serif;
          transition: all 0.15s;
        }
        .rf-flag-chip.active {
          background: rgba(239,68,68,0.12);
          border-color: rgba(239,68,68,0.35);
          color: #fca5a5;
        }
        .rf-step-btn {
          padding: 13px 28px;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 600;
          font-family: 'Outfit', sans-serif;
          cursor: pointer;
          border: none;
          transition: all 0.2s;
        }
      `}</style>

      <div style={styles.formCard}>
        <div style={styles.formHeader}>
          <h2 style={styles.formTitle}>📝 Apna Review Do</h2>
          <p style={styles.formSub}>
            <strong style={{ color: "#f87171" }}>{instituteName || "Is Institute"}</strong> ke baare mein sach batao — 100% Anonymous
          </p>

          {/* Step indicator */}
          <div style={{ display: "flex", gap: "8px", marginTop: "20px" }}>
            {[1, 2, 3].map((s) => (
              <div key={s} style={{
                flex: 1, height: "3px", borderRadius: "100px",
                background: s <= step ? "#ef4444" : "rgba(255,255,255,0.08)",
                transition: "background 0.3s"
              }} />
            ))}
          </div>
          <div style={{ fontSize: "11px", color: "#4b5563", marginTop: "8px" }}>
            Step {step} of 3 — {["", "Basic Info", "Ratings", "Your Experience"][step]}
          </div>
        </div>

        <div style={styles.formBody}>

          {/* STEP 1 */}
          {step === 1 && (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div className="rf-field">
                  <label className="rf-label">Tumhara Shehar</label>
                  <select className="rf-select" value={form.studentCity} onChange={(e) => set("studentCity", e.target.value)}>
                    <option value="">Select city</option>
                    {CITIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="rf-field">
                  <label className="rf-label">Kaunsa Course Liya</label>
                  <select className="rf-select" value={form.courseTaken} onChange={(e) => set("courseTaken", e.target.value)}>
                    <option value="">Select course</option>
                    {COURSES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div className="rf-field">
                  <label className="rf-label">Fees Kitni Thi (₹)</label>
                  <input className="rf-input" type="number" value={form.feePaid} onChange={(e) => set("feePaid", e.target.value)} placeholder="e.g. 45000" />
                </div>
                <div className="rf-field">
                  <label className="rf-label">Placement Mili?</label>
                  <select className="rf-select" value={form.gotPlaced} onChange={(e) => set("gotPlaced", e.target.value)}>
                    <option value="">Select</option>
                    <option value="yes">Haan, mili ✅</option>
                    <option value="no">Nahi mili ❌</option>
                    <option value="self">Khud dhundha 🔍</option>
                  </select>
                </div>
              </div>

              {form.gotPlaced === "yes" && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div className="rf-field">
                    <label className="rf-label">Promised Salary (LPA)</label>
                    <input className="rf-input" type="number" value={form.promisedSalary} onChange={(e) => set("promisedSalary", e.target.value)} placeholder="e.g. 5" />
                  </div>
                  <div className="rf-field">
                    <label className="rf-label">Actual Salary Mili (LPA)</label>
                    <input className="rf-input" type="number" value={form.actualSalary} onChange={(e) => set("actualSalary", e.target.value)} placeholder="e.g. 2.5" />
                  </div>
                </div>
              )}
            </>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <>
              <StarPicker value={form.overallRating} onChange={(v) => set("overallRating", v)} label="Overall Rating *" />
              <StarPicker value={form.teachingQuality} onChange={(v) => set("teachingQuality", v)} label="Teaching Quality" />
              <StarPicker value={form.placementSupport} onChange={(v) => set("placementSupport", v)} label="Placement Support" />
              <StarPicker value={form.valueForMoney} onChange={(v) => set("valueForMoney", v)} label="Value for Money" />

              <div className="rf-field" style={{ marginTop: "8px" }}>
                <label className="rf-label">🚩 Kya issues the? (Select all that apply)</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "4px" }}>
                  {FLAG_OPTIONS.map((flag) => (
                    <span
                      key={flag}
                      className={`rf-flag-chip ${form.flags.includes(flag) ? "active" : ""}`}
                      onClick={() => toggleFlag(flag)}
                    >
                      {flag}
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <>
              <div className="rf-field">
                <label className="rf-label">Apna Poora Experience Likho *</label>
                <textarea
                  className="rf-textarea"
                  value={form.review}
                  onChange={(e) => set("review", e.target.value)}
                  placeholder="Kya accha tha, kya bura tha, kya promise kiya aur kya mila... Dusre students ki madad karo. (min. 50 characters)"
                  rows={5}
                />
                <div style={{ fontSize: "11px", color: "#4b5563", marginTop: "4px", textAlign: "right" }}>
                  {form.review.length} characters
                </div>
              </div>

              <div style={{ background: "rgba(234,179,8,0.06)", border: "1px solid rgba(234,179,8,0.15)", borderRadius: "10px", padding: "14px 16px" }}>
                <p style={{ fontSize: "12px", color: "#fcd34d", lineHeight: "1.6" }}>
                  🔒 <strong>Tumhara review 100% anonymous hai.</strong> Koi bhi tumhara naam nahi janega. Sirf sach likho — dusre students ki zindagi badal sakte ho tum.
                </p>
              </div>
            </>
          )}

          {/* Navigation */}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "24px" }}>
            {step > 1 ? (
              <button className="rf-step-btn" onClick={() => setStep(step - 1)}
                style={{ background: "rgba(255,255,255,0.05)", color: "#9ca3af" }}>
                ← Back
              </button>
            ) : <div />}

            {step < 3 ? (
              <button className="rf-step-btn" onClick={() => setStep(step + 1)}
                style={{ background: "#ef4444", color: "#fff" }}>
                Next →
              </button>
            ) : (
              <button className="rf-step-btn" onClick={handleSubmit} disabled={loading}
                style={{ background: loading ? "#374151" : "#ef4444", color: "#fff" }}>
                {loading ? "Submitting..." : "Submit Review 🙏"}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

const styles = {
  formCard: {
    background: "#0f0f17",
    border: "1.5px solid rgba(255,255,255,0.07)",
    borderRadius: "20px",
    overflow: "hidden",
    maxWidth: "780px",
    margin: "0 auto 48px",
    fontFamily: "'Outfit', sans-serif",
  },
  formHeader: {
    padding: "28px 32px 20px",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    background: "rgba(239,68,68,0.03)",
  },
  formTitle: {
    fontFamily: "'Syne', sans-serif",
    fontSize: "22px",
    fontWeight: "800",
    color: "#f9fafb",
    marginBottom: "6px",
  },
  formSub: {
    fontSize: "14px",
    color: "#6b7280",
    fontWeight: "300",
  },
  formBody: {
    padding: "28px 32px",
  },
  successBox: {
    background: "rgba(34,197,94,0.05)",
    border: "1.5px solid rgba(34,197,94,0.15)",
    borderRadius: "20px",
    padding: "48px 32px",
    textAlign: "center",
    maxWidth: "780px",
    margin: "0 auto 48px",
    fontFamily: "'Outfit', sans-serif",
  },
};