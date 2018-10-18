import React, {Component} from "react";
import SignUpView from "./SignUpView";
import {withRouter} from "react-router";
import app from "../../fire";

class SignUpContainer extends Component {
  handleSignUp = async event => {
    event.preventDefault();
    const {email, password, firstname, lastname, lab} = event.target.elements;

    try {
      const res = await app
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value);

      res.user.sendEmailVerification()
      const displayName = firstname.value + ' ' + lastname.value;

      res.user.updateProfile({
          displayName: displayName, 
          photoURL: lab.value 
        })
      this.props.history.push("/");
    } catch (error) {
      alert(error);
    }
  };

  render() {
    return <SignUpView onSubmit={this.handleSignUp}/>;
  }
}

export default withRouter(SignUpContainer);
