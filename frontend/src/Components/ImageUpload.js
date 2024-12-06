import React, { useState } from 'react';
import '../ImageUpload.css';
import '../App.css';
import Modal from './Modal'; 
import Loader from './Loader'; // Import the Loader component

const ImageUpload = () => {
  const [images, setImages] = useState({ image1: null, image2: null });
  const [responseData, setResponseData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Track loading state

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setImages({ ...images, [name]: files[0] });
    }
  };

  const handleSubmit = async () => {
    if (!images.image1 || !images.image2) {
      alert('Please upload both images.');
      return;
    }

    const formData = new FormData();
    formData.append('image1', images.image1);
    formData.append('image2', images.image2);

    // Log FormData content for debugging
    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1].name); // Log the file names
    }

    setIsLoading(true); // Start loading state

    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setResponseData(data); // Update state with response data
        setIsModalOpen(true);   // Open modal automatically after response
      } else {
        alert('Error: ' + data.error);
      }
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('An error occurred while uploading the images. Please try again.');
    } finally {
      setIsLoading(false); // Stop loading state once the request is complete
    }
  };

  const handleShowResult = () => {
    setIsModalOpen(true);
  };

  return (
    <div className='image-upload-services'>
      <h1 className="Sub-Heading">Services</h1>
      <div className="image-upload-container">
        <h2 style={{ color: '#5c3c14' }}>Upload Your Images</h2>

        <div className="image-upload-box">
          <label htmlFor="image1" className="upload-label">
            Nutrition Table Image
          </label>
          <input
            type="file"
            id="image1"
            name="image1"
            accept="image/*"
            onChange={handleImageChange}
            className="file-input"
          />
        </div>

        <div className="image-upload-box">
          <label htmlFor="image2" className="upload-label">
            Ingredients Image
          </label>
          <input
            type="file"
            id="image2"
            name="image2"
            accept="image/*"
            onChange={handleImageChange}
            className="file-input"
          />
        </div>

        <button
          onClick={handleSubmit}
          style={{
            backgroundColor: '#3d080d',
            color:'white',
            border: 'none',
            padding: '10px 20px',
            fontSize: '16px',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}
        >
          Upload
        </button>
      </div>

      {isLoading && <Loader />} {/* Display the loader while isLoading is true */}

      {responseData && (
        <>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <button
              onClick={handleShowResult}
              style={{
                backgroundColor: 'lightblue',
                border: 'none',
                padding: '10px 20px',
                fontSize: '16px',
                borderRadius: '5px',
                cursor: 'pointer',
                marginTop: '20px',
              }}
            >
              Show Result
            </button>
          </div>

          <Modal
            isOpen={isModalOpen}
            closeModal={() => setIsModalOpen(false)}
            newProduct={responseData.new_product}
            recommendations={responseData.sorted_recommendations}
          />
        </>
      )}
    </div>
  );
};

export default ImageUpload;
