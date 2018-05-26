import React from 'react';
import { shallow, mount, render } from 'enzyme';
import BlockEntry from './BlockEntry';

import md5 from 'md5';

const testTimestamp = '2018-05-25T19:16:43.500';
const testTransactions = ['tr1','t2','tr3','tr4'];

it('should render without crashing', () => {
  expect(
    shallow(<BlockEntry timestamp={testTimestamp} transactions={[]}/>)
  ).toBeTruthy();
});

it('should render span with md5sum of timestamp', () => {
  const comp = shallow(<BlockEntry timestamp={testTimestamp} transactions={[]}/>);
  expect(comp.text()).toContain(md5(testTimestamp));
});

it('should render with the length of the transactions list', () => {
  const comp = shallow(
    <BlockEntry timestamp={testTimestamp} 
    transactions={testTransactions}/>
  );

  expect(comp.text()).toContain('actions: ' + testTransactions.length);
});