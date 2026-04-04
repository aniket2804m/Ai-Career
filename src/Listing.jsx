import React, { useState } from 'react';
import axios from 'axios';
import '../public/style.css';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../src/config/api.js';

const Listing = () => {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [amenities, setAmenities] = useState("");

  // ✅ String se files array mein change kiya
  const [imageFiles, setImageFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  // ✅ File select hone par preview banao
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);

    // Local preview
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setPreviews(newPreviews);
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

      // ✅ JSON ki jagah FormData use karo
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("location", location);
      formData.append("amenities", amenities);

      // ✅ Multiple images append karo
      imageFiles.forEach(file => {
        formData.append("images", file);
      });

      await axios.post(
        `${API_BASE_URL}/api/listings/create`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            // ⚠️ Content-Type mat likho — axios khud set karega
          },
        }
      );

      setSuccess("Listing Created Successfully");
      navigate("/");

    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className='auth-wrapper'>
      <div className='auth-container'>
        <h2>ADD Course</h2>
        {error && <p className='error'>{error}</p>}
        {success && <p className='success'>{success}</p>}

        <input type='text' placeholder='Enter Title' onChange={(e) => setTitle(e.target.value)} />
        <input type='text' placeholder='Enter Description' onChange={(e) => setDescription(e.target.value)} />
        <input type='number' placeholder='Enter Price' onChange={(e) => setPrice(e.target.value)} />
        <input type='text' placeholder='Enter Location' onChange={(e) => setLocation(e.target.value)} />
        <input type='text' placeholder='Enter Amenities' onChange={(e) => setAmenities(e.target.value)} />

        {/* ✅ File Upload Input */}
        <input
          type='file'
          accept='image/*'
          multiple
          onChange={handleImageChange}
        />

        {/* ✅ Image Previews */}
        {previews.length > 0 && (
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '10px' }}>
            {previews.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`preview-${i}`}
                style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }}
              />
            ))}
          </div>
        )}

        <button onClick={handleSubmit}>Create Listing</button>
        <hr />
      </div>
    </div>
  );
};

export default Listing;