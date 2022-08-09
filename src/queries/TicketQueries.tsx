import { gql } from '@apollo/client';

const GET_ALL_TICKETS = gql`
  query getAllTickets {
    allTickets {
      _id
      created_by
      subject
      status
      deadline
      description
      project_id {
        _id
      }
      initial_time_estimated
      total_time_spent
      advancement
      users {
        _id
      }
    }
  }
`;

const ADD_TICKET = gql`
  mutation TicketMutation($ticketInput: TicketInput!) {
    addTicket(ticketInput: $ticketInput) {
      created_by
      subject
      status
      deadline
      description
      initial_time_estimated
      total_time_spent
      project_id {
        _id
      }
      users {
        _id
      }
    }
  }
`;

const UPDATE_TICKET = gql`
  mutation UpdateTicket($ticketInputUpdate: TicketInputUpdate!) {
    updateTicket(ticketInputUpdate: $ticketInputUpdate) {
      _id
      created_by
      subject
      status
      deadline
      description
      initial_time_estimated
      total_time_spent
      advancement
      project_id {
        _id
      }
      users {
        _id
      }
    }
  }
`;

const DELETE_TICKET = gql`
  mutation DeleteTicket($deleteTicketId: String!) {
    deleteTicket(id: $deleteTicketId)
  }
`;

export { GET_ALL_TICKETS, ADD_TICKET, UPDATE_TICKET, DELETE_TICKET };
