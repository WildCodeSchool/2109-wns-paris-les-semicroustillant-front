import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const ProjectCard = (): JSX.Element => {
  const StyledProjectBox = styled(Box)(() => ({
    margin: '3% 0',
    borderWidth: 1,
    borderStyle: 'solid',
    display: 'flex',
    width: '100%',
    minHeight: '10em',
    alignItems: 'center',
    justifyContent: 'space-between',
  }));

  const StyledLeftBox = styled(Box)(() => ({
    padding: '2%',
    display: 'flex',
    width: '70%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledLeftSideLeftBox = styled(Box)(() => ({
    height: '100%',
  }));

  const StyledRightBox = styled(Box)(() => ({
    flexDirection: 'column',
    padding: '2%',
    display: 'flex',
    width: '30%',
    height: '100%',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  }));

  const projectName = 'Project 1';

  const projectDescription =
    'lorem ipsum vcdi u bjni ijhb bh ij bhj k jnbh j nk n knbjnhb jnh dcjnns djsc jdc jcdsn jns bzedhceb hj';

  const status = 'In progress';

  const advancement = '2/15';
  const deadline = '23/02/2022';
  return (
    <StyledProjectBox>
      <StyledLeftBox>
        <StyledLeftSideLeftBox>
          <Box>{projectName}</Box>
          <Box>{projectDescription}</Box>
        </StyledLeftSideLeftBox>
        <Button variant="outlined" color="error" size="small">
          See more
        </Button>
      </StyledLeftBox>
      <StyledRightBox>
        <Box>Status : {status}</Box>
        <Box>Avancement: {advancement}</Box>
        <Box>Deadline: {deadline} </Box>
      </StyledRightBox>
    </StyledProjectBox>
  );
};

export default ProjectCard;
