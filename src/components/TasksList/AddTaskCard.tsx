import React, { useState, ChangeEvent, useContext } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import Autocomplete from '@mui/material/Autocomplete';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import {
  GetTicketsProjects,
  AllTicketsUsers,
  TicketMutation,
  AllTicketsUsers_allUsers,
  GetTicketsProjects_getAllProjects,
  getAllTickets,
} from '../../schemaTypes';
import {
  ADD_TICKET,
  GET_PROJECTS,
  GET_USERS,
  GET_TICKETS,
} from '../../queries/TasksQueries';
import LoginContext from '../../context/LoginContext';
import '../../styles/TaskList.css';


interface IAddTaskCard {
  toggleDisplay: () => void;
}
function AddTaskCard({ toggleDisplay }: IAddTaskCard): JSX.Element {
  const userContext = useContext(LoginContext);
  const iconCheck = <FontAwesomeIcon icon={faCheck} />;
  const statuses = ['In Progress', 'In Production', 'Done', 'Delayed'];
  interface ITicketData {
    subject: string;
    description: string;
    initial_time_estimated: number | null;
    total_time_spent: number | null;
    project_id: string;
  }
  const [ticketData, setTicketData] = useState<ITicketData>({
    subject: '',
    description: '',
    initial_time_estimated: 0,
    total_time_spent: 0,
    project_id: '',
  });
  const [pickDeadline, setPickDeadline] = useState<Date | null>(new Date());
  const [selectStatus, setSelectStatus] = useState<string>('');
  const [selectProject, setSelectProject] = React.useState<
    GetTicketsProjects_getAllProjects | null | undefined
  >(null);
  const [inputValue, setInputValue] = React.useState('');
  const [selectUsers, setSelectUsers] = useState<AllTicketsUsers_allUsers[]>(
    []
  );
  const [inputError, setInputError] = useState({
    status: false,
    subject: false,
    project: false,
  });

  const handleData = (event: ChangeEvent<HTMLInputElement>) => {
    setTicketData({
      ...ticketData,
      [event.target.id]: event.target.value,
    });
  };

  const handleSelectStatus = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectStatus(event.target.value);
  };

  const projectsData = useQuery<GetTicketsProjects>(GET_PROJECTS);
  const projects = projectsData.data?.getAllProjects;

  const userData = useQuery<AllTicketsUsers>(GET_USERS);
  const users = userData?.data?.allUsers;

  const ticketVariables = {
    created_by: userContext.userId,
    subject: ticketData.subject,
    status: selectStatus,
    deadline: pickDeadline,
    description: ticketData.description,
    initial_time_estimated: Number(ticketData.initial_time_estimated),
    total_time_spent: Number(ticketData.total_time_spent),
    project_id: selectProject?._id,
    users: selectUsers.map((user) => ({ _id: user._id })),
  };

  const [addTicketFunction] = useMutation<TicketMutation>(ADD_TICKET, {
    update(cache, { data }) {
      const currentTasksList: getAllTickets = cache.readQuery({
        query: GET_TICKETS,
      }) ?? {
        allTickets: [],
      };
      const result = { ...data?.addTicket/* , advancement: 0, _id: 'temporaryId' */ };

      if (result) {
        cache.writeQuery({
          query: GET_TICKETS,
          data: {
            allTickets: [...currentTasksList.allTickets, result],
          },
        });
      }
    },
  });

  return (
    <div className="cardContainer">
      <Card sx={{ marginBottom: 25, minWidth: 600 }}>
        <CardContent>
          <FormControl
            sx={{ m: 1, minWidth: 120 }}
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <TextField
              required
              error={inputError.status}
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
              required
              error={inputError.subject}
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
            <Autocomplete
              value={selectProject}
              onChange={(event, newValue) => {
                setSelectProject(newValue);
              }}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              id="controllable-states-demo"
              options={projects || []}
              getOptionLabel={(project) => project.name}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...params}
                  required
                  error={inputError.project}
                  label="Project"
                />
              )}
            />

            <Autocomplete
              sx={{ marginTop: 2 }}
              multiple
              id="tags-outlined"
              value={selectUsers}
              options={users || []}
              onChange={(event, newValue) => {
                setSelectUsers(newValue);
              }}
              getOptionLabel={(user) => `${user.firstname} ${user.lastname}`}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...params}
                  label="Users"
                  placeholder="Users"
                />
              )}
            />

            <CardActions className="createActions">
              <Button
                size="small"
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  if (selectStatus && ticketData.subject && selectProject) {
                    addTicketFunction({
                      variables: {
                        ticketInput: ticketVariables,
                      },
                    });

                    toggleDisplay();
                  }
                  if (!selectStatus) {
                    setInputError({
                      ...inputError,
                      status: true,
                    });
                  }
                  if (!ticketData.subject) {
                    setInputError({
                      ...inputError,
                      subject: true,
                    });
                  }
                  if (!selectProject) {
                    setInputError({
                      ...inputError,
                      project: true,
                    });
                  }
                }}
              >
                Validate {iconCheck}
              </Button>
            </CardActions>
          </FormControl>
        </CardContent>
      </Card>
    </div>
  );
}

export default AddTaskCard;
