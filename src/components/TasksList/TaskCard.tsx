import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrash,
  faPlusCircle,
  faPen,
} from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import { useMutation, useQuery } from '@apollo/client';
import { DeleteTicket, GetOneProject } from '../../schemaTypes';
import {
  GET_TICKETS,
  DELETE_TICKET,
  GET_PROJECT,
} from '../../queries/TasksQueries';
import colors from '../../styles/globals';
import TaskDetails from './TaskDetails';
import UpdateTaskCard from './UpdateTaskCard';

interface ITicketCard {
  _id: string;
  created_by: string;
  subject: string;
  status: string | null;
  deadline: Date;
  description: string | null;
  initial_time_estimated: number | null;
  total_time_spent: number | null;
  advancement: number | null;
  project_id: string | null;
  users: string[] | null;
}

function TicketCard({
  _id,
  created_by,
  subject,
  status,
  deadline,
  description,
  initial_time_estimated,
  total_time_spent,
  advancement,
  project_id,
  users,
}: ITicketCard): JSX.Element {
  const iconTrash = <FontAwesomeIcon icon={faTrash} />;
  const iconPlus = <FontAwesomeIcon icon={faPlusCircle} />;
  const iconPen = <FontAwesomeIcon icon={faPen} />;

  const [displaySeeTicket, setDisplaySeeTicket] = useState(false);
  const toggleDisplay = () => {
    setDisplaySeeTicket(!displaySeeTicket);
  };

  const [displayUpdate, setDisplayUpdate] = useState(false);
  const toggleUpdate = () => {
    setDisplayUpdate(!displayUpdate);
  };

  interface IExistingTickets {
    allTickets: ITicketCard[];
  }

  const [deleteTicket] = useMutation<DeleteTicket>(DELETE_TICKET, {
    update(cache) {
      const existingTickets: IExistingTickets | null = cache.readQuery({
        query: GET_TICKETS,
      });
      const newTickets = existingTickets?.allTickets.filter(
        (t: ITicketCard) => t._id !== _id
      );
      cache.writeQuery({
        query: GET_TICKETS,
        data: { allTickets: newTickets },
      });
    },
  });

  const { data } = useQuery<GetOneProject>(GET_PROJECT, {
    variables: { projectId: project_id },
  });
  const projectName = data?.getOneProject.name;

  const span = (content: string) => (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', color: colors.primary }}
    >
      {content}
    </Box>
  );

  return (
    <div>
      <Card
        sx={{ marginTop: 5, marginBottom: 5, minWidth: 275, maxWidth: 300 }}
        elevation={10}
      >
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
          action={
            <Button
              size="large"
              sx={{ color: colors.primary }}
              onClick={toggleDisplay}
            >
              {iconPlus}
            </Button>
          }
        />
        <CardContent>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }} component="div">
            {subject}
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
            {span('Advancement')}: {advancement}
          </Typography>

          <Typography sx={{ mb: 1.5 }} variant="body2">
            {span('Project')}: {projectName}
          </Typography>
        </CardContent>
        <CardActions className="actions">
          <Button
            size="medium"
            sx={{ color: colors.primary }}
            onClick={toggleUpdate}
          >
            {iconPen}
          </Button>
          <Button
            size="medium"
            sx={{ color: colors.primary }}
            onClick={() => deleteTicket({ variables: { deleteTicketId: _id } })}
          >
            {iconTrash}
          </Button>
        </CardActions>
      </Card>
      <div>
        <Dialog
          open={displaySeeTicket}
          onClose={toggleDisplay}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <TaskDetails
            _id={_id}
            created_by={created_by}
            users={users}
            span={span}
            status={status}
            subject={subject}
            deadline={deadline}
            description={description}
            project_id={project_id}
            projectName={projectName}
            initial_time_estimated={initial_time_estimated}
            total_time_spent={total_time_spent}
            advancement={advancement}
          />
        </Dialog>
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

export default TicketCard;
