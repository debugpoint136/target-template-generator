import React, {Component} from 'react';
import ExperimentDesigner from './experiment-designer/src/App';

class Data extends Component {
    state = {}
    render() {
        return (
            <div className='test'>
                <ExperimentDesigner/>
            </div>
        );
    }
}

export default Data;