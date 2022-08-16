import React, { useState, ChangeEvent, useContext } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {
  Autocomplete,
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  MenuItem,
  TextField,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { toast } from 'react-toastify';

import ModalTitle from '../../assets/custom-components/ModalTitle';
import { GET_ALL_PROJECTS } from '../../queries/ProjectQueries';
import { GET_ALL_USERS } from '../../queries/UserQueries';
import { ADD_TICKET, GET_ALL_TICKETS } from '../../queries/TicketQueries';
import {
  GetTicketsProjects,
  GetAllUsers,
  TicketMutation,
  GetAllUsers_allUsers,
  GetTicketsProjects_getAllProjects,
  getAllTickets,
} from '../../schemaTypes';
import { commonStatuses } from '../../common-values/commonStatuses';
import LoginContext from '../../context/LoginContext';

import '../../styles/TaskList.css';

interface IAddTaskCard {
  toggleDisplay: () => void;
}

interface ITicketData {
  subject: string;
  description: string;
  initial_time_estimated: number | null;
  total_time_spent: number | null;
  project_id: string | null;
}

function AddTaskCard({ toggleDisplay }: IAddTaskCard): JSX.Element {
  const statuses = commonStatuses;
  const { userId: currentUser } = useContext(LoginContext);

  const [ticketData, setTicketData] = useState<ITicketData>({
    subject: '',
    description: '',
    initial_time_estimated: 0,
    total_time_spent: 0,
    project_id: '',
  });
  const [pickDeadline, setPickDeadline] = useState<Date | null>(new Date());
  const [selectStatus, setSelectStatus] = useState<string>('');
  const [selectProject, setSelectProject] = useState<
    GetTicketsProjects_getAllProjects | null | undefined
  >(null);
  const [inputValue, setInputValue] = useState('');
  const [selectUsers, setSelectUsers] = useState<GetAllUsers_allUsers[]>([]);
  const [inputError, setInputError] = useState({
    created_by: false,
    status: false,
    subject: false,
    project: false,
    initial_time_estimated: false,
    total_time_spent: false,
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

  const projectsData = useQuery<GetTicketsProjects>(GET_ALL_PROJECTS);
  const projects = projectsData.data?.getAllProjects;

  const userData = useQuery<GetAllUsers>(GET_ALL_USERS);
  const users = userData?.data?.allUsers;

  const ticketVariables = {
    created_by: currentUser,
    subject: ticketData.subject,
    status: selectStatus,
    deadline: pickDeadline,
    description: ticketData.description,
    initial_time_estimated: Number(ticketData.initial_time_estimated),
    total_time_spent: Number(ticketData.total_time_spent),
    project_id: selectProject?._id,
    users: selectUsers.map((user) => user._id),
  };

  const [addTicketFunction] = useMutation<TicketMutation>(ADD_TICKET, {
    update(cache, { data }) {
      const currentTasksList: getAllTickets = cache.readQuery({
        query: GET_ALL_TICKETS,
      }) ?? {
        allTickets: [],
      };
      const result = {
        ...data?.addTicket,
        advancement: 0,
        _id: 'temporaryId',
      };

      if (result) {
        cache.writeQuery({
          query: GET_ALL_TICKETS,
          data: {
            allTickets: [...currentTasksList.allTickets, result],
          },
        });
        toast.success('Ticket created!');
        toggleDisplay();
      }
    },
    onError(error) {
      // eslint-disable-next-line no-console
      console.log(error);
      toast.error(`${error.message}`);
    },
  });

  return (
    <div className="cardContainer">
      <ModalTitle title="Add a new task" />
      <Card
        sx={{
          minWidth: 600,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
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
              helperText={
                ticketData.subject.length > 30 &&
                'Subject must be less than 30 characters'
              }
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
              error={inputError.initial_time_estimated}
              margin="normal"
              label="Initial time estimated (hours)"
              value={ticketData.initial_time_estimated}
              onChange={handleData}
              helperText={
                Number.isNaN(ticketVariables.initial_time_estimated) === true &&
                'Time must be a number'
              }
            />
            <TextField
              error={inputError.total_time_spent}
              id="total_time_spent"
              margin="normal"
              label="Total time spent (hours)"
              value={ticketData.total_time_spent}
              onChange={handleData}
              helperText={
                Number.isNaN(ticketVariables.total_time_spent) === true &&
                'Time must be a number'
              }
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
              getOptionLabel={(user) =>
                `${user.firstname} ${user.lastname} - ${user.position}`
              }
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
                size="large"
                type="submit"
                color="error" 
                disabled={
                  !selectStatus ||
                  !ticketData.subject ||
                  ticketData.subject.length > 30 ||
                  Number.isNaN(ticketVariables.initial_time_estimated) ===
                    true ||
                  Number.isNaN(ticketVariables.total_time_spent) === true ||
                  !selectProject
                }
                onClick={(e) => {
                  e.preventDefault();
                  if (selectStatus && ticketData.subject && selectProject) {
                    addTicketFunction({
                      variables: {
                        ticketInput: ticketVariables,
                      },
                    });
                  }
                  if (!selectStatus) {
                    setInputError({
                      ...inputError,
                      status: true,
                    });
                  }
                  if (!ticketData.subject || ticketData.subject.length > 30) {
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
                  if (
                    Number.isNaN(ticketVariables.initial_time_estimated) ===
                    true
                  ) {
                    setInputError({
                      ...inputError,
                      initial_time_estimated: true,
                    });
                  }
                  if (Number.isNaN(ticketVariables.total_time_spent) === true) {
                    setInputError({
                      ...inputError,
                      total_time_spent: true,
                    });
                  }
                }}
              >
                SUBMIT
              </Button>
            </CardActions>
          </FormControl>
        </CardContent>
      </Card>
    </div>
  );
}

export default AddTaskCard;
