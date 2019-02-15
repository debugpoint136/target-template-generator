import React, { Component } from 'react';
import fire from '../../fire';
// import ExcelDownload from './ExcelDownload';
import moment from 'moment';
import MergeManifestDownload from './MergeManifestDownload';

class MergeRequests extends Component {
    state = { merge_requests: {}, user: null, lab: null, uid: null }

    componentWillMount() {
        fire.auth()
            .onAuthStateChanged(user => {
                if (user) {
                    this.setState({user: user.displayName, lab: user.photoURL, uid: user.uid });
                        const updateMergeRequests = this.state.merge_requests;
                        updateMergeRequests[this.state.uid] = [];
                        this.setState({ merge_requests: updateMergeRequests });
                        let mergeRequestsRef = fire
                        .database()
                        .ref(`merge_requests/${this.state.uid}`)
                        .orderByKey()
                        .limitToLast(10);

                        mergeRequestsRef.on('child_added', snapshot => {
                        /* Update React state when upload is added at Firebase Database */
                        const content = snapshot.val();
                        const m = moment(content.merge_requests);
                        let merge_request = {
                            text: content.data,
                            date: m.fromNow(),
                            name: content.name,
                            id: snapshot.key,
                            user: content.user
                        };
                        const new_merge_requests = this.state.merge_requests
                        new_merge_requests[this.state.uid] = [merge_request].concat(this.state.merge_requests[this.state.uid])
                        this.setState({ merge_requests: new_merge_requests });
                    })
                } else {
                    this.setState({user: null, lab: null, uid: null });
                }
            });
    }
    render() { 

        if (!this.state.uid) {
            return <div className="text-italic text-grey">Not logged in</div>
        }
        if (this.state.merge_requests.hasOwnProperty(this.state.uid)) { 
            if (this.state.merge_requests[this.state.uid].length === 0) {
                return <div className="text-italic text-grey">No saved files</div>
            }
        } else {
            return <div className="text-italic text-grey">Loading..</div>
        }
        return (
            <div className="sdfs">
                <ul>
                    {this.state.merge_requests[this.state.uid].map(entry => <MergeManifestDownload key={entry.id} id={entry.id} user={entry.user} date={entry.date}/>)}
                </ul>
            </div>
        );
    }
}
 
export default MergeRequests;