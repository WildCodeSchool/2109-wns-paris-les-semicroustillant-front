import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useQuery, gql } from '@apollo/client';
import { getUsers } from '../schemaTypes';

const AllUsers = (): JSX.Element => {
  const GET_USERS = gql`
    query getUsers {
      allUsers {
        _id
        firstname
        lastname
        role
      }
    }
  `;

  const { loading, data } = useQuery<getUsers>(GET_USERS);

  console.log('data : ', data);

  console.log('hello');
  return (
    <TableContainer
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
      component={Paper}
    >
      <Table sx={{ maxWidth: 800 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nom </TableCell>
            <TableCell align="right">Prénom</TableCell>
            <TableCell align="right">Role</TableCell>
            <TableCell align="right">Option</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.allUsers.map((user) => (
              <TableRow
                key={user.firstname}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {user.firstname}
                </TableCell>
                <TableCell align="right">{user.lastname}</TableCell>
                <TableCell align="right">{user.role}</TableCell>
                <TableCell align="right">
                  <button type="submit">Modifier</button>
                  <button type="submit">supprimer</button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AllUsers;
