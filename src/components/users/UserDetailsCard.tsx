import React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { toast } from 'react-toastify';
import { Card, CardHeader, Typography, TextField, Box, CardActions } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import AvatarComponent from '../../assets/custom-components/AvatarComponent';
import CustomActionButton from '../../assets/custom-components/CustomActionButton';
import {
  GET_ALL_USERS,
  GET_ONE_USER,
  DELETE_USER,
} from '../../queries/UserQueries';
import { COUNT_PROJECTS_BY_USER_ID } from '../../queries/ProjectQueries';
import { COUNT_TICKETS_BY_USER_ID } from '../../queries/TicketQueries';
import {
  CountProjectsByUserId,
  CountTicketByUserId,
  DeleteUser,
  GetAllUsers,
  GetOneUser,
  GetAllUsers_allUsers,
} from '../../schemaTypes';
import { IUserDetails } from '../../types/custom-types';

import colors from '../../styles/globals';

const UserDetailsCard = ({ userId, toggleDisplay }: IUserDetails): JSX.Element => {
  const iconTrash = <FontAwesomeIcon icon={faTrash} />;
  const { data: userData } = useQuery<GetOneUser>(GET_ONE_USER, {
    variables: { userId },
  });
  const { data: countTicketsData } = useQuery<CountTicketByUserId>(
    COUNT_TICKETS_BY_USER_ID,
    {
      variables: { countTicketsByUserIdId: userId },
    }
  );
  const { data: countProjectsData } = useQuery<CountProjectsByUserId>(
    COUNT_PROJECTS_BY_USER_ID,
    {
      variables: { countProjectsByUserIdId: userId },
    }
  );

  const user = userData?.getOneUser;
  const ticketNb = countTicketsData?.countTicketsByUserId;
  const projectNb = countProjectsData?.countProjectsByUserId;
  const lock = false;

  const span = (content: string) => (
    <Box
      component="span"
      sx={{
        display: 'inline-block',
        ml: '15px',
        mb: '15px',
        color: colors.primary,
      }}
    >
      {content}
    </Box>
  );

  const [deleteUserFunction] = useMutation<DeleteUser>(
    DELETE_USER,

    {
      update(cache) {
        const currentUserList: GetAllUsers = cache.readQuery({
          query: GET_ALL_USERS,
        }) ?? {
          allUsers: [],
        };

        const updatedUserList = currentUserList?.allUsers.filter(
          (u: GetAllUsers_allUsers) => u._id !== userId
        );

        cache.writeQuery({
          query: GET_ALL_USERS,
          data: {
            allUsers: updatedUserList,
          },
        });
        toast.success('User successfully deleted!');
        toggleDisplay();
      },
      onError(error) {
        // eslint-disable-next-line no-console
        console.log(error);
        toast.error(`${error.message}`);
      },
    }
  );

  const EditField = ({
    edit,
    content,
    title,
  }: {
    edit: boolean;
    content: string | undefined;
    title: string;
  }) => {
    if (!edit) {
      return (
        <span style={{ margin: '15px', width: '50vh' }}>
          <Typography
            sx={{ fontSize: 14, color: colors.primary, m: 0 }}
            gutterBottom
          >
            {title}
          </Typography>
          <TextField
            value={content}
            disabled
            sx={{
              '& .MuiInputBase-input.Mui-disabled': {
                WebkitTextFillColor: '#4a4a4a',
              },
              input: {
                border: 'none',
              },
            }}
          />
        </span>
      );
    }
    return <span>{content}</span>;
  };

  return (
    <Card sx={{ minWidth: 300, p: 5, pt: 0 }} elevation={10}>
      <div style={{ display: 'flex', padding: '15px', paddingTop: '30px' }}>
        <AvatarComponent
          position={user?.position || ''}
          lastname={user?.lastname || ''}
          firstname={user?.firstname || ''}
          avatarSize={70}
        />
        <CardHeader
          sx={{ p: 0 }}
          title={
            <Typography
              sx={{ fontSize: 35, color: colors.primary, m: 0, pl: '4vh' }}
              gutterBottom
            >
              {`${user?.firstname} ${user?.lastname}`}
            </Typography>
          }
        />
      </div>
      <div
        style={{
          display: 'flex',
          padding: '15px',
          paddingTop: '30px',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}
      >
        {EditField({
          edit: lock,
          content: user?.firstname,
          title: 'FIRSTNAME',
        })}
        {EditField({ edit: lock, content: user?.lastname, title: 'LASTNAME' })}
        {EditField({ edit: lock, content: user?.position, title: 'POSITION' })}
        {EditField({ edit: lock, content: user?.email, title: 'EMAIL' })}
      </div>
      <div
        style={{
          padding: '15px',
          paddingTop: '30px',
          flexWrap: 'wrap',
        }}
      >
        <Typography sx={{ mb: 1.5 }} variant="body2">
          {span('Total number of assigned projects')}: {projectNb}
        </Typography>
        <Typography sx={{ mb: 1.5 }} variant="body2">
          {span('Total number of assigned tickets')}: {ticketNb}
        </Typography>
      </div>
      <CardActions sx={{ float: 'right' }}>
          <CustomActionButton
            onClick={() => deleteUserFunction({ variables: { userId } })}
          >
            {iconTrash}
          </CustomActionButton>
        </CardActions>
    </Card>
  );
};

export default UserDetailsCard;
