import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import colors from '../../styles/globals';

interface ITicketDetails {
  users: string[] | null;
  span: (content: string) => JSX.Element;
  initial_time_estimated: number | null;
  total_time_spent: number | null;
}

function TaskDetails({
  users,
  span,
  initial_time_estimated,
  total_time_spent,
}: ITicketDetails): JSX.Element {
  const iconEdit = <FontAwesomeIcon icon={faEdit} />;

  return (
    <div>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        Initial time estimated: {initial_time_estimated}
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        Total time spent: {total_time_spent}
      </Typography>
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
