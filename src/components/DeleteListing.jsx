import React from 'react'
// import { useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../src/config/api.js';

const DeleteListing = ({item, setListings}) => {

    // const [listings, setListings] = useState([]);

    // Deleteing Function :-
            const handleDelete = async () => {
              try {
                const token = localStorage.getItem("token");
    
                await axios.delete(`${API_BASE_URL}/api/listings/${item._id}`,
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
                );
    
                // Ui Update
                setListings((prev) => 
                    prev.filter((listing) => listing._id !== item._id)
              );
    
              } catch (err) {
                 console.log(err);
              }
            };
  return (
    <div className='delete'>
      <button onClick={handleDelete}>
        Delete
      </button>
    </div>
  )
}

export default DeleteListing
