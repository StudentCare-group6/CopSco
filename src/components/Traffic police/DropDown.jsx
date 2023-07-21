import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function DropDown(props) {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label">Division</InputLabel>
      <Select
        className = 'block appearance-none'
        sx = {{width:300}}
        id="demo-select-small"
        value={age}
        label="Age"
        onChange={handleChange}
      >
        {props.valuesArr.map((value) => (
            <MenuItem key={value} value={value}>{value}</MenuItem>
            ))}
      </Select>
    </FormControl>
  );
}