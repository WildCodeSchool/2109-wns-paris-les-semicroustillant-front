import { gql } from '@apollo/client';

const LOGIN = gql`
query login($email: String!, $password: String!) {
  login(email: $email, password: $password)
}
`;

const CHECK_USER_TOKEN = gql`
  query CheckUserToken($token: String!) {
    checkUserToken(token: $token)
  }
`;

export {
  LOGIN,
  CHECK_USER_TOKEN,
}