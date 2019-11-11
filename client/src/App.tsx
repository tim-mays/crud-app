import React from 'react';
import Routes from 'routes';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const apolloClient = new ApolloClient({
  uri: 'http://localhost:8081/graphql' // TODO: move this to env
});

const App: React.FC = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <React.Fragment>
        <Routes />
      </React.Fragment>
    </ApolloProvider>
  );
};

export default App;
