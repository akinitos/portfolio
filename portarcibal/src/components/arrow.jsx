import React from 'react';
import arrowImage from '../assets/arrow.png'; 

const ArrowComponent = () => {
  return (
    <div className="arrow-container">
      <img 
        src={arrowImage} 
        alt="Arrow pointing to eye" 
        className="animated-arrow"
      />
    </div>
  );
};

export default ArrowComponent;