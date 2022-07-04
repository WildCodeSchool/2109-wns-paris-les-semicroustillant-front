/* eslint-disable react/react-in-jsx-scope */
import Container from '@mui/material/Container';
import Header from '../components/Header';
import UsersBox from '../components/UsersBox';

const Users = (): JSX.Element => (
  <Container maxWidth="xl" style={{ height: '100%', flex: 1 }}>
    <Header title="USERS" />
    <UsersBox />
  </Container>
);
export default Users;
