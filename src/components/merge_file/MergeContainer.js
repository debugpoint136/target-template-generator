import React, {Component} from 'react';
import MergeRequests from './MergeRequests';
import NewMergeRequest from './NewMergeRequest';

class MergeContainer extends Component {
    state = {}
    render() {
        return (
            <div className="flex justify-center">
            <div className="m-8 p-8 flex-col w-1/2 justify-center">
                <div className="border-2 border-blue m-8 p-8">
                    <div className="m-8 p-8 h-8 font-semibold text-grey-darker font-sans text-2xl">Save filled out merge request template</div>
                    <NewMergeRequest/>
                </div>
                <div className="border-2 border-blue m-8 p-8">
                    <h3 className='text-center'>Saved Merge requests</h3>
                    <hr/>
                    <MergeRequests/>
                </div>
            </div>
            </div>
        );
    }
}

export default MergeContainer;