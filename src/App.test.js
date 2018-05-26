import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount, render } from 'enzyme';
import { eosMock, blocksInSequence,  } from './test/local-test-utils';
import App from './App';

import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import gql from 'graphql-tag';

// global objects accessible to all tests
let cache;
let client;
let appComp;

/**
 * Setup graphql client
 * and create the component
 * before each test
 */
beforeEach(() => {
  cache = new InMemoryCache();

  client = new ApolloClient({
    link: new HttpLink(),
    cache
  });
  
  appComp = shallow(
    <ApolloProvider client={client}>
      <App client={client} eos={eosMock}/>
    </ApolloProvider>
  );

});

it('should render without crashing', () => {
  expect(appComp).toBeTruthy();
});

it('should render the app title', () => {
  expect(appComp.first().render().find('h1.App-title').text()).toContain('Most Recent EOS Blocks');
});

// having a lot of trouble working with asynchronously rendered
// components. Perhaps a design flaw on my part.
it('should render 10 latest blocks when load button is clicked', (done) => {
  const wrapper = appComp.first().shallow();
  let query =gql`
    query EosBlocksQuery {
      block {
        id
        blockNum
        timestamp
        transactions
        rawData
      }
    }
  `;
  
  // very hacky and flaky... 
  // there must be a better way to 
  // work with components rendered asynchronously
  setTimeout(() => {
    const blocks = client.readQuery({ query });
    expect(blocks.block.length).toBe(10);
    done();
  }, 1000);
  
});




