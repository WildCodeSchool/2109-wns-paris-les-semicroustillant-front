import { gql } from '@apollo/client';

const GET_TICKETS = gql`
  query getAllTickets {
    allTickets {
      _id
      subject
      status
      deadline
      description
      initial_time_estimated
      total_time_spent
      advancement
      project_id
      users
    }
  }
`;

const ADD_TICKET = gql`
  mutation TicketMutation($ticketInput: TicketInput!) {
    addTicket(ticketInput: $ticketInput) {
      subject
      status
      deadline
      description
      initial_time_estimated
      total_time_spent
      project_id
      users
    }
  }
`;

const DELETE_TICKET = gql`
  mutation DeleteTicket($deleteTicketId: String!) {
    deleteTicket(id: $deleteTicketId)
  }
`;

const GET_PROJECTS = gql`
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

const GET_USERS = gql`
  query AllTicketsUsers {
    allUsers {
      _id
      firstname
      lastname
    }
  }
`;
export {
  GET_TICKETS,
  ADD_TICKET,
  DELETE_TICKET,
  GET_PROJECTS,
  GET_PROJECT,
  GET_USERS,
};
