import React from 'react';
import PageHeader from './common/page-header';
import Joi from "joi-browser";
import Form from './common/form';
import { Redirect } from 'react-router';
import userService from "../services/userService";


class Signin extends Form {

  state = {

    data: { email: "", password: "" },
    errors: {}
  };

  schema = {
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().min(6).label("Password")
  };

  doSubmit = async () => {

    const { email, password } = this.state.data;

    // there is a chance that the email and the password that the user filled are incorrect that why i use try & catch  
    try {
      await userService.login(email, password);
      window.location = '/';

    } catch (ex) {

      if (ex.response && ex.response.status === 400) {
        this.setState({ errors: { email: ex.response.data } });
      }
    }
  }


  render() {

    if (userService.getCurrentUser()) return <Redirect to="/" />

    return (
      <div className="container">
        <PageHeader>Sign in</PageHeader>
        <div className="row">
          <div className="col-12 mt-4">
            <p>Sign in and start making money from your asset.<br />
              What are you waiting for?
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <form onSubmit={this.handleSubmit} method="POST" autoComplete="off">
              {this.renderInput("email", "Email", "email")}
              {this.renderInput("password", "Password", "password")}
              {this.renderButton("Sign in")}
            </form>
          </div>
        </div>
      </div >
    );
  }
}

export default Signin;