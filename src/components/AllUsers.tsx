import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrash,
  faEdit,
  faPlusCircle,
} from '@fortawesome/free-solid-svg-icons';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useQuery, gql, useMutation } from '@apollo/client';
import { DELETE_USER } from '../queries/TasksQueries';
import { getAllUsers, DeleteUser } from '../schemaTypes';
import '../styles/AllUsers.css';

// icone fontAwesome
const iconTrash = <FontAwesomeIcon icon={faTrash} />;
const iconEdit = <FontAwesomeIcon icon={faEdit} />;
const iconPlus = <FontAwesomeIcon icon={faPlusCircle} />;

const AllUsers = (): JSX.Element => {
  const GET_USERS = gql`
    query getAllUsers {
      allUsers {
        _id
        firstname
        lastname
        role
      }
    }
  `;

  const { loading, data } = useQuery<getAllUsers>(GET_USERS);

  const [deleteId, setDeleteId] = useState('');

  let input: any;

  const [mutateFunction] = useMutation<DeleteUser>(DELETE_USER);
  return (
    <div>
      <TableContainer
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
        component={Paper}
      >
        <Table
          sx={{ maxWidth: 1200, m: 8, border: 1 }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow sx={{ bgcolor: 'info.main' }}>
              <TableCell style={{ color: 'white', fontWeight: 'bold' }}>
                Nom{' '}
              </TableCell>
              <TableCell
                style={{ color: 'white', fontWeight: 'bold' }}
                align="right"
              >
                Prénom
              </TableCell>
              <TableCell
                style={{ color: 'white', fontWeight: 'bold' }}
                align="right"
              >
                Role
              </TableCell>
              <TableCell
                style={{ color: 'white', fontWeight: 'bold' }}
                align="right"
              >
                Option
              </TableCell>
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
                    <button className="edit" type="submit">
                      {iconEdit} Modifier
                    </button>
                    <button
                      className="delete"
                      onClick={(e) => {
                        mutateFunction({
                          variables: { deleteUserId: user._id },
                        });
                        window.location.reload();
                      }}
                      type="submit"
                    >
                      {iconTrash} supprimer
                    </button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="containerAddUser">
        <button id="addUser" type="submit">
          <a id="linkAddUser" href="/add-user">
            {iconPlus} Ajouter un utilisateur
          </a>
        </button>
      </div>
    </div>
  );
};

export default AllUsers;
