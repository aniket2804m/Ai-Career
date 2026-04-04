import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from '../src/config/api.js';

const API = `${API_BASE_URL}/api/quiz`;

// ── Timer Component ───────────────────────────────────────
const Timer = ({ seconds, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    if (timeLeft <= 0) { onTimeUp(); return; }
    const t = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, onTimeUp]);

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const pct = (timeLeft / seconds) * 100;
  const isWarning = timeLeft <= 60;

  return (
    <div style={{
      background: isWarning ? "#fef2f2" : "#f0fdf4",
      border: `2px solid ${isWarning ? "#ef4444" : "#22c55e"}`,
      borderRadius: "12px", padding: "12px 20px",
      display: "flex", alignItems: "center", gap: "12px",
    }}>
      <span style={{ fontSize: "22px" }}>{isWarning ? "⚠️" : "⏱️"}</span>
      <div>
        <div style={{ fontSize: "22px", fontWeight: "800", color: isWarning ? "#ef4444" : "#16a34a", fontFamily: "monospace" }}>
          {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
        </div>
        <div style={{ height: "4px", background: "#e2e8f0", borderRadius: "4px", width: "120px", marginTop: "4px" }}>
          <div style={{
            height: "100%", borderRadius: "4px",
            width: `${pct}%`,
            background: isWarning ? "#ef4444" : "#22c55e",
            transition: "width 1s linear",
          }} />
        </div>
      </div>
    </div>
  );
};

