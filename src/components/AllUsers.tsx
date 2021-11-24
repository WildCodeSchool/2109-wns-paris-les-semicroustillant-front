import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { getUsers } from '../schemaTypes';

const AllUsers = (): JSX.Element => {
  const GET_USERS = gql`
    query getUsers {
      allUsers {
        _id
        firstname
        lastname
      }
    }
  `;

  const { loading, data } = useQuery<getUsers>(GET_USERS);

  console.log('data : ', data);

  console.log('hello');
  return <div>here</div>;
};

export default AllUsers;
