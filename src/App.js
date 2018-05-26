import React, { Component } from 'react';
import './App.css';
import BlockEntry from './block/BlockEntry';
import BlockDetails from './block/BlockDetails';

import { Query } from "react-apollo";
import gql from "graphql-tag";

class App extends Component {
  
  constructor(props) {
    super(props);

    // flag indicating that blocks
    // are in cache, otherwise grapql
    // will try to retrieve from the server
    // there is no server for this project
    this.blocksCached = false;

    this.gqlQuery = gql`
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
  }

  componentDidMount() {
    this.getLatestBlocks();
  }

  render() {
    
    // component holding the block list
    const EosBlocks = () => {
      return (
        <Query query={this.gqlQuery}>
          {({ loading, error, data}) => {
            if (loading) return <p>Loading...</p>
            if (error) { 
              console.error(error); 
              return <p>Error reading blocks</p> 
            }
              
            return data.block.map((block, i) => {
              return (
                <li className="list-group-item" key={block.blockNum}>
                  <a href={"#" + block.id} data-toggle="collapse">
                    <BlockEntry 
                      timestamp={block.timestamp}
                      transactions={block.transactions}
                      key={block.id}
                    />
                  </a>
                  <div id={block.id} className="panel-collapse collapse">
                    <BlockDetails blockData={block.rawData} key={block.id} />
                  </div>
                </li>
              );
            });
          }}
        </Query>
      );  
    };

    // component holding main app content
    const AppContent = () => {
      if (this.blocksCached) {
        return (
          <div>
            <div className="panel-group">
              <div className="panel panel-default">
                <ul className="list-group">
                  <EosBlocks />
                </ul>
              </div>
            </div>

            <div className="btn-container">
              <button 
                onClick={this.getLatestBlocks} 
                type="button" 
                className="btn btn-outline-secondary"
              >
                LOAD
              </button>
            </div>
        </div>
        );
      } else {
        return (<div></div>);
      }
    }

    // title information
    return (
      <div className="App container-fluid">
        <header>
          <h1 className="App-title">Most Recent EOS Blocks</h1>
        </header>
        <AppContent />
      </div>
    );
  }

  // traverse 10 blocks and gather the block data
  // to be stored in the cache
  getLatestBlocks = () => {
    const eos = this.props.eos;
    
    eos.getInfo({}).then(info => {
      let prev = info.head_block_id;
      let blocks = new Array(10);
      
      const traverse = async function () {
        for (const i of blocks.keys()) {
          let block = await eos.getBlock({block_num_or_id: prev});
          
          blocks[i] = block;
          prev = block.previous;
        }
      };
      
      traverse().then(() => {
        this.cacheBlocks([...blocks]);
        this.blocksCached = true;
        this.setState({}); // force a render call
      });
      
    });

  }

  // function to cache the block data with graphql
  cacheBlocks(blocks) {
    const client = this.props.client;
    
    const blocksToCache = blocks.map(b => {
      return {
        id: b.id,
        blockNum: b.block_num,
        timestamp: b.timestamp,
        transactions: b.transactions,
        rawData: JSON.stringify(b, null, 2),
        __typename: 'Block'
      };
    });
    
    client.writeQuery({
      query: this.gqlQuery, 
      data: {
        block: [...blocksToCache]
      }
    });

    

  }

}

export default App;