import React from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

import Header from '../components/Header';
import Filters from '../components/Filters';
import Project from '../components/Project';
import ProjectsFooter from '../components/ProjectsFooter';

const ProjectsContainer = (): JSX.Element => (
  <div
    style={{
      height: '70.55vw',
      margin: '0vw 4vw',
      padding: '2%',
    }}
  >
    <Header title="PROJECTS" />
    <Filters />
    <div
      style={{
        display: 'flex',
        height: '100%',
        flexDirection: 'column',
      }}
    >
      <Project />
      <Project />
      <ProjectsFooter />
    </div>
  </div>
);

export default ProjectsContainer;
