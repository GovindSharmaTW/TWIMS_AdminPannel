import React, { useEffect, useState } from 'react';
import './style.css'

const FloatingLabelInput = (props) => {
  const { label, onChange, reset } = props;
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
    onChange(event.target.value)
  };

  useEffect(() => {
    setValue('');
  }, [reset])

  return (
    <div className='baseInputContainer'>
      <label htmlFor="item" className="label">
        {label}
      </label>

      <div className="input-container">
        <input
          type="text"
          id="item"
          value={value}
          onChange={handleChange}
          className={`inputStyle ${value && 'not-empty'}`}
          placeholder='Enter item serial no.'
        />

      </div>
    </div>
  );
};

export default FloatingLabelInput;
