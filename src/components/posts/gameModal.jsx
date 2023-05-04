import React, { useState } from 'react';
import './gameModal.css';

function GameModal(props) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  }

  const handleClose = () => {
    setIsOpen(false);
  }

  const handleImageClick = (imageName) => {
    // navigate to a different page based on the clicked image name
    window.location.href = `/image/${imageName}`;
  }

  return (
    <>
      <button onClick={handleOpen}>Open Modal</button>
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close" onClick={handleClose}>×</button>
            <h2 className="modal-header">Modal Header</h2>
            <div className="modal-body">
              <div className="image-container">
                <div className="image-div-1" onClick={() => handleImageClick('image1')}>
                  <img src="https://via.placeholder.com/150x150.png?text=Image+1" alt="Image 1" />
                </div>
                <div className="image-div-2" onClick={() => handleImageClick('image2')}>
                  <img src="https://via.placeholder.com/150x150.png?text=Image+2" alt="Image 2" />
                </div>
                <div className="image-div-3" onClick={() => handleImageClick('image3')}>
                  <img src="https://via.placeholder.com/150x150.png?text=Image+3" alt="Image 3" />
                </div>
                <div className="image-div-4" onClick={() => handleImageClick('image4')}>
                  <img src="https://via.placeholder.com/150x150.png?text=Image+4" alt="Image 4" />
                </div>
                <div className="image-div-5" onClick={() => handleImageClick('image5')}>
                  <img src="https://via.placeholder.com/150x150.png?text=Image+5" alt="Image 5" />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button onClick={handleClose}>Close</button>
              <button>Submit</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default GameModal;
