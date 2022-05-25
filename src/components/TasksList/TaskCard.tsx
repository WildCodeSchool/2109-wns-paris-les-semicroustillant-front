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
import { faTrash, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
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

interface ITicketCard {
  _id: string;
  subject: string;
  status: string;
  deadline: Date;
  description: string;
  initial_time_estimated: number | null;
  total_time_spent: number | null;
  advancement: number | null;
  projectId: string | null;
  users: string[] | null;
}

function TicketCard({
  _id,
  subject,
  status,
  deadline,
  description,
  initial_time_estimated,
  total_time_spent,
  advancement,
  projectId,
  users,
}: ITicketCard): JSX.Element {
  const iconTrash = <FontAwesomeIcon icon={faTrash} />;
  const iconPlus = <FontAwesomeIcon icon={faPlusCircle} />;

  const [displaySeeTicket, setDisplaySeeTicket] = useState(false);
  const toggleDisplay = () => {
    setDisplaySeeTicket(!displaySeeTicket);
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
    variables: { projectId },
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
    <div className="cardContainer">
      <Card sx={{ minWidth: 275 }}>
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
          <Typography variant="h5" component="div">
            {subject}
          </Typography>
          <Typography sx={{ mb: 1.5 }} variant="body2" color="text.secondary">
            Deadline: {moment(deadline).format('DD/MM/YYYY')}
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
            onClick={() => deleteTicket({ variables: { deleteTicketId: _id } })}
          >
            {iconTrash}
          </Button>
        </CardActions>
      </Card>
      <Dialog
        open={displaySeeTicket}
        onClose={toggleDisplay}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <TaskDetails
          users={users}
          span={span}
          initial_time_estimated={initial_time_estimated}
          total_time_spent={total_time_spent}
        />
      </Dialog>
    </div>
  );
}

export default TicketCard;
