import React from 'react';
import { AiOutlineClose } from 'react-icons/ai'; // Red Cross Icon
import { AiOutlineCheck } from 'react-icons/ai'; // Green Tick Icon
import '../Style/Allergen.css';
import pregnancy from '../images/allergens/pregnancy.jpeg';
import milk from '../images/allergens/milk.jpeg';
import egg from '../images/allergens/egg.jpeg';
import peanut from '../images/allergens/peanut.jpeg';
import Treenut from '../images/allergens/Treenut.jpeg';
import glutenfree from '../images/allergens/glutenfree.jpeg';
import sugar from '../images/allergens/sugar.jpeg';
import nonveg from '../images/allergens/nonveg.jpeg';

// Sample new_product data (this will come from your backend)

// Allergen information
const allergens = [
  { name: 'Safe for pregnancy', image: pregnancy, key: 'safe_for_pregnancy' },
  { name: 'Contains Dairy', image: milk, key: 'contains_dairy' },
  { name: 'Eggs', image: egg, key: 'contains_eggs' },
  { name: 'Peanut', image: peanut, key: 'contains_peanuts' },
  { name: 'Gluten Free', image: glutenfree, key: 'gluten_free' },
  { name: 'Safe for Diabetic', image: sugar, key: 'safe_for_sugar_patients' },
  { name: 'Non-Veg', image: nonveg, key: 'non_veg' },
  { name: 'Tree Nuts', image: Treenut, key: 'contains_tree_nuts' },
];

function Allergen({ newProduct }) {
  if (!newProduct) {
    // If newProduct is undefined, return null or a loading state (if necessary)
    return <div>Loading...</div>;
  }

  return (
    <div className="allergen-container">
      {allergens.map((allergen) => (
        <div className="allergen-item" key={allergen.key}>
          {/* Background image */}
          <div
            className="allergen-image"
            style={{
              backgroundImage: `url(${allergen.image})`,
            }}
          />
          {/* Text and icon */}
          <div className="allergen-details">
            <span>{allergen.name}</span>
            {newProduct[allergen.key] ? (
              <AiOutlineCheck style={{ color: 'green', fontSize: '20px' }} />
            ) : (
              <AiOutlineClose style={{ color: 'red', fontSize: '20px' }} />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Allergen;
