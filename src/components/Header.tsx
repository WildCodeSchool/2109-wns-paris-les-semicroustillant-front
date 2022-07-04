/* eslint-disable react/react-in-jsx-scope */
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const Header = ({ title }: { title: string }): JSX.Element => {
  const StyledMainBox = styled(Box)(() => ({
    margin: '2% 0%',
    width: '100%',
    height: '5%',
    display: 'flex',
    alignItems: 'center',
  }));

  const StyledUsersBox = styled(Box)(() => ({
    verticalAlign: 'center',
    textAlign: 'center',
    margin: 'auto',
    padding: '0.5rem 3rem',
    border: '2px solid',
    borderColor: 'black',
  }));

  return (
    <StyledMainBox>
      <ArrowBackIcon fontSize="large" />
      <StyledUsersBox>{title}</StyledUsersBox>
    </StyledMainBox>
  );
};
export default Header;
