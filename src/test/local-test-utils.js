const mockInfoData = require('./mock-info-data.json');
const mockBlockData = require('./mock-block-data');

// mock eos object for testing
// mimics the eos blockchain calls
export const eosMock = {
  getInfo: () => {
    return Promise.resolve(mockInfoData);
  },
  getBlock: (search) => {
    const block = mockBlockData.data.find((b) => b.id == search.block_num_or_id);
    
    return Promise.resolve(block);
  }
};
