import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Card, CardHeader, Typography, TextField } from '@mui/material';
import AvatarComponent from '../../assets/custom-components/AvatarComponent';
import { GetOneUser } from '../../schemaTypes';
import { GET_ONE_USER } from '../../queries/TasksQueries';
import colors from '../../styles/globals';

interface IUserDetails {
  userId: string;
}

const UserDetailsCard = ({ userId }: IUserDetails): JSX.Element => {
  // console.log('USER DI', userId);
  const { data } = useQuery<GetOneUser>(GET_ONE_USER, {
    variables: { userId },
  });

  const user = data?.getOneUser;
  const lock = false;

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

  // console.log('DATA', user && user);
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
      <div style={{ display: 'flex', padding: '15px', paddingTop: '30px', flexWrap: 'wrap', justifyContent: 'space-around' }}>
        {EditField({
          edit: lock,
          content: user?.firstname,
          title: 'FIRSTNAME',
        })}
        {EditField({ edit: lock, content: user?.lastname, title: 'LASTNAME' })}
        {EditField({ edit: lock, content: user?.position, title: 'POSITION' })}
        {EditField({ edit: lock, content: user?.email, title: 'EMAIL' })}
      </div>
    </Card>
  );
};

export default UserDetailsCard;
