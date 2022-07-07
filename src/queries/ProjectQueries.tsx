import { gql } from '@apollo/client';

const GET_ALL_PROJECTS = gql`
  query GetTicketsProjects {
    getAllProjects {
      _id
      name
    }
  }
`;

const GET_PROJECT = gql`
  query GetOneProject($projectId: String!) {
    getOneProject(projectId: $projectId) {
      _id
      name
    }
  }
`;

export {
  GET_ALL_PROJECTS,
  GET_PROJECT,
}
