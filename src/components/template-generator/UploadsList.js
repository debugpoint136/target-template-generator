import React, {Component} from 'react';
import fire from '../../fire';
import ExcelDownload from './ExcelDownload';
import moment from 'moment';

class UploadsList extends Component {
    state = { uploads: [] }

    componentWillMount() {
        /* Create reference to uploads in Firebase Database */
        let uploadsRef = fire
            .database()
            .ref('uploads')
            .orderByKey()
            .limitToLast(100);

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
            this.setState({
                uploads: [upload].concat(this.state.uploads.filter(record => record.user === content.user))
            });
        })
    }

    render() {
        if (this.state.uploads.length === 0) {
            return <div className="text-italic text-grey">No saved files</div>
        }
        return (
            <div className="sdfs">
                <ul>
                    {/* Render the list of messages */
                    this.state.uploads
                        .map(upload => <ExcelDownload key={upload.id} id={upload.id} name={upload.name} user={upload.user} date={upload.date}/>)
                    }
                </ul>
            </div>
        );
    }
}

export default UploadsList;