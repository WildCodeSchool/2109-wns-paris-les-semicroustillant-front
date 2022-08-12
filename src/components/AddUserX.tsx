import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useMutation, gql, useQuery } from '@apollo/client';
import { ADD_ONE_USER, GET_ALL_USERS_EMAIL } from '../queries/UserQueries';
import { AddOneUser, getAllUsersEmail } from '../schemaTypes';
import '../styles/AddUsers.css';

const AddUserX = (): JSX.Element => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [hash, setHash] = useState('');
  const [role, setRole] = useState('');
  const [position, setPosition] = useState('');

  let input: any;

  const [addUserFunction, { data, loading, error }] =
    useMutation<AddOneUser>(ADD_ONE_USER);

  const users = useQuery<getAllUsersEmail>(GET_ALL_USERS_EMAIL).data?.allUsers;
  // check if email is set in database and stop the submit of the form
  const inputEmail = document.getElementById('checkEmail') as HTMLInputElement;
  let inputEmailValue = '';
  if (inputEmail != null) {
    inputEmailValue = inputEmail.value;
  }
  let emailIsset = false;
  users?.forEach((element) => {
    if (element.email === inputEmailValue) {
      emailIsset = true;
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
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addUserFunction({
          variables: {
            userInput: {
              firstname,
              lastname,
              email,
              role,
              position,
            },
          },
        });
        input.value = '';
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          height: 800,
          flexGrow: 1,
        }}
      >
        <Box className="subBox" sx={{ width: 600 }}>
          <Grid className="containerAddUser" container spacing={0}>
            <Grid item xs={6}>
              <div className="container-input">
                <label htmlFor="firstname" className="labelAddUser">
                  Prénom{' '}
                </label>
                <input
                  id="firstname"
                  placeholder="Prénom"
                  ref={(node) => {
                    input = node;
                  }}
                  value={firstname}
                  onChange={(e) => {
                    setFirstname(e.target.value);
                  }}
                />
              </div>
              <div className="container-input">
                <label htmlFor="checkEmail" className="labelAddUser">
                  E-mail{' '}
                </label>
                <input
                  id="checkEmail"
                  placeholder="E-mail"
                  ref={(node) => {
                    input = node;
                  }}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className="container-input">
                <label htmlFor="name" className="labelAddUser">
                  Nom{' '}
                </label>
                <input
                  id="name"
                  placeholder="Nom"
                  ref={(node) => {
                    input = node;
                  }}
                  value={lastname}
                  onChange={(e) => {
                    setLastname(e.target.value);
                  }}
                />
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="container-input">
                <label htmlFor="password" className="labelAddUser">
                  {' '}
                  Mot de passe{' '}
                </label>
                <input
                  id="password"
                  placeholder="Mot de passe"
                  ref={(node) => {
                    input = node;
                  }}
                  value={hash}
                  onChange={(e) => {
                    setHash(e.target.value);
                  }}
                />
              </div>
              <div className="container-input">
                <label htmlFor="role" className="labelAddUser">
                  Role{' '}
                </label>
                <input
                  id="role"
                  placeholder="Role"
                  ref={(node) => {
                    input = node;
                  }}
                  value={role}
                  onChange={(e) => {
                    setRole(e.target.value);
                  }}
                />
              </div>
              <div className="container-input">
                <label htmlFor="position" className="labelAddUser">
                  Position{' '}
                </label>
                <input
                  id="position"
                  placeholder="Position"
                  ref={(node) => {
                    input = node;
                  }}
                  value={position}
                  onChange={(e) => {
                    setPosition(e.target.value);
                  }}
                />
              </div>
            </Grid>
          </Grid>
          <div className="container-button">
            <button
              id="addUserButton"
              onClick={(e) => {
                submit(e);
              }}
              type="submit"
            >
              Ajouter
            </button>
          </div>
        </Box>
      </Box>
    </form>
  );
};

export default AddUserX;
