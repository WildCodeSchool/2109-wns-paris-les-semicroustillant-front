import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { DeleteUser } from '../schemaTypes';

const DeleteUserX = (): JSX.Element => {
  const [deleteId, setDeleteId] = useState('');

  let input: any;

  const DELETE_USER = gql`
    mutation DeleteUser($deleteUserId: String!) {
      deleteUser(id: $deleteUserId)
    }
  `;
  const [deleteUserFunction, { data, loading, error }] =
    useMutation<DeleteUser>(DELETE_USER);

  //   console.log('data : ', data);

  console.log('hello');
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          deleteUserFunction({ variables: { deleteUserId: input.value } });
          input.value = '';
        }}
      >
        <input
          placeholder="ID Delete"
          ref={(node) => {
            input = node;
          }}
        />
        <button type="submit">Delete user</button>
      </form>
    </div>
  );
};

export default DeleteUserX;
