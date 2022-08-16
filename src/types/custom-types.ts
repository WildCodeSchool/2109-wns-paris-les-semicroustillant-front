// ====================================================
// JWT DECODE TOKEN
// ====================================================

export interface IDecodedToken {
  userId: string | unknown;
  userRole: string | unknown;
  iat: number;
  exp: number;
}

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
  displayRightBtn?: boolean;
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

export interface IExistingTickets {
  allTickets: ITicketCard[];
}

export interface IUserTicket {
  _id: string;
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
