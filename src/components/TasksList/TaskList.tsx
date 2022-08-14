import React, { useState, useContext } from 'react';
import { useQuery } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { Button, Checkbox, Dialog } from '@mui/material';
import AddTaskCard from './AddTaskCard';
import TaskCard from './TaskCard';
import { GET_ALL_TICKETS } from '../../queries/TicketQueries';
import LoginContext from '../../context/LoginContext';

import CustomFilterCheckBox from '../../assets/custom-components/CustomCheckBox';
import { getAllTickets } from '../../schemaTypes';

import colors from '../../styles/globals';
import '../../styles/TaskList.css';

function TaskList(): JSX.Element {
  const { userId: currentUser} = useContext(LoginContext);
  const iconPlus = <FontAwesomeIcon icon={faPlusCircle} />;
  const [displayAddCard, setDisplayAddCard] = useState(false);
  const toggleDisplay = () => {
    setDisplayAddCard(!displayAddCard);
  };
  const [myProjectFilter, setMyProjectFilter] = useState(false);
  const toggleMyProjectFilter = () => {
    setMyProjectFilter(!myProjectFilter);
  };
  const { data, error } = useQuery<getAllTickets>(GET_ALL_TICKETS);

  return (
    <div>
      <h1 className="tasksTitle">Tasks</h1>
        <div>
          <CustomFilterCheckBox control={<Checkbox onClick={toggleMyProjectFilter} />} label="Assigned to me" />
        </div>
      <div className="cardsDisplay">
        {data &&
          data.allTickets
          .filter(t => myProjectFilter ? t.users?.some(u => u._id === currentUser) : true)
          .map((ticket) => (
            <TaskCard
              key={ticket._id}
              _id={ticket._id}
              created_by={ticket.created_by}
              subject={ticket.subject}
              status={ticket.status}
              deadline={ticket.deadline}
              description={ticket.description}
              initial_time_estimated={ticket.initial_time_estimated}
              total_time_spent={ticket.total_time_spent}
              advancement={ticket.advancement}
              project_id={ticket.project_id._id}
              users={ticket.users}
            />
          ))}
        {error && <p>Error: {error.message}</p>}
      </div>
      <div>
        <Button
          size="large"
          sx={{ color: colors.primary }}
          onClick={toggleDisplay}
        >
          {iconPlus}
        </Button>
        <Dialog
          open={displayAddCard}
          onClose={toggleDisplay}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <AddTaskCard toggleDisplay={toggleDisplay} />
        </Dialog>
      </div>
    </div>
  );
}

export default TaskList;
