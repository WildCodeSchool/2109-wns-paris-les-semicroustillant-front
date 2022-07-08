import React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const Project = () => {
  const StyledProjectBox = styled(Box)(() => ({
    backgroundColor: 'blue',
    margin: '3%',
    padding: '0 5%',
    borderRadius: '3%',
    display: 'flex',
    width: '100%',
    height: '20%',
    alignItems: 'center',
    justifyContent: 'space-between',
  }));
  return <StyledProjectBox>blue</StyledProjectBox>;
};

export default Project;
