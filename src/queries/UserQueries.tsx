import { gql } from '@apollo/client';

const GET_ALL_USERS = gql`
  query AllTicketsUsers {
    allUsers {
      _id
      firstname
      lastname
    }
  }
`;

const GET_ONE_USER = gql`
  query GetOneUser($userId: String!) {
    getOneUser(userId: $userId) {
      _id
      firstname
      lastname
      email
      position
      role
    }
  }
`;

const DELETE_USER = gql`
  mutation DeleteUser($userId: String!) {
    deleteUser(UserId: $userId)
  }
`;

export {
  GET_ALL_USERS,
  GET_ONE_USER,
  DELETE_USER,
}
