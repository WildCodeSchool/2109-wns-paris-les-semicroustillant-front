import React, { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { styled } from '@mui/material/styles';

const Filter = (): JSX.Element => {
  const [filter, setFilter] = useState<string | null>('');

  const handleChange = (event: SelectChangeEvent<any>) => {
    setFilter(event.target.value);
  };

  const StyledSelect = styled(Select)({
    width: '20vw',
  });

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small">Filter by</InputLabel>
      <StyledSelect
        labelId="demo-select-small"
        id="demo-select-small"
        value={filter}
        label="Filter by"
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value="Done">Status Done</MenuItem>
        <MenuItem value="Pending">Status Pending</MenuItem>
        <MenuItem value="In Progress">Status In Progress</MenuItem>
        <MenuItem value="Advancement crescent">Advancement Crescent</MenuItem>
        <MenuItem value="Advancement decreasing">
          Advancement decreasing
        </MenuItem>
        <MenuItem value="Soon deadline">Soon deadline</MenuItem>
        <MenuItem value="Late deadline">Late deadline</MenuItem>
      </StyledSelect>
    </FormControl>
  );
};

export default Filter;
