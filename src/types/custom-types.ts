import { JwtPayload } from 'jwt-decode';

// ====================================================
// JWT DECODE TOKEN
// ====================================================

export interface IDecodedToken {
  userId: string;
  userRole: string;
  iat: number;
  exp: number;
}

export type InsideToken = string | null;

export type CustomJwtPayload = JwtPayload & IDecodedToken;

// ====================================================
// CUSTOM COMPONENTS
// ====================================================
export interface IComponentActionBtnProps {
  children: React.ReactNode;
  onClick: () => void;
};

export interface IComponentTitleBarProps {
  title: string;
  onClickRigthBtn: () => void;
  hideRightBtn?: boolean;
};

export interface IComponentCustomFilterChechBoxProps {
  label: string;
  onClick: () => void;
};

export interface IComponentModalTitleBarProps {
  title: string;
};

// ====================================================
// TASKS CARD
// ====================================================
export interface ITicketCard {
  _id: string;
  created_by: string;
  subject: string;
  status: string | null;
  deadline: Date;
  description: string | null;
  initial_time_estimated: number | null;
  total_time_spent: number | null;
  advancement: number | null;
  project_id: string | null;
  users: IUserTicket[] | null;
}

export interface IAddTicketInputValues {
  created_by: string;
  subject: string;
  status: string;
  deadline?: Date;
  description?: string;
  initial_time_estimated?: number;
  total_time_spent?: number;
  advancement?: number;
  project_id: string;
  users?: IUserTicket[];
}

export interface IExistingTickets {
  allTickets: ITicketCard[];
}

export interface IUserTicket {
  _id: string;
}

export interface IAddTaskCard {
  toggleDisplay: () => void;
}


// ====================================================
// USERS CARD
// ====================================================
export interface IAddUserModal {
  toggleDisplay: () => void;
}

export interface IAddUserInputValues {
  firstname: string;
  lastname: string;
  email: string;
  hash: string;
  confirmHash?: string;
  role: string;
  position: string;
}

export interface IUserDetails {
  userId: string;
  toggleDisplay: () => void;
}
