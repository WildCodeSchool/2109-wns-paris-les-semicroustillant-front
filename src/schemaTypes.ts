/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetOneUser
// ====================================================

export interface GetOneUser_getOneUser {
  __typename: "User";
  _id: string;
  firstname: string;
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
// GraphQL mutation operation: Mutation
// ====================================================

export interface Mutation_addUser {
  __typename: "User";
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  hash: string;
  role: string;
  position: string;
}

export interface Mutation {
  addUser: Mutation_addUser;
}

export interface MutationVariables {
  userInput: UserInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getUsers
// ====================================================

export interface getUsers_allUsers {
  __typename: "User";
  email: string;
}

export interface getUsers {
  allUsers: getUsers_allUsers[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getAllUsers
// ====================================================

export interface getAllUsers_allUsers {
  __typename: "User";
  _id: string;
  firstname: string;
  lastname: string;
  role: string;
}

export interface getAllUsers {
  allUsers: getAllUsers_allUsers[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteOneUser
// ====================================================

export interface DeleteOneUser {
  deleteUser: string;
}

export interface DeleteOneUserVariables {
  deleteUserId: string;
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
  deleteUserId: string;
}

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
// GraphQL query operation: GetTicketsProjects
// ====================================================

export interface GetTicketsProjects_getAllProjects {
  __typename: "Project";
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
// GraphQL query operation: AllTicketsUsers
// ====================================================

export interface AllTicketsUsers_allUsers {
  __typename: "User";
  _id: string;
  firstname: string;
  lastname: string;
}

export interface AllTicketsUsers {
  allUsers: AllTicketsUsers_allUsers[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: TicketMutation
// ====================================================

export interface TicketMutation_addTicket_users {
  __typename: "User";
  _id: string;
}

export interface TicketMutation_addTicket {
  __typename: "Ticket";
  subject: string;
  status: string;
  deadline: any;
  description: string;
  initial_time_estimated: number;
  total_time_spent: number | null;
  projectId: string;
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
// GraphQL query operation: getAllTicketsCard
// ====================================================

export interface getAllTicketsCard_allTickets_users {
  __typename: "User";
  _id: string;
}

export interface getAllTicketsCard_allTickets {
  __typename: "Ticket";
  _id: string;
  subject: string;
  status: string;
  deadline: any;
  description: string;
  initial_time_estimated: number;
  total_time_spent: number | null;
  advancement: number | null;
  projectId: string;
  users: getAllTicketsCard_allTickets_users[] | null;
}

export interface getAllTicketsCard {
  allTickets: getAllTicketsCard_allTickets[];
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
// GraphQL query operation: getAllTickets
// ====================================================

export interface getAllTickets_allTickets_users {
  __typename: "User";
  _id: string;
}

export interface getAllTickets_allTickets {
  __typename: "Ticket";
  _id: string;
  subject: string;
  status: string;
  deadline: any;
  description: string;
  initial_time_estimated: number;
  total_time_spent: number | null;
  advancement: number | null;
  projectId: string;
  users: getAllTickets_allTickets_users[] | null;
}

export interface getAllTickets {
  allTickets: getAllTickets_allTickets[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface IdInput {
  _id: string;
}

export interface TicketInput {
  subject: string;
  status?: string | null;
  deadline?: any | null;
  description?: string | null;
  initial_time_estimated?: number | null;
  total_time_spent?: number | null;
  advancement?: number | null;
  projectId?: string | null;
  users?: IdInput[] | null;
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
