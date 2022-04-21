import React from 'react';
import { useQuery } from '@apollo/client';
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { getAllTickets } from '../../schemaTypes';
import '../../styles/TaskList.css';
import TaskCard from './TaskCard';
import AddTaskCard from './AddTaskCard';
import { GET_TICKETS } from './TasksQueries';

function TaskList(): JSX.Element {
  const iconPlus = <FontAwesomeIcon icon={faPlusCircle} />;

  const { data } = useQuery<getAllTickets>(GET_TICKETS);

  return (
    <div>
      <h1>TaskList</h1>
      <div className="cardsDisplay">
        {data &&
          data.allTickets.map((ticket) => (
            <TaskCard
              key={ticket._id}
              _id={ticket._id}
              subject={ticket.subject}
              status={ticket.status}
              deadline={ticket.deadline}
              description={ticket.description}
              initial_time_estimated={ticket.initial_time_estimated}
              total_time_spent={ticket.total_time_spent}
              advancement={ticket.advancement}
              projectId={ticket.projectId}
              users={ticket.users}
            />
          ))}
      </div>
      <>
        <Button size="small">{iconPlus}</Button>
        <AddTaskCard />
      </>
    </div>
  );
}

export default TaskList;
