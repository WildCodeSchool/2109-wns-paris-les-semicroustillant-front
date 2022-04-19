import React from 'react';
import { useQuery, gql } from '@apollo/client';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import { getAllTickets } from '../schemaTypes';
import '../styles/TaskList.css';

function TaskList(): JSX.Element {
  const GET_TICKETS = gql`
    query getAllTickets {
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
      }
    }
  `;

  const { data } = useQuery<getAllTickets>(GET_TICKETS);

  console.log(data);

  interface ITicketCard {
    subject?: string;
    status?: string;
    deadline?: Date;
    description?: string;
    initial_time_estimated?: number;
    total_time_spent?: number | null;
    advancement?: number | null;
  }

  const TicketCard = ({
    subject,
    status,
    deadline,
    description,
    initial_time_estimated,
    total_time_spent,
    advancement,
  }: ITicketCard): JSX.Element => (
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
        </CardContent>
        <CardActions>
          <Button size="small">Edit</Button>
        </CardActions>
      </Card>
    </div>
  );

  return (
    <div>
      <h1>TaskList</h1>
      <div className="cardsDisplay">
        {data &&
          data.allTickets.map((ticket) => (
            <TicketCard
              key={ticket._id}
              subject={ticket.subject}
              status={ticket.status}
              deadline={ticket.deadline}
              description={ticket.description}
              initial_time_estimated={ticket.initial_time_estimated}
              total_time_spent={ticket.total_time_spent}
              advancement={ticket.advancement}
            />
          ))}
      </div>
    </div>
  );
}

export default TaskList;
