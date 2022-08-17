import React from 'react';
import AddUserForm from '../../forms/AddUserForm';
import { IAddUserModal } from '../../types/custom-types';

import '../../styles/AddUsers.css';

const AddUserModal = ({ toggleDisplay }: IAddUserModal): JSX.Element => (
    <AddUserForm toggleDisplay={toggleDisplay} />
  );

export default AddUserModal;
