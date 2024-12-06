import React, { useState, useEffect } from 'react';
import '../Style/Loader.css'; // Make sure to import your styles

const Loader = () => {
  const [loadingMessage, setLoadingMessage] = useState('Results on the way...');

  useEffect(() => {
    let timer;

    // Change the loading message after 10 seconds
    if (loadingMessage === 'Results on the way...') {
      timer = setTimeout(() => setLoadingMessage('Please wait...'), 5000); // Change after 5 seconds
    } else if (loadingMessage === 'Please wait...') {
      timer = setTimeout(() => setLoadingMessage('Few more minutes...'), 5000); // Change after 5 seconds
    } else if (loadingMessage === 'Few more minutes...') {
      timer = setTimeout(() => setLoadingMessage('Almost there...'), 5000); // Change after 5 seconds
    }

    // Cleanup timer when the component unmounts or the message changes
    return () => clearTimeout(timer);
  }, [loadingMessage]);

  return (
    <div className="loader-overlay">
      <div className="loader-container">
        <div className="dot-loader">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
        {/* <div className="loading-text">Loading...</div> */}
        <div className="loading-message loading-text">{loadingMessage}</div>
      </div>
    </div>
  );
};

export default Loader;
