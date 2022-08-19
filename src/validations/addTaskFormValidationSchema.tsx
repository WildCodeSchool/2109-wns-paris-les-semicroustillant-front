import * as yup from 'yup';

const addTaskFormValidationSchema = yup.object({
  created_by: yup.string().required(),
  subject: yup
    .string()
    .min(1)
    .max(125, 'Subject must contain less than 125 characters')
    .required('Required'),
  deadline: yup.date().required('Required'),
  description: yup
    .string()
    .min(1)
    .max(250, 'Ticket description must be between 1 and 250 characters')
    .required('Required'),
  initial_time_estimated: yup.number(),
  total_time_spent: yup.number(),
  project_id: yup.string().required('Select a project'),
  users: yup.array().of(yup.string()).required('Select one or several users'),
});

export default addTaskFormValidationSchema;
