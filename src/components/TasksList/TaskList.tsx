import React from 'react';
import { useQuery, gql } from '@apollo/client';
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { getAllTickets } from '../../schemaTypes';
import '../../styles/TaskList.css';
import TaskCard from './TaskCard';
import AddTaskCard from './AddTaskCard';

function TaskList(): JSX.Element {
  const iconPlus = <FontAwesomeIcon icon={faPlusCircle} />;

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

  return (
    <div>
      <h1>TaskList</h1>
      <div className="cardsDisplay">
        {data &&
          data.allTickets.map((ticket) => (
            <TaskCard
              key={ticket._id}
              subject={ticket.subject}
              status={ticket.status}
              deadline={ticket.deadline}
              description={ticket.description}
              initial_time_estimated={ticket.initial_time_estimated}
              total_time_spent={ticket.total_time_spent}
              advancement={ticket.advancement}
              projectId={ticket.projectId}
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
