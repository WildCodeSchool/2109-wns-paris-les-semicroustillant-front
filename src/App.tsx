import React from 'react';
import './App.css';
import jwt_decode from 'jwt-decode';
import { useQuery, gql } from '@apollo/client';
import { ToastContainer } from 'react-toastify';
import AppRouter from './Router';
import LoginContext from './context/LoginContext';
import { GetOneUser } from './schemaTypes';
import 'react-toastify/dist/ReactToastify.css';

function App(): JSX.Element {
  interface IDecodedToken {
    userId: string;
    iat: number;
    exp: number;
  }
  // @FREDY: remove comments

  //   const [user, setUser] = useState<GetOneUser | unknown>({});
  //   const [loggedIn, setLoggedIn] = useState(false);

  //   const GET_USER = gql`
  //   query GetOneUser($userId: String!) {
  //     getOneUser(userId: $userId) {
  //       _id
  //       firstname
  //     }
  //   }
  // `;

  //   useEffect(() => {
  //     const token = localStorage.getItem('token');

  //     if (token) {
  //       const decodedToken: '' | IDecodedToken | null = token && jwt_decode(token);
  //       const userId = decodedToken && decodedToken.userId;

  //       console.log('----- USER ID FROM TOKEN - APP -----', userId);

  //       const { data } = useQuery<GetOneUser>(GET_USER, { variables: { userId } });
  //       console.log('----- DATA APP -----', data);

  //       if (data) {
  //         setUser(data.getOneUser);
  //         setLoggedIn(true);
  //       }
  //     }
  //     localStorage.removeItem('token');
  //     setLoggedIn(false);

  //   }, []);

  const token = localStorage.getItem('token');
  const decodedToken: '' | IDecodedToken | null = token && jwt_decode(token);
  const userId = decodedToken && decodedToken.userId;

  // console.log('----- DECODED TOKEN -----', decodedToken);

  const GET_USER = gql`
    query GetOneUser($userId: String!) {
      getOneUser(userId: $userId) {
        _id
        firstname
        lastname
        position
      }
    }
  `;

  const { data } = useQuery<GetOneUser>(GET_USER, { variables: { userId } });
  const userFirstname = data?.getOneUser.firstname;
  const userLastname = data?.getOneUser.lastname;
  const userPosition = data?.getOneUser.position;

  // if (!data) {
  //   localStorage.removeItem('token');
  // }

  return (
    <>
      <LoginContext.Provider value={{ userFirstname, userLastname, userPosition }}>
        <AppRouter />
        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </LoginContext.Provider>
    </>
  );
}

export default App;

// @FREDY: remove comments
// Refresh useEffect when changing pages at App level => useNavigate/useHistory/useRef
