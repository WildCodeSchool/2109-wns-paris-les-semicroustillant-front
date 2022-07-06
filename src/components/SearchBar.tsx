/* eslint-disable react/jsx-props-no-spreading */
import React, { SyntheticEvent, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { styled } from '@mui/material/styles';

const SearchBar = () => {
  const [ProjectsArray, setProjectsArray] = useState<string[]>([
    'project 1',
    'doject 2',
  ]);

  const defaultProps = {
    options: ProjectsArray,
    getOptionLabel: (option: string) => option,
  };

  const [value, setValue] = useState<string | null>(null);

  const StyledTextField = styled(TextField)({
    width: '25vw',
  });

  return (
    <Autocomplete
      {...defaultProps}
      id="controlled-demo"
      value={value}
      onChange={(
        event: SyntheticEvent<Element, Event>,
        newValue: string | null
      ) => {
        setValue(newValue);
      }}
      renderInput={(params) => (
        <StyledTextField
          {...params}
          label="Search project"
          variant="standard"
        />
      )}
    />
  );
};
export default SearchBar;
