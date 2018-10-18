import React, {Component} from "react";
import {withRouter} from "react-router";
// import {Route, Redirect} from "react-router-dom";

import app from "../../fire";

class LogOutContainer extends Component {

    handleLogout = () => {
        app.auth().signOut()
            .then(function () {
                console.log('signed out!')
            })
            .catch(function (error) {
                console.log(error)
            });
    }

    render() {
        return (
            <button onClick={this.handleLogout} className="ml-8 h-12 shadow bg-pink-darker hover:bg-grey-darker focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
                Log out
            </button>
        );
    }
}

export default withRouter(LogOutContainer);