import React from 'react';
import Button from '@mui/material/Button';
import '../styles/Homepage.css';
import { useNavigate } from 'react-router-dom';
import colors from '../styles/globals';

export default function Homepage(): JSX.Element {
  const navigate = useNavigate();
  interface IHomepageButton {
    onClick?: () => void;
    label?: string;
  }
  const HomepageButton = ({ onClick, label }: IHomepageButton): JSX.Element => (
    <Button
      variant="contained"
      color="error"
      sx={{
        height: '6rem',
        width: '15rem',
        fontSize: '1.5rem',
        bgcolor: colors.primary,
        margin: '1rem',
      }}
      onClick={onClick}
    >
      {label}
    </Button>
  );
  return (
    <div className="bodyHomepage">
      <div className="buttons">
        <HomepageButton
          onClick={() => navigate('/all-projects')}
          label="Projects"
        />
        <HomepageButton onClick={() => navigate('/all-tasks')} label="Tasks" />
        <HomepageButton onClick={() => navigate('/users')} label="Users" />
      </div>
    </div>
  );
}
