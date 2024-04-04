// Test.js

import React, { useState, useRef } from "react";

const Test = ({ setModalOpen, setSelectedImage, selectedImage , generateVariations}) => {
  const [error, setError] = useState(null);
  const ref = useRef(null)
  console.log('selected Image', selectedImage);

  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage(null);
  };

  const checkSize = ()=> {
    if (ref.current.naturalWidth === 256 && ref.current.naturalHeight === 256){
      generateVariations()
    }else{
        setError('Error: choose 256 x 256 image')
    }
  }

  return (
    <div className="modal">
      <div onClick={closeModal}>✖</div>
      <div className="img-container">
        {selectedImage && (
          <img ref = {ref}src={URL.createObjectURL(selectedImage)} alt="uploaded image"/>
        )}
      </div>
      <p>{error || "Image must be 256 x 256"}</p>
      {! error && <button onClick={checkSize}>Generate</button>}
      {error && <button onClick={closeModal}> try again</button> }
    </div>
  );
};

export default Test;
