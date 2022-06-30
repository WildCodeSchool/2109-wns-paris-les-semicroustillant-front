import React, { useState, ChangeEvent } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import Autocomplete from '@mui/material/Autocomplete';
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
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
import '../../styles/TaskList.css';

interface IAddTaskCard {
  toggleDisplay: () => void;
}
function AddTaskCard({ toggleDisplay }: IAddTaskCard): JSX.Element {
  const iconCheck = <FontAwesomeIcon icon={faCheck} />;
  const statuses = ['In progress', 'To do', 'Done'];
  interface ITicketData {
    subject: string;
    description: string;
    initial_time_estimated: number | null;
    total_time_spent: number | null;
    project_id: string | null;
  }

  const [selectCreatedBy, setSelectCreatedBy] =
    useState<AllTicketsUsers_allUsers | null>(null);
  const [createdByInputValue, setCreatedByInputValue] = React.useState('');
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

  const projectsData = useQuery<GetTicketsProjects>(GET_PROJECTS);
  const projects = projectsData.data?.getAllProjects;

  const userData = useQuery<AllTicketsUsers>(GET_USERS);
  const users = userData?.data?.allUsers;

  const ticketVariables = {
    created_by: selectCreatedBy?._id,
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
        query: GET_TICKETS,
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
          query: GET_TICKETS,
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
          <Autocomplete
            value={selectCreatedBy}
            onChange={(event, newValue) => {
              setSelectCreatedBy(newValue);
            }}
            inputValue={createdByInputValue}
            onInputChange={(event, newInputValue) => {
              setCreatedByInputValue(newInputValue);
            }}
            id="controllable-states-demo"
            options={users || []}
            getOptionLabel={(user) => `${user.firstname} ${user.lastname}`}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...params}
                required
                error={inputError.created_by}
                label="Created by"
              />
            )}
          />
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
              size="large"
              type="submit"
              disabled={
                !selectStatus ||
                !selectCreatedBy ||
                !ticketData.subject ||
                ticketData.subject.length > 30 ||
                Number.isNaN(ticketVariables.initial_time_estimated) === true ||
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
                if (!selectCreatedBy) {
                  setInputError({
                    ...inputError,
                    created_by: true,
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
                  Number.isNaN(ticketVariables.initial_time_estimated) === true
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
              {iconCheck}
            </Button>
          </CardActions>
        </FormControl>
      </CardContent>
    </Card>
  );
}

export default AddTaskCard;
