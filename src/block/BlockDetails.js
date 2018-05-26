import React from 'react';
import './BlockDetails.css';

// display the block raw json data
const BlockDetails = (props) => {
    return (
      <div className="block-details">
        {props.blockData}
      </div>
    );
}

export default BlockDetails;