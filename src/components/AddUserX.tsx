/* eslint-disable */
/* tslint:disable */
import React, { useState } from 'react';
import { useMutation, gql, useQuery } from '@apollo/client';
import { Mutation_addUser, getUsers } from '../schemaTypes';
import AllUsers from './AllUsers';

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

  const GET_USERS = gql`
    query getUsers {
      allUsers {
        email
      }
    }
  `;

  const [addUserFunction, { data, loading, error }] =
    useMutation<Mutation_addUser>(ADD_USER);
  //get All usser
  const users = useQuery<getUsers>(GET_USERS).data?.allUsers;
  //check if email isset in database and stop the submit of the form
  let inputEmail = document.getElementById('checkEmail') as HTMLInputElement;
  let inputEmailValue = '';
  if (inputEmail != null) {
    inputEmailValue = inputEmail.value;
  }
  let emailIsset = false;
  users?.forEach((element) => {
    if (element.email == inputEmailValue) {
      emailIsset = true;
      alert('plop');
    }
  });
  // refactor for verification on click buton
  function submit(e: any) {
    if (emailIsset === true) {
      e.preventDefault();
      console.log(emailIsset);
    }
  }

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
          id="checkEmail"
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
        <button
          onClick={(e) => {
            submit(e);
          }}
          type="submit"
        >
          Add user
        </button>
      </form>
    </div>
  );
};

export default AddUserX;
