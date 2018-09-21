import React, {Component} from 'react';
import {Button} from 'semantic-ui-react'

class AddedRow extends Component {
    state = {}
    render() {
        return (
            <div className="p-4 m-4 h-16 w-100 border-b-2 border-dotted flex justify-between">
                {this.props.id}
                <Button name={this.props.id} size='tiny' circular icon='cancel' onClick={this.props.removeRow}/>
            </div>
        );
    }
}

export default AddedRow;