import React, { useContext } from 'react';
import { useFormik, FormikProps } from 'formik';
import {
  Card,
  CardContent,
  CardActions,
  TextField,
  MenuItem,
  Button,
} from '@mui/material';
import ModalTitle from '../assets/custom-components/ModalTitle';
import addUserFormValidationSchema from '../validations/addUserFormValidationSchema';
import commonPositions from '../common-values/commonPositions';
import rolesList from '../utils/rolesList';
import { IAddUserForm, IAddUserInputValues } from '../types/custom-types';
import LoginContext from '../context/LoginContext';

const form = (formik: FormikProps<IAddUserInputValues>) => {
  const { userRole } = useContext(LoginContext);

  return (
    <div>
      <ModalTitle title="Add a new user" />
      <form onSubmit={formik.handleSubmit}>
        <Card>
          <CardContent>
            <TextField
              id="firstname"
              label="First Name"
              value={formik.values.firstname || ''}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={
                formik.touched.firstname ? formik.errors.firstname : ''
              }
              error={
                formik.touched.firstname && Boolean(formik.errors.firstname)
              }
              margin="dense"
              variant="outlined"
              fullWidth
            />
            <TextField
              id="lastname"
              label="Last Name"
              value={formik.values.lastname || ''}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={formik.touched.lastname ? formik.errors.lastname : ''}
              error={formik.touched.lastname && Boolean(formik.errors.lastname)}
              margin="dense"
              variant="outlined"
              fullWidth
            />
            <TextField
              id="email"
              label="Email"
              type="email"
              value={formik.values.email || ''}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={formik.touched.email ? formik.errors.email : ''}
              error={formik.touched.email && Boolean(formik.errors.email)}
              margin="dense"
              variant="outlined"
              fullWidth
            />
            <TextField
              id="hash"
              label="Password"
              type="password"
              value={formik.values.hash || ''}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={formik.touched.hash ? formik.errors.hash : ''}
              error={formik.touched.hash && Boolean(formik.errors.hash)}
              margin="dense"
              variant="outlined"
              fullWidth
            />
            <TextField
              id="confirmHash"
              label="Confirm Password"
              type="password"
              value={formik.values.confirmHash || ''}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={
                formik.touched.confirmHash ? formik.errors.confirmHash : ''
              }
              error={
                formik.touched.confirmHash && Boolean(formik.errors.confirmHash)
              }
              margin="dense"
              variant="outlined"
              fullWidth
            />
            <TextField
              select
              id="role"
              label="Select a role"
              value={formik.values.role || ''}
              onChange={formik.handleChange('role')}
              helperText={formik.touched.role ? formik.errors.role : ''}
              error={formik.touched.role && Boolean(formik.errors.role)}
              margin="dense"
              variant="outlined"
              fullWidth
            >
              {rolesList(userRole).map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              id="position"
              label="Select a position"
              value={formik.values.position || ''}
              onChange={formik.handleChange('position')}
              helperText={formik.touched.position ? formik.errors.position : ''}
              error={formik.touched.position && Boolean(formik.errors.position)}
              margin="dense"
              variant="outlined"
              fullWidth
            >
              {commonPositions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </CardContent>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <CardActions>
              <Button color="secondary" onClick={formik.handleReset}>
                CLEAR
              </Button>
              <Button
                type="submit"
                color="error"
                disabled={formik.isSubmitting}
              >
                SUBMIT
              </Button>
            </CardActions>
          </div>
        </Card>
      </form>
    </div>
  );
};

const AddUserForm = ({ addUserFunction }: IAddUserForm): JSX.Element => {
  const formik: FormikProps<IAddUserInputValues> =
    useFormik<IAddUserInputValues>({
      initialValues: {
        firstname: '',
        lastname: '',
        email: '',
        hash: '',
        confirmHash: '',
        role: '',
        position: '',
      },
      validationSchema: addUserFormValidationSchema,
      onSubmit: (values: IAddUserInputValues) => {
        // eslint-disable-next-line no-param-reassign
        delete values.confirmHash;

        addUserFunction({
          variables: {
            userInput: values,
          },
        });
      },
    });

  return form(formik);
};

export default AddUserForm;
