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

import UserDetailsCard from './UserDetailsCard';
import TitleBar from '../../assets/custom-components/TitleBar';
import AvatarComponent from '../../assets/custom-components/AvatarComponent';

import { GET_ALL_USERS, DELETE_USER } from '../../queries/UserQueries';
import { GetAllUsers, DeleteUser } from '../../schemaTypes';

import '../../styles/UsersList.css';

// icone fontAwesome
// const iconTrash = <FontAwesomeIcon icon={faTrash} />;
// const iconEdit = <FontAwesomeIcon icon={faEdit} />;
const iconPlus = <FontAwesomeIcon icon={faPlusCircle} />;
const tableCellStyle = {
  color: 'white',
  fontWeight: 'bold',
  fontSize: '1.2rem',
  backgroundColor: 'var(--secondary-red)',
};

const UsersList = (): JSX.Element => {
  const [displayUserDetailsCard, setDisplayUserDetailsCard] = useState(false);
  const toggleUserDetailsCard = () => {
    setDisplayUserDetailsCard(!displayUserDetailsCard);
  };

  const [selectedUserId, setSelectedUserId] = useState('');

  const { loading, data } = useQuery<GetAllUsers>(GET_ALL_USERS);

  const [deleteId, setDeleteId] = useState('');

  let input: any;

  const [mutateFunction] = useMutation<DeleteUser>(DELETE_USER);
  return (
    <div style={{ margin: '2rem 3rem 0 3rem' }}>
      <TitleBar
        title="Users"
        onClickRigthBtn={() => console.log('click click')}
        displayRightBtn
      />
      <TableContainer
        sx={{
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: 'transparent',
          boxShadow: 'none',
        }}
        component={Paper}
      >
        <Table
          sx={{ maxWidth: 1200, mt: 3, border: 1, backgroundColor: '#fff' }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow sx={{ bgcolor: 'info.main' }}>
              <TableCell
                style={tableCellStyle}
                align="left"
              />
              <TableCell style={tableCellStyle} align="left">
                NAME
              </TableCell>
              <TableCell style={tableCellStyle} align="left">
                POSITION
              </TableCell>
              <TableCell style={tableCellStyle} align="left">
                ROLE
              </TableCell>
              <TableCell style={tableCellStyle} align="left" />
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
                    <TableCell align="left" width={15}>
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

export default UsersList;
