import { gql } from '@apollo/client';

const GET_ALL_USERS = gql`
  query GetAllUsers {
    allUsers {
      _id
      firstname
      lastname
    }
  }
`;

const GET_ALL_USERS_EMAIL = gql`
query getAllUsersEmail {
  allUsers {
    email
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

const ADD_ONE_USER = gql`
    mutation AddOneUser($userInput: UserInput!) {
      addUser(userInput: $userInput) {
        _id
        firstname
        lastname
        email
        role
        position
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
  GET_ALL_USERS_EMAIL,
  GET_ONE_USER,
  ADD_ONE_USER,
  DELETE_USER,
}
