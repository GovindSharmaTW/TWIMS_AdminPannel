import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function DropDownComponent(props) {

  const { label, optionsData, selectedValue } = props;

  const [value, setValue] = useState<string | null>('Select');
  const [inputValue, setInputValue] = useState('');

  return (
    <div>
      <br />
      <Autocomplete
        value={value}
        onChange={(event: any, newValue: string | null) => {
          setValue(newValue);
          selectedValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="controllable-states-demo"
        options={optionsData}
        sx={{ width: '100%' }}
        renderInput={(params) => <TextField {...params} label={label} />}
      />
    </div>
  );
}