import React from 'react';
import Box from '@mui/material/Box';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import { styled } from '@mui/material/styles';

const ProjectsFooter = (): JSX.Element => {
  const pageNumber = 1;

  const StyledContainer = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  }));

  const StyledBoxPagination = styled(Box)(() => ({
    justifyContent: 'center',
    alignItems: 'center',
    verticalAlign: 'center',
  }));

  return (
    <StyledContainer>
      <AddCircleOutlineIcon fontSize="large" />
      <StyledBoxPagination>
        <KeyboardArrowLeftIcon fontSize="large" />
        {pageNumber}
        <KeyboardArrowRightIcon fontSize="large" />
      </StyledBoxPagination>
    </StyledContainer>
  );
};

export default ProjectsFooter;
