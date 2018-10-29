import React, {Component} from 'react';
import fire from '../../fire';
import ExcelDownload from './ExcelDownload';
import moment from 'moment';
// import app from "../../fire";

class UploadsList extends Component {
    state = { uploads: {}, user: null, lab: null, uid: null }

    componentWillMount() {
        fire.auth()
            .onAuthStateChanged(user => {
                if (user) {
                    this.setState({user: user.displayName, lab: user.photoURL, uid: user.uid });
                        const updateUploads = this.state.uploads;
                        updateUploads[this.state.uid] = [];
                        this.setState({ uploads: updateUploads });
                            /* Create reference to uploads in Firebase Database */
                        let uploadsRef = fire
                        .database()
                        .ref(`uploads/${this.state.uid}`)
                        // .ref(`uploads`)
                        .orderByKey()
                        .limitToLast(10);

                        uploadsRef.on('child_added', snapshot => {
                        /* Update React state when upload is added at Firebase Database */
                        const content = snapshot.val();
                        const m = moment(content.uploaded);
                        let upload = {
                            text: content.data,
                            date: m.fromNow(),
                            name: content.name,
                            id: snapshot.key,
                            user: content.user
                        };
                        const new_uploads = this.state.uploads
                        new_uploads[this.state.uid] = [upload].concat(this.state.uploads[this.state.uid])
                        this.setState({ uploads: new_uploads });
                        // this.setState({
                        //     uploads: [upload].concat(this.state.uploads.filter(record => record.user === content.user))
                        // });
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
        if (this.state.uploads.hasOwnProperty(this.state.uid)) { 
            if (this.state.uploads[this.state.uid].length === 0) {
                return <div className="text-italic text-grey">No saved files</div>
            }
        } else {
            return <div className="text-italic text-grey">Loading..</div>
        }
        return (
            <div className="sdfs">
                <ul>
                    {/* Render the list of messages */
                    this.state.uploads[this.state.uid]
                    // this.state.uploads
                        .map(upload => <ExcelDownload key={upload.id} id={upload.id} name={upload.name} user={upload.user} date={upload.date}/>)
                    }
                </ul>
            </div>
        );
    }
}

export default UploadsList;