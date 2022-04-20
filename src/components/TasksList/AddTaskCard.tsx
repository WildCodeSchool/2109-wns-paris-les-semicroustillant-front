import React, { useState, ChangeEvent } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import Checkbox from '@mui/material/Checkbox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import {
  GetTicketsProjects,
  AllTicketsUsers,
  TicketMutation,
} from '../../schemaTypes';
import '../../styles/TaskList.css';

function AddTaskCard(): JSX.Element {
  const iconCheck = <FontAwesomeIcon icon={faCheck} />;
  const statuses = ['In Progress', 'In Production', 'Done', 'Delayed'];
  interface ITicketData {
    subject: string;
    description: string;
    initial_time_estimated: number | null;
    total_time_spent: number | null;
    projectId: string;
  }
  const [ticketData, setTicketData] = useState<ITicketData>({
    subject: '',
    description: '',
    initial_time_estimated: 0,
    total_time_spent: 0,
    projectId: '',
  });
  const [pickDeadline, setPickDeadline] = useState<Date | null>(new Date());
  const [selectStatus, setSelectStatus] = useState<string>('');
  const [selectProject, setSelectProject] = useState<string>('');
  const [selectUsers, setSelectUsers] = useState<string[]>([]);

  const handleData = (event: ChangeEvent<HTMLInputElement>) => {
    setTicketData({
      ...ticketData,
      [event.target.id]: event.target.value,
    });
  };

  const handleSelectStatus = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectStatus(event.target.value);
  };

  const handleSelectProject = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectProject(event.target.value);
  };

  const handleSelectUsers = (event: SelectChangeEvent<typeof selectUsers>) => {
    const {
      target: { value },
    } = event;
    setSelectUsers(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };
  interface ITicketProjects {
    _id: string;
    name: string;
  }
  const GET_PROJECTS = gql`
    query GetTicketsProjects {
      getAllProjects {
        _id
        name
      }
    }
  `;
  const { data } = useQuery<GetTicketsProjects>(GET_PROJECTS);

  const GET_USERS = gql`
    query AllTicketsUsers {
      allUsers {
        _id
        firstname
        lastname
      }
    }
  `;
  const userData = useQuery<AllTicketsUsers>(GET_USERS);
  const users = userData?.data?.allUsers;

  const ADD_TICKET = gql`
    mutation TicketMutation($ticketInput: TicketInput!) {
      addTicket(ticketInput: $ticketInput) {
        subject
        status
        deadline
        description
        initial_time_estimated
        total_time_spent
        projectId
        users {
          _id
        }
      }
    }
  `;
  const [addTicketFunction] = useMutation<TicketMutation>(ADD_TICKET);
  const ticketVariables = {
    subject: ticketData.subject,
    status: selectStatus,
    deadline: pickDeadline,
    description: ticketData.description,
    initial_time_estimated: Number(ticketData.initial_time_estimated),
    total_time_spent: Number(ticketData.total_time_spent),
    projectId: selectProject,
    users: selectUsers.map((user) => ({ _id: user })),
  };

  console.log(ticketVariables);
  return (
    <div className="cardContainer">
      <Card sx={{ minWidth: 600 }}>
        <CardContent>
          <FormControl
            sx={{ m: 1, minWidth: 120 }}
            onSubmit={(e) => {
              e.preventDefault();
              addTicketFunction({
                variables: {
                  ticketInput: ticketVariables,
                },
              });
            }}
          >
            <TextField
              id="status"
              margin="normal"
              select
              label="Status"
              value={selectStatus}
              onChange={handleSelectStatus}
            >
              {statuses.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="subject"
              margin="normal"
              label="Subject"
              value={ticketData.subject}
              onChange={handleData}
            />
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                label="Deadline"
                value={pickDeadline}
                onChange={(value) => {
                  setPickDeadline(value);
                }}
                // eslint-disable-next-line react/jsx-props-no-spreading
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <TextField
              multiline
              rows={4}
              id="description"
              margin="normal"
              label="Description"
              value={ticketData.description}
              onChange={handleData}
            />
            <TextField
              id="initial_time_estimated"
              margin="normal"
              label="Initial time estimated (hours)"
              value={ticketData.initial_time_estimated}
              onChange={handleData}
            />
            <TextField
              id="total_time_spent"
              margin="normal"
              label="Total time spent (hours)"
              value={ticketData.total_time_spent}
              onChange={handleData}
            />
            <TextField
              id="projectId"
              margin="normal"
              select
              label="Project"
              value={selectProject}
              onChange={handleSelectProject}
            >
              {data?.getAllProjects.map((project: ITicketProjects) => (
                <MenuItem key={project._id} value={project._id}>
                  {project.name}
                </MenuItem>
              ))}
            </TextField>
            <FormControl sx={{ marginTop: 2, minWidth: 120 }}>
              <InputLabel id="demo-multiple-name-label">Users</InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple
                value={selectUsers}
                onChange={handleSelectUsers}
                input={<OutlinedInput label="Users" />}
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return <p>Users</p>;
                  }

                  return selected.join(', ');
                }}
              >
                {users?.map((user) => (
                  <MenuItem key={user._id} value={user._id}>
                    <Checkbox checked={selectUsers.indexOf(user._id) > -1} />
                    {user.firstname} {user.lastname}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <CardActions className="createActions">
              <Button
                size="small"
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  addTicketFunction({
                    variables: {
                      ticketInput: ticketVariables,
                    },
                  });
                }}
              >
                {iconCheck}
              </Button>
            </CardActions>
          </FormControl>
        </CardContent>
      </Card>
    </div>
  );
}

export default AddTaskCard;
