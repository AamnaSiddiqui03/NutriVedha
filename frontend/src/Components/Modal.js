import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';  // Import the close (X) icon from React Icons
import '../Style/Modal.css';
import Recommend from './Recommend';  // Import the Recommend component
import Allergen from './Allergen';

export const Modal = ({ isOpen, closeModal, newProduct, recommendations }) => {
  const [showRecommendations, setShowRecommendations] = useState(false);

  if (!isOpen) return null; // Prevent modal from rendering if not open

  const handleRecommendClick = () => {
    setShowRecommendations(true); // Show recommendations when button is clicked
  };

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        
        {/* New Product Section */}
        <div className="new-product">
          {/* <h2>New Product: {newProduct.product_name}</h2> */}
          {/* Nutri-Score Color Box */}
          <span className={`nutri-score ${newProduct.nutri_score_category}`}>{newProduct.product}</span>
          <p className="product-type">Product Type: {newProduct.category}</p>
          <p className="product-nutriscore">Nutri-Score Category: {newProduct.nutri_score_category}</p>
        </div>

        {/* Allergen Information */}
        <Allergen />
        
        {/* Button to trigger recommendation view */}
        <button className="recommend-button" onClick={handleRecommendClick}>Recommend</button>

        {/* Show the Recommend component when button is clicked */}
        {showRecommendations && <Recommend recommendations={recommendations} />}

        {/* Close Icon (X) */}
        <AiOutlineClose className="close-icon" onClick={closeModal} />
      </div>
    </div>
  );
};

export default Modal;
