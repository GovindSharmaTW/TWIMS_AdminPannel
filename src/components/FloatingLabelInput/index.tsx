import React, { useState } from 'react';
import './style.css'

const FloatingLabelInput = (props) => {
  const {label, onChange} = props;
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
    onChange(event.target.value)
  };

  return (
    <div className="input-container">
      <input
        type="text"
        id="item"
        value={value}
        onChange={handleChange}
        className={`inputStyle ${value && 'not-empty'}`}
      />
      <label htmlFor="item" className="label">
        {label}
      </label>
    </div>
  );
};

export default FloatingLabelInput;
