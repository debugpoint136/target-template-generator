import React, {Component} from 'react';
import axios from 'axios';
import {Label, Button, Popup} from 'semantic-ui-react';
// import Neo4jDownload from './Neo4jDownload';
import Neo4jDownloadSubmission from './Neo4jDownloadSubmission';
import FileSheetDownload from './FileSheetDownload';
import moment from 'moment';
const SUBMISSIONS = 'https://5dum6c4ytb.execute-api.us-east-1.amazonaws.com/dev/submissions';

class MetadataForSubmissions extends Component {
    state = { submissions: null, download: null}

    componentDidMount() {
        if (this.props.lab) {
            if (this.props.lab === 'ADMIN') {
                axios.get(SUBMISSIONS)
                .then(res => this.setState({ submissions: res.data.body.filter(sub => sub.data_phase === 'production' 
                // && sub.assay !== 'RRBS-seq' 
                ).sort(compare) }))
                .catch(err => console.log(err));    
            } else {
                axios.get(SUBMISSIONS)
                .then(res => this.setState({ submissions: res.data.body
                }))
                .catch(err => console.log(err));    
            }
        }
        
    }

    handleMetadataDownload = (e, {name}) => {
        this.setState({ download: name });
    }
    
    render() {
        return (
            <div className="m-8 p-8 flex justify-center">
            <div className='border-2 border-dashed border-blue p-4 m-4'>
            <h4>Download metadata by Submission</h4>
                <hr/>
            <div className="m-4 p-4">
                { (this.state.submissions) ? (this.state.submissions.length === 0) ? <h5>No submissions found</h5> :
                    this.state.submissions.map(submission => 
                        <div className="m-4 p-4 bg-blue-lightest flex justify-between" key={submission._id}>
                            <div className="fdf">
                                <Label size='tiny' className="px-4">{submission._id}</Label>
                                <div className="flex text-xs">
                                    <div className="mx-2 font-hairline text-grey-dark">{moment(submission.registered).format('MMM DD YYYY')}</div>
                                    {/* <a href={`https://5dum6c4ytb.execute-api.us-east-1.amazonaws.com/dev/submission/${submission._id}`} target="_blank">Details</a> */}
                                </div>
                            </div>
                            
                            <Label color='blue' className="px-4">{submission.lab}</Label>
                            <Label color={(submission.read_type === 'Paired-end')? 'brown': 'teal'} className="px-4">{submission.read_type}</Label>
                            <Label color={(submission.data_phase === 'production')? 'green': 'orange'} className="px-4">{submission.data_phase}</Label>
                            <Label color={(submission.assay === 'ATAC-seq')? 'purple': (submission.assay === 'RNA-seq') ? 'pink': 'grey'} className="px-4">{submission.assay}</Label>
                            <Popup trigger={
                                <Button basic size='tiny' name={submission._id} className="mx-4" icon='download' onClick={this.handleMetadataDownload}/>
                            } content='Download previously registered metadata for this submission' />
                            <FileSheetDownload id={submission._id} />                       
                        </div>
                    ) 
                : <h5>Loading ...</h5>}
            </div>

            {/* {( this.state.download ) ?  <Neo4jDownload id={this.state.download} /> : null} */}
            {( this.state.download ) ?  <Neo4jDownloadSubmission id={this.state.download} /> : null}
            
            </div>
            </div>
        );
    }
}

export default MetadataForSubmissions;

function compare(a, b) {
    // Use toUpperCase() to ignore character casing
    const labA = a.lab.toUpperCase();
    const labB = b.lab.toUpperCase();

    let comparison = 0;
    if (labA > labB) {
        comparison = 1;
    } else if (labA < labB) {
        comparison = -1;
    }
    return comparison;
}
