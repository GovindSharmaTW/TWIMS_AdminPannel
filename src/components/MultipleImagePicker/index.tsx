import React, { useState, useEffect } from 'react';
import { handleUpload } from '../../firebase';
import styles from './styles.module.css'

const MultipleImagePicker = ({ onPickedImageChanges = () => { }, resetSelectedImages }) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [images, setImages] = useState([]);


  useEffect(() => {
    return () => {
      selectedImages.forEach(image => URL.revokeObjectURL(image));
    };
  }, [selectedImages]);

  useEffect(() => {
    setSelectedImages([]);
    onPickedImageChanges([]);
  }, [resetSelectedImages])

  const handleImageChange = async (event) => {
    const files = Array.from(event.target.files);

    setImages(files);
    onPickedImageChanges(files);

    const images = files.map(file => URL.createObjectURL(file));
    setSelectedImages(images);
  };

  const removeImage = (index) => {
    URL.revokeObjectURL(selectedImages[index]);
    const newImages = selectedImages.filter((_, i) => i !== index);
    const filteredImages = images.filter((_, i) => i !== index);

    setSelectedImages(newImages);
    setImages(filteredImages);
    onPickedImageChanges(filteredImages);
  };

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
    </div>
  );
};

export default MultipleImagePicker;
