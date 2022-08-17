/* eslint-disable no-console */
import React from 'react';

import TitleBar from '../../assets/custom-components/TitleBar';
import CustomFilterCheckBox from '../../assets/custom-components/CustomFilterCheckBox';

function ProjectList(): JSX.Element {
  return (
    <div style={{ margin: '2rem 3rem 0 3rem' }}>
      <TitleBar title="Projects" onClickRigthBtn={() => console.log('click click')} />
      <div>
        <CustomFilterCheckBox
          label="Assigned to me"
          onClick={() => console.log('click')}
        />
      </div>
    </div>
  );
}

export default ProjectList;
