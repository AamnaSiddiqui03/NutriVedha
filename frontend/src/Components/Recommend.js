import React from 'react';
import SwiperCard from './SwiperCard';

const Recommend = ({ recommendations }) => {
  return (
    <div className="recommend-container">
      <h2>Recommended Products</h2>
      <ul>
        <SwiperCard recommend ={recommendations} />
      </ul>
    </div>
  );
};

export default Recommend;
