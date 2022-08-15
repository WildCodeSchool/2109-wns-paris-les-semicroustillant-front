// ====================================================
// JWT DECODE TOKEN
// ====================================================

export interface IDecodedToken {
  userId: string | unknown;
  iat: number;
  exp: number;
}

// ====================================================
// CUSTOM COMPONENTS
// ====================================================
export interface ComponentActionBtnProps {
  children: React.ReactNode;
  onClick: () => void;
};

export interface ComponentTitleBarProps {
  title: string;
  onClickRigthBtn: () => void;
  displayRightBtn?: boolean;
};

export interface ComponentCustomFilterChechBoxProps {
  label: string;
  onClick: () => void;
};


// ====================================================
// TASK CARD
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