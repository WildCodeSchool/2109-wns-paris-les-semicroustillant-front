import React from 'react';
import Header from '../components/Header';
import Filters from '../components/Filters';
import Project from '../components/Project';

const ProjectsContainer = (): JSX.Element => (
<<<<<<< HEAD
  <div style={{ height: '70.55vw', margin: '0vw 4vw' }}>
    <Header title="PROJECTS" />
    <Filters />
    <Project />
    <Project />
=======
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
    </div>
>>>>>>> a742093 (TOFIX(projectComponent): created header + filters, project card tofix border radius)
  </div>
);

export default ProjectsContainer;
