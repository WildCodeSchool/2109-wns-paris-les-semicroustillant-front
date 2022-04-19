import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

const iconTrash = <FontAwesomeIcon icon={faTrash} />;
const iconEdit = <FontAwesomeIcon icon={faEdit} />;

interface ITicketCard {
  subject: string;
  status: string;
  deadline: Date;
  description: string;
  initial_time_estimated: number;
  total_time_spent: number | null;
  advancement: number | null;
  projectId: string;
}

const TicketCard = ({
  subject,
  status,
  deadline,
  description,
  initial_time_estimated,
  total_time_spent,
  advancement,
  projectId,
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
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Project: {projectId}
        </Typography>
      </CardContent>
      <CardActions className="actions">
        <Button size="small">{iconEdit}</Button>
        <Button size="small">{iconTrash}</Button>
      </CardActions>
    </Card>
  </div>
);

export default TicketCard;
