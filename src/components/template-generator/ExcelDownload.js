import React, {Component} from 'react';
import {Button} from 'semantic-ui-react';
import fire from '../../fire';

class ExcelDownload extends Component {
    state = {}

    handleClick = (e, {name}) => {
        fire.database().ref(`uploads/${name}`).once('value', snapshot => {
            console.log(JSON.stringify(snapshot));
        })
    }

    render() {
        return (
            <div className="m-4 p-2 bg-grey-lighter flex justify-between w-1/3">
                {this.props.id}
                <Button name={this.props.id} onClick={this.handleClick}>Download</Button>
            </div>
        );
    }
}

export default ExcelDownload;