import React from 'react';
import { Button } from '@mui/material';
import { IComponentActionBtnProps } from '../../types/custom-types';

import colors from '../../styles/globals';


const CustomActionButton: React.FC<IComponentActionBtnProps> = ({children, onClick}) => (
  <Button
    size="large"
    variant="contained"
    color="error"
    sx={{
      width: '0.5rem',
      bgcolor: colors.primary,
      minWidth: 'auto',
    }}
    onClick={onClick}
  >
    {children}
  </Button>
);

export default CustomActionButton;
