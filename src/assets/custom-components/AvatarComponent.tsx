import React from 'react';
import { Avatar } from '@mui/material';

type AvatarData = {
  position: string
  lastname: string
  firstname: string
  avatarSize: number
};

const AvatarComponent = ({
  position,
  lastname,
  firstname,
  avatarSize,
}: AvatarData): JSX.Element => {
  const split = lastname.split(' ');
  const initials = (
    firstname.charAt(0) + lastname.split(' ')[split.length - 1].charAt(0)
  ).toUpperCase();

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const avatarColor = (position: string) => {
    switch (position) {
      case 'Developer':
        return 'orange';
      case 'Product Owner':
        return '#3d4db7';
      case 'Scrum Master':
        return 'red';
      case 'Team Lead':
        return 'darkgreen';
      case 'Test Engineer':
        return 'purple';
      default:
        return 'grey';
    }
  };

  return (
    <Avatar
      sx={{
        backgroundColor: avatarColor(position),
        height: avatarSize,
        width: avatarSize,
        fontWeight: 'bold',
        border: '2px solid lightgrey',
      }}
    >
      {initials}
    </Avatar>
  );
};

export default AvatarComponent;
