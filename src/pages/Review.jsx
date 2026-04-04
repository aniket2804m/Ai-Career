import React, { useState, useEffect } from "react";
import axios from "axios";
import "./../../public/course.css";
import API_BASE_URL from '../src/config/api.js';

const Review = ({ courseId }) => {

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);

  useEffect(() => {

      axios.get(`${API_BASE_URL}/api/reviews/${courseId}`)
      .then(res => setReviews(res.data));
    }, [courseId]);

  const submitReview = async () => {

    try {

      const res = await axios.post(
        `${API_BASE_URL}/api/reviews/creates`,
        {
          courseId,
          userName: "Author",
          rating,
          comment
        }
      );

      console.log(res.data);
      alert("Review Created Successfully");

    } catch (err) {
      console.log("Created review", err);
    }
  };

  return (
   <div className="review-container">

  {/* Review Form */}
  <h3 className="review-title">Rate this Course</h3>

  <div className="rating-field">
    <label>Rating</label>

    <select
      className="rating-select"
      onChange={(e) => setRating(e.target.value)}
    >
      <option value="">Select Rating</option>
      <option value="1">1 ⭐</option>
      <option value="2">2 ⭐</option>
      <option value="3">3 ⭐</option>
      <option value="4">4 ⭐</option>
      <option value="5">5 ⭐</option>
    </select>
  </div>

  <div className="comment-field">
    <label>Your Review</label>

    <textarea
      className="review-textarea"
      placeholder="Write your comment..."
      onChange={(e) => setComment(e.target.value)}
    />
  </div>

  <button className="review-btn" onClick={submitReview}>
    Submit Review
  </button>


  {/* All Reviews */}
  <div className="review-list">

    <h3 className="review-title">All Reviews</h3>

    {reviews.map((review) => (

      <div key={review._id} className="review-card">

         <p className="review-user">
          — {review.userName}
        </p>

        <p className="review-rating">
          {"⭐".repeat(review.rating)}
        </p>

        <p className="review-comment">
          {review.comment}
        </p>

       

      </div>

    ))}

  </div>

</div>
  );
};

export default Review;