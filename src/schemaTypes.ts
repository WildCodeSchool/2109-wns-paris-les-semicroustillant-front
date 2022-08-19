/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: login
// ====================================================

export interface login {
  login: string;
}

export interface loginVariables {
  email: string;
  password: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CheckUserToken
// ====================================================

export interface ICheckUserToken {
  checkUserToken: boolean;
}

export interface CheckUserTokenVariables {
  token: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetTicketsProjects
// ====================================================

export interface GetTicketsProjects_getAllProjects {
  __typename: 'Project';
  _id: string;
  name: string;
}

export interface GetTicketsProjects {
  getAllProjects: GetTicketsProjects_getAllProjects[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetOneProject
// ====================================================

export interface GetOneProject_getOneProject {
  __typename: 'Project';
  _id: string;
  name: string;
}

export interface GetOneProject {
  getOneProject: GetOneProject_getOneProject;
}

export interface GetOneProjectVariables {
  projectId: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CountProjectsByUserId
// ====================================================

export interface CountProjectsByUserId {
  countProjectsByUserId: number;
}

export interface CountProjectsByUserIdVariables {
  countProjectsByUserIdId: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getAllTickets
// ====================================================

export interface getAllTickets_allTickets_project_id {
  __typename: 'Project';
  _id: string;
}

export interface getAllTickets_allTickets_users {
  __typename: 'User';
  _id: string;
}

export interface getAllTickets_allTickets {
  __typename: 'Ticket';
  _id: string;
  created_by: string;
  subject: string;
  status: string;
  deadline: any | null;
  description: string | null;
  project_id: getAllTickets_allTickets_project_id;
  initial_time_estimated: number | null;
  total_time_spent: number | null;
  advancement: number | null;
  users: getAllTickets_allTickets_users[] | null;
}

export interface getAllTickets {
  allTickets: getAllTickets_allTickets[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: TicketMutation
// ====================================================

export interface TicketMutation_addTicket_project_id {
  __typename: 'Project';
  _id: string;
}

export interface TicketMutation_addTicket_users {
  __typename: 'User';
  _id: string;
}

export interface TicketMutation_addTicket {
  __typename: 'Ticket';
  created_by: string;
  subject: string;
  status: string;
  deadline: any | null;
  description: string | null;
  initial_time_estimated: number | null;
  total_time_spent: number | null;
  project_id: TicketMutation_addTicket_project_id;
  users: TicketMutation_addTicket_users[] | null;
}

export interface TicketMutation {
  addTicket: TicketMutation_addTicket;
}

export interface TicketMutationVariables {
  ticketInput: TicketInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateTicket
// ====================================================

export interface UpdateTicket_updateTicket_project_id {
  __typename: 'Project';
  _id: string;
}

export interface UpdateTicket_updateTicket_users {
  __typename: 'User';
  _id: string;
}

export interface UpdateTicket_updateTicket {
  __typename: 'Ticket';
  _id: string;
  created_by: string;
  subject: string;
  status: string;
  deadline: any | null;
  description: string | null;
  initial_time_estimated: number | null;
  total_time_spent: number | null;
  advancement: number | null;
  project_id: UpdateTicket_updateTicket_project_id;
  users: UpdateTicket_updateTicket_users[] | null;
}

export interface UpdateTicket {
  updateTicket: UpdateTicket_updateTicket;
}

export interface UpdateTicketVariables {
  ticketInputUpdate: TicketInputUpdate;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteTicket
// ====================================================

export interface DeleteTicket {
  deleteTicket: string;
}

export interface DeleteTicketVariables {
  deleteTicketId: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CountTicketByUserId
// ====================================================

export interface CountTicketByUserId {
  countTicketsByUserId: number;
}

export interface CountTicketByUserIdVariables {
  countTicketsByUserIdId: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAllUsers
// ====================================================

export interface GetAllUsers_allUsers {
  __typename: 'User';
  _id: string;
  firstname: string;
  lastname: string;
  position: string;
  role: string;
}

export interface GetAllUsers {
  allUsers: GetAllUsers_allUsers[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getAllUsersEmail
// ====================================================

export interface getAllUsersEmail_allUsers {
  __typename: 'User';
  email: string;
}

export interface getAllUsersEmail {
  allUsers: getAllUsersEmail_allUsers[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetOneUser
// ====================================================

export interface GetOneUser_getOneUser {
  __typename: 'User';
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  position: string;
  role: string;
}

export interface GetOneUser {
  getOneUser: GetOneUser_getOneUser;
}

export interface GetOneUserVariables {
  userId: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddOneUser
// ====================================================

export interface AddOneUser_addUser {
  __typename: 'User';
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  position: string;
}

export interface AddOneUser {
  addUser: AddOneUser_addUser;
}

export interface AddOneUserVariables {
  userInput: UserInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteUser
// ====================================================

export interface DeleteUser {
  deleteUser: string;
}

export interface DeleteUserVariables {
  userId: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface TicketInput {
  created_by: string;
  subject: string;
  status: string;
  deadline?: any | null;
  description?: string | null;
  initial_time_estimated?: number | null;
  total_time_spent?: number | null;
  advancement?: number | null;
  project_id: string;
  users?: string[] | null;
}

export interface TicketInputUpdate {
  _id: string;
  created_by: string;
  subject: string;
  status: string;
  deadline?: any | null;
  description?: string | null;
  initial_time_estimated?: number | null;
  total_time_spent?: number | null;
  advancement?: number | null;
  project_id: string;
  users?: string[] | null;
}

export interface UserInput {
  firstname: string;
  lastname: string;
  email: string;
  hash: string;
  role: string;
  position: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
