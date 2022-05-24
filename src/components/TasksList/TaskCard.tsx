import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import { useMutation } from '@apollo/client';
import { DeleteTicket } from '../../schemaTypes';
import { GET_TICKETS, DELETE_TICKET } from '../../queries/TasksQueries';

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
  const iconEdit = <FontAwesomeIcon icon={faEdit} />;

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

  return (
    <div className="cardContainer">
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {status}
          </Typography>
          <Typography variant="h5" component="div">
            {subject}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Deadline: {moment(deadline).format('DD/MM/YYYY')}
          </Typography>
          <Typography variant="body2">{description}</Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Initial time estimated: {initial_time_estimated}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Total time spent: {total_time_spent}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Advancement: {advancement}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Project: {projectId}
          </Typography>
          <Typography>
            Users:{' '}
            <ul>
              {users?.map((user) => (
                <li key={user} color="text.secondary">
                  {user}
                </li>
              ))}
            </ul>
          </Typography>
        </CardContent>
        <CardActions className="actions">
          <Button size="small">{iconEdit}</Button>
          <Button
            size="small"
            onClick={() => deleteTicket({ variables: { deleteTicketId: _id } })}
          >
            {iconTrash}
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default TicketCard;