// ── Score Screen ──────────────────────────────────────────
const ScoreScreen = ({ result, onHome }) => (
  <div style={{ maxWidth: "500px", margin: "60px auto", textAlign: "center", fontFamily: "system-ui, sans-serif" }}>
    <div style={{
      background: "#fff", borderRadius: "20px", padding: "40px",
      boxShadow: "0 4px 20px rgba(0,0,0,0.1)", border: "1px solid #e2e8f0",
    }}>
      <div style={{ fontSize: "64px", marginBottom: "16px" }}>
        {result.passed ? "🎉" : "😔"}
      </div>
      <h2 style={{ fontSize: "24px", fontWeight: "800", color: "#0f172a", margin: "0 0 8px" }}>
        {result.passed ? "Quiz Passed!" : "Quiz Failed!"}
      </h2>
      <p style={{ color: "#64748b", marginBottom: "28px" }}>
        {result.passed ? "Bahut badhiya! Aapne quiz pass kar liya." : "Koi baat nahi, dobara try karo!"}
      </p>

      {/* Score Circle */}
      <div style={{
        width: "140px", height: "140px", borderRadius: "50%", margin: "0 auto 28px",
        background: result.passed
          ? "linear-gradient(135deg, #22c55e, #16a34a)"
          : "linear-gradient(135deg, #ef4444, #dc2626)",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", color: "#fff",
      }}>
        <div style={{ fontSize: "36px", fontWeight: "900" }}>{result.percentage}%</div>
        <div style={{ fontSize: "13px", opacity: 0.9 }}>Score</div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", marginBottom: "28px" }}>
        {[
          { label: "Correct", value: result.score, color: "#22c55e" },
          { label: "Wrong", value: result.totalQuestions - result.score, color: "#ef4444" },
          { label: "Time", value: `${Math.floor(result.timeTaken / 60)}m ${result.timeTaken % 60}s`, color: "#3b82f6" },
        ].map(s => (
          <div key={s.label} style={{ background: "#f8fafc", borderRadius: "10px", padding: "12px" }}>
            <div style={{ fontSize: "20px", fontWeight: "800", color: s.color }}>{s.value}</div>
            <div style={{ fontSize: "12px", color: "#64748b" }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
        <button onClick={onHome}
          style={{ padding: "11px 24px", background: "#f1f5f9", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600", color: "#374151" }}>
          ← Back
        </button>
      </div>
    </div>
  </div>
);

// ── Main QuizPage ─────────────────────────────────────────
export default function QuizPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Quiz state
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});   // { questionId: selectedAnswer }
  const [started, setStarted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchQuiz = useCallback(async () => {
    try {
      const res = await axios.get(`${API}/course/${courseId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQuiz(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Quiz load nahi ho saka");
    } finally {
      setLoading(false);
    }
  }, [courseId, token]);

  useEffect(() => {
    if (!token) { navigate("/login"); return; }
    fetchQuiz();
  }, [courseId, fetchQuiz, navigate, token]);

  const handleStart = () => {
    setStarted(true);
    setStartTime(Date.now());
  };

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = useCallback(async () => {
    if (submitting) return;
    setSubmitting(true);

    const timeTaken = Math.round((Date.now() - startTime) / 1000);
    const formattedAnswers = Object.entries(answers).map(([questionId, selectedAnswer]) => ({
      questionId,
      selectedAnswer,
    }));

    try {
      const res = await axios.post(`${API}/submit`, {
        quizId: quiz._id,
        answers: formattedAnswers,
        timeTaken,
      }, { headers: { Authorization: `Bearer ${token}` } });

      setResult(res.data);
      setSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.message || "Submit nahi ho saka");
      setSubmitting(false);
    }
  }, [answers, quiz, startTime, submitting, token]);

  const answeredCount = Object.keys(answers).length;
  const totalQ = quiz?.questions?.length || 0;
  const currentQuestion = quiz?.questions?.[currentQ];

  // ── Loading ───────────────────────────────────────────
  if (loading) return (
    <div style={{ textAlign: "center", padding: "80px", fontFamily: "system-ui" }}>
      <div style={{ fontSize: "40px" }}>⏳</div>
      <p style={{ color: "#64748b", marginTop: "12px" }}>Quiz load ho raha hai...</p>
    </div>
  );

  if (error) return (
    <div style={{ textAlign: "center", padding: "80px", fontFamily: "system-ui" }}>
      <div style={{ fontSize: "40px" }}>❌</div>
      <p style={{ color: "#ef4444", marginTop: "12px" }}>{error}</p>
      <button onClick={() => navigate(-1)}
        style={{ marginTop: "16px", padding: "10px 20px", background: "#7c3aed", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer" }}>
        Wapas Jao
      </button>
    </div>
  );

  // ── Score Screen ──────────────────────────────────────
  if (submitted && result) return (
    <ScoreScreen result={result} onHome={() => navigate(-1)} />
  );

  // ── Start Screen ──────────────────────────────────────
  if (!started) return (
    <div style={{ maxWidth: "500px", margin: "60px auto", fontFamily: "system-ui, sans-serif", padding: "0 16px" }}>
      <div style={{ background: "#fff", borderRadius: "20px", padding: "40px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", border: "1px solid #e2e8f0", textAlign: "center" }}>
        <div style={{ fontSize: "56px", marginBottom: "16px" }}>📝</div>
        <h1 style={{ fontSize: "22px", fontWeight: "800", color: "#0f172a", margin: "0 0 8px" }}>{quiz.title}</h1>
        <p style={{ color: "#64748b", marginBottom: "28px" }}>Quiz shuru karne se pehle ye padho</p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "28px" }}>
          {[
            { icon: "❓", label: "Questions", value: totalQ },
            { icon: "⏱️", label: "Time", value: `${quiz.duration} min` },
            { icon: "✅", label: "Passing Score", value: `${quiz.passingScore}%` },
            { icon: "📊", label: "Type", value: "MCQ + T/F" },
          ].map(s => (
            <div key={s.label} style={{ background: "#f8fafc", borderRadius: "10px", padding: "14px" }}>
              <div style={{ fontSize: "22px" }}>{s.icon}</div>
              <div style={{ fontWeight: "700", color: "#0f172a", fontSize: "16px" }}>{s.value}</div>
              <div style={{ fontSize: "12px", color: "#64748b" }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: "10px", padding: "14px", marginBottom: "24px", textAlign: "left" }}>
          <p style={{ margin: 0, fontSize: "13px", color: "#92400e" }}>
            ⚠️ <strong>Note:</strong> Ek baar quiz shuru karne ke baad band nahi ho sakta. Timer chalu rahega.
          </p>
        </div>

        <button onClick={handleStart}
          style={{ width: "100%", padding: "14px", background: "linear-gradient(135deg, #667eea, #764ba2)", color: "#fff", border: "none", borderRadius: "10px", cursor: "pointer", fontWeight: "700", fontSize: "16px" }}>
          🚀 Quiz Shuru Karo
        </button>
        <button onClick={() => navigate(-1)}
          style={{ width: "100%", marginTop: "10px", padding: "12px", background: "#f1f5f9", color: "#374151", border: "none", borderRadius: "10px", cursor: "pointer", fontWeight: "600" }}>
          ← Wapas Jao
        </button>
      </div>
    </div>
  );

  // ── Quiz Screen ───────────────────────────────────────
  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: "24px 16px", fontFamily: "system-ui, sans-serif" }}>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h2 style={{ margin: 0, fontSize: "18px", fontWeight: "700", color: "#0f172a" }}>{quiz.title}</h2>
          <p style={{ margin: 0, fontSize: "13px", color: "#64748b" }}>
            Question {currentQ + 1} of {totalQ} • {answeredCount} answered
          </p>
        </div>
        <Timer seconds={quiz.duration * 60} onTimeUp={handleSubmit} />
      </div>

      {/* Progress Bar */}
      <div style={{ background: "#e2e8f0", borderRadius: "8px", height: "8px", marginBottom: "24px" }}>
        <div style={{
          height: "100%", borderRadius: "8px",
          background: "linear-gradient(90deg, #667eea, #764ba2)",
          width: `${((currentQ + 1) / totalQ) * 100}%`,
          transition: "width 0.3s",
        }} />
      </div>

      {/* Question Card */}
      <div style={{ background: "#fff", borderRadius: "16px", padding: "28px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", border: "1px solid #e2e8f0", marginBottom: "20px" }}>

        {/* Question Badge */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
          <span style={{
            background: currentQuestion.type === "mcq" ? "#eff6ff" : "#f0fdf4",
            color: currentQuestion.type === "mcq" ? "#3b82f6" : "#16a34a",
            padding: "3px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: "600",
          }}>
            {currentQuestion.type === "mcq" ? "MCQ" : "True / False"}
          </span>
          <span style={{ fontSize: "12px", color: "#94a3b8" }}>Q{currentQ + 1}</span>
        </div>

        {/* Question Text */}
        <h3 style={{ fontSize: "17px", fontWeight: "700", color: "#0f172a", lineHeight: "1.6", marginBottom: "20px" }}>
          {currentQuestion.questionText}
        </h3>

        {/* Options */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {currentQuestion.type === "mcq"
            ? currentQuestion.options.map((option, i) => {
                const isSelected = answers[currentQuestion._id] === option;
                return (
                  <button key={i} onClick={() => handleAnswer(currentQuestion._id, option)}
                    style={{
                      padding: "14px 18px", borderRadius: "10px", textAlign: "left",
                      border: isSelected ? "2px solid #7c3aed" : "2px solid #e2e8f0",
                      background: isSelected ? "#f5f3ff" : "#fff",
                      cursor: "pointer", fontWeight: isSelected ? "700" : "400",
                      color: isSelected ? "#7c3aed" : "#374151",
                      fontSize: "15px", transition: "all 0.15s",
                      display: "flex", alignItems: "center", gap: "12px",
                    }}>
                    <span style={{
                      width: "28px", height: "28px", borderRadius: "50%", flexShrink: 0,
                      background: isSelected ? "#7c3aed" : "#f1f5f9",
                      color: isSelected ? "#fff" : "#64748b",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontWeight: "700", fontSize: "13px",
                    }}>
                      {["A", "B", "C", "D"][i]}
                    </span>
                    {option}
                  </button>
                );
              })
            : ["True", "False"].map(opt => {
                const isSelected = answers[currentQuestion._id] === opt;
                return (
                  <button key={opt} onClick={() => handleAnswer(currentQuestion._id, opt)}
                    style={{
                      padding: "16px 24px", borderRadius: "10px",
                      border: isSelected ? "2px solid #7c3aed" : "2px solid #e2e8f0",
                      background: isSelected ? "#f5f3ff" : "#fff",
                      cursor: "pointer", fontWeight: "700", fontSize: "16px",
                      color: isSelected ? "#7c3aed" : "#374151", transition: "all 0.15s",
                      display: "flex", alignItems: "center", gap: "10px",
                    }}>
                    <span>{opt === "True" ? "✅" : "❌"}</span> {opt}
                  </button>
                );
              })
          }
        </div>
      </div>

      {/* Navigation */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button onClick={() => setCurrentQ(q => q - 1)} disabled={currentQ === 0}
          style={{ padding: "11px 22px", background: currentQ === 0 ? "#f1f5f9" : "#fff", border: "1px solid #e2e8f0", borderRadius: "8px", cursor: currentQ === 0 ? "not-allowed" : "pointer", fontWeight: "600", color: currentQ === 0 ? "#94a3b8" : "#374151" }}>
          ← Pehla
        </button>

        {/* Question dots */}
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", justifyContent: "center", maxWidth: "300px" }}>
          {quiz.questions.map((q, i) => (
            <button key={i} onClick={() => setCurrentQ(i)}
              style={{
                width: "28px", height: "28px", borderRadius: "50%", border: "none",
                cursor: "pointer", fontSize: "11px", fontWeight: "700",
                background: i === currentQ ? "#7c3aed" : answers[q._id] ? "#22c55e" : "#e2e8f0",
                color: i === currentQ || answers[q._id] ? "#fff" : "#64748b",
              }}>
              {i + 1}
            </button>
          ))}
        </div>

        {currentQ < totalQ - 1 ? (
          <button onClick={() => setCurrentQ(q => q + 1)}
            style={{ padding: "11px 22px", background: "#7c3aed", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600" }}>
            Agla →
          </button>
        ) : (
          <button onClick={handleSubmit} disabled={submitting}
            style={{ padding: "11px 22px", background: answeredCount === totalQ ? "#22c55e" : "#f59e0b", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "700" }}>
            {submitting ? "Submitting..." : `Submit (${answeredCount}/${totalQ})`}
          </button>
        )}
      </div>

    </div>
  );
}