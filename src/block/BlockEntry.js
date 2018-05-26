import React from 'react';
import './BlockEntry.css';

import md5 from 'md5';

// dispaly actions and md5sum of the timestamp
const BlockEntry = (props) => {
  return (
    <div className="block-entry">
      <span>
        {md5(props.timestamp)}
      </span>
      <span className="action-count">
        actions: {props.transactions.length}
      </span>
    </div>
  );
}

export default BlockEntry;