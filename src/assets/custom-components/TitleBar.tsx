import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import { IComponentTitleBarProps } from '../../types/custom-types';

import colors from '../../styles/globals';

const TitleBar: React.FC<IComponentTitleBarProps> = ({
  title,
  onClickRigthBtn,
  hideRightBtn = false,
}) => {
  const navigate = useNavigate();
  const iconPlus = <FontAwesomeIcon icon={faPlusCircle} />;

  return (
    <div
      style={{
        paddingBottom: '3rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Button
        size="small"
        color="error"
        sx={{
          width: '50px',
          height: '50px',
          borderRadius: '50px',
          minWidth: 'auto',
        }}
        onClick={() => navigate('/')}
      >
        <ChevronLeftIcon
          sx={{
            color: colors.primary,
            fontSize: 65,
            '&:hover': {
              color: 'var(--primary-hover)',
              boxShadow: 'none',
            },
          }}
        />
      </Button>
      <h1 style={{ marginTop: '1rem', color: 'var(--primary)' }}>{title}</h1>
      <Button
        variant="contained"
        color="error"
        sx={{
          width: '50px',
          height: '50px',
          borderRadius: '50px',
          bgcolor: colors.primary,
          minWidth: 'auto',
        }}
        onClick={onClickRigthBtn}
        disabled={hideRightBtn}
      >
        {iconPlus}
      </Button>
    </div>
  );
};

export default TitleBar;
