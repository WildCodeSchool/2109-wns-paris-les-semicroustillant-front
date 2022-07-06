interface IDefaultState {
  loggedIn?: boolean;
  token?: string;
  userFirstname?: string;
  userLastname?: string;
  userPosition?: string;
}
const initialState = {
  token: '',
  userFirstname: '',
  userLastname: '',
  userPosition: '',
};

export default initialState;
