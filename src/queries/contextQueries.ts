import { gql } from '@apollo/client';

const LOGIN = gql`
  query Query($password: String!, $email: String!) {
    login(password: $password, email: $email)
  }
`;

export default LOGIN;
