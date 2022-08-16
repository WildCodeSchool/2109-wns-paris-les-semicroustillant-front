import React, { useState, useContext } from 'react';
import { useQuery } from '@apollo/client';
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
import AddUserModal from './AddUserModal';
import TitleBar from '../../assets/custom-components/TitleBar';
import AvatarComponent from '../../assets/custom-components/AvatarComponent';
import LoginContext from '../../context/LoginContext';

import { GET_ALL_USERS } from '../../queries/UserQueries';
import { GetAllUsers } from '../../schemaTypes';

import colors from '../../styles/globals';
import '../../styles/UsersList.css';

const tableCellStyle = {
  color: 'white',
  fontWeight: 'bold',
  fontSize: '1.2rem',
  backgroundColor: 'var(--secondary-red)',
};

const UsersList = (): JSX.Element => {
  const { userRole } = useContext(LoginContext);
  const [displayAddUserModal, setDisplayAddUserModal] = useState(false);
  const toggleDisplayAddUserModal = () => {
    setDisplayAddUserModal(!displayAddUserModal);
  };

  const [displayUserDetailsCard, setDisplayUserDetailsCard] = useState(false);
  const toggleUserDetailsCard = () => {
    setDisplayUserDetailsCard(!displayUserDetailsCard);
  };

  const [selectedUserId, setSelectedUserId] = useState('');

  const { data } = useQuery<GetAllUsers>(GET_ALL_USERS);

  return (
    <div style={{ margin: '2rem 3rem 0 3rem' }}>
      <TitleBar
        title="Users"
        onClickRigthBtn={toggleDisplayAddUserModal}
        hideRightBtn={userRole === 'users'}
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
          sx={{
            maxWidth: 1000,
            mt: 3,
            mb: 3,
            border: 1,
            backgroundColor: '#fff',
          }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow sx={{ bgcolor: 'info.main' }}>
              <TableCell style={tableCellStyle} align="left" />
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
                <TableRow
                  key={user._id}
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
                      size="small"
                      color="error"
                      sx={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50px',
                        minWidth: 'auto',
                      }}
                      onClick={() => {
                        toggleUserDetailsCard();
                        setSelectedUserId(user._id);
                      }}
                    >
                      <ChevronRightIcon
                        sx={{
                          color: colors.primary,
                          fontSize: 65,
                          '&:hover': {
                            color: 'var(--primary-hover)',
                            boxShadow: 'none',
                          },
                        }}
                      />
                    </Button>
                  </TableCell>
                </TableRow>
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

      <Dialog
        open={displayAddUserModal}
        onClose={toggleDisplayAddUserModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <AddUserModal toggleDisplay={toggleDisplayAddUserModal} />
      </Dialog>
    </div>
  );
};

export default UsersList;
