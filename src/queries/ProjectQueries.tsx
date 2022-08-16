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

const COUNT_PROJECTS_BY_USER_ID = gql`
  query CountProjectsByUserId($countProjectsByUserIdId: String!) {
    countProjectsByUserId(id: $countProjectsByUserIdId)
  }
`;

export { GET_ALL_PROJECTS, GET_PROJECT, COUNT_PROJECTS_BY_USER_ID };
