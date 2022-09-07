import React from 'react';
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import AddUserForm from '../../forms/AddUserForm';
import { IAddUserModal } from '../../types/custom-types';
import { ADD_ONE_USER, GET_ALL_USERS } from '../../queries/UserQueries';
import { AddOneUser, GetAllUsers } from '../../schemaTypes';

import '../../styles/AddUsers.css';

const AddUserModal = ({ toggleDisplay }: IAddUserModal): JSX.Element => {
  const [addUserFunction] = useMutation<AddOneUser>(
    ADD_ONE_USER,
    {
      update(cache, { data }) {
        const currentUserList: GetAllUsers = cache.readQuery({
          query: GET_ALL_USERS,
        }) ?? { allUsers: [] };

        cache.writeQuery({
          query: GET_ALL_USERS,
          data: {
            allUsers: [...currentUserList.allUsers, data?.addUser],
          },
        });
        toast.success('User created!');
        toggleDisplay();
      },
      onError(error) {
        toast.error(`${error.message}`);
      },
    }
  );

  return (
      <AddUserForm addUserFunction={addUserFunction} />
    );
};


export default AddUserModal;
