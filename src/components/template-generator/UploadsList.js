import React, {Component} from 'react';
import fire from '../../fire';
import ExcelDownload from './ExcelDownload';

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
            let upload = {
                text: JSON.stringify(snapshot.val()),
                id: snapshot.key
            };
            this.setState({
                uploads: [upload].concat(this.state.uploads)
            });
        })
    }

    render() {
        return (
            <div className="sdfs">
                <ul>
                    {/* Render the list of messages */
                    this.state.uploads
                        .map(upload => <ExcelDownload key={upload.id} id={upload.id}/>)
                    }
                </ul>
            </div>
        );
    }
}

export default UploadsList;