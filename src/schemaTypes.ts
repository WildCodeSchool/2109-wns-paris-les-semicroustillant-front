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
  __typename: 'User';
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
  __typename: 'User';
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
  __typename: 'User';
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
// GraphQL query operation: getAllTickets
// ====================================================

export interface getAllTickets_allTickets {
  __typename: 'Ticket';
  _id: string;
  subject: string;
  status: string;
  deadline: any;
  description: string;
  initial_time_estimated: number;
  total_time_spent: number | null;
  advancement: number | null;
  projectId: string;
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
