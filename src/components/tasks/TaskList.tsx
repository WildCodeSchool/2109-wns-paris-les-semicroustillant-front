import React, { useState, useContext } from 'react';
import { useQuery } from '@apollo/client';
import { Dialog } from '@mui/material';

import AddTaskCard from './AddTaskCard';
import TaskCard from './TaskCard';
import TitleBar from '../../assets/custom-components/TitleBar';
import CustomFilterCheckBox from '../../assets/custom-components/CustomFilterCheckBox';
import LoginContext from '../../context/LoginContext';
import { GET_ALL_TICKETS } from '../../queries/TicketQueries';
import { getAllTickets } from '../../schemaTypes';

import '../../styles/TaskList.css';


function TaskList(): JSX.Element {
  const { userId: currentUser } = useContext(LoginContext);
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
    <div style={{ margin: '2rem 3rem 0 3rem' }}>
      <TitleBar title="Tasks" onClickRigthBtn={toggleDisplay} />
      <div>
        <CustomFilterCheckBox
          label="Assigned to me"
          onClick={toggleMyProjectFilter}
        />
      </div>
      <div className="cardsDisplay">
        {data &&
          data.allTickets
            .filter((t) =>
              myProjectFilter
                ? t.users?.some((u) => u._id === currentUser)
                : true
            )
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
                advancement={ticket.advancement && Math.floor(ticket.advancement)}
                project_id={ticket.project_id._id}
                users={ticket.users}
              />
            ))}
        {error && <p>Error: {error.message}</p>}
      </div>
      <Dialog
        open={displayAddCard}
        onClose={toggleDisplay}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <AddTaskCard toggleDisplay={toggleDisplay} />
      </Dialog>
    </div>
  );
}

export default TaskList;
