import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import colors from '../../styles/globals';

interface ITicketDetails {
  users: string[] | null;
  span: (content: string) => JSX.Element;
}

function TaskDetails({ users, span }: ITicketDetails): JSX.Element {
  const iconEdit = <FontAwesomeIcon icon={faEdit} />;

  return (
    <div>
      <Typography sx={{ mb: 1.5 }} variant="body2">
        {span('Users')}:
      </Typography>
      <ul>
        {users?.map((user) => (
          <Typography key={user} variant="body2">
            {user}
          </Typography>
        ))}
      </ul>
      <Button size="medium" sx={{ color: colors.primary }}>
        {iconEdit}
      </Button>
    </div>
  );
}

export default TaskDetails;
