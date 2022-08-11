import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import App from './App';

let url: string | undefined = ''; 

if (process.env.NODE_ENV !== 'production') {
  if (process.env.REACT_APP_LOCALHOST === 'true') {
    url = 'http://localhost:4000/graphql'
  }  else {
    url = 'http://localhost:5050/graphql'
  }
} else {
  url = '/graphql';
}
const httpLink = createHttpLink({
  uri: url,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token,
    },
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
