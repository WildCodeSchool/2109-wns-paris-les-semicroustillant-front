import { gql } from '@apollo/client';

const GET_ONE_USER_BY_ID = gql`
query GetOneUser($userId: String!) {
  getOneUser(userId: $userId) {
    _id
    firstname
    role
    position
  }
}
`;

export {
  // eslint-disable-next-line import/prefer-default-export
  GET_ONE_USER_BY_ID,
};
