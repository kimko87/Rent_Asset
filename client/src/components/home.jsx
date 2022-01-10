import React, { Component } from 'react';
import PageHeader from './common/page-header';

class Home extends Component {
  state = {}
  render() {
    return (
      <div className="container">
        <PageHeader >Rent_Asset</PageHeader>
        <div className="row">
          <div className="col-12">
            <p>This is your place to connect with people that seek to rent their asset for short terms.</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;