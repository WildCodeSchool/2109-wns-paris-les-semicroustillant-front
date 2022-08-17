import {
  commonRoles,
  availableRolesForUser,
  availableRolesForAdmin,
} from '../common-values/commonRoles';

const rolesList = (role: string): { value: string, label: string}[] => {
  switch (role) {
    case 'users':
      return availableRolesForUser;
    case 'admin':
      return availableRolesForAdmin;
    case 'super admin':
      return commonRoles;
    default:
      return [];
  }
};

export default rolesList;
