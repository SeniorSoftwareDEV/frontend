import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {Typography} from '@mui/material';

export default function SelectComponent(props) {
  const [item, setItem] = React.useState(props.items[0]);
  const handleChange = (event) => {
    setItem(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ minWidth: 140 }}>
        <Typography color="white" padding="5px">{props.helper}</Typography>
        <Select value={item} onChange={handleChange} sx={{ '& .MuiSelect-icon': { color: 'white' }, color: 'white', }}>
            {props.items.map((item, index) => (
                <MenuItem value={item} key = {index}>{item}</MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  );
}