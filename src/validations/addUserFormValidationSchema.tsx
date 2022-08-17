import * as yup from 'yup';

const addUserFormValidationSchema = yup.object({
  firstname: yup.string().required('Required'),
  lastname: yup.string().required('Required'),
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  hash: yup
    .string()
    .min(8, 'Password must contain at least 8 characters')
    .required('Enter your password'),
  confirmHash: yup
    .string()
    .oneOf([yup.ref('hash')], 'Password does not match')
    .required('Confirm your password'),
  role: yup.string().required('Select a role'),
  position: yup.string().required('Select a position'),
});

export default addUserFormValidationSchema;
