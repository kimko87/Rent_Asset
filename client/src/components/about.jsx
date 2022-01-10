import React, { Component } from 'react';
import { Link } from "react-router-dom";
import userService from '../services/userService';
import PageHeader from "./common/page-header";

class About extends Component {
  state = {
    user: {}
  }



  async componentDidMount() {
    const user = await userService.getCurrentUser();
    this.setState({ user });

  }

  render() {

    const { user } = this.state;

    return (
      <div className="container">
        <PageHeader>About Us</PageHeader>
        <div className="row">
          <div className="col-12 mt-4">
            <p>In our kingdom you can offer your asset for rent .<br></br>
              It dosent matter if it's an apartment a whole big house a residential unit an hotel room or even if its some special asset.
            </p>
            {!user ? (
              <button type="button" className="btn btn-danger ">
                <Link className="text-decoration-none text-dark" to="/owner-signup">Click to sign up</Link>
              </button>
            ) : <p>Start making Money!</p>}
          </div>
        </div>
      </div >
    );
  }
}

export default About;