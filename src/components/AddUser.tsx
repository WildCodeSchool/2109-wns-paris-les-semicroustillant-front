import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { getUsers } from '../schemaTypes';

const AllUsers = (): JSX.Element => {
  // const ADD_USER = gql`
  //     mutation ($userInput: UserInput!) getUsers {
  //       addUser (userInput: $userInput) {
  //     _id
  //     firstname
  //     lastname
  //     email
  //     hash
  //     role
  //     position
  //         }
  //     }
  // `;

  //   const { loading, data } = useQuery<addtUsers>(ADD_USER);

  //   console.log('data : ', data);

  console.log('hello');
  return <div>here{}</div>;
};

export default AllUsers;
