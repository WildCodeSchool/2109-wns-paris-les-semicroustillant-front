import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { Mutation_addUser } from '../schemaTypes';

const AddUserX = (): JSX.Element => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [hash, setHash] = useState('');
  const [role, setRole] = useState('');
  const [position, setPosition] = useState('');

  let input: any;

  const ADD_USER = gql`
    mutation Mutation($userInput: UserInput!) {
      addUser(userInput: $userInput) {
        _id
        firstname
        lastname
        email
        hash
        role
        position
      }
    }
  `;
  const [addUserFunction, { data, loading, error }] =
    useMutation<Mutation_addUser>(ADD_USER);

  console.log('hello');
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addUserFunction({
            variables: {
              userInput: {
                firstname,
                lastname,
                email,
                hash,
                role,
                position,
              },
            },
          });
          input.value = '';
        }}
      >
        <div>Add users :</div>
        <input
          placeholder="Firstname"
          ref={(node) => {
            input = node;
          }}
          value={firstname}
          onChange={(e) => {
            setFirstname(e.target.value);
          }}
        />
        <input
          placeholder="Lastname"
          ref={(node) => {
            input = node;
          }}
          value={lastname}
          onChange={(e) => {
            setLastname(e.target.value);
          }}
        />
        <input
          placeholder="Email"
          ref={(node) => {
            input = node;
          }}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          placeholder="Hash"
          ref={(node) => {
            input = node;
          }}
          value={hash}
          onChange={(e) => {
            setHash(e.target.value);
          }}
        />
        <input
          placeholder="Role"
          ref={(node) => {
            input = node;
          }}
          value={role}
          onChange={(e) => {
            setRole(e.target.value);
          }}
        />
        <input
          placeholder="Position"
          ref={(node) => {
            input = node;
          }}
          value={position}
          onChange={(e) => {
            setPosition(e.target.value);
          }}
        />
        <button type="submit">Add user</button>
      </form>
    </div>
  );
};

export default AddUserX;
