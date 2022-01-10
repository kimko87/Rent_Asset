import React from 'react';
import PageHeader from './common/page-header';
import Joi from "joi-browser";
import Form from './common/form';
import http from "../services/httpService";
import { apiUrl } from "../config/config.json";

import userService from "../services/userService";



class OwnerSignup extends Form {

  state = {
    data: { email: "", password: "", name: "" },
    errors: {},
    user: {}
  }

  schema = {
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().min(6).label("Password"),
    name: Joi.string().required().min(2).label("Name")
  };

  async componentDidMount() {
    const user = await userService.getCurrentUser();
    this.setState({ user });

  }

  doSubmit = async () => {

    const data = { ...this.state.data };
    data.assetOwner = true;

    try {

      await http.post(`${apiUrl}/users`, data);
      await userService.login(data.email, data.password);
      window.location = '/create-asset';

    } catch (ex) {

      if (ex.response && ex.response.status === 400) {

        this.setState({ errors: { email: "*This email is allready registered." } });

      }
    }
  };

  render() {



    return (
      <div className="container">
        <PageHeader>Owners sign up</PageHeader>
        <div className="row">
          <div className="col-12 mt-4">
            <p>Only registered owners can post their asset for rent...<br />
              What are you waiting for?
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <form onSubmit={this.handleSubmit} method="POST" autoComplete="off">
              {this.renderInput("email", "Email", "email")}
              {this.renderInput("password", "Password", "password")}
              {this.renderInput("name", "Name")}
              {this.renderButton("Next")}
            </form>
          </div>
        </div>
      </div >
    );
  }
}

export default OwnerSignup;