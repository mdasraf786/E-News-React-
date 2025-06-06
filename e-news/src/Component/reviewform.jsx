import { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import "./ReviewForm.css";

const ReviewFormPage = ({ reviewToEdit }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [review, setReview] = useState("");
  const [name, setName] = useState("");
  const [profession, setProfession] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!user) {
      setMessage("⚠️ You must be logged in to submit a review.");
    } else {
      setName(user.first_name || user.name);
      if (reviewToEdit) {
        setReview(reviewToEdit.review);
        setProfession(reviewToEdit.profession);
      }
    }
  }, [user, reviewToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!review || !name || !profession) {
      setMessage("❌ All fields except image are required.");
      return;
    }

    const formData = new FormData();
    formData.append("review", review);
    formData.append("name", name);
    formData.append("profession", profession);
    formData.append("user_id", user?.id);
    formData.append("email", user?.email);

    if (image) {
      formData.append("image", image);
    }

    try {
      const res = await fetch(
        reviewToEdit
          ? `http://localhost:5000/api/reviews/${reviewToEdit.id}`
          : "http://localhost:5000/api/reviews",
        {
          method: reviewToEdit ? "PUT" : "POST",
          body: formData,
        }
      );

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Review submitted successfully!");
        setReview("");
        setProfession("");
        setImage(null);
        if (!reviewToEdit) {
          navigate("/");
        }
      } else {
        setMessage("❌ Failed to submit review: " + data.message);
      }
    } catch (err) {
      setMessage("❌ Error: " + err.message);
    }
  };

  return (
    <div className="form-review-page-container">
      <h2>
        {reviewToEdit ? "Update Your" : "Share Your"}{" "}
        <span className="highlight">Review</span>
      </h2>
      {message && <p className="form-message">{message}</p>}

      {!user ? (
        <p className="warning">Please log in to submit a review.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>Your Review</label>
          <textarea
            className="review-textarea"
            placeholder="Write your review here..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
          />

          <div className="input-group">
            <div className="input-field name-field">
              <label>Your Name</label>
              <input
                className="name-input"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                readOnly
              />
            </div>

            <div className="input-field profession-field">
              <label>Your Profession</label>
              <input
                className="profession-input"
                type="text"
                placeholder="Enter your profession"
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
                required
              />
            </div>

            <div className="input-field file-field">
              <label>Upload Your Picture</label>
              <input
                className="file-input"
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
          </div>

          <button className="submit-button" type="submit">
            {reviewToEdit ? "Update Review" : "Submit Review"}
          </button>
        </form>
      )}
    </div>
  );
};

export default ReviewFormPage;
