import React, { Component } from "react";
import LogInView from "./LogInView";
import { withRouter } from "react-router";
import { Route, Redirect } from "react-router-dom";

import app from "../../fire";

class LogInContainer extends Component {
  state = { loading: true, authenticated: false, user: null };

  handleLogin = async event => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      const res = await app.auth().signInWithEmailAndPassword(email.value, password.value);
      if (!res.user.emailVerified) {
          res.user.sendEmailVerification()
      }
      this.props.history.push("/");
    } catch (error) {
      alert(error);
    }
  };

  signup = (event) => {
    event.preventDefault();
    this.props.history.push("/signup");
  }

  forgotPassword = (event) => {
    event.preventDefault();
    this.props.history.push("/forgot");
  }

  componentWillMount() {
    app.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          authenticated: true,
          currentUser: user,
          loading: false
        });
      } else {
        this.setState({
          authenticated: false,
          currentUser: null,
          loading: false
        });
      }
    });
  }

  render() {
    const { authenticated, loading } = this.state;

    if (loading) {
      return <p>Loading..</p>;
    }

    if (authenticated) {
      return <Route><Redirect to="/" /></Route>
    }
    return <LogInView onSubmit={this.handleLogin} handleForgotPasswordClick={this.forgotPassword} handleSignupClick={this.signup} />;
  }
}

export default withRouter(LogInContainer);
