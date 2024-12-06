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
const new_product = {
  allergen1: true,
  allergen2: false,
  allergen3: true,
  allergen4: false,
  allergen5: true,
  allergen6: true,
  allergen7: false,
  allergen8: false,
};

// Allergen information
const allergens = [
  { name: 'Peanuts', image: pregnancy, key: 'allergen1' },
  { name: 'Milk', image: milk, key: 'allergen2' },
  { name: 'Eggs', image: egg, key: 'allergen3' },
  { name: 'Peanut', image: peanut, key: 'allergen4' },
  { name: 'Gluten Free', image: glutenfree, key: 'allergen5' },
  { name: 'Safe for Diabetic', image: sugar, key: 'allergen6' },
  { name: 'Non-Veg', image: nonveg, key: 'allergen7' },
  { name: 'Tree Nuts', image: Treenut, key: 'allergen8' },
];


function Allergen() {
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
              {new_product[allergen.key] ? (
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
  