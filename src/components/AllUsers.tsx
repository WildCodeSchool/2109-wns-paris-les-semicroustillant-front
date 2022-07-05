import React, { useState } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  // faTrash,
  // faEdit,
  faPlusCircle,
} from '@fortawesome/free-solid-svg-icons';
import {
  Button,
  Dialog,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { DELETE_USER } from '../queries/TasksQueries';
import { getAllUsers, DeleteUser } from '../schemaTypes';
import UserDetailsCard from './UsersComponents/UserDetailsCard';
import AvatarComponent from '../assets/custom-components/AvatarComponent';

import '../styles/AllUsers.css';

// icone fontAwesome
// const iconTrash = <FontAwesomeIcon icon={faTrash} />;
// const iconEdit = <FontAwesomeIcon icon={faEdit} />;
const iconPlus = <FontAwesomeIcon icon={faPlusCircle} />;

const AllUsers = (): JSX.Element => {
  const [displayUserDetailsCard, setDisplayUserDetailsCard] = useState(false);
  const toggleUserDetailsCard = () => {
    setDisplayUserDetailsCard(!displayUserDetailsCard);
  };

  const [selectedUserId, setSelectedUserId] = useState('');

  const GET_USERS = gql`
    query getAllUsers {
      allUsers {
        _id
        firstname
        lastname
        position
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
              <TableCell
                style={{ color: 'white', fontWeight: 'bold' }}
                align="left"
              />
              <TableCell
                style={{ color: 'white', fontWeight: 'bold' }}
                align="left"
              >
                Name
              </TableCell>
              <TableCell
                style={{ color: 'white', fontWeight: 'bold' }}
                align="left"
              >
                Position
              </TableCell>
              <TableCell
                style={{ color: 'white', fontWeight: 'bold' }}
                align="left"
              >
                Role
              </TableCell>
              <TableCell
                style={{ color: 'white', fontWeight: 'bold' }}
                align="left"
              />
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.allUsers.map((user) => (
                <>
                  <TableRow
                    key={user.firstname}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <AvatarComponent
                        position={user?.position || ''}
                        lastname={user?.lastname || ''}
                        firstname={user?.firstname || ''}
                        avatarSize={50}
                      />
                    </TableCell>
                    <TableCell align="left">{`${user.firstname} ${user.lastname}`}</TableCell>
                    <TableCell align="left">{user.position}</TableCell>
                    <TableCell align="left">{user.role}</TableCell>
                    <TableCell align="left">
                      <Button
                        onClick={() => {
                          toggleUserDetailsCard();
                          setSelectedUserId(user._id);
                        }}
                      >
                        <ChevronRightIcon
                          sx={{ color: 'var(--primary)', fontSize: 65 }}
                        />
                      </Button>
                      {/* <button className="edit" type="submit">
                      {ChevronRightIcon}
                    </button> */}
                      {/* <button
                      className="delete"
                      onClick={(e) => {
                        mutateFunction({
                          variables: { deleteUserId: user._id },
                        });
                        window.location.reload();
                      }}
                      type="submit"
                    >
                      {iconTrash}
                    </button> */}
                    </TableCell>
                  </TableRow>
                </>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={displayUserDetailsCard}
        onClose={toggleUserDetailsCard}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        fullWidth
        maxWidth="lg"
      >
        <UserDetailsCard userId={selectedUserId} />
      </Dialog>
      <div className="containerAddUser">
        <button id="addUser" type="submit">
          <a id="linkAddUser" href="/add-user">
            {iconPlus} Add a user
          </a>
        </button>
      </div>
    </div>
  );
};

export default AllUsers;
