import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const Header = ({ title }: { title: string }): JSX.Element => {
  const navigate = useNavigate();

  const StyledMainBox = styled(Box)(() => ({
    margin: '2vw 0',
    width: '100%',
    height: '5%',
    display: 'flex',
    alignItems: 'center',
  }));

  const StyledUsersBox = styled(Box)(() => ({
    verticalAlign: 'center',
    textAlign: 'center',
    margin: 'auto',
    padding: '0.5rem',
    border: '2px solid',
    borderColor: 'black',
  }));

  return (
    <StyledMainBox>
      <ArrowBackIcon fontSize="large" onClick={() => navigate('/')} />
      <StyledUsersBox>{title}</StyledUsersBox>
    </StyledMainBox>
  );
};
export default Header;
