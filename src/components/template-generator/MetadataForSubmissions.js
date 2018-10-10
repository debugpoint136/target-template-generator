import React, {Component} from 'react';
import axios from 'axios';
import {Label, Button} from 'semantic-ui-react';
import Neo4jDownload from './Neo4jDownload';

const SUBMISSIONS = 'https://5dum6c4ytb.execute-api.us-east-1.amazonaws.com/dev/submissions';

class MetadataForSubmissions extends Component {
    state = { submissions: [], download: null}

    componentDidMount() {
        axios.get(SUBMISSIONS)
        .then(res => this.setState({ submissions: res.data.body }))
        .catch(err => console.log(err));    
    }

    handleMetadataDownload = (e, {name}) => {
        this.setState({ download: name });
    }
    
    render() {
        return (
            <div>
            <div className="m-4 p-4">
                { (this.state.submissions.length > 0) ? 
                    this.state.submissions.map(submission => 
                        <div className="m-4 p-4 bg-blue-lightest flfex justify-between" key={submission._id}>
                            <Label size='tiny' className="px-4">{submission._id}</Label>
                            <Label color='blue' className="px-4">{submission.lab}</Label>
                            <Label color={(submission.read_type === 'Paired-end')? 'brown': 'teal'} className="px-4">{submission.read_type}</Label>
                            <Label color={(submission.data_phase === 'production')? 'green': 'orange'} className="px-4">{submission.data_phase}</Label>
                            <Label color={(submission.assay === 'ATAC-seq')? 'purple': (submission.assay === 'RNA-seq') ? 'pink': 'grey'} className="px-4">{submission.assay}</Label>
                            <Button basic size='tiny' name={submission._id} className="mx-4" icon='download' onClick={this.handleMetadataDownload}/>
                        </div>
                    ) 
                : <h5>Loading ...</h5>}
            </div>

            {( this.state.download ) ?  <Neo4jDownload id={this.state.download} /> : null}
            </div>
        );
    }
}

export default MetadataForSubmissions;