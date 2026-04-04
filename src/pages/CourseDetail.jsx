import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import API_BASE_URL from '../src/config/api.js';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700&family=DM+Sans:wght@300;400;500&display=swap');

  :root {
    --bg: #0d0f14;
    --surface: #13161e;
    --surface2: #1a1e2a;
    --border: rgba(255,255,255,0.07);
    --accent: #c9a84c;
    --accent-dim: rgba(201,168,76,0.15);
    --text: #e8e6e1;
    --text-muted: #7a7a8c;
    --success: #4caf79;
    --danger: #e05c5c;
    --radius: 12px;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .cd-wrapper {
    min-height: 100vh;
    background: var(--bg);
    color: var(--text);
    font-family: 'DM Sans', sans-serif;
    padding: 40px 20px 80px;
  }

  .cd-inner {
    max-width: 860px;
    margin: 0 auto;
  }

  /* Back button */
  .cd-back {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: none;
    border: 1px solid var(--border);
    color: var(--text-muted);
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    padding: 8px 16px;
    border-radius: 999px;
    cursor: pointer;
    transition: all 0.2s;
    letter-spacing: 0.03em;
    margin-bottom: 40px;
  }
  .cd-back:hover {
    border-color: var(--accent);
    color: var(--accent);
  }

  /* Hero card */
  .cd-hero {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 44px 48px;
    position: relative;
    overflow: hidden;
    margin-bottom: 28px;
  }
  .cd-hero::before {
    content: '';
    position: absolute;
    top: -60px; right: -60px;
    width: 220px; height: 220px;
    background: radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%);
    pointer-events: none;
  }

  .cd-badge {
    display: inline-block;
    background: var(--accent-dim);
    color: var(--accent);
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 5px 12px;
    border-radius: 999px;
    margin-bottom: 18px;
    border: 1px solid rgba(201,168,76,0.25);
  }

  .cd-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(26px, 4vw, 38px);
    font-weight: 700;
    line-height: 1.2;
    color: #f0ece4;
    margin-bottom: 16px;
  }

  .cd-desc {
    font-size: 15px;
    line-height: 1.75;
    color: var(--text-muted);
    max-width: 620px;
    margin-bottom: 28px;
  }

  .cd-divider {
    height: 1px;
    background: var(--border);
    margin: 24px 0;
  }

  .cd-price-row {
    display: flex;
    align-items: center;
    gap: 24px;
    flex-wrap: wrap;
  }

  .cd-price {
    font-family: 'Playfair Display', serif;
    font-size: 28px;
    font-weight: 700;
    color: var(--accent);
  }

  /* Action buttons */
  .cd-actions {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 24px;
    border-radius: var(--radius);
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    border: none;
    transition: all 0.2s;
    letter-spacing: 0.02em;
  }

  .btn-primary {
    background: var(--accent);
    color: #0d0f14;
  }
  .btn-primary:hover {
    background: #dbb95a;
    transform: translateY(-1px);
    box-shadow: 0 8px 20px rgba(201,168,76,0.25);
  }

  .btn-outline {
    background: transparent;
    color: var(--text);
    border: 1px solid var(--border);
  }
  .btn-outline:hover {
    border-color: var(--accent);
    color: var(--accent);
    background: var(--accent-dim);
  }

  .btn-ghost {
    background: var(--surface2);
    color: var(--text-muted);
    border: 1px solid var(--border);
  }
  .btn-ghost:hover {
    color: var(--text);
    border-color: rgba(255,255,255,0.15);
  }

  /* Reviews Section */
  .cd-section {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 36px 44px;
    margin-bottom: 20px;
  }

  .cd-section-header {
    display: flex;
    align-items: baseline;
    gap: 12px;
    margin-bottom: 28px;
  }

  .cd-section-title {
    font-family: 'Playfair Display', serif;
    font-size: 22px;
    font-weight: 600;
    color: #f0ece4;
  }

  .cd-count {
    font-size: 13px;
    color: var(--text-muted);
    background: var(--surface2);
    padding: 3px 10px;
    border-radius: 999px;
    border: 1px solid var(--border);
  }

  /* Write review */
  .cd-review-form {
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 24px;
    margin-bottom: 28px;
  }

  .cd-review-form-title {
    font-size: 13px;
    font-weight: 500;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 16px;
  }

  .cd-stars {
    display: flex;
    gap: 6px;
    margin-bottom: 14px;
  }

  .cd-star {
    background: none;
    border: none;
    font-size: 22px;
    cursor: pointer;
    transition: transform 0.15s;
    line-height: 1;
    padding: 2px;
    color: #3a3a4a;
  }
  .cd-star.active { color: var(--accent); }
  .cd-star:hover { transform: scale(1.2); }

  .cd-textarea {
    width: 100%;
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 10px;
    color: var(--text);
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    padding: 14px 16px;
    resize: vertical;
    min-height: 90px;
    transition: border-color 0.2s;
    outline: none;
    margin-bottom: 14px;
  }
  .cd-textarea:focus {
    border-color: var(--accent);
  }
  .cd-textarea::placeholder { color: var(--text-muted); }

  /* Alerts */
  .cd-alert {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 11px 16px;
    border-radius: 9px;
    font-size: 13px;
    margin-bottom: 14px;
  }
  .cd-alert.error {
    background: rgba(224,92,92,0.1);
    border: 1px solid rgba(224,92,92,0.25);
    color: #f08080;
  }
  .cd-alert.success {
    background: rgba(76,175,121,0.1);
    border: 1px solid rgba(76,175,121,0.25);
    color: #72d4a0;
  }

  /* Review cards */
  .cd-review-card {
    border-top: 1px solid var(--border);
    padding: 22px 0;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 16px;
    animation: fadeUp 0.3s ease both;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .cd-review-left { flex: 1; }

  .cd-review-stars {
    display: flex;
    gap: 3px;
    margin-bottom: 8px;
  }
  .cd-review-star { font-size: 13px; }
  .cd-review-star.filled { color: var(--accent); }
  .cd-review-star.empty  { color: #2e2e3e; }

  .cd-review-comment {
    font-size: 14px;
    line-height: 1.65;
    color: var(--text-muted);
  }

  .btn-delete {
    background: none;
    border: 1px solid rgba(224,92,92,0.25);
    color: #e05c5c;
    font-family: 'DM Sans', sans-serif;
    font-size: 12px;
    padding: 6px 12px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;
    white-space: nowrap;
  }
  .btn-delete:hover {
    background: rgba(224,92,92,0.1);
  }

  .cd-empty {
    text-align: center;
    color: var(--text-muted);
    font-size: 14px;
    padding: 32px 0 8px;
  }

  /* Loading */
  .cd-loading {
    min-height: 100vh;
    background: var(--bg);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 16px;
    font-family: 'DM Sans', sans-serif;
    color: var(--text-muted);
  }
  .cd-spinner {
    width: 36px; height: 36px;
    border: 2px solid var(--border);
    border-top-color: var(--accent);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }
`;

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [listing, setListing] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);
  const [hasQuiz, setHasQuiz] = useState(false);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const fetchDetail = useCallback(async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/listings/${id}`);
      setListing(res.data);
    } catch {
      setError("Course not found");
    } finally {
      setLoading(false);
    }
  }, [id]);

  const fetchReviews = useCallback(async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/reviews/${id}`);
      setReviews(res.data);
    } catch (err) {
      console.log("Review fetch error:", err);
    }
  }, [id]);

  const checkQuiz = useCallback(async () => {
    try {
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      await axios.get(`${API_BASE_URL}/api/quiz/course/${id}`, { headers });
      setHasQuiz(true);
    } catch {
      setHasQuiz(false);
    }
  }, [id, token]);

  useEffect(() => {
    fetchDetail();
    fetchReviews();
    checkQuiz();
  }, [fetchDetail, fetchReviews, checkQuiz]);

  const submitReview = async () => {
    setError(""); setSuccess("");
    if (!token) { setError("Please login to submit a review"); return; }
    if (!comment.trim()) { setError("Comment cannot be empty"); return; }
    try {
      await axios.post(
        `${API_BASE_URL}/api/reviews/create`,
        { listingId: id, comment, rating },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess("Review submitted successfully!");
      setComment(""); setRating(5);
      fetchReviews();
    } catch (err) {
      setError(err.response?.data?.message || "Error submitting review");
    }
  };

  const deleteReview = async (reviewId) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/reviews/${reviewId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchReviews();
    } catch (err) {
      console.log("Delete review error:", err);
    }
  };

  if (loading)
    return (
      <>
        <style>{styles}</style>
        <div className="cd-loading">
          <div className="cd-spinner" />
          <span>Loading course…</span>
        </div>
      </>
    );

  if (!listing)
    return (
      <>
        <style>{styles}</style>
        <div className="cd-loading">
          <p style={{ fontSize: 18, color: "#f0ece4", marginBottom: 12 }}>Course not found</p>
          <button className="btn btn-outline" onClick={() => navigate("/")}>← Go Home</button>
        </div>
      </>
    );

  return (
    <>
      <style>{styles}</style>
      <div className="cd-wrapper">
        <div className="cd-inner">

          {/* Back */}
          <button className="cd-back" onClick={() => navigate(-1)}>
            ← Back
          </button>

          {/* Hero */}
          <div className="cd-hero">
            <div className="cd-badge">Course</div>
            <h1 className="cd-title">{listing.title}</h1>
            <p className="cd-desc">{listing.description}</p>
            <div className="cd-divider" />
            <div className="cd-price-row">
              <span className="cd-price">₹{listing.price}</span>
              <div className="cd-actions">
                <button className="btn btn-primary">Enroll Now</button>

                {hasQuiz && token && (
                  <button className="btn btn-outline" onClick={() => navigate(`/quiz/${id}`)}>
                    🎯 Start Quiz
                  </button>
                )}

                {hasQuiz && !token && (
                  <button className="btn btn-ghost" onClick={() => navigate("/login")}>
                    Login to Take Quiz
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div className="cd-section">
            <div className="cd-section-header">
              <h2 className="cd-section-title">Reviews</h2>
              <span className="cd-count">{reviews.length}</span>
            </div>

            {/* Write a review */}
            {token && (
              <div className="cd-review-form">
                <p className="cd-review-form-title">Write a Review</p>

                {error && <div className="cd-alert error">⚠ {error}</div>}
                {success && <div className="cd-alert success">✓ {success}</div>}

                {/* Star picker */}
                <div className="cd-stars">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      className={`cd-star ${s <= rating ? "active" : ""}`}
                      onClick={() => setRating(s)}
                    >
                      ★
                    </button>
                  ))}
                </div>

                <textarea
                  className="cd-textarea"
                  placeholder="Share your experience with this course…"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />

                <button className="btn btn-primary" onClick={submitReview}>
                  Submit Review
                </button>
              </div>
            )}

            {/* Review list */}
            {reviews.length === 0 ? (
              <p className="cd-empty">No reviews yet. Be the first to review!</p>
            ) : (
              reviews.map((r) => (
                <div className="cd-review-card" key={r._id}>
                  <div className="cd-review-left">
                    <div className="cd-review-stars">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <span
                          key={s}
                          className={`cd-review-star ${s <= r.rating ? "filled" : "empty"}`}
                        >★</span>
                      ))}
                    </div>
                    <p className="cd-review-comment">{r.comment}</p>
                  </div>
                  {role === "admin" && (
                    <button className="btn-delete" onClick={() => deleteReview(r._id)}>
                      Delete
                    </button>
                  )}
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </>
  );
};

export default CourseDetail;