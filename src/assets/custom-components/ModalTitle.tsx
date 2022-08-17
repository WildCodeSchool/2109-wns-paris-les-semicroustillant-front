import React from 'react';

import { IComponentModalTitleBarProps } from '../../types/custom-types';

const ModalTitle: React.FC<IComponentModalTitleBarProps> = ({ title }) => (
    <div
      style={{
        textAlign: 'center',
      }}
    >
      <h2 style={{ marginTop: '1rem', color: 'var(--primary)' }}>{title}</h2>
    </div>
  );

export default ModalTitle;
