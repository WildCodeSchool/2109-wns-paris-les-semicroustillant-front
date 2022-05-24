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
      projectId
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
      projectId
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

const GET_USERS = gql`
  query AllTicketsUsers {
    allUsers {
      _id
      firstname
      lastname
    }
  }
`;
export { GET_TICKETS, ADD_TICKET, DELETE_TICKET, GET_PROJECTS, GET_USERS };
