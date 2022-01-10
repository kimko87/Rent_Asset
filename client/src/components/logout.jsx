import { Component } from 'react';
import userMethods from '../services/userService';

class Logout extends Component {

  state = {

  }

  async componentDidMount() {

    userMethods.logout();
    window.location = '/signin';
  }

  render() {

    return (null);
  }
}

export default Logout;