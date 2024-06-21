import React, { useEffect, useState } from 'react';
import styles from './styles.module.css'

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
    <div className={styles.inputContainer}>
      <input
        className={styles.inputStyle}
        onChange={handleChange}
        placeholder='Enter serial no.'
        value={value}
      />
      <label
        className={styles.labelStyle}
      >
        {label}
      </label>
    </div>
  );
};

export default FloatingLabelInput;
