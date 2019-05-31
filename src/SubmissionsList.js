import React, {Component} from 'react';
import fire from './fire';
import axios from 'axios';
import {Loader, Label} from 'semantic-ui-react';
import SubmissionsTable from './SubmissionsTable';

class SubmissionsList extends Component {
    state = {
        user: null,
        lab: null,
        uid: null,
        submissions: []
    }

    componentWillMount = () => {
        fire
            .auth()
            .onAuthStateChanged(user => {
                if (user) {
                    this.setState({user: user.displayName, lab: user.photoURL, uid: user.uid});
                }
            });
    }

    async componentDidMount() {
        const SUBMISSIONS_URL = 'https://5dum6c4ytb.execute-api.us-east-1.amazonaws.com/dev/submissions';
        try {
            const res = await axios.get(SUBMISSIONS_URL);
            const {body} = res.data;
            if ( this.state.lab === 'ADMIN' ) {
                this.setState({submissions: body})
            } else {
                const filteredSubmissions = body.filter(d => d.lab === this.state.lab);
                this.setState({submissions: filteredSubmissions})
            }
            
        } catch (error) {
            console.log(error)
        }

    }

    render() {
        if (this.state.submissions.length === 0) {
            return <Loader active inline='centered'>Fetching submissions from {this.state.lab}</Loader>;
        }
        return (
            <div className=''>
                <Label as='a' color='blue' name={this.state.lab}>{this.state.lab}</Label>
                <SubmissionsTable data={this.state.submissions}/>
            </div>
        );
    }
}

export default SubmissionsList;