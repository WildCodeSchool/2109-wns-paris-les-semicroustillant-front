import React from 'react';
import Header from '../components/Header';
import Filters from '../components/Filters';
import Project from '../components/ProjectCard';
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