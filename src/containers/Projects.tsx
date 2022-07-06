import React from 'react';
import Header from '../components/Header';
import Filters from '../components/Filters';
import Project from '../components/Project';

const ProjectsContainer = (): JSX.Element => (
  <div style={{ height: '70.55vw', margin: '0vw 4vw' }}>
    <Header title="PROJECTS" />
    <Filters />
    <Project />
    <Project />
  </div>
);

export default ProjectsContainer;
