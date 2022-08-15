import React from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';
import { pink } from '@mui/material/colors';

import { ComponentCustomFilterChechBoxProps } from '../../types/custom-types';

const CustomFilterCheckBox: React.FC<ComponentCustomFilterChechBoxProps> = ({
  label,
  onClick,
}) => (
    <>
      <FormControlLabel
        label={label}
        sx= {{
          fontSize: '18px',
          fontWeight: 'bold',
        }}
        control={
          <Checkbox
            onClick={onClick}
            sx={{
                color: pink[800],
                '&.Mui-checked': {
                  color: pink[600],
                },
            }}
          />
        } 
      />
    </>
  );

export default CustomFilterCheckBox;
