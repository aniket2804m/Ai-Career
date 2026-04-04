import React, { useState } from "react";
import axios from "axios";
import API_BASE_URL from '../config/api.js';

const EditListing = ({ item, setListings }) => {

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: item.title,
    description: item.description,
    price: item.price,
    location: item.location,
    amenities: item.amenities,
  });

  // ✅ New states for images
  const [imageFiles, setImageFiles] = useState([]);
  const [previews, setPreviews] = useState(
    item.images?.map(img => img.url) || [] // Existing images dikhao
  );

  // ✅ File select hone par
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);

    // Naye previews banao
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setPreviews(newPreviews);
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");

      // ✅ FormData use karo
      const formData = new FormData();
      formData.append("title", editData.title);
      formData.append("description", editData.description);
      formData.append("price", editData.price);
      formData.append("location", editData.location);
      formData.append("amenities", editData.amenities);

      // ✅ Nayi images aayi hain toh append karo
      imageFiles.forEach(file => {
        formData.append("images", file);
      });

      const res = await axios.put(
        `${API_BASE_URL}/api/listings/${item._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            // ⚠️ Content-Type mat likho
          },
        }
      );

      // UI update
      setListings((prev) =>
        prev.map((listing) =>
          listing._id === item._id ? res.data.listing : listing
        )
      );

      setIsEditing(false);
    } catch (err) {
      console.log(err);
    }
  };

  if (!isEditing) {
    return <button onClick={() => setIsEditing(true)}>Edit</button>;
  }

  return (
    <div>
      <input
        value={editData.title}
        onChange={(e) => setEditData({ ...editData, title: e.target.value })}
        placeholder="Title"
      />

      <input
        value={editData.description}
        onChange={(e) => setEditData({ ...editData, description: e.target.value })}
        placeholder="Description"
      />

      <input
        value={editData.price}
        onChange={(e) => setEditData({ ...editData, price: e.target.value })}
        placeholder="Price"
        type="number"
      />

      <input
        value={editData.location}
        onChange={(e) => setEditData({ ...editData, location: e.target.value })}
        placeholder="Location"
      />

      <input
        value={editData.amenities}
        onChange={(e) => setEditData({ ...editData, amenities: e.target.value })}
        placeholder="Amenities"
      />

      {/* ✅ images ka text input hataya, file input lagaya */}
      <input
        type="file"
        accept="image/*"
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

      <button onClick={handleUpdate}>Save</button>
      <button onClick={() => setIsEditing(false)}>Cancel</button>
    </div>
  );
};

export default EditListing;