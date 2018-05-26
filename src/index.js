import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

import * as Eos from 'eosjs';

// app resources and services
const eos = Eos.Localnet();

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: new HttpLink(),
  cache
});

const Root = () => (
  <ApolloProvider client={client}>
    <App client={client} eos={eos}/>
  </ApolloProvider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
