import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';

const CustomLoginButton = styled(Button)({
  background: 'var(--primary)',
  border: 'none',
  padding: '20px',
  borderRadius: '10px',
  width: '85%',
  color: 'white',
  fontSize: '18px',
  fontWeight: 'bold',
  marginTop: '30px',
  marginBottom: '30px',
  '&:hover': {
    backgroundColor: 'var(--primary-hover)',
    borderColor: 'var(--primary-hover)',
    boxShadow: 'none',
  },
});

export default CustomLoginButton;