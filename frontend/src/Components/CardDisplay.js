import React from "react";
import "../Style/Card.css"; // Add your own styling

function CardDisplay(props) {
  // Define the color for each nutri_score_category
  const getNutriScoreColor = (score) => {
    switch (score) {
      case "A":
        return "#4CAF50"; // Green for A
      case "B":
        return "#8BC34A"; // Light Green for B
      case "C":
        return "#FFEB3B"; // Yellow for C
      case "D":
        return "#FF9800"; // Orange for D
      case "E":
        return "#F44336"; // Red for E
      default:
        return "#000"; // Default color if not found
    }
  };

  return (
    <div className="card">
      <h3>{props.product_name}</h3>
      <p><span style={{ color: getNutriScoreColor(props.nutri_score_category) }} ><strong>Product_Type:</strong> {props.category}</span></p>
      <p>
        <strong>nutri_score_category:</strong>
        <span
          style={{ color: getNutriScoreColor(props.nutri_score_category) }}
        >
          {props.nutri_score_category}
        </span>
      </p>
      <p>
        <strong>similarity:</strong> {props.similarity}
      </p>
    </div>
  );
}

export default CardDisplay;
