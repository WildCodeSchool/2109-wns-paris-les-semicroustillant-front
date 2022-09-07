import React, { useContext, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useFormik, FormikProps } from 'formik';
import {
  Card,
  CardContent,
  CardActions,
  TextField,
  MenuItem,
  Button,
} from '@mui/material';
import { toast } from 'react-toastify';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import ModalTitle from '../assets/custom-components/ModalTitle';
import addTaskFormValidationSchema from '../validations/addUserFormValidationSchema';
import { GET_ALL_USERS } from '../queries/UserQueries';
import { ADD_TICKET , GET_ALL_TICKETS } from '../queries/TicketQueries';
import {
  GetAllUsers,
  GetTicketsProjects,
  TicketMutation,
  getAllTickets,
} from '../schemaTypes';
import { IAddTaskCard, IAddTicketInputValues } from '../types/custom-types';
import LoginContext from '../context/LoginContext';
import { commonStatusesObject } from '../common-values/commonStatuses';
import { GET_ALL_PROJECTS } from '../queries/ProjectQueries';

const form = (formik: FormikProps<IAddTicketInputValues>) => {
  const [pickDeadline, setPickDeadline] = useState<Date | null>(new Date());

  const projectsData = useQuery<GetTicketsProjects>(GET_ALL_PROJECTS);
  const projects = projectsData.data?.getAllProjects;

  const userData = useQuery<GetAllUsers>(GET_ALL_USERS);
  const users = userData?.data?.allUsers;

  return (
    <div>
      <ModalTitle title="Add a new ticket" />
      <form onSubmit={formik.handleSubmit}>
        <Card>
          <CardContent>
            <TextField
              select
              id="status"
              label="Select a status"
              value={formik.values.status || ''}
              onChange={formik.handleChange('status')}
              helperText={formik.touched.status ? formik.errors.status : ''}
              error={formik.touched.status && Boolean(formik.errors.status)}
              margin="dense"
              variant="outlined"
              fullWidth
            >
              {commonStatusesObject.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
  
            <TextField
              id="subject"
              label="Subject"
              value={formik.values.subject || ''}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={formik.touched.subject ? formik.errors.subject : ''}
              error={formik.touched.subject && Boolean(formik.errors.subject)}
              margin="dense"
              variant="outlined"
              fullWidth
            />
  
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                label="Deadline"
                value={pickDeadline}
                onChange={(value) => {
                  setPickDeadline(value);
                }}
                renderInput={(params) => (
                  <TextField
                    id="deadline"
                    onBlur={formik.handleBlur}
                    helperText={
                      formik.touched.deadline ? formik.errors.deadline : ''
                    }
                    error={
                      formik.touched.deadline && Boolean(formik.errors.deadline)
                    }
                    margin="dense"
                    variant="outlined"
                    fullWidth
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...params}
                  />
                )}
              />
            </LocalizationProvider>
  
            <TextField
              id="description"
              label="Description"
              value={formik.values.description || ''}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={
                formik.touched.description ? formik.errors.description : ''
              }
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              margin="dense"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
            />
  
            <TextField
              id="initial_time_estimated"
              label="Initial time estimated (hours)"
              type="number"
              value={formik.values.initial_time_estimated || 0}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={
                formik.touched.initial_time_estimated
                  ? formik.errors.initial_time_estimated
                  : ''
              }
              error={
                formik.touched.initial_time_estimated &&
                Boolean(formik.errors.initial_time_estimated)
              }
              margin="dense"
              variant="outlined"
              fullWidth
            />
  
            <TextField
              id="total_time_spent"
              label="Total time spent (hours)"
              type="number"
              value={formik.values.total_time_spent || 0}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={
                formik.touched.total_time_spent
                  ? formik.errors.total_time_spent
                  : ''
              }
              error={
                formik.touched.total_time_spent &&
                Boolean(formik.errors.total_time_spent)
              }
              margin="dense"
              variant="outlined"
              fullWidth
            />

            {/* <Autocomplete
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
            /> */}
  
            <TextField
              select
              id="project_id"
              label="Select a project"
              value={formik.values.project_id || ''}
              onChange={formik.handleChange('project_id')}
              helperText={
                formik.touched.project_id ? formik.errors.project_id : ''
              }
              error={
                formik.touched.project_id && Boolean(formik.errors.project_id)
              }
              margin="dense"
              variant="outlined"
              fullWidth
            >
              {projects && projects.map((option) => (
                <MenuItem key={option._id} value={option._id}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
  
            <TextField
              select
              id="users"
              label="Select one or several users"
              value={formik.values.users || ''}
              onChange={formik.handleChange('users')}
              helperText={formik.touched.users ? formik.errors.users : ''}
              error={formik.touched.users && Boolean(formik.errors.users)}
              margin="dense"
              variant="outlined"
              fullWidth
            >
              {users && users.map((option) => (
                <MenuItem key={option._id} value={option._id}>
                  {option.firstname} {option.lastname} - {option.position}
                </MenuItem>
              ))}
            </TextField>
          </CardContent>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <CardActions>
              <Button color="secondary" onClick={formik.handleReset}>
                CLEAR
              </Button>
              <Button type="submit" color="error" disabled={formik.isSubmitting}>
                SUBMIT
              </Button>
            </CardActions>
          </div>
        </Card>
      </form>
    </div>
  );
};

const AddTaskForm = ({ toggleDisplay }: IAddTaskCard): JSX.Element => {
  const [addTicketFunction] = useMutation<TicketMutation>(
    ADD_TICKET,

    {
      update(cache, { data }) {
        const currentTaksList: getAllTickets = cache.readQuery({
          query: GET_ALL_TICKETS,
        }) ?? {
          allTickets: [],
        };

        cache.writeQuery({
          query: GET_ALL_TICKETS,
          data: {
            allTickets: [...currentTaksList.allTickets, data?.addTicket],
          },
        });
        toast.success('Ticket created!');
        toggleDisplay();
      },
      onError(error) {
        // eslint-disable-next-line no-console
        console.log(error);
        toast.error(`${error.message}`);
      },
    }
  );

  const { userId: currentUser } = useContext(LoginContext);

  const formik: FormikProps<IAddTicketInputValues> =
    useFormik<IAddTicketInputValues>({
      initialValues: {
        created_by: currentUser,
        subject: '',
        status: '',
        deadline: new Date(),
        description: '',
        initial_time_estimated: 0,
        total_time_spent: 0,
        project_id: '',
        users: [],
      },
      validationSchema: addTaskFormValidationSchema,
      onSubmit: (values: IAddTicketInputValues) => {
        addTicketFunction({
          variables: {
            ticketInput: values,
          },
        });
      },
    });

  return form(formik);
};

export default AddTaskForm;
