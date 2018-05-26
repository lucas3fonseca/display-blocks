import React from 'react';
import { shallow, mount, render } from 'enzyme';
import BlockDetails from './BlockDetails';

const testRawData = `
    { "timestamp": "2018-05-25T16:58:58.000", 
    "producer": "eosio", "confirmed": 0, 
    "previous": "0003873133a662068c01970dab655b23be17a5b632358422ae5895f1a0d00d6e", 
    "transaction_mroot": "0000000000000000000000000000000000000000000000000000000000000000", 
    "action_mroot": "7685c64568ce6eeda4b91c8f87422330a27b9fab3991f0bfff51a62bc62ac785", 
    "schedule_version": 0, 
    "new_producers": null, "header_extensions": [], 
    "producer_signature": "SIG_K1_KXhk24V8y3hjFKGLg9yDdDHPkNP6ZrNDwM7RWdQk5sUvZovCQPoaiPMg1kBh6Uz1MmDJPpCQG4znMgS1MTAqzQiu7n5u2z", 
    "transactions": [], "block_extensions": [], 
    "id": "00038732118db300cec0aee9e9338c10509e67311758fa9d121ef97e96cd8105", 
    "block_num": 231218, "ref_block_prefix": 3920543950 }
`;

it('should render without crashing', () => {
  expect(shallow(<BlockDetails />)).toBeTruthy();
});

it('should render raw data in a div', () => {
  const comp = shallow(<BlockDetails blockData={testRawData} />);

  expect(comp.find('div.block-details').length).toBe(1);
  expect(comp.find('div.block-details').text()).toContain(testRawData);
});