/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import SearchBar from './SearchBar';
import Filter from './Filter';

const Filters = (): JSX.Element => {
  const StyledFiltersBox = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  }));

  return (
    <StyledFiltersBox>
      <SearchBar />
      <Filter />
    </StyledFiltersBox>
  );
};

export default Filters;
