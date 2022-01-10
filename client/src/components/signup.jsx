import React from 'react';
import PageHeader from './common/page-header';
import Joi from "joi-browser";
import Form from './common/form';
import http from "../services/httpService";
import { apiUrl } from "../config/config.json";
import { toast } from "react-toastify";
import { Redirect } from 'react-router';
import userService from "../services/userService";


class Signup extends Form {

  state = {
    data: { email: "", password: "", name: "" },
    errors: {}
  }

  schema = {
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().min(6).label("Password"),
    name: Joi.string().required().min(2).label("Name")
  };

  doSubmit = async () => {
    // i made here shallow copy because if i just made an object destructor then the variable will be by referance to the state and we cannot reach directly to the state and change it.. 
    const data = { ...this.state.data };

    // i add here the assetOwner property to the request because Joi in the backend is exepting also a boolean of assetOwner.
    data.assetOwner = false;

    try {

      await http.post(`${apiUrl}/users`, data);

      toast.error("Freshly new acount was created...");
      this.props.history.replace('/signin');

    } catch (ex) {

      if (ex.response && ex.response.status === 400) {

        this.setState({ errors: { email: "*This email is allready registered." } });

      }
    }
  }

  render() {

    if (userService.getCurrentUser()) return <Redirect to="/" />

    return (
      <div className="container">
        <PageHeader>Sign Up </PageHeader>
        <div className="row">
          <div className="col-12 mt-4">
            <p>
              What are you waiting for?
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <form onSubmit={this.handleSubmit} method="POST" autoComplete="off" >
              {this.renderInput("email", "Email", "email")}
              {this.renderInput("password", "Password", "password")}
              {this.renderInput("name", "Name")}
              {this.renderButton("Sign up")}
            </form>
          </div>
        </div>
      </div >
    );
  }
}

export default Signup;