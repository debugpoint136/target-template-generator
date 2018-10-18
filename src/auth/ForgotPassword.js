import React, {Component} from "react";
import {withRouter} from "react-router";
import app from "../fire";
import Notifications, {notify} from 'react-notify-toast';

class ForgotPassword extends Component {

    handleForgotPassword = (event) => {
        console.log('reaching here');
        event.preventDefault();

        const {email} = event.target.elements;
        if (email.value) {
            app.auth().sendPasswordResetEmail(email.value)
                .then(function () {
                    notify.show('Reset link sent! ✉️', 'success');
                })
                .catch(function (error) {
                    console.log(error)
                });
            // this.props.history.push("/");
        } else {
            alert('Enter email to send the reset link');
            return;
        }
    }

    render() {
        return (
            <div
                className="flex justify-center"
                style={{
                marginTop: '100px'
            }}>
                <Notifications/>
                <form className="w-full max-w-md" onSubmit={this.handleForgotPassword}>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label
                                className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                                htmlFor="grid-email">
                                Email
                            </label>
                            <input
                                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-grey"
                                style={{
                                width: "100%"
                            }}
                                name="email"
                                type="email"
                                placeholder="jane@doe.com"/>
                        </div>
                        </div>
                        <div className="flex justify-center">
                            <button
                                className="mt-8 mx-4 shadow bg-blue hover:bg-blue-light focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                                type="submit">
                                Reset password
                            </button>
                        </div>
                </form>
            </div>
        );
    }
}

export default withRouter(ForgotPassword);