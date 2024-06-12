import React, { useState, useEffect } from 'react';
import { handleUpload } from '../../firebase';
import styles from './styles.module.css'

const MultipleImagePicker = () => {
  const [selectedImages, setSelectedImages] = useState([]);

  useEffect(() => {
    return () => {
      selectedImages.forEach(image => URL.revokeObjectURL(image));
    };
  }, [selectedImages]);

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const images = files.map(file => URL.createObjectURL(file));
    setSelectedImages(images);
  };

  const removeImage = (index) => {
    URL.revokeObjectURL(selectedImages[index]);
    const newImages = selectedImages.filter((_, i) => i !== index);
    setSelectedImages(newImages);
  };


  console.log("TT01 image component selectedImages", selectedImages);
  return (
    <div>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageChange}
      />
      <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '10px' }}>
        {selectedImages.map((image, index) => (
          <div key={index} style={{ position: 'relative', margin: '10px' }}>
            <img
              src={image}
              alt={`Selected ${index}`}
              style={{ width: '100px', height: '100px', objectFit: 'cover' }}
            />
            <button
              onClick={() => removeImage(index)}
              style={{
                position: 'absolute',
                top: '5px',
                right: '5px',
                background: 'red',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer'
              }}
            >
              x
            </button>
            <div  >
            </div>
          </div>
        ))}

      </div>
      
      <div className={styles.saveButtonContainer}>
        <button className={styles.saveButton} onClick={() => handleUpload(selectedImages[0])}> upload image</button>
      </div>
    </div>
  );
};

export default MultipleImagePicker;
