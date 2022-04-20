import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import { useMutation, gql } from '@apollo/client';
import {
  DeleteTicket,
  getAllTickets_allTickets_users,
} from '../../schemaTypes';

const iconTrash = <FontAwesomeIcon icon={faTrash} />;
const iconEdit = <FontAwesomeIcon icon={faEdit} />;

interface ITicketCard {
  _id: string;
  subject: string;
  status: string;
  deadline: Date;
  description: string;
  initial_time_estimated: number;
  total_time_spent: number | null;
  advancement: number | null;
  projectId: string;
  users: getAllTickets_allTickets_users[] | null;
}

interface IexistingTickets {
  allTickets: ITicketCard[];
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
  const GET_TICKETS = gql`
    query getAllTicketsCard {
      allTickets {
        _id
        subject
        status
        deadline
        description
        initial_time_estimated
        total_time_spent
        advancement
        projectId
        users {
          _id
        }
      }
    }
  `;

  const DELETE_TICKET = gql`
    mutation DeleteTicket($deleteTicketId: String!) {
      deleteTicket(id: $deleteTicketId)
    }
  `;
  const [deleteTicket] = useMutation<DeleteTicket>(DELETE_TICKET, {
    update(cache) {
      const existingTickets: IexistingTickets | null = cache.readQuery({
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
          {users?.map((user) => (
            <Typography key={user._id} sx={{ mb: 1.5 }} color="text.secondary">
              Users: {user._id}
            </Typography>
          ))}
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
