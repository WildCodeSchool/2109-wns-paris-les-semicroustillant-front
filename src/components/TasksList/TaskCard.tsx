import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import moment from 'moment';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Dialog,
  Paper,
  Typography,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEye, faEdit } from '@fortawesome/free-solid-svg-icons';
import TaskDetails from './TaskDetails';
import UpdateTaskCard from './UpdateTaskCard';
import CustomActionButton from '../../assets/custom-components/CustomActionButton';
import statusColor from '../../utils/statusColor';

import { GET_ALL_TICKETS, DELETE_TICKET } from '../../queries/TicketQueries';
import { GET_PROJECT } from '../../queries/ProjectQueries';
import { DeleteTicket, GetOneProject } from '../../schemaTypes';
import { ITicketCard, IExistingTickets } from '../../types/custom-types';

import colors from '../../styles/globals';

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
  const iconPlus = <FontAwesomeIcon icon={faEye} />;
  const iconEdit = <FontAwesomeIcon icon={faEdit} />;

  const [displaySeeTicket, setDisplaySeeTicket] = useState(false);
  const toggleDisplay = () => {
    setDisplaySeeTicket(!displaySeeTicket);
  };

  const [displayUpdate, setDisplayUpdate] = useState(false);
  const toggleUpdate = () => {
    setDisplayUpdate(!displayUpdate);
  };

  const [deleteTicket] = useMutation<DeleteTicket>(DELETE_TICKET, {
    update(cache) {
      const existingTickets: IExistingTickets | null = cache.readQuery({
        query: GET_ALL_TICKETS,
      });
      const newTickets = existingTickets?.allTickets.filter(
        (t: ITicketCard) => t._id !== _id
      );
      cache.writeQuery({
        query: GET_ALL_TICKETS,
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
              sx={{
                fontSize: 14,
                fontWeight: 'bold',
                color: statusColor(status || ''),
                m: 0,
              }}
              gutterBottom
            >
              {status}
            </Typography>
          }
          action={
            <CustomActionButton onClick={toggleDisplay}>
              {iconPlus}
            </CustomActionButton>
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
          <CustomActionButton onClick={toggleUpdate}>
            {iconEdit}
          </CustomActionButton>

          <CustomActionButton
            onClick={() => deleteTicket({ variables: { deleteTicketId: _id } })}
          >
            {iconTrash}
          </CustomActionButton>
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
