import React, { useState, ChangeEvent } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {
  Autocomplete,
  Card,
  CardActions,
  CardContent,
  Button,
  TextField,
  FormControl,
  MenuItem,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import ModalTitle from '../../assets/custom-components/ModalTitle';
import {
  GetTicketsProjects,
  GetAllUsers,
  UpdateTicket,
  GetAllUsers_allUsers,
  GetTicketsProjects_getAllProjects,
  GetOneProject,
} from '../../schemaTypes';
import { GET_ONE_USER, GET_ALL_USERS } from '../../queries/UserQueries';
import { GET_ALL_PROJECTS, GET_PROJECT } from '../../queries/ProjectQueries';
import { UPDATE_TICKET } from '../../queries/TicketQueries';
import { commonStatuses } from '../../common-values/commonStatuses';

import '../../styles/TaskList.css';

interface ITicketData {
  subject: string;
  description: string | null;
  initial_time_estimated: number | null;
  total_time_spent: number | null;
  project_id: string | null;
}
interface IUpdateTaskCard {
  toggleDisplay: () => void;
  _id: string;
  _created_by: string;
  _status: string | null;
  _subject: string;
  _deadline: Date;
  _description: string | null;
  _initial_time_estimated: number | null;
  _total_time_spent: number | null;
  _project_id: string | null;
  _users: IUserTicket[] | null;
}

interface IUserTicket {
  _id: string;
}

function UpdateTaskCard({
  toggleDisplay,
  _id,
  _created_by,
  _status,
  _subject,
  _deadline,
  _description,
  _initial_time_estimated,
  _total_time_spent,
  _project_id,
  _users,
}: IUpdateTaskCard): JSX.Element {
  const iconCheck = <FontAwesomeIcon icon={faCheck} />;
  const statuses = commonStatuses;

  const getCreatedByDetails = useQuery(GET_ONE_USER, {
    variables: { userId: _created_by },
  });
  const createdByDetails = getCreatedByDetails.data?.getOneUser;

  const [ticketData, setTicketData] = useState<ITicketData>({
    subject: _subject,
    description: _description,
    initial_time_estimated: _initial_time_estimated,
    total_time_spent: _total_time_spent,
    project_id: _project_id,
  });
  const [pickDeadline, setPickDeadline] = useState<Date | null>(
    new Date(_deadline)
  );
  const [selectStatus, setSelectStatus] = useState<string>(_status || '');

  const getProjectDetails = useQuery<GetOneProject>(GET_PROJECT, {
    variables: { projectId: _project_id },
  });
  const projectDetails = getProjectDetails.data?.getOneProject;

  const [selectProject, setSelectProject] = useState<
    GetTicketsProjects_getAllProjects | null | undefined
  >(projectDetails);

  const [inputValue, setInputValue] = useState('');

  const getUsersNames = useQuery<GetAllUsers>(GET_ALL_USERS);
  const allUsers = getUsersNames.data?.allUsers;

  const usersNames = () => {
    const result: GetAllUsers_allUsers[] = [];
    allUsers?.map((user) =>
      _users?.map((userId) => user._id === userId._id && result.push(user))
    );
    return result;
  };

  const [selectUsers, setSelectUsers] = useState<GetAllUsers_allUsers[]>(
    usersNames()
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

  const projectsData = useQuery<GetTicketsProjects>(GET_ALL_PROJECTS);
  const projects = projectsData.data?.getAllProjects;

  const userData = useQuery<GetAllUsers>(GET_ALL_USERS);
  const users = userData?.data?.allUsers;

  const ticketVariables = {
    _id,
    created_by: _created_by,
    subject: ticketData.subject,
    status: selectStatus,
    deadline: pickDeadline,
    description: ticketData.description,
    initial_time_estimated: Number(ticketData.initial_time_estimated),
    total_time_spent: Number(ticketData.total_time_spent),
    project_id: selectProject?._id,
    users: selectUsers.map((user) => user._id),
  };

  const [updateTicketFunction] = useMutation<UpdateTicket>(UPDATE_TICKET, {
    onCompleted() {
      toast.success('Ticket updated!');
      toggleDisplay();
    },
    onError(error) {
      // eslint-disable-next-line no-console
      console.log(error);
      toast.error(`${error.message}`);
    },
  });

  return (
    <div className="cardContainer">
      <ModalTitle title="Edit a task" />
      <Card sx={{ minWidth: 600, display: 'flex', justifyContent: 'center' }}>
        <CardContent>
          <FormControl
            sx={{ m: 1, minWidth: 120 }}
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <TextField
              disabled
              margin="normal"
              label="Created by"
              value={
                createdByDetails &&
                `${createdByDetails.firstname} ${createdByDetails.lastname} - ${createdByDetails.position}`
              }
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
                  placeholder={selectUsers.length !== 0 ? undefined : 'Users'}
                />
              )}
            />

            <CardActions className="createActions">
              <Button
                size="large"
                type="submit"
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
                    updateTicketFunction({
                      variables: {
                        ticketInputUpdate: ticketVariables,
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
                {iconCheck}
              </Button>
            </CardActions>
          </FormControl>
        </CardContent>
      </Card>
    </div>
  );
}

export default UpdateTaskCard;
