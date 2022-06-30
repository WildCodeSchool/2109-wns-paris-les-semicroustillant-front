import React, { useState } from 'react';
import Card from '@mui/material/Card';
import { useQuery } from '@apollo/client';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import UpdateTaskCard from './UpdateTaskCard';
import colors from '../../styles/globals';
import { GET_USER } from '../../queries/TasksQueries';

interface ITicketDetails {
  _id: string;
  created_by: string;
  users: string[] | null;
  span: (content: string) => JSX.Element;
  initial_time_estimated: number | null;
  total_time_spent: number | null;
  subject: string;
  status: string | null;
  deadline: Date;
  description: string | null;
  advancement: number | null;
  project_id: string | null;
  projectName: string | undefined;
}

function TaskDetails({
  _id,
  created_by,
  users,
  span,
  initial_time_estimated,
  total_time_spent,
  subject,
  status,
  deadline,
  description,
  advancement,
  project_id,
  projectName,
}: ITicketDetails): JSX.Element {
  const iconEdit = <FontAwesomeIcon icon={faEdit} />;
  const [displayUpdate, setDisplayUpdate] = useState(false);
  const toggleUpdate = () => {
    setDisplayUpdate(!displayUpdate);
  };

  const getCreatedByDetails = useQuery(GET_USER, {
    variables: { userId: created_by },
  });
  const createdByDetails = getCreatedByDetails.data?.getOneUser;

  return (
    <div>
      <Card sx={{ minWidth: 300, maxWidth: 400 }} elevation={10}>
        <CardHeader
          sx={{ pb: 0 }}
          title={
            <Typography
              sx={{ fontSize: 14, color: colors.primary, m: 0 }}
              gutterBottom
            >
              {status}
            </Typography>
          }
        />
        <CardContent>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }} component="div">
            {subject}
          </Typography>
          <Typography sx={{ mb: 1.5 }} variant="body2">
            {span('Created by')}: {createdByDetails.firstname}{' '}
            {createdByDetails.lastname}
          </Typography>
          <Typography sx={{ mb: 1.5 }} variant="body2">
            {span('Deadline')}: {moment(deadline).format('DD/MM/YYYY')}
          </Typography>
          <Paper variant="outlined" sx={{ mb: 1.5 }}>
            <Typography sx={{ m: 1.5 }} variant="body2">
              {description}
            </Typography>
          </Paper>
          <Typography sx={{ mb: 1.5 }} variant="body2">
            {span('Project')}: {projectName}
          </Typography>
          <Typography sx={{ mb: 1.5 }} variant="body2">
            {span('Initial time estimated')}: {initial_time_estimated} hours
          </Typography>
          <Typography sx={{ mb: 1.5 }} variant="body2">
            {span('Total time spent')}: {total_time_spent} hours
          </Typography>
          <Typography sx={{ mb: 1.5 }} variant="body2">
            {span('Advancement')}: {advancement}
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
        </CardContent>
        <CardActions
          className="actions"
          sx={{ display: 'flex', justifyContent: 'flex-end' }}
        >
          <Button
            size="medium"
            sx={{ color: colors.primary }}
            onClick={toggleUpdate}
          >
            {iconEdit}
          </Button>
        </CardActions>
      </Card>
      <div>
        <Dialog
          open={displayUpdate}
          onClose={toggleUpdate}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <UpdateTaskCard
            toggleDisplay={toggleUpdate}
            _id={_id}
            _created_by={created_by}
            _status={status}
            _subject={subject}
            _deadline={deadline}
            _description={description}
            _initial_time_estimated={initial_time_estimated}
            _total_time_spent={total_time_spent}
            _project_id={project_id}
            _users={users}
          />
        </Dialog>
      </div>
    </div>
  );
}

export default TaskDetails;
